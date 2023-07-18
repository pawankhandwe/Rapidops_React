import { createContext, useReducer } from 'react';
import './App.css';
import CompoA from './context/CompoA';


interface IContextProps {
  count:number ;
  dispatch: React.Dispatch<'increment'|'decrement'|'reset'>;
}


export const User=createContext({} as IContextProps);

const inti=0

const reducer=(state: number,action: any)=>{
  switch(action){
    case 'increment':
      return  state+1
    case 'decrement':
      return state-1;
    case 'reset':
      return inti
    default:
      return state
  }
}

function App() {
  const [count,dispatch]=useReducer(reducer,inti);
  return (
    <div className="App">
      <User.Provider value={{count,dispatch}}>
      <CompoA></CompoA>
      </User.Provider>
    </div>
  );
}

export default App;
