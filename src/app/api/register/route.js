import { NextResponse } from "next/server"
import prisma from "@/utils/prisma-connect"
import { hash } from "bcryptjs"

// api than accept a post request to register a user
export async function POST(req){
  try{
    const {name, email, password, department, year} = await req.json()
    //Check if user already exists
    const user = await prisma.user.findUnique({
        where: {
          email: email
        },
    })
    if(user && user.activated) {
      return new NextResponse(JSON.stringify({message:"User already exists"}),{status: 208})
    }
    else if(user && !user.activated){
      return new NextResponse(JSON.stringify({message:"User already exists but not activated"}),{status: 207})
    }
    //Create user
    await prisma.user.create({
      data:{
        name: name,
        email:email,
        department: department,
        year: Number(year),
        password: await hash(password, 10)
      }
    })
    return new NextResponse(JSON.stringify({message:"User created successfully"}),{status: 201})
  }
  catch(error){
    return new NextResponse(JSON.stringify({error:error}),{status: 500})
  }
}