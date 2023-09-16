import prisma from "@/utils/prisma-connect";
import { NextResponse } from "next/server";

export async function POST(req){
  const {email, token} = await req.json()
  console.log(email, token)
  try{
    await prisma.user.update({
      where: {
        email: email,
        activationKey: token,
        activationSentAt: {
          gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      },
      data: {
        activationKey: null,
        activated: true,
      }
    })
    return new NextResponse(JSON.stringify({message:"User verified successfully"}),{status: 201})
  }catch(error){
    console.log(error)
    return new NextResponse(JSON.stringify({message:"Server Error"}),{status: 500})
  }
}