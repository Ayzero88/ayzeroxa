import React from 'react';
import { FaCircle } from 'react-icons/fa';


const AlertYesCancel = ({ message, onYes, onCancel, indicator, bgCol, fgCol, btnFirstName, btnSecondName }) => {

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: '30rem',
    height: '20rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1000,
  };

  const buttonStyles = {
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
    marginTop: '10px',
    padding: '0.5rem 1rem',
  };

  const yesButtonStyles = {
    ...buttonStyles,
    background: indicator,
    color: '#fff',
  };

  const cancelButtonStyles = {
    ...buttonStyles,
    background: '#ccc',
    color: '#000',
  };

  return (
    <div style={overlayStyles}>
      <div className='alert-mess' style={contentStyles}>
        <div className='alert-wrap'>
          
        </div>
        <p className='alert-content'><FaCircle color={indicator} /> {message} </p>
        <div className='alert-btn'>
          <button style={yesButtonStyles} onClick={onYes}>
            {btnFirstName}
          </button>
          <button style={cancelButtonStyles} onClick={onCancel}>
            {btnSecondName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertYesCancel;
