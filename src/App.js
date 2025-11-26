import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Common/Navbar';
import Login from "./Pages/Login"
import OpenRoute from './Components/Core/Auth/OpenRoute';
import  Signup  from './Pages/Signup';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='bg-richblack-900 w-screen min-h-screen flex flex-col font-inter'>
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path='/'   element={<Home/>} />

        <Route
          path='/login'
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />

        <Route
          path='/Signup'
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />
      </Routes>
      



    </div>
  );
}

export default App;
