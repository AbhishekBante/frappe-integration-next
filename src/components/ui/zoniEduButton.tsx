"use client";
import React from 'react'
import Link from 'next/link';
import { Button } from './button';


export const ZoniEduButton = () => {

  return (
   <Link href="/login" >
    <Button className='bg-red-500' >Click here to login</Button>
   </Link>
  )
}
