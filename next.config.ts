import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, //warnings
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],//changes to avif or webp when needed
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,        // match any .svg import
      use: ['@svgr/webpack'], // transform into React component
    });
    return config;         
  },
  async headers() { 
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' }, //clickjacking protection, but the room iframe can self-frame
        { key: 'X-Content-Type-Options', value: 'nosniff' }, //MIME sniffing protection
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }, //policy that protects user privacy
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }, //force HTTPS
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }, 
      ],
    }];
  },
};

export default nextConfig;
