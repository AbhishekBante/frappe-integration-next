// utils/oauth.ts

import querystring from 'querystring';
import axios from 'axios';


export type IUser = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  pictures: string | null;
  roles:  Array<string>;
}

interface IToken{
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface IUserInfo{
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  pictures: string | null;
  roles:  Array<string>;

}

export function getAuthorizationUri(): string {
   
    //console.log({client_id, authorization_endpoint, redirect_uri});
    
    const queryParams = querystring.stringify({
        client_id: process.env.NEXT_PUBLIC_ZONIEDU_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_ZONIEDU_REDIRECT_URI,
        response_type: 'code',
        scope: 'all openid ', // Adjust scope based on your requirements
      });
    
      return `${process.env.NEXT_PUBLIC_ZONIEDU_AUTHORIZATION_URL}?${queryParams}`;
}

export async function getToken(code: string): Promise<IToken> {
  
  const formData = new URLSearchParams();
  formData.append('client_id', `${process.env.ZONIEDU_CLIENT_ID}`);
  formData.append('client_secret',`${process.env.ZONIEDU_CLIENT_SECRET}`);
  formData.append('code', code);
  formData.append('grant_type', 'authorization_code');
  formData.append('redirect_uri', `${process.env.ZONIEDU_REDIRECT_URI}`);

  //console.log("Redirect: ",process.env.ZONIEDU_REDIRECT_URI);
  
   //console.log("Post Body: ", formData.toString());
   
  try {
    //console.log("TokenURL: ",process.env.ZONIEDU_TOKEN_URL);
    
    const response = await fetch(`${process.env.ZONIEDU_TOKEN_URL}`, {
      method: 'POST',
      body: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',

      },
    })
    const data = await response.json();
    //console.log("Response: ",data);
    return data;
  }
  catch (error) { 
    console.log(error);
    
    throw new Error('Failed to fetch token');
  }
}


export async function getUserInfo(token: string): Promise<IUserInfo> {
  // Fetch user information using the access token
  // Return the user data
  //console.log("UserInfo: ",process.env.ZONIEDU_USERINFO_URL);
  
  try {
    const response = await axios.get(`${process.env.ZONIEDU_USERINFO_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.data;
    //console.log("Response: ",data);
    return data;
  } catch (error) {
    //console.log("Error: ",error);
    throw new Error('Failed to fetch user info');
  }
}
