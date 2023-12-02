import axios from "axios"
import {createContext, useEffect, useState} from "react"


export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))


    //LOGIN
    const login = async (inputs)  =>{
        const res =await axios.post("http://localhost:8800/api/auth/login", inputs, {withCredentials: true})    
        setCurrentUser(res.data)
     };



     //LOGOUT
     const logout = async (inputs)=>{
        await axios.post("http://localhost:8800/api/auth/logout", null, {
            withCredentials:true
        });
        setCurrentUser(null);
     };

     

     useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
     }, [currentUser])

     return(
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
     )
}