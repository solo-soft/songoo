/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "i.scdn.co",
            "t.scdn.co",
            "mosaic.scdn.co",
            "thisis-Images.scdn.co",
            "Images-ak.spotifycdn.com",
            "user-Images.githubusercontent.com",
            "seed-mix-image.spotifycdn.com",
            "daily-mix.scdn.co",
            "i.ytimg.com",
            "inv.bp.projectsegfau.lt"
        ]
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript : {
        ignoreBuildErrors :  true
    }
}
