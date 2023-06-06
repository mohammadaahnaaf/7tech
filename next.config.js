/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    hostname: ['seventech.s3.ap-southeast-1.amazonaws.com', 'tailwindui.com', 'https://seven-tech-backend.onrender.com/'],
    domains: ['seventech.s3.ap-southeast-1.amazonaws.com', 'tailwindui.com', 'https://seven-tech-backend.onrender.com/'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
