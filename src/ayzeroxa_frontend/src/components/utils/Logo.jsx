import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logo = ({wt}) => {
  const navigate = useNavigate();
  const handleBackHome = () =>{
      navigate("/");
  };
  return (
    <div className='img-wrap' style={{width: wt}}><img src="/oikia logo.png" alt='logo' onClick={handleBackHome} /></div>
  )
}

export default Logo