import {createMiddlewareSupabaseClient, createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'



export async function middleware(req , res) {

    // Create authenticated Supabase Client.
    const supabase = createMiddlewareSupabaseClient({ req, res } , {
        supabaseUrl : process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey : process.env.NEXT_PUBLIC_SUPABASE_KEY
    })


    // Check if we have a session
    const {data: { session } , error} = await supabase.auth.getSession()

    // console.log(error)

    if (session?.user.email) {
        return NextResponse.next('/')
    }

    if (!session?.user.email)
    {
        return NextResponse.redirect(new URL('/login_signup' , req.url))
    }





}

export const config = {
    matcher: ['/' , '/pickFavouriteArtists' ,'/artist/:path*' , '/new-releases-albums/:path*'],
}