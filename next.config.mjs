/** @type {import('next').NextConfig} */
const nextConfig = {
     experimental: {
    turbopack: false,
  },
   images: {
    domains: [
      "upload.wikimedia.org",
  "seeklogo.com",
  "icons8.com",
  "www.berkshirehathaway.com"
    ],
  },
};

export default nextConfig;
