/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: process.env.NEXT_PUBLIC_DEV_MODE === 'true' ? { position: 'bottom-left' } : false,
};

export default nextConfig;
