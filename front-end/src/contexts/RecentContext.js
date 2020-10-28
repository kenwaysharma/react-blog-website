import React, {Component, createContext, useReducer} from 'react';

import RecentReducer from '../RecentReducer'





export const RecentContext = createContext();


const RecentContextProvider = (props)=>{
    
    
const [postsRecent, dispatcher] = useReducer(RecentReducer, {
postR: [{}]
})
console.log('THIS IS THE NEW REDUCER>>>>>>>>>>>>>>>>>', postsRecent)

return(
    
    <RecentContext.Provider value={{postsRecent, dispatcher}}>
        {props.children}
    </RecentContext.Provider>
)

}

export default RecentContextProvider
