import { Routes,Route } from 'react-router-dom';
import './App.css';
import Confidential from './component/Confidential';
import Help from './component/Help';
import Home from './component/Home';
import Login from './component/Login';
import Logout from './component/Logout';
import Navbar from './component/navbar';
import {AuthProvider} from './component/auth';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/help' element={<Help/>}></Route>
        <Route path='/Confidential' element={<Confidential/>}></Route>
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
