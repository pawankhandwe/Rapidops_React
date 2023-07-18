import { useAuth } from "./auth"
export default function Confidential(){

    const {user}=useAuth()

    if(user===false){
    return(
    <>
    Confidential data you need to log in
    </>)
    }
    else{
        return(
            <>
            Confidential data is here but its not important
            </>)
    }
}