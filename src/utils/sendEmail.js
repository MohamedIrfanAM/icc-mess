'use server'
import React from "react"
import { Resend } from "resend"
import { getErrorMessage } from "@/lib/utils"
import verifyEmailForm from "@/components/verifyEmail"

const resend = new Resend(process.env.RESENT_API_KEY)

export const sendEmail = async (email,activationUrl) => {
  let data
  try{
      data = resend.emails.send({
      from:"ICC MESS Email Verify<onboarding@resend.dev>",
      to:email,
      subject:"ICC MESS Email Verification",
      react: React.createElement(verifyEmailForm, {
        userEmail:email,
        activationUrl:activationUrl,
      }),
    })
  }
  catch(error){
    return {
      error:getErrorMessage(error)
    }
  }
  return{
    data
  }
}