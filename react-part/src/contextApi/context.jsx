import { createContext, useContext, useState } from "react";

const Context = createContext({
    user: null,
    token: null,
    notification: null,
    setNotification: ()=>{},
    setToken: () => { },
    setUser: () => { },
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('Access_Token'))
     const [notification ,_setNotification] = useState('');
     const setNotification = (message)=>{
        _setNotification(message);
        setTimeout(() => {
            _setNotification("")
        }, 5000);
     }
    const setToken = (token)=>{
       _setToken(token);
       if(token){
        localStorage.setItem('Access_Token',token)
       }else{
        localStorage.removeItem('Access_Token')
       }
    }
    return (
        <Context.Provider value={ {user, setUser, setToken, token, notification , setNotification}}>
              {children}
        </Context.Provider>
    )

}

export const usecontext = ()=> useContext(Context);