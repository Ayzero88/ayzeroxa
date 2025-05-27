import React from 'react';
import FooterBrand from './FooterBrand';

const Footer = () => {
  return (
    <>
            <div className="footer">
               <FooterBrand wt={40} />
                <p>© {new Date().getFullYear()} Ayzeroxa Tech. All rights reserved.</p>
            </div>
    </>
  )
}

export default Footer
