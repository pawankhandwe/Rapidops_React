
import {useNavigate} from "react-router-dom"

interface Props {
    val: any;
    set:any
    }
    
function F2({val,set}:Props)
{

    let nav=useNavigate()
    return(
        
        <textarea  placeholder="Feature 2" className='text1' value={val} rows={10} cols={50} onClick={()=>{nav("/F2")}} onChange={(e)=>set(e.target.value)}></textarea>
    )
}

export default F2;