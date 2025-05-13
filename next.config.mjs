const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`
            }
        ]
    },
    i18n: {
        locales: ['default', 'en', 'fr'],
        defaultLocale: 'default',
        localeDetection: false,
    },
};

export default nextConfig;
