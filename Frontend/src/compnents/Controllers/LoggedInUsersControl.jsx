import React, { useState, useEffect } from 'react'
import {Navigate} from "react-router-dom";
import isUserLoggedIn from '../../JS functions/Auth/is-user-logged-in';

export default  function LoggedInUsersControl({children}) {
const [isLoggedIn, setIsLoggedIn]= useState(false);

useEffect(() => {
 async  function checkStatusNow ()  {
  const checkStatusTrue = await isUserLoggedIn()
  console.log(checkStatusTrue)
  if (checkStatusTrue)
     setIsLoggedIn(prevState=>!prevState);
  }

checkStatusNow ()

  }, []);

  console.log(isLoggedIn)

  if (isLoggedIn) return( <>{children}</>) 

  return (<Navigate to={"/"}/>);
}



