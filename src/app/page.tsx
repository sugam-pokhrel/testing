
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Home() {
 
  


  
  return (
    <>


       
    <div className={`flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-end mt-4">
          
   
       </div>
       <Link href={'/dashboard'}>
        <h1 className="text-4xl text-center mb-4">Update Your Info</h1>

        </Link>
        
        </div>
        </div>

    
    </>
  )
}
