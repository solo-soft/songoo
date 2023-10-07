import { NextResponse, NextRequest } from "next/server";
import { supabase } from "../../../supabase/SupabaseCreateClient";
import { serialize } from "cookie";
import {NextApiResponse} from "next";

export default async function handler(req : NextRequest , res : NextApiResponse ) {
  if (req.method !== "POST") return;

  if (!supabase) {
    return res.status(500).json({ message: "db connection is filed!" });
  } else {
    console.log("db connected!");
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error();
    const cookie = serialize("appToken", "", {
      maxAge: 0,
      httpOnly: true,
      path: "/",
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
