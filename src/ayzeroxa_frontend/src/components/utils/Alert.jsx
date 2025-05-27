import React from 'react';
import { FaCircle} from 'react-icons/fa';
import Brand from './Brand';

const Alert = ({ message, onClose, indicator, bgCol, fgCol, btnName }) => {

    const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000, // Adjust the z-index as needed
  };

  const contentStyles = {
    background: bgCol,
    color: fgCol,
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1000,
  };

  const closeButtonStyles = {
    cursor: 'pointer',
    background: indicator,
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '1rem',
    marginTop: '10px',
    
  };


  return (
    <div style={overlayStyles}>
      <div className='alert-mess' style={contentStyles}>
                <div className='alert-wrap'>
                      <Brand wt={30} />
                </div>
        <p className='alert-content'><FaCircle color={indicator}/> {message} </p>
        <div className='alert-close-btn'>
          <button style={closeButtonStyles} onClick={onClose}>
              {btnName}
          </button>
        </div>
      </div>
    </div>
  );
};
   
    

export default Alert;
