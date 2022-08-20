import React, { useEffect } from "react";
import { Api } from "./Api"
import { UserPage } from "./Pages/UserPage/UserPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LogInPage } from "./Pages/LogInPage/LogInPage";
import { useAuth }  from "./Hooks/useAuth";
import { AuthContext } from "./Utils/authContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, APIController } from "./Utils/Firebase";

export default function App() {
  const { switcher, setSwitcher } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      // if user is logged in
      setSwitcher(userFirebase);
    } else {
      // if user is not logged in
      setSwitcher(null);
    }
  })
}, []);


const loginGoogleHandler = (e) => {
  e.preventDefault();
  APIController.signWithGoogle(navigate);
};

  return (
      <AuthContext.Provider value={{auth, loginGoogleHandler, navigate}}>
        {
          switcher ? 
          <Api />
          :
          <div>
            <Routes>
              <Route path="/" element={ <UserPage/> } />
              <Route path="/login" element={ <LogInPage/> } />
            </Routes>
          </div>
        } 
      </AuthContext.Provider>       
  )
};