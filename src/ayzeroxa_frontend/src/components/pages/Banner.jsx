import React from 'react';
import Logo from '../utils/Logo';
import AppName from '../utils/AppName';
import {FaArrowRight} from "react-icons/fa";
import Footer from '../utils/Footer';
import MovingLine from '../utils/MovingLine';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  const handleAxPanel =()=>{
       navigate("/axpanel");
  };
  return (
    <div className='banner'>
            <Logo/>
            <h3 style={{textAlign: 'center'}}>OIKIA CC</h3>
            <AppName/>
        
            <div className='home-btn'>
                <button className='reg' onClick={handleAxPanel}>
                     <FaArrowRight/> Get Started
                </button>
            </div>

            <Footer/>
            <div className='version'>1.0 βeta</div>
            <MovingLine/>
           
    
</div>
  )
}

export default Banner