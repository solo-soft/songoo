import {supabase} from "../../../supabase/createClient";
import {sign} from "jsonwebtoken"
import {serialize , parse} from "cookie"



export default async function handler(req, res) {

    if (req.method !== "POST") return

    if (!supabase) {
        return res.status(500).json({message: "db connection is filed!"})
    } else {
        console.log("db connected!")
    }


    const {email, password} = await req.body

    if (!email && !password) return res.status(400).json({message: "email or password issue!"})

    try {

        let {data, error} = await supabase.auth.signInWithPassword({
            email,
            password
        })


        if (error) {
            return res.status(400).json({message : "Email or Password is wrong"})
        }


        try {
            const token = sign({email : data.user.email , id : data.user.id } , process.env.SECRET_KEY , {expiresIn : 10800000})

            const cookie = serialize("appToken" , token , {
                maxAge : 10800000, // 3 hours
                httpOnly : true,
                path : "/",
                static : true
            })
            res.setHeader("Set-Cookie" , cookie)
        }
        catch (e) {
            console.log(e)
            return res.status(400).json({message : "Login process have some issue!"})
        }

        return res.status(200).json({message : `Welcome back ${data.user.email}`})

    } catch (e) {
        console.log(e)
        return res.status(400).json({message : "Login process have some issue!"})
    }
}
