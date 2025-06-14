import React, {useEffect, useState} from 'react';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import { v4 as uuidv4 } from 'uuid';
import RegForm from '../utils/RegForm';
import { FaStar } from 'react-icons/fa';
import { ayzeroxa_backend } from '../../../../declarations/ayzeroxa_backend';
import Alert from '../utils/Alert';

const Register = () => {
  const [formInput, setFormInput] = useState({
    id: "",
    firstName: "",
    surName: "",
    gender: "",
    email: "",
    employed: "",
    marital: "",
    age: "",
    bornAgain: "",
    visitYou: "",
    visitWhen: "",
    likeAbout: "",
    doBetter: "",
    prayer: "",
    tongues: "",
    cell: "",
    nok: "",
    nokt: "",
    dob: "",
    mob: "",
    channel: "",
    tel: "",
    address: "",
    town: "",
    status: "",
    category: "",
    unit: "",
    createdAt: "",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    messageIsOpen: false, 
    message: '', 
    indicator: '',
    bgCol: '',
    fgCol: '',
    btnName: '',});
  const userId = uuidv4();
  const handleFormInputChange = (e) => {
      const {name, value} = e.target;
      setFormInput(prev=>{
        return {...prev, [name]:value};
      });
    
  };
  const handleClearInputs = ()=>{
    setFormInput({
      id: "",
      firstName: "",
      surName: "",
      gender: "",
      email: "",
      employed: "",
      marital: "",
      age: "",
      bornAgain: "",
      visitYou: "",
      visitWhen: "",
      likeAbout: "",
      doBetter: "",
      prayer: "",
      tongues: "",
      cell: "",
      nok: "",
      nokt: "",
      dob: "",
      mob: "",
      channel: "",
      tel: "",
      address: "",
      town: "",
      status: "",
      category: "",
      unit: "",
    });
    setSelectedItems([]);
  };

  const handleCreate = async() => {
       if(!formInput.firstName || !formInput.surName || !formInput.gender ||  !formInput.tel || !formInput.town || !formInput.status || !formInput.category){
           setAlertData({
              messageIsOpen: true, 
              message: 'All fields are required', 
              indicator: "red", 
              bgCol: 'rgba(0, 0, 0, 0.8)', 
              fgCol: '#fff', 
              btnName: 'Close'});
          return;
       };
      
       const stringifyUnits = selectedItems.join(" ");

        const memberData = {
          ...formInput, 
          id: userId, 
          createdAt: new Date().toISOString(), 
          town: formInput.town.toLowerCase(),
          unit: stringifyUnits,
        };
 
        try {
             setIsLoading(true);
             const response = await ayzeroxa_backend.addUser(memberData);
            if (response){

               setAlertData({
                    messageIsOpen: true, 
                    message: 'Member profile created successfully', 
                    indicator: "aqua", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
             
              handleClearInputs();
              setIsLoading(false);
            }else{
             
               setAlertData({
                    messageIsOpen: true, 
                    message: 'could not create this member\'s profile. (Member could already exist) ', 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
              setIsLoading(false);
            };
        } catch (error) {
          
          console.error("Error saving user data", error);
          setAlertData({
                    messageIsOpen: true, 
                    message: 'Error saving data', 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
            setIsLoading(false);
        }finally{
            setIsLoading(false);
        };
  };


  return (
    <div>
        <Header />
        <RegForm 
            title="Create Profile" 
            btnText="Create" 
            btnIcon={<FaStar/>} 
            formInput={formInput}
            setFormInput={setFormInput}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems} 
            handleFormInputChange={handleFormInputChange} 
            handleSubmit={handleCreate} 
            isLoading={isLoading} 
            type="create"/>
        <div style={{display: "flex", justifyContent: "center", marginBottom: "1rem"}}> <Footer/></div>

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

export default Register;