import { getCookie } from 'cookies-next';
import {FrappeApp as Frappe} from 'frappe-js-sdk';
import { getToken } from './getToken';

export function initializeFrappeSDK() {
    // console.log("Token: ", getToken());
    
    const frappe =  new Frappe('http://zoni.local:8000',{
        useToken: true,
        token: getToken,
        type: 'Bearer',
    });
    // console.log("frappe: ", frappe);
    
    return  frappe;
}

