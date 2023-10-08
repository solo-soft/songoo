import {NextResponse} from "next/server";

import {createClient} from "@supabase/supabase-js";
import {NextApiRequest, NextApiResponse} from "next";
import {sign} from "jsonwebtoken";
import {serialize} from "cookie";


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    if (req.method !== 'POST') {
        return null
    }

    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE || "")


    if (!db) {
        return res.status(500).json({message: "db connection is filed!"})
    } else {
        console.log("db connected!")
    }

    const {password, email} = await req.body

    if (!password || !email) return NextResponse.json({message: "Something is wrong in check password!"}, {status: 400 })


    //*no needed to hash password , Supabase do this process for use !
    try {
       const {data, error} = await db.auth.signUp({
            email,
            password
        })
        const token = sign({email : data?.user?.email , id : data?.user?.id } , process.env.SECRET_KEY || "", {expiresIn : 10800000})

        if (error) return res.status(400).json({message: "user already registered"})

        const cookie = serialize("appToken" , token , {
            maxAge : 10800000, // 3 hours
            httpOnly : true,
            path : "/",
        })
        res.setHeader("Set-Cookie" , cookie)

        return res.status(200).json({message: 'Auth process is successful'})

    } catch (e) {
        return res.status(400).json({message: "Auth process is filed!"})
    }



}
