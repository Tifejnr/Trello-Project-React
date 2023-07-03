import React , {useContext} from 'react'
import {Link, Navigate, Route, Routes} from "react-router-dom";
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import NavBarLandingPage from '../LandingPage/Nav';
import { LoginStatusContext } from '../../App';

export default function AuthCombo() {
  return (
    <AuthRoutes/>
  )
}

function AuthRoutes () {
  return (
     <Routes>
      <Route  path='/' element={<LandingPageLogic> <NavBarLandingPage/></LandingPageLogic>}></Route>
      <Route  path='/register' element={<RegisterPageLogic> <Register/></RegisterPageLogic>}></Route>
      <Route path='/sign-in' element={<SignInPageLogic> <SignIn/></SignInPageLogic>}></Route>
      <Route path='/wrong' element={<WrongPageLogic> <div>Page Not Available</div></WrongPageLogic>}></Route>
   </Routes>
  )
}

const userTypes = {
  public: true,
  loggedIn : true,
  guest : "guest",
  paid : true
}

const currentUser= true;
function RegisterPageLogic ({children}) {
  if (currentUser=== userTypes.paid) return(<> {children} </>) 
  return (<Navigate to={"/"}/>);

}

function SignInPageLogic ({children}) {
  console.log(currentUser)
  if (currentUser== userTypes.guest) return(<> {children} </>)

   return (<Navigate to={"/"}/>);
}


function LandingPageLogic ({children}) {
  const isLoggedIn = useContext(LoginStatusContext);

  if (isLoggedIn==true) return( <>{children}</>) 
  return (<Navigate replace to={"/wrong"}/>);

}

function WrongPageLogic({children}) {
  return( <>{children}</>)
}