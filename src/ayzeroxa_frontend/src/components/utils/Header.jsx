import React from 'react';
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


const Header = () => {
   const {userRole, setUserRole } = useUser();
  const navigate = useNavigate();
  const handleReload =()=>{window.location.reload()};
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
    await SyncDB();
 };

 const handleSync2 = async()=>{
   await SyncDB1();
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
        <div className='header'>
           <div className='logo-name'>
              <Brand wt="2rem"/>
              <Tooltip text="Home" position='bottom'><HiHome onClick={handleGoToHomePage} cursor="pointer" size={20}/></Tooltip>
              <Tooltip text="Register" position='bottom'><MdAppRegistration onClick={handleGoToRegPage} cursor="pointer"/></Tooltip>
             {(userRole?.role === "admin" || userRole?.role === "leader") && <Tooltip text="Registry" position='bottom'><FaDatabase onClick={handleGoToViewPage} cursor="pointer"/></Tooltip>}
              <Tooltip text="Check In" position='bottom'><HiOutlineKey onClick={handleGoToAuthPage} cursor="pointer" size={20}/></Tooltip> 
              <Tooltip text="Update DS1" position='bottom'><FaSync onClick={handleSync} color='gray' cursor="pointer"/></Tooltip>
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