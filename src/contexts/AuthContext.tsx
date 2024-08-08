"use client";
import { getCookie } from "cookies-next";
import { createContext, useContext, useEffect, useReducer } from "react"

interface User{
    name: string,
    email: string,
    picture: string
}

interface authUser{
    user: User,
    refreshToken: string,
    accessToken: string,
    dispatch: any
}

export const UserAuthContext =createContext<authUser | null>(null);

export const userAuthReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    picture: action.payload.picture
                },
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        case "LOGOUT":
            return {
                user: null,
                accessToken: "",
                refreshToken: ""
            }
        default:
            return state
    }
}

export const AuthProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(userAuthReducer, {user: null, accessToken: "", refreshToken: ""});
    useEffect(() => {
        
        const user = getCookie("userInfo");
        const accessToken = getCookie("token");
        const refreshToken = getCookie("refreshToken");
        if (user) {
            dispatch({type: "LOGIN", payload: JSON.parse(user), accessToken: accessToken, refreshToken: refreshToken})
        }
    },[])
 
    // console.log(state);
    
    return (
        <UserAuthContext.Provider value={{user: state.user, accessToken: state.accessToken, refreshToken: state.refreshToken, dispatch}}>
            {children}
        </UserAuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(UserAuthContext);
    if(!context){
        throw new Error("useAuthContext must be used inside an AuthContextProvider")
    }
    return context;
}
