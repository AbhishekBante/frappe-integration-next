

import { NextRequest, NextResponse, userAgent } from "next/server";

import { createErrorObject } from "@/constants/errorResponseObject";
import { responseObject } from "@/constants/responseObject";

import { fetchToken } from "../../../../services/sso/getToken";




export type IFetchTokenParams = Parameters<
  typeof fetchToken
>[0];

export type IFetchToken = Awaited<
  ReturnType<typeof fetchToken>
>;

const handler = async (req: NextRequest) => {
    try{
            const { code } = await req.json();
            const {token, userInfo} = await fetchToken({code});
            //console.log("Token: ", token);
            return NextResponse.json(responseObject({ token, userInfo }));
        } catch (error: any) {
            console.log(error);
            return NextResponse.json(createErrorObject({ error: error.message }));
        }
};

export  {handler as GET, handler as POST};

