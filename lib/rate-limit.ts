import { NextResponse } from 'next/server';

type LimitConfig = { requests: number; window: `${number} ${'s' | 'm' | 'h'}` };

const limiters = new Map<string, Promise<import('@upstash/ratelimit').Ratelimit | null>>();

async function getLimiter(config: LimitConfig) {
  const key = `${config.requests}:${config.window}`;
  if (limiters.has(key)) {
    return limiters.get(key)!;
  }

  const promise = (async () => {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return null;
    }

    const { Redis } = await import('@upstash/redis');
    const { Ratelimit } = await import('@upstash/ratelimit');

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.requests, config.window),
      analytics: true,
    });
  })();

  limiters.set(key, promise);
  return promise;
}

export async function enforceRateLimit(identifier: string, config: LimitConfig = { requests: 20, window: '1 m' }) {
  const limiter = await getLimiter(config);
  if (!limiter) return null;

  const result = await limiter.limit(identifier);
  if (!result.success) {
    const retryAfterSeconds = Math.max(Math.ceil((result.reset - Date.now()) / 1000), 1);
    return NextResponse.json(
      { error: 'Has superado el límite de peticiones. Intenta de nuevo en unos minutos.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfterSeconds),
        },
      }
    );
  }

  return null;
}
