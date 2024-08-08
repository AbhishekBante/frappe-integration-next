// pages/login.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthorizationUri } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const router = useRouter();
  const {user} = useAuth();
 
  useEffect(() => {
    const handleLogin = async () => {
        const authorizationUri =  getAuthorizationUri();

       window.location.href =  authorizationUri;
    };
   
    if(user != null){
      router.push('/dashboard');
    }else{
      handleLogin();

    }
  }, []);

  return <div>Redirecting to login...</div>;
};

export default LoginPage;
