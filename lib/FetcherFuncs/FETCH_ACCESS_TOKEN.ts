export const FETCH_ACCESS_TOKEN = async () =>
{
    try {

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
                ).toString("base64")}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
            }),
        })

        const data : {access_token : string} = await response.json()


        return {token : data.access_token }
    }
    catch (e) {
        console.log("token / fetch access token is failed!")
    }
}
