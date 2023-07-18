import { useState } from "react";


function Todo(){

    const [input,setinput]=useState({fname:"",lname:""});
    const [data,setdate]=useState<any>([]);
    const [update,isupdate]=useState(false);
    const [id,setid]=useState(null);

    function HandleInput(event:any)
    {
        const {name,value}=event.target;
        setinput({...input,[name]:value});
    }

    function AddInput()
    {
        
        if((input.fname === '') || (input.lname === '')){
            alert("Please insert Data");
        }
        else if(update)
        {
            setdate(data.map((elem: { id: any; fname:any;lname:any})=>{
                if(elem.id === id)
                {
                    
                    console.log(id);
                    return{...elem,fname:input.fname,lname:input.lname};
                } 
                return elem;
            }))

            setinput({fname:"",lname:""});
            isupdate(false);

        }
        else
        {
            const N_id={id:Date.now(),fname:input.fname,lname:input.lname};
            setdate([...data,N_id]);
            setinput({fname:"",lname:""});
        }
    }

    function HandleDelete(Did:any){

        setdate(
            data.filter((x: { id: any; })=>x.id!==Did)
        );
    }

    function HandleUpdate(Uid:any)
    {
            data.map((elem: { id: any; fname:any;lname:any})=>{
                    if(elem.id === Uid)
                    {
                        setinput({fname:elem.fname,lname:elem.lname});
                    } 
                    return elem;
                })
                isupdate(true);
                setid(Uid);

    }

    return(
        <>
        <div>
            <input value={input.fname} name='fname' onChange={HandleInput} ></input>
            <input value={input.lname} name='lname' onChange={HandleInput} ></input>
            {
                update?<button className="add" onClick={AddInput}> Update</button>:<button className="update" onClick={AddInput}> Add</button>
            }
        </div>
        <br></br>
        <br></br>
        <div>
            {data.map((x:any)=>{
                return (<>
                        <p key={x.id}>
                            
                            <input type='text' value={x.fname} readOnly></input>
                            <input type='text' value={x.lname} readOnly></input>
                            <button onClick={()=>{HandleUpdate(x.id)}}>Update</button>
                            <button onClick={()=>{HandleDelete(x.id)}}>Delete</button>
                        </p>
                </>)
            })}
        </div>
        </>
    )
}

export default Todo;