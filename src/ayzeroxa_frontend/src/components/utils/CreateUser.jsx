import React, { useState } from 'react'
import Inputs from './Inputs'
import SelectInputWithLabel from './SelectInputWithLabel';
import { FiUser, FiUserPlus } from 'react-icons/fi';
import Buttons from './Buttons';
import { Principal } from '@dfinity/principal';
import { ayzeroxa_backend } from '../../../../declarations/ayzeroxa_backend';
import DivSpinner from './DivSpinner';
import Alert from './Alert';

const CreateUser = () => {
  const [principalText, setPrincipalText] = useState("");
  const [role, setRole] = useState("user");
   const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    messageIsOpen: false, 
    message: '', 
    indicator: '',
    bgCol: '',
    fgCol: '',
    btnName: '',});

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Leader", value: "leader" },
    { label: "User", value: "user" },
    { label: "Viewer", value: "viewer" },
  ];

  const handleAddUser = async (e) => {

        try {
          setIsLoading(true);
        const principal = Principal.fromText(principalText);
        const roleVariant = { [role]: null };
        await ayzeroxa_backend.addUserInfo(principal, roleVariant);
            setPrincipalText("");
            setRole("user");
         setAlertData({
            messageIsOpen: true, 
            message: `User role assigned successfully!`, 
            indicator: "aqua", 
            bgCol: 'rgba(0, 0, 0, 0.8)', 
            fgCol: '#fff', 
            btnName: 'Close'});
          setIsLoading(false);
        
        } catch (err) {
        console.error(err);
         setAlertData({
            messageIsOpen: true, 
            message: "Failed to add user role.", 
            indicator: "red", 
            bgCol: 'rgba(0, 0, 0, 0.8)', 
            fgCol: '#fff', 
            btnName: 'Close'});
            setIsLoading(false);
        }
  };


  return (
    <div className="cd-child">
      {isLoading && <DivSpinner mess="Creating user..."/>}
        <div className='create-user'>
            <div className='user-title'><FiUser color='aqua'/> <h3>Create Users</h3></div>
            <Inputs type="text" ph="Enter User's Identity"  value={principalText} onchange={(e)=>setPrincipalText(e.target.value)} wt="100%" autoComp="off"/>
            <SelectInputWithLabel 
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                nam
                ph="Select Role"
                options={roles}
                wt="15rem"
            />
            <Buttons txt="Create" onclick={handleAddUser} icon={<FiUserPlus color='aqua'/>}/>
        </div>

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

export default CreateUser;
