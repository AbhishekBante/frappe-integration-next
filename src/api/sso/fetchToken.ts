import {
  
    IFetchToken,
    IFetchTokenParams,
} from "@/app/api/auth/getToken/route";
import { fetchAndParse } from "../fetchAndParse";


export const fetchToken = async (
    params: IFetchTokenParams
) => {
    // console.log("Params: ", params);
    
    return fetchAndParse<IFetchTokenParams,IFetchToken>({
        endpoint:`/api/auth/getToken`,
        params
    }
    );
};
