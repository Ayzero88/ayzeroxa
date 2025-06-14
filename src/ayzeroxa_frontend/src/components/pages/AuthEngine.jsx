import React, {useState, useEffect} from 'react';
import Inputs from '../utils/Inputs';
import { FiStar, FiToggleLeft, FiToggleRight, FiUser } from 'react-icons/fi';
import Member from '../utils/Member';
import { getDataFromDB } from '../data/IndexedDB';
import { v4 as uuidv4 } from 'uuid';
import CheckIns from '../utils/CheckIns';
import SyncDB1 from '../utils/SyncDB1';
import MovingLine from '../utils/MovingLine';
import { ayzeroxa_backend } from '../../../../declarations/ayzeroxa_backend';
import Alert from '../utils/Alert';
import DivSpinner from '../utils/DivSpinner';
import Logo from '../utils/Logo';
import SyncDB from '../utils/SyncDB';

const AuthEngine = () => {
  const [inputVal, setInputVal] = useState("");
  const [checkedIn, setCheckedIn] = useState(true);
  const [checkIns, setCheckIns] = useState([]);
  const [member, setMember] = useState([]);
  const [membersData, setMemberData] = useState([]);
  const [registry, setRegistry] = useState([]);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckInSwitch, setShowCheckInSwitch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
     const [alertData, setAlertData] = useState({
      messageIsOpen: false, 
      message: '', 
      indicator: '',
      bgCol: '',
      fgCol: '',
      btnName: '',});
  const userId = uuidv4();

  const handleInputChange =(e)=>{
      setInputVal(e.target.value)
  };

  const escapeRegExp=(string)=> {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }; 

  const escapedSearchInput = escapeRegExp(inputVal);
  let filteredData;
  if(inputVal.length > 0){
  
    filteredData = member.length > 0 && member.filter((name) => {

          if (!name) return null;

          const escapedInput = escapedSearchInput.trim().toLowerCase();

          // Split the name into words (e.g., ['Ose', 'Mudi'])
          const nameParts = name.toLowerCase().split(' ');

          // Check if any part of the name starts with the input
          return nameParts.some(part => part.startsWith(escapedInput));
    });

  };

  const handleCheckIn = async() =>{

   const attendee = {
      id: userId,
      name: `${membersData.firstName} ${membersData.surName}`,
      status: membersData.status,
      gender: membersData.gender,
      category: membersData.category,
      town: membersData.town,
      channel: membersData.channel,
      tel: membersData.tel,
      createdAt: new Date().toISOString(),
   };


    try {
          setIsLoading(true);
         const response = await ayzeroxa_backend.addAttendance(attendee);
  
        if (response){
           setAlertData({
            messageIsOpen: true, 
            message: 'Checked in successfully.', 
            indicator: "aqua", 
            bgCol: 'rgba(0, 0, 0, 0.8)', 
            fgCol: '#fff', 
            btnName: 'Close'});
            await SyncDB1();
           
    
        }else{
  
           setAlertData({
              messageIsOpen: true, 
              message: 'Could not check in member. (Member has already been checked in.)', 
              indicator: "red", 
              bgCol: 'rgba(0, 0, 0, 0.8)', 
              fgCol: '#fff', 
              btnName: 'Close'});
        };
        setShowCheckInSwitch(true);
    } catch (error) {
      console.error("Error saving user data", error);
       setAlertData({
          messageIsOpen: true, 
          message: 'Error saving data', 
          indicator: "red", 
          bgCol: 'rgba(0, 0, 0, 0.8)', 
          fgCol: '#fff', 
          btnName: 'Close'});
    }finally{
       setCheckedIn(true);
      setInputVal("");
      setIsLoading(false);
     
    };
     
  };

  const handleChoice = (item)=>{
    const filteredRegistryByName = registry.find((member)=> {
      const firstName = member.firstName;
      const surName = member.surName;
      const fullName = `${firstName} ${surName}`;

      if(fullName === item){
        setShowCheckInSwitch(false);
          return member;
      };
  });
    setCheckedIn(false);
    setMemberData(filteredRegistryByName)
  };

  const fetchRegistry = async (isMounted) => {
    
    try {
      setIsLoading2(true);
      await SyncDB();
      const indexedDBResponse = await getDataFromDB("members", "m");
      
      if (indexedDBResponse) {
         const members = indexedDBResponse.data;
        if (isMounted()) {  // ✅ Only update state if component is still mounted
          const names = members.map((member) => `${member.firstName} ${member.surName}`);
          setRegistry(members);
          setMember(names);
          setIsLoading2(false);
        }
      } else {
     
         setAlertData({
            messageIsOpen: true, 
            message: 'No data found!', 
            indicator: "#0077b6", 
            bgCol: 'rgba(0, 0, 0, 0.8)', 
            fgCol: '#fff', 
            btnName: 'Close'});
            setIsLoading2(false);
      }
    } catch (error) {
      console.error("Error fetching registry", error);
       setAlertData({
          messageIsOpen: true, 
          message: 'Error fetching registry', 
          indicator: "red", 
          bgCol: 'rgba(0, 0, 0, 0.8)', 
          fgCol: '#fff', 
          btnName: 'Close'});
          setIsLoading2(false);
    }
  };


  const handleShowCheckIns = ()=>{
      setShowCheckIn(true);  
  };

  const handleExitCheckIns = ()=>{
    setShowCheckIn(false);
  };

  const handleExitCheckIn = () =>{
    setCheckedIn(true);
    setShowCheckInwitch(true);
    
  };

  const handleDelete = async (timestamp, id) => {
     setIsLoading1(true);

    if (!timestamp || !id) return;
         
    try {
      const success = await ayzeroxa_backend.deleteAttendance(timestamp, id);
      if (success) {
     
         setAlertData({
            messageIsOpen: true, 
            message: 'Deleted successfully.', 
            indicator: "aqua", 
            bgCol: 'rgba(0, 0, 0, 0.8)', 
            fgCol: '#fff', 
            btnName: 'Close'});

            const newReg = checkIns.filter((item) => item.id !== id);
            setCheckIns(newReg);
            
          await SyncDB1();
         
        setIsLoading1(false);
      } else {

         setAlertData({
            messageIsOpen: true, 
            message: 'Delete failed: record not found.', 
            indicator: "red", 
            bgCol: 'rgba(0, 0, 0, 0.8)', 
            fgCol: '#fff', 
            btnName: 'Close'});
            setIsLoading1(false);
      }
    } catch (err) {
      console.error("Delete error", err);
      
      setAlertData({
            messageIsOpen: true, 
            message: 'Error deleting record.', 
            indicator: "red", 
            bgCol: 'rgba(0, 0, 0, 0.8)', 
            fgCol: '#fff', 
            btnName: 'Close'});
      
    };

    setIsLoading1(false);
  };

  useEffect(()=>{
    let isMounted = true; // Track component mount status

    fetchRegistry(() => isMounted);
  
    return () => {
      isMounted = false; // Cleanup function prevents state updates
    };
  }, []);

  return (
      
          
            <div className="auth-engine">
                {isLoading && <DivSpinner mess="Checking In..."/>}
                {isLoading1 && <DivSpinner mess="Deleting..."/>}
                {isLoading2 && <DivSpinner mess="Fetching Member's Data..."/>}
               {!showCheckIn && <Logo wt="4rem"/>}
             {showCheckInSwitch &&  
             <div className="view-check-ins"> 
                  {showCheckIn ? <p>Exit Check Ins</p> : <p>View Check Ins</p>} {showCheckIn ? <FiToggleRight cursor="pointer" color='aqua' size={25} onClick={handleExitCheckIns}/> : <FiToggleLeft cursor="pointer" color='gray' size={25} onClick={handleShowCheckIns}/>}
              </div>}
                {(checkedIn && !showCheckIn) && <h1> <FiStar color='aqua'/> Miracle Search</h1>}
              {(checkedIn && !showCheckIn) && <MovingLine wt="10rem"/>}
              { (checkedIn && !showCheckIn)  && <Inputs type="text" value={inputVal} autoComp="off" ph="Enter Members Name" onchange={handleInputChange}/>}
                {(checkedIn && !showCheckIn) && filteredData && filteredData.length > 0 ? 
                    <div className='display-items adj-dis'>
                            {filteredData.length > 0 && filteredData.map((item, index)=>
                                (<ul key={index}>
                                    <li onClick={()=>handleChoice(item)}> <FiUser color='aqua'/> {item} </li> 
                                </ul>))}
                    </div> 
                    : 
                    null} 
                {!checkedIn && <Member handleCheckIn={handleCheckIn} handleExitCheckIn={handleExitCheckIn} membersData={membersData}/>}

                {showCheckIn && <CheckIns handleDelete={handleDelete} checkIns={checkIns} setCheckIns={setCheckIns} setShowCheckIn={setShowCheckIn} showCheckIn={showCheckIn}/>}
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

export default AuthEngine;
