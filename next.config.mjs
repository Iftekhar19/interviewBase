/** @type {import('next').NextConfig} */
const nextConfig = {
     experimental: {
    turbopack: false,
  },
   images: {
    domains: [
 
  'https://ik.imagekit.io',"ik.imagekit.io"
    ],
  },
};

export default nextConfig;
