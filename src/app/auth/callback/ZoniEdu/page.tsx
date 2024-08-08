
"use client";
import { useAuth } from '@/contexts/AuthContext';

import { setCookie } from 'cookies-next';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchToken } from '@/api/sso/fetchToken';




const CallbackPage =  ({searchParams}:{params:any; searchParams:any}) => {
      const { user, dispatch } = useAuth();
      
      const fetchTokenMutation = useMutation({
        mutationFn: fetchToken,
        onSuccess: (data) => {
          console.log("Data: ", data);
          setCookie("token", data?.token.access_token);
          setCookie("refreshToken", data?.token.refresh_token);
          setCookie("userInfo", JSON.stringify(data?.userInfo));
          dispatch({type: "LOGIN", payload: data.userInfo, accessToken: data.token.access_token, refreshToken: data.token.refresh_token});
          console.log("Data: ", data.userInfo);
        },
        onError: (error) => {
          console.log("Error: ", error);
        },
      })
      const initialized = useRef(false);
      
      useEffect(() => {
        if (!initialized.current) {
          initialized.current = true;
          console.log("Code: ", searchParams.code);
          
          fetchTokenMutation.mutate({code: searchParams.code})
        }
      },[])
      if(user !== null){
        location.href = '/dashboard'
      }

      return <main className="flex w-screen h-screen justify-center items-center flex-col" >
        <div className="flex w-full h-full justify-center items-center bg-slate-700 flex-col shadow-xl" >
          <Image src="/logo_big.png" alt="zoni logo" width={100} height={100} />
          <h1>Zoni Edu System</h1>
          <p>Logging In...</p>
        </div>
      </main>;
};

export default CallbackPage;
