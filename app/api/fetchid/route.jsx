import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (session) {
    const useridresponse = await fetch('https://api.linkedin.com/v2/userinfo', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
    
            },
          });
      
    const userid = await useridresponse.json();
    return NextResponse.json({
        id: userid.sub,
    })
  }else{
    return NextResponse.error(new Error("Invalid session"));
  }
}