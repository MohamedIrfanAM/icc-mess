"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { sendVerificationEmail } from "@/utils/sendVerificationEmail"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Select,SelectTrigger,SelectValue,SelectContent,SelectItem } from "@/components/ui/select"
import { DialogBox } from "@/components/verifyEmailDialog"
import { Toaster } from "@/components/ui/toaster"
 
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  department: z.string({
    required_error: "Please select a department.",
  }),
  year: z.string({
    required_error: "Please select year",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});

export default function InputForm() {

  const [openVerifyEmailDialog,setOpenVerifyEmailDialog] = useState(false)
  const [email,setEmail] = useState('')

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues:{
      name:'',
      email:'',
      department:'',
      year:'',
      password:'',
      confirmPassword:''
    }
  })
 
  async function onSubmit(data) {
    await axios.post('api/register',JSON.stringify(data)).then(async (res) => {
      if(res.status == 201){
        toast({title: "Account Created", description: "Your account has been created successfully"})
        await sendVerificationEmail(data.email)
        setOpenVerifyEmailDialog(true)
        setEmail(data.email)
      }
      else if(res.status == 207){
        toast({title: "Account Found, Not activated", description: "Account found, but not activated.You have to activate your account"})
        await sendVerificationEmail(data.email)
        setOpenVerifyEmailDialog(true)
        setEmail(data.email)
      }
      else if(res.status == 208){
        form.setError('email', { type: 'custom', message: 'Email already registered'}, { shouldFocus: true });
      }
    }).catch((err) => {
      toast({title: "Error", description: "Something went wrong"})
    })
  } 

  return (
    <>
      <DialogBox email={email} open={openVerifyEmailDialog} onOpenChange={setOpenVerifyEmailDialog}/>
      <div className="flex flex-col items-center h-full justify-center gap-6 p-3">
        <h1 className="text-5xl">ICC MESS</h1>
        <div className="w-[min(100%,450px)] flex flex-col items-center border border-3 border-black p-2 space-y-2 rounded-lg">
          <h1 className="text-black text-2xl">SignUp</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1st</SelectItem>
                        <SelectItem value="2">2nd</SelectItem>
                        <SelectItem value="3">3rd</SelectItem>
                        <SelectItem value="4">4th</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CSE">CSE</SelectItem>
                        <SelectItem value="ESE">ECE</SelectItem>
                        <SelectItem value="EEE">EEE</SelectItem>
                        <SelectItem value="AEI">AEI</SelectItem>
                        <SelectItem value="ME">ME</SelectItem>
                        <SelectItem value="CE">CE</SelectItem>
                        <SelectItem value="IE">IE</SelectItem>
                        <SelectItem value="Arch">Architecture</SelectItem>
                        <SelectItem value="MBA">MBA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <Link href={'/login'} className="text-sm pb-1">Already have an account?<span className="underline">log in</span></Link>
        </div>
      </div>
      <Toaster/>
    </>
  )
}