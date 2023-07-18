import { NavLink } from "react-router-dom"
import { useAuth } from "./auth"
import '../App.css'

export default function Navbar(){
     const {user}=useAuth()
   
    if (user===false) {
        return(
          <div>
          <header>
            <nav>       
            {/* <nav className="primary-nav"> */}
              <NavLink  to="/Home">Home</NavLink>
              <NavLink to="/Confidential">Confidentail</NavLink>
              <NavLink to="/login">login</NavLink>
            </nav>
          </header>
        </div>
          )
        
      }
      else{
        return(
          <div>
          <header>
            <nav>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/Confidential">Confidentail</NavLink>
              <NavLink to="/help">Help</NavLink>
              <NavLink to="/logout">logout</NavLink>
            </nav>
          </header>
        </div>
        )  
    }
      
    
  }
