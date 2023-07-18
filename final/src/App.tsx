import './App.css';
import { Route, Routes } from 'react-router-dom';
import {Tree} from './component/AddData';
import Home from './component/Home';
import { EditData } from './component/EditData';

function App() {
  
  return (
    <div data-testid="app">
        <Routes>
        <Route path='Tree' element={<Tree />}/>
        <Route path='/' element={<Home/>}/>
        <Route path='EditData/:editid' element={<EditData/>}/>  
        </Routes>  
    </div>
  );
}

export default App;
