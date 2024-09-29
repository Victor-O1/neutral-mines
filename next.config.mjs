// // next.config.js

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'http',
//                 hostname: '**', // Allow images from all HTTPS domains
//             },
//         ],
//     },
// };

// export default nextConfig;
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost']
    }
}

export default nextConfig