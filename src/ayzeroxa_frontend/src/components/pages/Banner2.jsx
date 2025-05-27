import React from 'react';
import Logo from '../utils/Logo';
import AppName from '../utils/AppName';
import Footer from '../utils/Footer';
import MovingLine from '../utils/MovingLine';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiUserCheck } from 'react-icons/fi';

const Banner2 = () => {
  const navigate = useNavigate();

  const handleGoToAuthPage = ()=>{
    navigate("/auth");
   };
  
   const handleGoToRegPage = ()=>{
    navigate("/enroll");
   };
  return (
    <div className='banner'>
            <Logo/>
            <h3 style={{textAlign: 'center'}}>OIKIA CC</h3>
            <AppName/>
        
            <div className='home-btn home-btn2'>
                <button className='reg' onClick={handleGoToRegPage}>
                     <FiStar color='aqua'/>  Create
                </button>
                <button className='reg' onClick={handleGoToAuthPage}>
                     <FiUserCheck color='aqua'/> Check In
                </button>
            </div>

            <Footer/>
            <div className='version'>1.0 βeta</div>
            <MovingLine/>
           
    
</div>
  )
}

export default Banner2;