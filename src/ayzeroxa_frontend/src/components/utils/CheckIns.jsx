import React, {useState} from 'react';
import { FiActivity, FiArrowDownRight, FiCalendar, FiExternalLink, FiHome, FiInfo, FiMapPin, FiSearch, FiTrash, FiTrash2, FiUser, FiUsers } from 'react-icons/fi';
import SelectInput from './SelectInput';
import { FaExternalLinkSquareAlt, FaHome, FaTimes, FaWindowClose } from 'react-icons/fa';
import Inputs from './Inputs';
import { getDataFromDB } from '../data/IndexedDB';
import FormatDateString from './FormatDateString';
import DateSlash from './DateSlash';
import DivSpinner from './DivSpinner';
import Tooltip from './Tooltip';
import AttendanceReport from './AttendanceReport';
import TrackFirstTimers from './TrackFirstTimers';
import { countMatchingPairs, countValueOccurrences} from './UtilFunc';
import Alert from './Alert';
import { ayzeroxa_backend } from '../../../../declarations/ayzeroxa_backend';
import MissedDaysReport from './MissedDaysReport';
import BlobToArray from '../crpt/BlobToArray';

const CheckIns = ({handleDelete, checkIns, setCheckIns, showCheckIn}) => {

    
    const [showReport, setShowReport] = useState({
        generalReport: false,
        firstTimerReport: false,
        missedDaysReport: false,
    });
     const [showSearchIcon, setShowSearchIcon] = useState(true);
     const [showCheckIns, setShowCheckIns] = useState(false);
    const [dateInput, setDateInput] = useState("");
    const [showTownInput, setShowTownInput] = useState(false);
    const [town, setTown] = useState([]);
    const [holdCheckIns, setHoldCheckIns] = useState([]);
    const [formInput, setFormInput] = useState({

            status: "",
            gender: "",
            category: "",
            town: "",
            channel: "",
            createAt: "",
           
    });
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [reportDetails, setReportDetails] = useState({
        date: "",
        adultMale: 0,
        adultFemale: 0,
        teenagers: 0,
        children: 0,
        firstTimers: 0,
        total: 0,
    });
    const [missedCount, setMissedCount] = useState("");
    const [reportDetails1, setReportDetails1] = useState("");
    const [reportDetails2, setReportDetails2] = useState("");
    const [alertData, setAlertData] = useState({
        messageIsOpen: false, 
        message: '', 
        indicator: '',
        bgCol: '',
        fgCol: '',
        btnName: '',});
    const handleFormInputChange = (e) => {
        const {name, value} = e.target;
        setFormInput(prev=>{
          return {...prev, [name]:value};
        }); 
    };

    const escapeRegExp=(string)=> {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }; 

    const escapedSearchInput = escapeRegExp(formInput.town);
    let filteredTown;

    if(formInput.town.length > 0){

        filteredTown= town.length > 0 && town.filter((name)=> {
        
          if (!name) return null; // Skip if name is falsy
          
          const regex = new RegExp(`^${escapedSearchInput.slice(0,3)}`, 'i'); // 'i' flag for case-insensitive matching
          
          return regex.test(name);

      });
    };

    const fetchCheckIns  = async() =>{

        try {
            setIsLoading(true);
            const indexedDBResponse = await getDataFromDB("attendance", "a");
  
            if(indexedDBResponse){
              
                const members = indexedDBResponse.data.map(([id, user]) => ({ id, ...user }));

                if(dateInput){
                        const membersInstance = members.filter((meeting)=> {
                            return FormatDateString({isoString: meeting.createdAt}) === dateInput;
                        });

                        if(membersInstance.length === 0){
                          
                            setAlertData({
                                messageIsOpen: true, 
                                message: 'No record found for this date', 
                                indicator: "red", 
                                bgCol: 'rgba(0, 0, 0, 0.8)', 
                                fgCol: '#fff', 
                                btnName: 'Close'});
                            return;
                        };
                    
                        const towns = membersInstance.map((member) => {
                            return member.town.toLowerCase();
                        });
            
                        const uniqueTowns = [...new Set(towns)];
                        setShowCheckIns(true);
                        setCheckIns(membersInstance); 
                        setHoldCheckIns(membersInstance);
                        setTown(uniqueTowns);
                        setIsLoading(false);
                }else{
                   
                    setAlertData({
                        messageIsOpen: true, 
                        message: 'No date parameter was entered', 
                        indicator: "red", 
                        bgCol: 'rgba(0, 0, 0, 0.8)', 
                        fgCol: '#fff', 
                        btnName: 'Close'});
                };
                
            }else {

                setAlertData({
                    messageIsOpen: true, 
                    message: 'No data found! initialize data store2', 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
                setTableMess("No data found!")
            };
     
        } catch (error) {
                console.error("Error fetching checkIns", error);
                 setAlertData({
                    messageIsOpen: true, 
                    message: 'Error fetching checkIns', 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
                
        }finally{
            setIsLoading(false);
        }
    };
    const handleShowTownInput= () =>{
            setShowTownInput(true);
    };
    const handleExitTown = () =>{
        setShowTownInput(false);
    };
    const handleChoiceTown = (item) =>{
        setFormInput(prev=>({...prev, town: item}));
    };
    const handleSearch =async()=>{
        try {
            const results = checkIns.filter((item) =>
                Object.keys(formInput).every(
                  (key) => formInput[key] === "" || item[key] === formInput[key]
                )
              );

              if(results.length > 0){
                setCheckIns(results);
                setShowSearchIcon(false);
            }else{
             
                 setAlertData({
                    messageIsOpen: true, 
                    message: 'Record not found!. Check that you entered a valid search parameter.', 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
            };
     
        } catch (error) {
            console.error("Error retrieving attendees", error);
        };
       
    };
    const handleExitSearch = () =>{
        setShowSearchIcon(true);
        setFormInput({
            status: "",
            gender: "",
            category: "",
            town: "",
            channel: "",
            createAt: "",    
       });
       setCheckIns(holdCheckIns);
    };
    const handleReportLogic = ()=>{
            const adultMale = countMatchingPairs({array: checkIns, key1: "category", value1: "Adult", key2: "gender", value2: "male"});
            const adultFemale = countMatchingPairs({array: checkIns, key1: "category", value1: "Adult", key2: "gender", value2: "female"});
            const teenagers = countValueOccurrences({array: checkIns, keyName: "category", value: "Teen"});
            const children = countValueOccurrences({array: checkIns, keyName: "category", value: "Child"}) + countValueOccurrences({array: checkIns, keyName: "category", value: "Baby"});
            const workers = countValueOccurrences({array: checkIns, keyName: "status", value: "Pastor"}) + countValueOccurrences({array: checkIns, keyName: "status", value: "DCN"}) + countValueOccurrences({array: checkIns, keyName: "status", value: "Leader"}) + countValueOccurrences({array: checkIns, keyName: "status", value: "Worker"}); 
            const firstTimers = countValueOccurrences({array: checkIns, keyName: "status", value: "First Timer"});
            const total = adultMale + adultFemale + teenagers + children;
            const createAt = checkIns[0].createdAt;
            const formattedDate = DateSlash({isoDate: createAt});
            setReportDetails({
                date: formattedDate,
                adultMale: adultMale,
                adultFemale: adultFemale,
                teenagers: teenagers,
                children: children,
                workers: workers,
                firstTimers: firstTimers,
                total: total,
            });
    };
    const handleShowReport = () =>{
        handleReportLogic();
        setShowReport({
            generalReport: true,
        });
    };
    const handleTrackExternal = async () => {
        try {
            const firstTimers = await ayzeroxa_backend.trackReturningFirstTimers(dateInput);
   
            setShowReport({
                firstTimerReport: true,
            });
            setReportDetails1(firstTimers);

        } catch (e) {
            console.error("Error fetching first timers", e);
        };
    };
    const handleExitReport = () =>{
        setShowReport(false);
    };
    const showMemberAttendanceInfo = async(name)=>{
        try {
                setIsLoading(true);
                const memberInfo = await ayzeroxa_backend.getAttendanceStatsByName(name);
                const allMeetingDates = await ayzeroxa_backend.getAllAttendanceDates();
                let missedCount = 0;

                 if (memberInfo.length === 0) {
                    setAlertData({
                        messageIsOpen: true,
                        message: "No attendance information found for this member.",
                        indicator: "#0077b6",
                        bgCol: 'rgba(0, 0, 0, 0.8)',
                        fgCol: '#fff',
                        btnName: 'OK'
                    });
                    return;
                };
                const totalAttendance = memberInfo[0].total;
                const lastAttended = memberInfo[0].lastAttended
                const formattedDate = DateSlash({isoDate: lastAttended});
                    for (const date of allMeetingDates) {
                        if (date > lastAttended) {
                            const dayMap = await ayzeroxa_backend.getAttendanceByDate(date);
                            const found = dayMap.some(att => att.name.toLowerCase() === name.toLowerCase());
                        if (!found) {
                            missedCount += 1;
                        }
                    }
                }
             
                const info = `NOA: ${totalAttendance}
                Last Attended: ${formattedDate}
                Missed: ${missedCount}
                Total Meetings: ${allMeetingDates.length}`;
                setAlertData({
                    messageIsOpen: true,
                    message:info,
                    indicator: "#0077b6",
                    bgCol: 'rgba(0, 0, 0, 0.8)',
                    fgCol: '#fff',
                    btnName: 'OK'
                });
                setIsLoading(false);
            
        } catch (error) {
            console.error("Error sending member attendance information:", error);
            setAlertData({
                messageIsOpen: true,
                message: 'Error fetching member attendance information',
                indicator: "red",
                bgCol: 'rgba(0, 0, 0, 0.8)',
                fgCol: '#fff',
                btnName: 'OK'
            });
            setIsLoading(false);
        }
       
      };
    const handleMissedDays = async() => {
            if (isNaN(parseInt(missedCount))) {
                
            setAlertData({
                messageIsOpen: true,
                message: "Please enter a valid number for missed count",
                indicator: "red",
                bgCol: 'rgba(0, 0, 0, 0.8)',
                fgCol: '#fff',
                btnName: 'OK'
            });
                return;
            };
           
            try {
                setIsLoading(true);
                const missedDays = await ayzeroxa_backend.getMissedSinceLast(missedCount, dateInput);
                 const formatted = missedDays.map(([name, missed, lastSeen]) => ({
                        name,
                        missed: Number(missed),
                        lastSeen,
                }));

                setReportDetails2(formatted);
                setIsLoading(false);
                setShowReport({
                    missedDaysReport: true,
                });
                
            } catch (error) {
                console.error("Error fetching missed days", error);
                 setAlertData({
                    messageIsOpen: true,
                    message: 'Error fetching member with this missed days',
                    indicator: "red",
                    bgCol: 'rgba(0, 0, 0, 0.8)',
                    fgCol: '#fff',
                    btnName: 'OK'
            });
                setIsLoading(false);
            };
    };
    const getUserNumberTel = async (name) => {
        try {
            const indexedDBResponse = await getDataFromDB("members", "m");
            if(indexedDBResponse){
                          
                const members = await BlobToArray({encryptedData: indexedDBResponse.data});
                const names = members.map((member) => {
                    return {name: `${member.firstName} ${member.surName}`, tel: member.tel};
                });

                const getTel = names.find((item) => item.name.toLowerCase() === name.toLowerCase());
                if(getTel && getTel.tel){

                      setAlertData({
                        messageIsOpen: true,
                        message: `Phone Number: ${getTel.tel}`,
                        indicator: "#0077b6",
                        bgCol: 'rgba(0, 0, 0, 0.8)',
                        fgCol: '#fff',
                        btnName: 'OK'
                    });
                }else{
                    setAlertData({
                        messageIsOpen: true,
                        message: "No phone number found for this member.",
                        indicator: "red",
                        bgCol: 'rgba(0, 0, 0, 0.8)',
                        fgCol: '#fff',
                        btnName: 'OK'
                    });
                };
            };
        } catch (error) {
            console.error("Error fetching user's tel", error);
        }
    };
  return (
    <div className="filter-table">
          
           {(checkIns.length > 0 && showCheckIns) &&
           <div className="filters">
                        <div className="count"><FiUsers/> {checkIns.length}</div>
                        <ul>
                            <li>
                                <SelectInput 
                                    value={formInput?.gender}
                                    onChange={handleFormInputChange}
                                    name="gender"
                                    ph="Gender"
                                    options={["male", "female"]}
                                />
                            </li>
                            <li>
                            <SelectInput 
                                    value={formInput?.category}
                                    onChange={handleFormInputChange}
                                    name="category"
                                    ph="Category"
                                    options={["Adult", "Teen", "Child", "Baby"]}
                                />
                            </li>
                           
                            <li>
                                <SelectInput 
                                    value={formInput?.status}
                                    onChange={handleFormInputChange}
                                    name="status"
                                    ph="Status"
                                    options={["Pastor", "DCN", "Leader", "Worker", "Member", "First Timer", "Visitor"]}
                                />
                            </li>
                           
                            <li className="town">
                                    {showTownInput ? <FaWindowClose onClick={handleExitTown}/> : <FiSearch onClick={handleShowTownInput}/> } Town
                                    {showTownInput && <Inputs type="text" ph="Enter town" name="town" value={formInput?.town}  onchange={handleFormInputChange} fs="1rem" autoComp="off"/> }
                                        {filteredTown && filteredTown.length > 0 ? 
                                                <div className='display-items'>
                                                        {filteredTown.length > 0 && filteredTown.map((item, index)=>
                                                            (<ul key={index}>
                                                                <li onClick={()=>handleChoiceTown(item)}> <FaHome color='aqua'/> {item} </li> 
                                                            </ul>))}
                                                </div> 
                                                : 
                                            null} 
                            </li>
                            <li>
                                {showSearchIcon && <FiSearch cursor="pointer" onClick={handleSearch}/>}
                                {!showSearchIcon  && <FaTimes cursor="pointer" onClick={handleExitSearch}/>}
                            </li>
                        </ul>
                        <Tooltip position='right' text="General Report"><div><FaExternalLinkSquareAlt color='aqua' cursor="pointer" onClick={handleShowReport}/></div></Tooltip>
                        <Tooltip position='right' text="Track FirstTimers"><div><FiExternalLink color='aqua' cursor="pointer" onClick={handleTrackExternal}/></div></Tooltip>
                        <div className="missed-days">
                            <Inputs type="number" ph="Missed days"  value={missedCount}  onchange={(e)=>setMissedCount(e.target.value)} fs="0.5rem" autoComp="off" wt="100%"/>
                            <FiSearch cursor="pointer" onClick={handleMissedDays}/>
                        </div>
            </div>}
           {(checkIns.length > 0 && showCheckIns) &&
           <div className="table-wrap">
                           {isLoading && <DivSpinner mess="Fetching..."/>}
                            <table>
                                <thead>
                                    <tr>
                                        <th><FiUser color='aqua'/> Full Name</th>
                                        <th><FiUser color='aqua'/> Gender</th>
                                        <th><FiHome color='aqua'/> Status</th>
                                        <th><FiMapPin color='aqua'/> Town</th>
                                        <th><FiActivity color='aqua'/> Category</th>
                                        <th><FiArrowDownRight color='aqua'/> Channel</th>
                                        <th><FiCalendar color='aqua'/> Date</th>
                                        <th><FiTrash color='aqua'/>Action</th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                
                                            {checkIns.map((checkIn)=>{

                                                const date = checkIn.createdAt;
                                                const formattedDate = DateSlash({isoDate: date});
                                            
                                                return ( <tr key={checkIn.id}>
                                                            <td>{checkIn.name}</td>
                                                            <td>{checkIn.gender}</td>
                                                            <td>{checkIn.status}</td>
                                                            <td>{checkIn.town}</td>
                                                            <td>{checkIn.category}</td>
                                                            <td>{checkIn.town}</td>
                                                            <td>{formattedDate}</td>
                                                            <td style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem"}}>
                                                                
                                                                    <FiInfo color='#fff' onClick={()=>showMemberAttendanceInfo(checkIn.name)}/>
                                                                    <FiTrash2 color='red' onClick={()=>handleDelete(date, checkIn.id )}/>
                                                            
                                                            </td>
                                                    </tr>)
                                            
                                        })}
                                </tbody>
                            </table>
            </div>}
           
            {((checkIns.length === 0 && !showCheckIns )|| showCheckIn) && 
            <div className="date-wrap">
                <p>Meeting Date:</p>
                <Inputs type="date" value={dateInput} onchange={(e)=>setDateInput(e.target.value)} wt="100%" col="#1b2328" bd="none"/>
                <FiSearch size={20} cursor="pointer" onClick={fetchCheckIns}/>
            </div>}

            {showReport.generalReport && 
                <AttendanceReport
                    handleExitReport={handleExitReport}
                    copied={copied}
                    setCopied={setCopied}
                    report={reportDetails}
                />
            }
            {showReport.firstTimerReport && 
                <TrackFirstTimers
                    handleExitReport={handleExitReport}
                    copied={copied}
                    setCopied={setCopied}
                    report={reportDetails1}
                    showMemberAttendanceInfo={showMemberAttendanceInfo}
                />
            }

             {showReport.missedDaysReport && 
                <MissedDaysReport
                    handleExitReport={handleExitReport}
                    copied={copied}
                    setCopied={setCopied}
                    report={reportDetails2}
                    showMemberAttendanceInfo={showMemberAttendanceInfo}
                    getUserNumberTel={getUserNumberTel}
                />
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

export default CheckIns;
