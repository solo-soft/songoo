import { NextResponse, NextRequest } from "next/server";
import { supabase } from "../../../supabase/createClient";
import { serialize } from "cookie";

export default async function handler(req , res ) {
  if (req.method !== "POST") return;

  if (!supabase) {
    return res.status(500).json({ message: "db connection is filed!" });
  } else {
    console.log("db connected!");
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error();
    const cookie = serialize("appToken", null, {
      maxAge: 0,
      httpOnly: true,
      path: "/",
      static: true,
    });
    res.setHeader("Set-Cookie", cookie);
    return res.status(200).json({
      message: "The sign out process was completed successfully",
    });
  } catch (e) {
    return res.status(400).json({
      message: "The sign out process encountered a problem",
    });
  }
}
