# Observabilidad y alertas

Este proyecto todavía escribe la mayoría de errores en consola. Para tener trazabilidad real en producción se recomienda:

## 1. Sentry (Next.js)

1. Instala `@sentry/nextjs`.
2. Crea `sentry.client.config.ts` / `sentry.server.config.ts` con `SENTRY_DSN`.
3. Exporta `instrumentation.ts` y envuelve `App Router` con `withSentryConfig`.
4. Añade las variables `SENTRY_DSN`, `SENTRY_ENVIRONMENT` y `SENTRY_RELEASE` en Vercel.

Resultado: cada error en `/api/*`, cron jobs y componentes se envía automáticamente a Sentry con contexto de usuario Supabase (ID, plan).

## 2. Supabase + Logflare

- Activa el envío de logs de la base de datos a Logflare o Logtail.
- Configura alertas cuando falle un trigger o política RLS.
- Crea un canal específico para `articles` y `profiles` para detectar inconsistencias.

## 3. Cron/Stripe webhooks

- Añade un wrapper para enviar cualquier error de `stripe.checkout.session` o `stripe.webhook` a Sentry.
- Al fallar `/api/cron/fetch-news`, envía un correo vía Resend o un mensaje a Slack.

## 4. Métricas básicas

- Vercel Analytics captura las páginas públicas.
- Para herramientas PRO (modalidades IA/audio), expón contadores vía Supabase (`profiles.analytics`), de forma que puedas saber cuántas sesiones IA se consumen por usuario.

## 5. Variables de entorno sugeridas

```
SENTRY_DSN=
SENTRY_ENVIRONMENT=production
SENTRY_RELEASE=portalpsy@1.0.0
LOGTAIL_SOURCE_TOKEN=
```

Documenta cualquier alerta creada (Slack, email) en este archivo para futuras referencias.
