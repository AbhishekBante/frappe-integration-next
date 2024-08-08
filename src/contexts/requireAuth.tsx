"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accessToken, user } = useAuth();
  // console.log("Require Auth: ", user);
  
  const router = useRouter();

  useEffect(() => {
    if ( !user) {
      router.push('/');
    }
  }, [accessToken, user, router]);

  if (!accessToken || !user) {
    // Optionally show loading spinner or message while checking auth status
    return null;
  }

  return <>{children}</>;
};


