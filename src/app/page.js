import prisma from "@/utils/prisma-connect.js";

// Create Userpi
// const user = await prisma.user.create({
//   data:{
//     name: "irfan",
//     email:"i4ifan@gmail.com",
//     year: 2,
//     password: "12345678",
//   }
// })
// console.log(user)

//Create Month
// const month = await prisma.month.create({
//   data:{
//     startDate: new Date(1995, 11, 17),
//     endDate: new Date(1995, 11, 1),
//     messCutCharge:100,
//     messFee:3000
//   }
// })

//Update user to include month
// const user = await prisma.user.update({
//   where:{
//     email:'i4irfan777@gmail.com'
//   },
//   data:{
//     months:{
//       connect:{
//         id:'0d8c61ab-ac42-42b1-807b-458105e8c71b'
//      , }
//     },
//   }
// })

//Get user in a month;
// const users = await prisma.month.findMany({
// where:{
// id:'0d8c61ab-ac42-42b1-807b-458105e8c71b'
// },
// select:{
// startDate:true,
// users:{
// select:{
// name:true,
// email:true,
// }
// }
// }
// })

// console.log(users[0].users)


export default function Home() {
  return(
    <h1 className="bg-red text-blue-400">ICC MESS APP</h1>
  )
}
