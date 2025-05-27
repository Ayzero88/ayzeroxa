import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const RouteTracker = () => {
    const location = useLocation();
    useEffect(() => {
   
      const storedAuth = localStorage.getItem("a");
      if (storedAuth === "true") {
        sessionStorage.setItem("lastPath", location.pathname);
      };
    }, [location]);
  
    return null;
 
}

export default RouteTracker;
