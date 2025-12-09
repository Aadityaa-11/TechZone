// import logo from './logo.svg';
import './App.css';

import { Route, Routes, useNavigate } from 'react-router-dom';
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
import PrivateRoute from './Components/Core/Auth/PrivateRoute';
import Dashboard from './Pages/Dashboard';
import MyProfile from './Components/Core/Dashboard/MyProfile';
import Settings from "./Components/Core/Dashboard/Settings"
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './Utils/Constants';
import AddCourse from './Components/Core/Dashboard/AddCourse/index';
function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {User} = useSelector( (state) => state.profile)
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

        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path='/dashboard/my-profile' element={<MyProfile/>} />
          <Route path='/dashboard/settings' element={<Settings/>} />


          {
            User?.AccountType === ACCOUNT_TYPE.STUDENT && (
              <>
                
              </>
            )
          }

          {
            User?.AccountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='/dashboard/add-course' element={<AddCourse/>} />
              </>
            )
          }





        </Route>

        

        
    </Routes>
      



    </div>
  );
}

export default App;
