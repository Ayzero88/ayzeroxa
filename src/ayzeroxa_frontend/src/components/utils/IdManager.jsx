import React, { useEffect, useState } from 'react'
import { FaIdBadge } from 'react-icons/fa';
import { FiEye} from 'react-icons/fi';
import Buttons from './Buttons';
import Identity from './Identity';
import DivSpinner from './DivSpinner';
import { ayzeroxa_backend} from '../../../../declarations/ayzeroxa_backend';
import Alert from './Alert';
import { Principal } from '@dfinity/principal';

const IdManager = () => {
  const [showIdentities, setShowIdentities] = useState(false);
  const [identity, setIdentity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
    const [alertData, setAlertData] = useState({
      messageIsOpen: false, 
      message: '', 
      indicator: '',
      bgCol: '',
      fgCol: '',
      btnName: '',});

  const handleViewIdentity = ()=>{
    setShowIdentities(true);
  };

   const handleDelete = async (principalText) => {
    try {

      setIsLoading2(true);
    
      const principalObj = Principal.fromText(principalText);
      const result = await ayzeroxa_backend.deleteIdentity(principalObj);

      if (result) {
         setAlertData({
            messageIsOpen: true, 
            message: `User was deleted successfully!`, 
            indicator: "aqua", 
            bgCol: 'rgba(0, 0, 0, 0.8)', 
            fgCol: '#fff', 
            btnName: 'Close'});
            fetchUsers();
            setIsLoading2(false);
     
      } else {
      
         setAlertData({
            messageIsOpen: true, 
            message: `Failed to delete user.`, 
            indicator: "red", 
            bgCol: 'rgba(0, 0, 0, 0.8)', 
            fgCol: '#fff', 
            btnName: 'Close'});
            setIsLoading2(false);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setIsLoading2(false);
       setAlertData({
            messageIsOpen: true, 
            message: `Error deleteing user.`, 
            indicator: "red", 
            bgCol: 'rgba(0, 0, 0, 0.8)', 
            fgCol: '#fff', 
            btnName: 'Close'});
    }
  };

   const fetchUsers = async () => {
      try {
        const result = await ayzeroxa_backend.getAllRoles();
        setIdentity(result);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

  useEffect(()=>{
    fetchUsers();
  },[]);
  return (
    <div className="cd-child">
        {isLoading2 && <DivSpinner mess="Removing Identity..."/>}
       {!showIdentities && 
       <div className='id-manager-content'>
            <h2><FaIdBadge color='aqua'/>  Manage Identities </h2>
            <div className='id-manager-btn'>
                  <Buttons txt="Get Started" onclick={handleViewIdentity}  wt="20rem" icon={<FiEye color='aqua'/> }/>
            </div>
            
        </div>}

        {showIdentities && 
        
            <Identity identity={identity} handleDelete={handleDelete}/>
        }

         { alertData.messageIsOpen && (
                    <Alert
                        message={alertData.message}
                        onClose={() => setAlertData({messageIsOpen: false})} // Close the message display
                        indicator={alertData.indicator}
                        bgCol={alertData.bgCol}
                        fgCol={alertData.fgCol}
                        btnName={alertData.btnName}
                />
                )}
    </div>
  )
}

export default IdManager;
