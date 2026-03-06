import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return new NextResponse('URL faltante', { status: 400 });
    }

    try {
        const response = await fetch(url, {
            // No enviar referrer ni credenciales para evitar bloqueos
            referrerPolicy: 'no-referrer'
        });

        if (!response.ok) {
            throw new Error(`Error fetching audio: ${response.statusText}`);
        }

        // Crear una respuesta con el contenido del audio y permitir CORS
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
