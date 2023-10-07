import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {

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
    });


    const data = await response.json();
    console.log(data);


     return  res.status(200).json({ message: "connection success!" , token : data});

  } catch (e) {
     return  res.status(500).json({ message: "Oops something went wrong, please make sure for network" });
  }
}
