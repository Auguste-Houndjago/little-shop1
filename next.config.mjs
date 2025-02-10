/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'hahxjbtuwtssinoeazoh.supabase.co', 
      'lh3.googleusercontent.com',
      'utfs.io',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      
    ]
  }
};

export default nextConfig;