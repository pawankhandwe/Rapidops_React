

import { useNavigate } from "react-router-dom"
import { useAuth } from "./auth"

export default function Login(){

    
    const {user,setUser}=useAuth()
    const navigate=useNavigate();
    
    function handleclick()
    {
            setUser(true);   
            navigate("/");
            localStorage.setItem("user","true");
    }

if(localStorage.getItem("user")==="true" || null)
{
    console.log("hiiii");
    setUser(true);
    return(
        <h1>you are already logged in </h1>
    )
}
else{
    localStorage.setItem("user",user);    
    return(
    <>
    <button onClick={handleclick}>log in </button></>)
    }
}