import { getToken, getUserInfo } from "@/lib/auth";

export const fetchToken = async (
    params: {
      code: string;
    }
  ) => {
    const { code } = params;
    const token = await getToken(code);
        //   console.log("Token: ", token);
        const userInfo = await getUserInfo(token.access_token);
    // const {token, userInfo} = await tokenRepo.fetchToken({ code });
 
    return {
        token,
        userInfo
      };
  };