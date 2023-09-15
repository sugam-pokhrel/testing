'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { signIn, signOut, useSession } from "next-auth/react";
import SigninButton from './components/SigninButton';

const navbar = () => {
  const router=useRouter()


  const { data: session } = useSession();
  
if(session&&session.user){
  console.log(session)
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Automated Billing</a>
  </div>
  <div className="flex-none">

   
         
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAolBMVEX+/v7ttsbRNWHIBDzHADntt8XaSzPrhDDpgDDIBjjmdDD/zCr8wizDAzvhdTL6zC1zUn4Lt9UNvNQOwNNyYoBuV4MAwt5oXIiqHFGFP283gHkBroAgkWc7d1BmUklSYk0AqFo0fVKJNENfWkt5Q0fTPGfqp7rnmrDfd5TPLVrdbYzKEUXXT3X55+zcaInyy9b23OT78fTaXYDwxdHVSHDkjqaHSvKyAAAA5ElEQVR4AZ3TVXLFMBBE0bamw8zooJlx/1uLH+NYVbnfxxYDjhEqiXEARziSHMBwNAPhqsOjSccnXCXgWqdnk87XAbGyFxeXV0MquL65ub0buj/hfvDwOOuJ/wXPL5Ne395d1/1YB5t9fk361sHP7yRvH/CDoTCKud46YAJMCkUDTNM0y4FEBZMKoBwFPpDbQGUbIhgDpgLKIBMFpBVmOaKAGigbP8rXloqdRQoZ1wcKkApoSIatApgAeUp2kQakGlvmBckOQC/7QVOnJCMAdbwGVjotOMkkUZOuxrQ+PevjtT7/P/3mHrwgQkEsAAAAAElFTkSuQmCC" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          
            <Link href={'/auth'} >Profile </Link>
          
          
        </li>
        <li> <Link href={'/auth'} >Settings </Link></li>
        <li onClick={(e)=>{
          signOut()
          
        }}> <Link href={'/'} >Logout</Link></li>
      </ul>
    </div>
      
    
  </div>
 

</div>
  )
}
return(
  <>

     <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Automated Billing</a>
  </div>

  <SigninButton />
  </div>
  
  
  
  
  </>
)
}


export default navbar