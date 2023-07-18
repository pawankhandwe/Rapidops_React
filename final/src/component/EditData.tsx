import {  useParams } from "react-router-dom";
import {  Tree } from "./AddData";

export function EditData() {

    const params=useParams()
    const EditName:any=params.editid;

  return (
    <div className="tree" data-testid="edit">
     
      <br />
       <Tree node={EditName} /> 
      <br />
    </div>
  );
}