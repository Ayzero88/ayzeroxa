import React, {useState} from 'react';
import { FiActivity, FiArrowDownRight, FiArrowLeft, FiCalendar, FiExternalLink, FiHome, FiInfo, FiMapPin, FiSearch, FiTrash, FiTrash2, FiUser, FiUsers } from 'react-icons/fi';
import SelectInput from './SelectInput';
import { FaExternalLinkSquareAlt, FaHome, FaTimes, FaUserAlt, FaWindowClose } from 'react-icons/fa';
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
import GetUserNumberTel from './GetUserNumberTel';
import SearchModeBtn from './SearchModeBtn';
import ExportToXlsx from './ExportToXlsx';

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
    const [isLoading1, setIsLoading1] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showInput, setShowInput] = useState(true);
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
    const [membersName, setMembersName] = useState([]);
    const [memberName, setMemberName] = useState("");
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
    const escapedSearchInput1 = escapeRegExp(memberName);
    let filteredTown;
    let filteredData;
    if(formInput.town.length > 0){

        filteredTown= town.length > 0 && town.filter((name)=> {
        
          if (!name) return null; // Skip if name is falsy
          
          const regex = new RegExp(`^${escapedSearchInput.slice(0,3)}`, 'i'); // 'i' flag for case-insensitive matching
          
          return regex.test(name);

      });
    };
    if(memberName.length > 0){
  
            filteredData = membersName.length > 0 && membersName.filter((name) => {

                if (!name) return null;

                const escapedInput = escapedSearchInput1.trim().toLowerCase();

                // Split the name into words (e.g., ['Ose', 'Mudi'])
                const nameParts = name.toLowerCase().split(' ');

                // Check if any part of the name starts with the input
                return nameParts.some(part => part.startsWith(escapedInput));
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

                        const names = membersInstance.map((member) => {
                            return member.name;
                        });
            
                        const uniqueTowns = [...new Set(towns)];
                        setShowCheckIns(true);
                        setCheckIns(membersInstance); 
                        setHoldCheckIns(membersInstance);
                        setTown(uniqueTowns);
                        setMembersName(names);
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
             setShowInput(true);
     
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

     const handleChoice =(item)=> {
       
        const filteredCheckedInByName = checkIns.find((member)=> {
            if(member.name === item){
                return member;
            };
        });

        if (filteredCheckedInByName){
          setCheckIns([filteredCheckedInByName]);
          setMemberName("");
           setShowInput(false);
        };
    };

    const handleExitSearchMode = ()=>{
        fetchCheckIns();
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
            const vol = countValueOccurrences({array: checkIns, keyName: "status", value: "Vol"});
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
                vol: vol,
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
            setIsLoading1(true);
            const firstTimers = await ayzeroxa_backend.trackReturningFirstTimers(dateInput);
            setShowReport({
                firstTimerReport: true,
            });
            setReportDetails1(firstTimers);
            setIsLoading1(false);

        } catch (e) {
            console.error("Error fetching first timers", e);
            setIsLoading1(false);
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
                Missed: ${missedCount}`;
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
            if(parseInt(missedCount) < 1){
                setAlertData({
                    messageIsOpen: true,
                    message: "Must be greater than 0",
                    indicator: "red",
                    bgCol: 'rgba(0, 0, 0, 0.8)',
                    fgCol: '#fff',
                    btnName: 'OK'
                });
                return;
            };
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
               
                if(missedDays.length > 0){
                 const formatted = missedDays.map(([name, missed, lastSeen, category]) => ({
                        name,
                        missed: Number(missed),
                        lastSeen,
                        category, 
                }));

                setReportDetails2(formatted);
                setIsLoading(false);
                setShowReport({
                    missedDaysReport: true,
                });

            }else{
                setAlertData({
                    messageIsOpen: true,
                    message: "No missed days found",
                    indicator: "red",
                    bgCol: 'rgba(0, 0, 0, 0.8)',
                    fgCol: '#fff',
                    btnName: 'OK'
                });
                setIsLoading(false);
            };

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
    const showSearchModeIcon =  !showSearchIcon || !showInput;

 
  return (
    <div className="filter-table">
          {isLoading1 && <DivSpinner mess="Computing..."/>}
           {(checkIns.length > 0 && showCheckIns) &&
           <div className="filters">
                        <div className="count"><FiUsers/> {checkIns.length}</div>
                        <div className="checkin-search-name">
                            {showInput && <Inputs type="text" ph="Enter Name"  value={memberName}  onchange={(e)=>setMemberName(e.target.value)} fs="0.5rem" autoComp="off" wt="100%"/>}
                            {!showInput && <div><FiArrowLeft cursor="pointer" onClick={handleExitSearchMode}/></div>}
                            {filteredData && filteredData.length > 0 ? 
                                <div className='display-items display-items2'>
                                        {filteredData.length > 0 && filteredData.map((item, index)=>
                                            (<ul key={index}>
                                                <li onClick={()=>handleChoice(item)}> <FaUserAlt color='aqua'/> {item} </li> 
                                            </ul>))}
                                </div> 
                                : 
                                null} 
                        </div>
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
                                    ph="Role"
                                    options={["Pastor", "DCN", "Leader", "Worker", "Member", "Vol", "First Timer", "Visitor"]}
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
                                {showSearchIcon && <FiSearch cursor="pointer" onClick={handleSearch} color='white'/>}
                                {!showSearchIcon  && <FaTimes cursor="pointer" onClick={handleExitSearch}/>}
                            </li>
                        </ul>
                        <Tooltip position='right' text="General Report"><div><FaExternalLinkSquareAlt color='aqua' cursor="pointer" onClick={handleShowReport}/></div></Tooltip>
                        <Tooltip position='right' text="Track FirstTimers"><div><FiExternalLink color='aqua' cursor="pointer" onClick={handleTrackExternal}/></div></Tooltip>
                        <div className="missed-days">
                            <Inputs type="number" ph="Missed days"  value={missedCount}  onchange={(e)=>setMissedCount(e.target.value)} fs="0.5rem" autoComp="off" wt="100%"/>
                            <FiSearch cursor="pointer" onClick={handleMissedDays} color='white'/>
                        </div>
            </div>}
          
             <div className="export-search">
                {(checkIns.length > 0) && <ExportToXlsx jsonData={checkIns} fileName="Attendees" bookName="Check-Ins" pd="0.5rem 0"/>}
                {(checkIns.length > 0 && showSearchModeIcon) && <SearchModeBtn pd="0.5rem 0"/>}
            </div>
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
                                                            <td>{checkIn.name.toUpperCase()}</td>
                                                            <td>{checkIn.gender.toUpperCase()}</td>
                                                            <td>{checkIn.status.toUpperCase()}</td>
                                                            <td>{checkIn.town.toUpperCase()}</td>
                                                            <td>{checkIn.category.toUpperCase()}</td>
                                                            <td>{checkIn.channel || "NU"}</td>
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
           
            {(!showCheckIns) && 
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
                    setReport = {setReportDetails1}
                    showMemberAttendanceInfo={showMemberAttendanceInfo}
                  
                />
            }

             {showReport.missedDaysReport && 
                <MissedDaysReport
                    handleExitReport={handleExitReport}
                    copied={copied}
                    setCopied={setCopied}
                    report={reportDetails2}
                    setReport = {setReportDetails2}
                    showMemberAttendanceInfo={showMemberAttendanceInfo}
               
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
