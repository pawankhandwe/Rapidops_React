
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import F1 from './component/f1';
import F2 from './component/f2';
import F3 from './component/f3';

function App() {
  const [f1, setf1] = useState();
  const [f2, setf2] = useState();
  const [f3, setf3] = useState();
  const nav=useNavigate();

  return (
    <div>
      <div style={{ display: "flex", height: "200px", justifyContent: "space-around", margin: "50px" }}>
        <F1 val={f1} set={setf1}></F1>
        <F2 val={f2} set={setf2}></F2>
        <F3 val={f3} set={setf3}></F3>
      </div>

      <div style={{display:"flex"}} > 
      <div style={{border:"2px soild black",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <button style={{width:"200px",padding:"10px", margin:"10px" }} onClick={()=>{nav("/F1")}}>F1</button>
        <button style={{width:"200px",padding:"10px", margin:"10px"}} onClick={()=>{nav("/F2")}}>F2</button>
        <button style={{width:"200px",padding:"10px", margin:"10px"}} onClick={()=>{nav("/F3")}}>F3</button>
      </div>

      <div style={{paddingLeft:"100px"}}>
        <Routes>
          <Route path='/' element={<F1 val={f1} set={setf1} />} />
          <Route path='/F1' element={<F1 val={f1} set={setf1} />} />
          <Route path='/F2' element={<F2 val={f2} set={setf2} />} />
          <Route path='/F3' element={<F3 val={f3} set={setf3} />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
