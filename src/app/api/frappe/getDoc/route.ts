import { getToken } from "@/lib/getToken";
import { initializeFrappeSDK } from "@/lib/initializeFrappe";
import axios from "axios";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

 async function handler(req: NextRequest) {
    try {
    //     const frappe = initializeFrappeSDK();
    //   const frappeDb = frappe.db();
    //   const userDoc = await frappeDb.getDoc('DocType');

    
    const token = req.cookies.get("token")?.value;
    console.log("Token: ", token);
    
    const response = await axios.get("http://zoni.local:8000/api/resource/DocType",{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const userDoc = response.data;
     return  NextResponse.json(userDoc);
    } catch (error: any) {
      return NextResponse.json({ error: 'Failed to fetch document', details: error });
    }
  }
  export {handler as GET, handler as POST}