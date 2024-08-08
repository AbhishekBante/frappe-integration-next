"use client";
import {ZoniEduButton} from "@/components/ui/zoniEduButton";
import { useAuth } from "@/contexts/AuthContext";
import Image from 'next/image';


export default  function Home() {
  // const res = await pool.query("SELECT 1;");
  const {user} = useAuth();
  // console.log({ res: res.rows[0] });
  if(user != null){
    location.href = '/dashboard'
  }
  return (
    <>

    <main className="flex w-screen h-screen justify-center items-center flex-col">
    <Image src="/logo_big.png" alt="zoni logo" width={100} height={100} />
    <p className="text-3xl my-2 font-bold" >

      Zoni Edu System
    </p>
      <ZoniEduButton/>
   
    </main>
    </>
  );
}
