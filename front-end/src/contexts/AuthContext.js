import React, {Component, createContext, useReducer} from 'react';

import AuthReducer from '../AuthReducer'





export const AuthContext = createContext();


const AuthContextProvider = (props)=>{
    const userLocal= JSON.parse(localStorage.getItem('user'))
    const tokenLocal= localStorage.getItem('token')
    const authBrain = (userLocal&&tokenLocal)?true:false;
    
const [authLog, dispatch] = useReducer(AuthReducer, {
    user:userLocal,
     token:tokenLocal,
     isAuthenticated: authBrain
    })


return(
    <AuthContext.Provider value={{authLog, dispatch}}>
        {props.children}
    </AuthContext.Provider>
)

}


    




export default AuthContextProvider



