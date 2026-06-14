import { NextResponse } from 'next/server';
import { validateProxyUrl } from '@/lib/api/auth';
import { enforceRateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const validation = validateProxyUrl(searchParams.get('url'));
    if ('response' in validation) return validation.response;

    try {
        const response = await fetch(validation.url.toString(), {
            referrerPolicy: 'no-referrer'
        });

        if (!response.ok) {
            throw new Error(`Error fetching audio: ${response.statusText}`);
        }

        const headers = new Headers(response.headers);
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Cache-Control', 'public, max-age=86400');

        return new NextResponse(response.body, {
            status: response.status,
            headers: headers
        });

    } catch (error: any) {
        console.error('Audio proxy error:', error);
        return new NextResponse(`Error proxy: ${error.message}`, { status: 500 });
    }
}
