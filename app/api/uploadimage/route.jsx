import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    
    if (session) {
    const formData = await req.formData();
    const file = formData.get("file");
    const uploadUrl =  formData.get("uploadUrl")
    console.log(file,uploadUrl)
    const uploadresponse = await fetch(uploadUrl,{
            method:'POST',
            headers:{
            'Authorization': `Bearer ${session.accessToken}`,
            'Content-Type': 'application/octet-stream',
            },
            body:file
        })
        console.log(uploadresponse)

        if (uploadresponse.status === 201){
            console.log("we are here")
            return NextResponse.json({
                message:"success"
            })
    }else{
        return NextResponse.json({
            message: "error"
        })
    }
    }else{
        return NextResponse.json({
            message:"error"
        })
    }
}