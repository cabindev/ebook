/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ebook.sdnthailand.com', 
                port: '',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'oaugjewc9whitxvv.public.blob.vercel-storage.com',
                port: '',
                pathname: '/images/**',
            }
        ],
    },
};

export default nextConfig;