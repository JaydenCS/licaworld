import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    const { id } = await req.json();

    if (session) {
        const assetresponse = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
          },
          body: JSON.stringify({
              registerUploadRequest: {
                  owner: "urn:li:person:" + id,
                  recipes: [
                      "urn:li:digitalmediaRecipe:feedshare-image"
                  ],
                  serviceRelationships: [
                      {
                          relationshipType: "OWNER",
                          identifier: "urn:li:userGeneratedContent"
                      }
                  ]
              }
              }),
          });

        const asset = await assetresponse.json();

        if (asset.value) {
            return NextResponse.json({
                uploadUrl: asset.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl,
                uploadId: asset.value.asset
            })
        }else{
            return NextResponse.json({
                message: "Failed to register image",
                content: asset
            })

        }
    }else{
        return NextResponse.json({
            message: "Invalid session"
        })
    }


    }