import React from 'react'
import myImage from "../../../assets/mylogo.png";

const Logo = ({wt}) => {
  return (
    <div className='img-wrap' style={{width: wt}}><img src={myImage} alt='logo'/></div>
  )
}

export default Logo