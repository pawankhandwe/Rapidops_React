import { User } from "../App"
import { useContext } from "react"
export default function CompoC(){

    const {count,dispatch}=useContext(User);

    return(
    <div>
    {count}
    <button onClick={()=>dispatch('increment')}>increment</button>
    <button onClick={()=>dispatch('decrement')}>Decrement</button>
    <button onClick={()=>dispatch('reset')}>Reset</button>
    </div>
    )
}
