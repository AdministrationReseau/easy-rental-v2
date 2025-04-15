/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['default', 'en', 'fr'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  // other next.js configurations...
};

export default nextConfig;
