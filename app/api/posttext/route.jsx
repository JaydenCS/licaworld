import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    const { id, text } = await req.json();
    if (session) {
        const postresponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json',
              'X-Restli-Protocol-Version': '2.0.0'
            },
            body: JSON.stringify({
              author: "urn:li:person:" + id,
              lifecycleState: "PUBLISHED",
              specificContent: {
                  "com.linkedin.ugc.ShareContent": {
                      "shareCommentary": {
                          "text": text
                      },
                      "shareMediaCategory": "NONE"
                  }
              },
              visibility: {
                  "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
              }
            }),
          });

        const post = await postresponse.json();
        return NextResponse.json({
            message: "Posted successfully",
        },
        {
            status: 201
        })
    }else{
        return NextResponse.error(new Error("Invalid session"));
    }
    }