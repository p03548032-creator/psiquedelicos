## PortalPSY — Next.js app

Aplicación principal del portal con Supabase, Stripe y herramientas PRO.

### Requisitos

- Node 18+
- Cuenta de Supabase (Postgres 15)
- Claves de Stripe y Gemini si vas a usar pagos + IA

### Variables de entorno

| Clave | Uso |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Sólo para scripts/cron (NO exponer en el cliente) |
| `NEXT_PUBLIC_URL` | URL pública (https://portalpsy.es) |
| `GEMINI_API_KEY` | IA El Navegante |
| `STRIPE_SECRET_KEY` / `STRIPE_PRICE_ID_PRO` | Checkout PRO |
| `CRON_SECRET` | Token Bearer para `/api/cron/*` y `/api/admin/*` |
| `AUDIO_PROXY_ALLOWED_HOSTS` | Lista separada por comas de dominios permitidos en `/api/proxy-audio` |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | Rate limiting (opcional pero recomendado) |

Coloca los valores en `.env.local` (y `.env.vercel` para despliegues).

### Scripts

```bash
npm run dev            # servidor local
npm run build          # build de producción
npm run start          # sirve la build
npm run seed:articles  # carga los artículos seed en Supabase
```

`seed:articles` requiere `SUPABASE_SERVICE_ROLE_KEY` y vuelca `data/articles.ts` en la tabla `articles` respetando RLS.

### Migraciones de Supabase

Los SQL viven en `supabase/migrations` y están numerados:

1. `0001_core_schema.sql`: perfiles, terapeutas, foro y triggers.
2. `0002_articles.sql`: tabla de artículos + RLS.
3. `0003_newsletter.sql`: tabla de suscriptores.

Ejecuta cada archivo en el SQL Editor de Supabase siguiendo el orden o usa `psql`:

```bash
psql "$SUPABASE_DB_URL" -f supabase/migrations/0001_core_schema.sql
```

### Datos compartidos

Los listados estáticos (sustancias, artículos destacados) viven ahora en `../shared-data`. El cliente Vite y esta app Next leen del mismo origen para evitar divergencias.

### Cron / Jobs

- `/api/cron/fetch-news`: protegida con `CRON_SECRET` + rate limit. Configura un Vercel Cron y envía `Authorization: Bearer $CRON_SECRET`.
- `/api/admin/migrate-articles`: misma protección. Usa scripts locales en su lugar (`seed:articles`).

### Seguridad

- Todas las rutas PRO (`/sala-pro`, `/api/proxy-audio`, `/api/ai/navegante`) verifican la sesión Supabase y el plan.
- Rate limiting opcional con Upstash bloquea abusos en Stripe, IA y audio.
- Define `AUDIO_PROXY_ALLOWED_HOSTS` para bloquear proxys arbitrarios (ej: `AUDIO_PROXY_ALLOWED_HOSTS=www.soundhelix.com`).

### Observabilidad

Consulta `docs/observability.md` para recomendaciones de Sentry, Logtail y alertas automatizadas.
