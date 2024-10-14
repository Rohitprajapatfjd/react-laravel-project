import { createContext, useContext, useState } from "react";

const Context = createContext({
    user: null,
    token: null,
    setToken: () => { },
    setUser: () => { },
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('Access_Token'))

    const setToken = (token)=>{
       _setToken(token);
       if(token){
        localStorage.setItem('Access_Token',token)
       }else{
        localStorage.removeItem('Access_Token')
       }
    }
    return (
        <Context.Provider value={ {user, setUser, setToken, token}}>
              {children}
        </Context.Provider>
    )

}

export const usecontext = ()=> useContext(Context);