/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    hostname: ['seventech-images.s3.ap-southeast-1.amazonaws.com', 'tailwindui.com', 'https://seven-tech-backend.onrender.com/'],
    domains: ['seventech-images.s3.ap-southeast-1.amazonaws.com', 'tailwindui.com', 'https://seven-tech-backend.onrender.com/'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
