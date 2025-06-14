import React, { useState } from 'react';
import { FaArrowAltCircleLeft, FaDatabase, FaRedo, FaSync} from 'react-icons/fa';
import { HiHome, HiOutlineKey } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { MdAppRegistration } from 'react-icons/md';
import SyncDB from './SyncDB';
import SyncDB1 from './SyncDB1';
import Tooltip from './Tooltip';
import LogOut from './Logout';
import { AuthClient } from '@dfinity/auth-client';
import { useUser } from '../context/UserContext';
import { FiUser } from 'react-icons/fi';
import Brand from './Brand';
import DivSpinner from './DivSpinner';


const Header = () => {
   const [loading, setLoading] = useState(false);
   const [loading2, setLoading2] = useState(false);
   const [loading3, setLoading3] = useState(false);
   const {userRole, setUserRole } = useUser();
  const navigate = useNavigate();
  const handleReload =()=>{
    setLoading3(true);
    window.location.reload()
    setLoading3(false);
  
  };
  const handleMoveBack = ()=>{
    if (window.history.length > 1) {
      navigate(-1); // Go back only if there’s history
    } else {
      navigate("/"); // Fallback to home if no history
    }
  
  };
  const handleGoToViewPage = ()=>{
    if(userRole?.role === "admin"){
      navigate("/view")
      return;
    };

    if(userRole?.role === "leader"){
      navigate("/view")
      return;
    };
      
  
 };

 const handleGoToAuthPage = ()=>{
  navigate("/auth");
 };

 const handleGoToHomePage = ()=>{
 
  if(userRole?.role === "admin"){
    navigate("/")
    return;
  };
  if(userRole?.role === "leader"){
    navigate("/leader")
    return;
  };
  if(userRole?.role === "user"){
    navigate("/user")
    return;
  };
 };

 const handleGoToRegPage = ()=>{
  navigate("/enroll");
 };

 const handleSync = async()=>{
    try {
      setLoading(true);
      await SyncDB();
      window.location.reload();
      setLoading(false);
    } catch (error) {
      console.log("Error occured while synchronizing store 1");
      setLoading(false);
    };
 };

 const handleSync2 = async()=>{
    try {
      setLoading2(true);
      await SyncDB1();
      window.location.reload();
      setLoading2(false);
    } catch (error) {
      console.log("Error occured while synchronizing store 2");
      setLoading2(false);
    };
};
  const handleLogout = async () => {

    localStorage.removeItem("p");
    localStorage.removeItem("r");
    localStorage.removeItem("a");
   
    const authClient = await AuthClient.create();
    await authClient.logout();
    navigate("/login");
    
  };
  return (
    <div>
       {(loading || loading2) && <DivSpinner mess="Synchronizing..."/>}
       {(loading3) && <DivSpinner mess="Refreshing..."/>}
        <div className='header'>
           <div className='logo-name'>
              <Brand wt="2rem"/>
              <Tooltip text="Home" position='bottom'><HiHome onClick={handleGoToHomePage} cursor="pointer" size={20}/></Tooltip>
              <Tooltip text="Register" position='bottom'><MdAppRegistration onClick={handleGoToRegPage} cursor="pointer"/></Tooltip>
             {(userRole?.role === "admin" || userRole?.role === "leader") && <Tooltip text="Registry" position='bottom'><FaDatabase onClick={handleGoToViewPage} cursor="pointer"/></Tooltip>}
              <Tooltip text="Check In" position='bottom'><HiOutlineKey onClick={handleGoToAuthPage} cursor="pointer" size={20}/></Tooltip> 
              {(userRole?.role === "admin" || userRole?.role === "leader") &&<Tooltip text="Update DS1" position='bottom'><FaSync onClick={handleSync} color='gray' cursor="pointer"/></Tooltip>}
              <Tooltip text="Update DS2" position='bottom'><FaSync onClick={handleSync2} color='gray' cursor="pointer"/></Tooltip>
            </div>
            <div className='return'> 
              {((userRole?.role === "admin" || userRole?.role === "leader" || userRole?.role === "user")) && <Tooltip text="Online" position='bottom'><FiUser color='aqua'/></Tooltip>}
              <Tooltip text="Reload" position='bottom'><FaRedo onClick={handleReload}/></Tooltip>
              <Tooltip text="Back" position='bottom'><FaArrowAltCircleLeft onClick={handleMoveBack}/></Tooltip>
              <Tooltip text="Log Out" position='left'><LogOut handleLogout={handleLogout}/></Tooltip>
            </div>
        </div>
    </div>
  )
}

export default Header;