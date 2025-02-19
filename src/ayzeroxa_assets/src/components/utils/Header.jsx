import React from 'react'
import Logo from './Logo'

const Header = () => {
  return (
    <div>
        <div className='header'>
           <div className='logo-name'>
            <Logo wt="2rem"/>
           
            </div>
            <div className='return'> 
                X
            </div>
        </div>
    </div>
  )
}

export default Header