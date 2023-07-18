
import { useNavigate } from "react-router-dom"

interface Props {
    val: any;
    set: any
}

function F3({ val, set }: Props) {

    let nav = useNavigate()
    return (

        <textarea placeholder="Feature 3" className='text1' value={val} rows={10} cols={50} onClick={() => { nav("/F3") }} onChange={(e) => set(e.target.value)}></textarea>
    )
}

export default F3;