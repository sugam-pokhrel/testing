import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'
import prisma from '../libs/prismadb'
import  Profile from "./ProfileForm";


export default async function Dashboard(){
const session = await getServerSession(authOptions);

if(!session){
    redirect('api/auth/signin');
}


const currentUserEmail=session?.user?.email!;
let  user=await prisma.user.findUnique({where:{email:currentUserEmail}});


// console.log(user);






return(
    <div>
    
        <Profile user={user} value={user?true:false} />

        {/* <ProfileForm user={user}/> */}
        </div>
)
}