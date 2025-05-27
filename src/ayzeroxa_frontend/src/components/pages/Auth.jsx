import React from 'react'
import Header from '../utils/Header';
import AuthEngine from './AuthEngine';
import Footer from '../utils/Footer';

const Auth = ({content, setContent}) => {
  return (
    <div>
        <Header/>
        <AuthEngine/>
        <div style={{display: "flex", justifyContent: "center", marginBottom: "1rem"}}> <Footer/></div>
    </div>
  )
}

export default Auth;
