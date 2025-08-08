'use client'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
 const router=useRouter()
useEffect(()=>
{
 router.push(`/user/profile`)
},[])
  return (
    <div className='h-full w-full flex justify-center items-center'>
     <Loader/>
    </div>
  )
}

export default page