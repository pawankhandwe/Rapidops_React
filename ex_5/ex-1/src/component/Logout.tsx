

import { useNavigate } from "react-router-dom"
import { useAuth } from "./auth"

export default function Logout(){

    
    const {setUser}=useAuth()
    const navigate=useNavigate();
    
    
    function handleclick()
    {
            setUser(false);   
            navigate("/");
            localStorage.setItem("user","false");
            
    }
    
    return(
        
    <>
    <button onClick={handleclick}>log out </button>
    </>)
}