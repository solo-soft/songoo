import {NextResponse} from "next/server";

import {createClient} from "@supabase/supabase-js";


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return null
    }

    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SERVICE_ROLE)


    if (!db) {
        return res.status(500).json({message: "db connection is filed!"})
    } else {
        console.log("db connected!")
    }

    const {password, email} = await req.body

    if (!password , !email) return NextResponse.json({message: "Something is wrong in check password!"}, {status: 400 })


    //*no needed to hash password , Supabase do this process for use !
    try {
       const {data, error} = await db.auth.signUp({
            email,
            password
        })
        if (error) return res.status(400).json({message: "user already registered"})

    } catch (e) {
        return res.status(400).json({message: "Auth process is filed!"})
    }


    return res.status(200).json({message: 'Auth process is successful'})
}
