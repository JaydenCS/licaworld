import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";


export async function POST(req){
    const session = await getServerSession(authOptions)

    if(session) {
        const { id, uploadid,text } = await req.json()
        const postresponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
          "X-Restli-Protocol-Version": "2.0.0"
          },
          body: JSON.stringify({
              author: "urn:li:person:" + id,
              lifecycleState: "PUBLISHED",
              specificContent: {
                  "com.linkedin.ugc.ShareContent": {
                      "shareCommentary": {
                          "text": text
                      },
                      "shareMediaCategory": "IMAGE",
                      "media": [
                          {
                              "status": "READY",
                              "media": uploadid
                          }
                      ]
                  }
              },
              visibility: {
                  "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
              }
          })
      });
        const post = await postresponse.json();
        if(postresponse.status == 201){
            return NextResponse.json({
                message: "Posted successfully",
            })
        }else{
            return NextResponse.error(new Error("Error"));
        }
    }else{
        return NextResponse.error(new Error("Error"));
    }
}