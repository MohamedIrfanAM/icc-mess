import NextAuth from "next-auth"
import prisma from "@/utils/prisma-connect"
import { compare } from "bcryptjs"
import CredentialsProvider  from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (user) {
          const isValid = await compare(credentials.password, user.password)
          if(user.activated === false){
            throw Error("Not Activated")
          }
          if(isValid){
            return user;
          }
          else{
            throw Error("Invalid Password")
          }
        } else {
          throw Error("Invalid Email")
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session:{
    strategy: "jwt",
  }
})

export { handler as GET, handler as POST }