/** Server Actions centralizadas — PortalPSY 2026
 *  Reemplazan APIs REST para mutaciones de dominio.
 *  Validación con Zod + revalidatePath automático. */
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// ── Journal ────────────────────────────────────────────────
const JournalEntrySchema = z.object({
  feelings: z.string().max(5000).optional().default(''),
  insights: z.string().max(5000).optional().default(''),
  intention: z.string().max(5000).optional().default(''),
  substanceId: z.string().optional(),
  dose: z.string().optional(),
  date: z.string().optional(),
});

export type JournalEntry = z.infer<typeof JournalEntrySchema>;

export async function saveJournalEntry(data: unknown) {
  const parsed = JournalEntrySchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Datos inválidos', issues: parsed.error.flatten() };
  }

  // TODO: guardar en Supabase (autenticado)
  // Por ahora validación + simulate
  const entry = parsed.data;

  // Simular guardado
  const saved = {
    id: crypto.randomUUID(),
    ...entry,
    createdAt: new Date().toISOString(),
  };

  // Revalidar página de sala de viajes
  revalidatePath('/sala-de-viajes');
  revalidatePath('/musica');

  return { ok: true, entry: saved };
}

// ── Newsletter ────────────────────────────────────────────
const NewsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  intention: z.enum(['integration', 'news', 'community', 'all']).default('all'),
});

export async function subscribeNewsletter(data: unknown) {
  const parsed = NewsletterSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Email inválido', issues: parsed.error.flatten() };
  }

  // TODO: insertar en Supabase newsletter table
  revalidatePath('/');

  return { ok: true, email: parsed.data.email };
}

// ── Article bookmark ──────────────────────────────────────
export async function toggleBookmark(slug: string, userId: string) {
  if (!slug || !userId) {
    return { error: 'Faltan parámetros' };
  }

  // TODO: upsert en bookmarks table
  revalidatePath(`/articulo/${slug}`);

  return { ok: true };
}

// ── Audio session tracking ─────────────────────────────────
const AudioSessionSchema = z.object({
  sessionId: z.string().uuid(),
  duration: z.number().int().positive().max(86400),
  phase: z.enum(['preparacion', 'subida', 'pico', 'descenso', 'integracion']),
  layers: z.array(z.string()),
});

export async function trackAudioSession(data: unknown) {
  const parsed = AudioSessionSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Datos de sesión inválidos' };
  }

  // TODO: agregar a tabla audio_sessions en Supabase
  // console.log('[audio-session]', parsed.data);

  return { ok: true };
}

// ── Feedback ──────────────────────────────────────────────
const FeedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'content', 'other']),
  message: z.string().min(10).max(2000),
  page: z.string().optional(),
  email: z.string().email().optional(),
});

export async function submitFeedback(data: unknown) {
  const parsed = FeedbackSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Datos inválidos', issues: parsed.error.flatten() };
  }

  // TODO: guardar en Supabase + notificar via Resend
  // const { error: emailError } = await resend.emails.send({...})

  return { ok: true };
}
