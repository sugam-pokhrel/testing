import { PrismaClient } from '@prisma/client';
import {  getServerSession} from "next-auth";
import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server';

export async function PUT(request:Request,res:any) {
  console.log('put request')

    var session:any= await getServerSession();
    let response = NextResponse.next()
    if(!session){
        return NextResponse.json({ error: 'unAuth' }, { status: 401 })

      }
    if (session !== null) {
    const email = session.user.email;
    const data=await request.json();
   

    try{
      let update=await prisma.user.update({
        where:{
          email:email
        },
         data:{
            email,
            name:data.name,
            phone:data.phone,
            ElecricityId:data.ElecricityId,
            ElectricityScNo:data.ElectricityScNo,
            ElectricityOfficeName:data.ElectricityOfficeName,
            enabled:data.enabled,
            transactionId:data.transactionID,



           },
      });

      return NextResponse.json({message:"updated succesfully"},{status:200});


    }catch(e){
      return NextResponse.json({ error: 'Something went wrong' }, { status: 401 })
        

    }




}
}

export async function POST(request:Request,res:any) {
    var session:any= await getServerSession();
    let response = NextResponse.next()

     

      if (session !== null) {
    const email = session.user.email;
    const data=await request.json();


if (data.name && data.phoneNumber && data.ElecricityID && data.ElecricityScNo && data.OfficeName && data.transactionID !== '') {
    // All variables are not empty, and transactionID is not empty.
    // You can proceed with your code here.
    
} else {
   console.log('something went wrong')
  return  NextResponse.json({message:'err'},{status:404})
   



    
   
  

}

   if(! data.name&&data.phoneNumber&&data.ElecricityID&&data.ElecricityScNo&&data.OfficeName&&data.transactionID ===''){
      
      
      NextResponse.json({ error: 'Something went wrong' }, { status: 401 })
      return ;
    }
//     if (Object.keys(data.address).every(function(x) { return data.address[x]===''||data.address[x]===null;}) === false) {
//    console.log('has something');
// } else {
//    console.log('nothing');
// }

    
    try{
            const user= await prisma.user.create({
        
           data:{
            email,
            name:data.name,
            phone:data.phone,
            ElecricityId:data.ElecricityId,
            ElectricityScNo:data.ElectricityScNo,
            ElectricityOfficeName:data.ElectricityOfficeName,
            transactionId:data.transactionID,



           },


         
            
            
            


        

    });
          return  NextResponse.json({message:"Succesfully created the users"},{status:200})


    }catch(e){

          return NextResponse.json({ error: 'Something went wrong' }, { status: 401 })
        
    }


  }
  



    


   
    // try{

    //     // const body=await request.json();
    //     // const {username,password,email}=body;

    //    const user= await prisma.user.findUnique({
           
    //    });

    //     return Response.json({message:"success"})

    // }catch(e){
    //     return NextResponse.error();
    // }

}