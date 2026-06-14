import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/login', '/registro', '/perfil', '/sala-de-viajes', '/reset-password'],
        },
        sitemap: `${process.env.NEXT_PUBLIC_URL || 'https://portalpsy.es'}/sitemap.xml`,
    };
}
