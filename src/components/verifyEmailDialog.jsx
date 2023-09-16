'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState,useEffect } from "react"
import { sendVerificationEmail } from "@/utils/sendVerificationEmail"

export function DialogBox({email,open,onOpenChange}) {
  const [countDown,setCountDown] = useState(30)
  useEffect(() => {
    if(countDown > 0 && open == true){
      setTimeout(() => setCountDown(countDown - 1),1000)
    }
  },[countDown,open])
  async function resendEmail(){
    await sendVerificationEmail(email)
    setCountDown(30)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verify Email</DialogTitle>
          <DialogDescription>
            A verification email has been sent to your email address <span className="underline">{email}</span>. Please click the link in the email to verify your account. 
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {countDown>0 &&
          <p className="text-sm">Wait Second {countDown} secods before resend</p>}
          <Button type="submit" onClick={resendEmail} disabled={countDown > 0}>Resend Email</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
