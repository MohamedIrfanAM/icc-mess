'use server'
import prisma from "./prisma-connect";
import { sendEmail } from "./sendEmail";

export const sendVerificationEmail = async (email) => {
  const activationKey = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "");
  try{
    await prisma.user.update({
      where:{
        email:email
      },
      data:{
        activationKey:activationKey,
        activationSentAt: new Date()
      }
    })
    await sendEmail(email,`http://${process.env.NEXT_PUBLIC_HOSTNAME}/api/verifyEmail/${activationKey}`)
  }
  catch(error){
    console.log(error)
    return {
      error:error
    }
  }
}