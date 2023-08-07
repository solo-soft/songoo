/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "i.scdn.co",
            "t.scdn.co",
            "mosaic.scdn.co",
            "thisis-images.scdn.co",
            "images-ak.spotifycdn.com",
            "user-images.githubusercontent.com",
            "seed-mix-image.spotifycdn.com",
            "daily-mix.scdn.co",
            "i.ytimg.com",
        ]
    },
    eslint: {
        ignoreDuringBuilds: true
    }
}
