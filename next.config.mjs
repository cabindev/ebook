/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['oaugjewc9whitxvv.public.blob.vercel-storage.com'],
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
 };
 
 export default nextConfig;