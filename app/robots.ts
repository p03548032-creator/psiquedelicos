import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/login', '/registro', '/perfil', '/sala-de-viajes', '/reset-password'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/login', '/registro', '/perfil', '/sala-de-viajes', '/reset-password'],
            },
            {
                userAgent: 'Googlebot-Image',
                allow: '/',
            },
        ],
        sitemap: `${process.env.NEXT_PUBLIC_URL || 'https://portalpsy.es'}/sitemap.xml`,
    };
}
