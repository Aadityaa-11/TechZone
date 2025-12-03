// import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Common/Navbar';
import Login from "./Pages/Login"
import OpenRoute from './Components/Core/Auth/OpenRoute';
import  Signup  from './Pages/Signup';
import VerifyEmailId from "./Pages/VerifyEmailId"
import { Toaster } from 'react-hot-toast';
import{ ForgetPassword} from './Pages/ForgetPassword'
import Aboutus from './Pages/Aboutus';
import Contact from './Pages/Contact';
function App() {
  return (
    <div className='bg-richblack-900 w-screen min-h-screen flex flex-col font-inter'>
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path='/'   element={<Home/>} />

        <Route
          path='login'
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />

        <Route
          path='signup'
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />

      <Route
        path='verify-emailid'
        element={
          <OpenRoute>
             <VerifyEmailId/>
          </OpenRoute>
        }
        />

        <Route
        path='forget-password'
        element={
          <ForgetPassword/>
        }
        />

        <Route
        path='about'
        element={
          <Aboutus/>
        }
        />

        <Route
        path='/contact'
        element={
          <Contact/>
        }
        />
    </Routes>
      



    </div>
  );
}

export default App;
