import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, //warnings
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],//changes to avif or webp when needed
  },
  async headers() { 
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' }, //clickjacking protection
        { key: 'X-Content-Type-Options', value: 'nosniff' }, //MIME sniffing protection
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }, //policy that protects user privacy
      ],
    }];
  },
};

export default nextConfig;
