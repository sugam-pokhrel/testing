import { PrismaClient } from '@prisma/client';
import {  getServerSession} from "next-auth";
import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server';

export async function PUT(request:Request,res:any) {

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
            enabled:data.enabled



           },
      });

      return NextResponse.json({user:update},{status:200});


    }catch(e){
      return NextResponse.json({ error: 'Something went wrong' }, { status: 401 })
        

    }




}
}

export async function POST(request:Request,res:any) {
    var session:any= await getServerSession();
    let response = NextResponse.next()

     
      
      if(!session){
        return NextResponse.json({ error: 'unAuth' }, { status: 401 })
      }
      if (session !== null) {
    const email = session.user.email;
    const data=await request.json();
   if(! data.name&&data.phoneNumber&&data.ElecricityID&&data.ElecricityScNo&&data.OfficeName ===''){
      
      
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



           },


         
            
            
            


        

    });
          return  NextResponse.json({user:user},{status:200})


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