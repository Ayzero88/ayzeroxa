import React from 'react';
import Logo from '../utils/Logo';
import AppName from '../utils/AppName';

const Banner = ({setSections}) => {

  return (
    <div className='banner'>
            <Logo/>
            <AppName/>
        
            <div className='home-btn'>
                <button className='reg' onClick={()=> setSections({Axpanel: true})}>
                     AXPanel
                </button>
            </div>

            <div>
                <p>© {new Date().getFullYear()} AX. All rights reserved.</p>
            </div>
            <div class="moving-line-container">
                <div class="moving-line"></div>
            </div>
    
</div>
  )
}

export default Banner