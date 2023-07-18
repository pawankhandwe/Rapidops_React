import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddData({ node,addGroup, RemoveNode, value, tval }: any) {

  const [inputs, setInputs] = useState([{ option1: "", option2: "", value: "", id: Date.now() }]);

  useEffect(() => {
    if (value) {
      setInputs(value);
    }
  }, [value]);
  
  const [toggleValue, setToggleValue] = useState<String>();

  useEffect(() => {
    if (tval) {
      setToggleValue(tval);
    } else {
      setToggleValue("AND")
    }
  }, [node]);

  function handleAddCondition() {
    const newInput = { option1: "", option2: "", value: "", id: Date.now() };
    setInputs([...inputs, newInput]);
    node.value = [...inputs, newInput];
  }

  function handleAddGroup() {
    addGroup(node);
  }

  function handleToggleChange() {
    setToggleValue((prevState) => (prevState === "AND" ? "OR" : "AND"));
  }

  node.btn = toggleValue;

  function handleInputChange(index: number, event: any) {
    const { name, value } = event.target;
    const newInputs: any = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
    node.value = inputs;
  }

  function handleRemove(id: any) {
    const newitem = inputs.filter((elem) => {
      return id !== elem.id;
    });
    setInputs(newitem);
    node.value = newitem;
  }

  function handleRemoveNode(id: any) {
    RemoveNode(id);
  }

  return (
    <div className="Node" data-testid="node">
      <button data-testid="addcon" onClick={handleAddCondition}>Add Condition</button>
      <button data-testid="addgrp" onClick={handleAddGroup}>Add Group</button>
      <button onClick={handleToggleChange} data-testid="toggleval">{toggleValue}</button>
      {node.id > 1 && (
        <button data-testid="removebtn" onClick={() => handleRemoveNode(node.id)}>Remove</button>)}


      {inputs.map((input, index) => {
        return (
          <div key={index}>
            <input
              type="text"
              name="option1"
              placeholder={`Option 1`}
              data-testid="option1"
              value={input.option1}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="text"
              name="option2"
              data-testid="option2"
              placeholder={`Option 2`}
              value={input.option2}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="text"
              name="value"
              data-testid="value"
              placeholder={`Value`}
              value={input.value}
              onChange={(event) => handleInputChange(index, event)}
            />
            <button data-testid="remove" onClick={() => handleRemove(input.id)}>X</button>
          </div>
        )
      })}

      <br></br>
      {node.children?.map((child: any) => (
        <AddData
          key={child.id}
          node={child}
          addGroup={addGroup}
          RemoveNode={handleRemoveNode}
          value={child.value}
          tval={child.btn}
        />  
      ))}
    </div>
  );
}


export function findParent(node: any, id: number) {
  if (node.id === id) {
    return node;
  }
  for (const child of node.children) {
    if (child.id === id) {
      return node;
    }
    const parent: any = findParent(child, id);
    if (parent) {
      return parent;
    }
  }
}


// ====================================

export function Tree({ node }: any) {


  const [root, setRoot] = useState({ id: 1, children: [], value: "", btn: "" });

  useEffect(() => {
    const data = localStorage.getItem(node);

    if (data) {
      const parsedData = JSON.parse(data);
      setRoot(parsedData);
    }
  }, [node]);



  const value = root?.value;
  const [name, setname] = useState("");
  const tval = root?.btn;
  const nav = useNavigate();

  function addGroup(node: any) {
    const child = { id: Date.now(), children: [], value: [], btn: "" };
    node.children.push(child);
    setRoot({ ...root });
  }

  function handlesave() {
    if (node) {
      localStorage.setItem(node, JSON.stringify(root));
    }
    else {
      if (name === "") {
        alert("Can not save the Data , Please enter the Name");
        return;
      }
      localStorage.setItem(name, JSON.stringify(root));
    }
    alert("Data stored");
    nav("/");
  }

  function handleName(Event: any) {
    setname(Event.target.value);
  }

  function handleRemoveNode(id: any) {
    const parent = findParent(root, id);
    const newChildren = parent.children.filter(
      (child: any) => child.id !== id
    );
    parent.children = newChildren;
    setRoot({ ...root });
    localStorage.setItem(node, JSON.stringify(root));
  }


  return (

    <div className="tree" data-testid="tree"  data-node={node}>
      <button onClick={() => { nav('/') }}> Back</button>
      <br></br>
      <br></br>

      {node ? (
        <input value={node} readOnly />
      ) : (
        <input value={name} placeholder="Enter the Name" required onChange={(event: any) => handleName(event)} />
      )}

      <br></br>
      <br></br>
      <AddData
        node={root}
        addGroup={addGroup}
        value={value}
        RemoveNode={handleRemoveNode}
        tval={tval}
      />
      <div><button onClick={handlesave} data-testid="save" >Save</button></div>
    </div>
  );
}


