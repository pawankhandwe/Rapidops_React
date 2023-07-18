import './App.css';
import { useState } from 'react';

function App() {

  const [count,setcount]=useState(0);
 

function inc()
{
  setcount(count+1);
}
function dec()
{
  setcount(count-1);
}

  return (
    <div className="App">
     <h1>welcome to my page</h1>
     <h2>count {count}</h2>
     <button onClick={inc}> increment</button> <button onClick={dec}> decrement</button>
    
    </div> 
  );
}

export default App;
