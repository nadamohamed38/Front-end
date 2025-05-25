import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
    const [mainUser,setMainUser] = useState(null);
    const [userName,setUserName] = useState(null)
    const [vetName,setvetName] = useState(null)
    useEffect(() => {
      if(localStorage.getItem("mainUser")){
        setMainUser(localStorage.getItem("mainUser"))
      }else if(localStorage.getItem("mainVet")){
        setMainUser(localStorage.getItem("mainVet"))
      }
      if(localStorage.getItem("userName")){
        setUserName(localStorage.getItem("userName"))
      }
    }, [])
    

    return <UserContext.Provider value={{mainUser , setMainUser , userName , setUserName,vetName,setvetName}}>
        {props.children}
    </UserContext.Provider>
}