import { PrismaClient } from '@prisma/client';
import {  getServerSession} from "next-auth";

import { NextResponse } from 'next/server';
const prisma = new PrismaClient()

export async function GET(request:Request,res:any) {
    var session:any= await getServerSession();
    let response = NextResponse.next()

     
      
      if(!session){
        return NextResponse.json({ error: 'unAuth' }, { status: 401 })
      }
      if (session !== null) {
    const email = session.user.email;
    
    const user= await prisma.user.findFirst({
        where:{
            email:email
        }
    });
    return NextResponse.json({user:user})

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