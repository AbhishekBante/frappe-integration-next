// pages/dashboard.tsx
"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {RequireAuth} from "@/contexts/requireAuth";
import { initializeFrappeSDK } from "@/lib/initializeFrappe";
import { deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";

interface IDocType {
  data: [IDoc]
}
interface IDoc {
  name: string

}

const DashboardPage = () => {
  const [docTypes, setDocType] = useState<IDocType>();
  const { user,dispatch } = useAuth();
    // Implement logic to fetch and display user data
    const handleClick = () =>{
      deleteCookie("token");
      deleteCookie("refreshToken");
      deleteCookie("userInfo");
      dispatch({type: "LOGOUT"})
      location.href = '/'
    }
    useEffect(() => {
      const frappe =  initializeFrappeSDK();
      const frappeAuth = frappe.auth();
      // frappeAuth
      //   .getLoggedInUser()
      //   .then((user) => console.log(`User ${user} is logged in.`))
      //   .catch((error) => console.error("Error fetching user:",error));
  
      // const frappeDb = frappe.db();
      //  frappeDb.getDoc("DocType")
      //  .then((userDoc) => {
      //   console.log("userDoc: ",userDoc);
      //  })
      //  .catch((error) => {
      //   console.log("Error: ",error);
      //  })
      (async function (){
        const response = await fetch("/api/frappe/getDoc");
        const data = await response.json();
        setDocType(data);
        console.log("Data: ",data);
      })();
      
    },[]);
    
    
    return  <RequireAuth>
      <div className="flex w-screen h-screen justify-center items-center flex-col" >
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {user && (
          <div className="flex flex-col justify-center items-center" >
            <p className="text-3xl font-bold mb-10">
              Welcome, {user.name} ({user.email})

            </p>
              <Button variant={"default"} onClick={handleClick} >LogOut</Button>
            <p className="text-3xl font-bold" >Doctypes Fetched</p>
            <ul className=" flex flex-wrap gap-4 mt-3 text-center text-sm text-muted-foreground dark:text-muted list-disc w-1/2">
              {docTypes?.data?.map((docType,i) => (
                <li className="mx-4" key={i}>{docType.name}</li>
              ))}
            </ul>
          </div>
          
        )}
      </div>
    </RequireAuth>;
  };
  
  export default DashboardPage;
  