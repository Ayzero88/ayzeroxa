import React, { useEffect, useState} from 'react';
import Home from './pages/Home';
import { Routes, Route,Navigate } from "react-router-dom";
import Register from './pages/Register';
import AXpanel from './pages/AXpanel';
import View from './pages/View';
import Auth from './pages/Auth';
import Login from './pages/Login';
import { useUser } from './context/UserContext';
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';

const App = () => {
  const [content, setContent] = useState({
    home: true,
    attendanceConfig: false,
    createUser: false,
    idManager: false,
  });
  const {userRole, setUserRole } = useUser();
  const [checkingAuth, setCheckingAuth] = useState(true); // 👈 add this



  useEffect(() => {
    
    const storedPrincipal = localStorage.getItem("p");
    const storedRole = localStorage.getItem("r");
    const storedAuth = localStorage.getItem("a");

    if (storedPrincipal && storedRole && storedAuth) {
      setUserRole({
        principal: storedPrincipal,
        role: storedRole,
        authenticated: storedAuth,
      });
    };

    setCheckingAuth(false); // 👈 done checking localStorage
    
}, []);

 if (checkingAuth) return <div>Loading...</div>; // 👈 prevent premature routing

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route
          path="/"
          element={
            (userRole?.role === "admin")? (
              <Home content={content} setContent={setContent} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/leader"
          element={
            (userRole?.role === "leader")? (
              <Home3 content={content} setContent={setContent} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
         <Route
          path="/user"
          element={
            (userRole?.role === "user")? (
              <Home2 content={content} setContent={setContent} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/axpanel" element={
            (userRole?.role === "admin")? (
              <AXpanel content={content} setContent={setContent} />
            ):(
              <Navigate to="/login" replace />
            )
              }/> 
        <Route path="/view" element={
            (((userRole?.role === "admin" || userRole?.role === "leader")))? (
                <View content={content} setContent={setContent} />
             ):(
                  <Navigate to="/login" replace />
              )
           }/>
        <Route path="/enroll" element={

          ["admin", "leader", "user"].includes(userRole?.role) ? (
              <Register />
                  ):(
                  <Navigate to="/login" replace />
              )
              
              }/>
        <Route path="/auth" element={
             ["admin", "leader", "user"].includes(userRole?.role) ? (
                <Auth content={content} setContent={setContent} />
                 ):(
                  <Navigate to="/login" replace />
              )
            }/>
      </Routes>
    </div>
  );
};

export default App;
