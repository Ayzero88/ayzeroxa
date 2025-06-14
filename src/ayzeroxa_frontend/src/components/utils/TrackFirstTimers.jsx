import React, { useEffect, useRef, useState } from 'react';
import { FaCheck, FaCopy, FaTimes } from 'react-icons/fa';
import { handleCopy } from './UtilFunc';
import { FiSearch, FiUserCheck, FiUserMinus } from 'react-icons/fi';
import Alert from './Alert';
import SelectInput from './SelectInput';
import SearchModeBtn from './SearchModeBtn';
import LoadTel from './LoadTel';

const TrackFirstTimers = ({handleExitReport, copied, setCopied, report, setReport, showMemberAttendanceInfo}) => {
    const divToCopy = useRef(null);
    const [presentTelMap, setPresentTelMap] = useState({});
    const [absentTelMap, setAbsentTelMap] = useState({});
    const [holdReport, setHoldReport] = useState(null);
    const [filterMode, setFilterMode] = useState(false);
    const [alertData, setAlertData] = useState({
        messageIsOpen: false, 
        message: '', 
        indicator: '',
        bgCol: '',
        fgCol: '',
        btnName: '',});

    const [formInput, setFormInput] = useState('');

    const handleFilter = () => {
         if (formInput) {
            setFilterMode(true);
            const filteredReport = {
                    present: report.present.filter(item => item.category === formInput),
                    absent: report.absent.filter(item => item.category === formInput)
                };

                if (filteredReport.present.length === 0 && filteredReport.absent.length === 0) {
                        setAlertData({
                            messageIsOpen: true,
                            message: 'No Record Found!',
                            indicator: 'red',
                            bgCol: 'rgba(0, 0, 0, 0.8)',
                            fgCol: '#fff',
                            btnName: 'Close'
                        });
                         setFilterMode(false);
                    }else{
                         setReport(filteredReport);
                        
                    }; 
            } else {
                setAlertData({
                    messageIsOpen: true,
                    message: 'Please select a category',
                    indicator: 'red',
                    bgCol: 'rgba(0, 0, 0, 0.8)',
                    fgCol: '#fff',
                    btnName: 'Close'
                });
            };
    };
    const handleExitFilter = () => {

        setReport(holdReport);
        setFormInput('');
        setFilterMode(false);
    };

    useEffect(() => {
         const loadTel = async() =>  await LoadTel({report: report, setPre: setPresentTelMap, setAbs: setAbsentTelMap, setHoldReport: setHoldReport});
         report && loadTel();
    }, []);

    

  return (
    <div className='attendance-report-container'>

            <div className='attendance-report-header'>
                <div className='brand'><img src='/oikia logo.png' alt='brand'/></div>
                <h3>First Timers Attendance Report</h3>
            </div>
       
        <div className='attendance-report'>
        <div className='exit-copy-report'>
            {copied ? <FaCheck color='aqua'/> : <FaCopy color='#ccc' size={20} onClick={()=>handleCopy({divToCopy: divToCopy, setCopied: setCopied})} cursor="pointer"/>}
            <div className='filter-select'>
                <SelectInput 
                    value={formInput}
                    onChange={(e)=>setFormInput(e.target.value)}
                    name="category"
                    ph="Category" 
                    options={["Adult", "Teen", "Child", "Baby"]}
                />
                {filterMode ? <FaTimes color='#ccc' onClick={handleExitFilter} cursor="pointer"/> : <FiSearch color='#fff' onClick={handleFilter} cursor="pointer"/>}
            </div>
            <FaTimes color='red' size={20} onClick={handleExitReport} cursor="pointer"/>
        </div>
            
            <div ref={divToCopy} className='attendance-report-details'>
                {filterMode && <SearchModeBtn onclick={handleExitFilter}/>}
                {(report?.present.length > 0) && <div>
                    <p>Report Type:</p>
                    <p>Present</p>
                </div>}
                {report?.present.map((item, index)=>

                    (<div key={index} className="present">
                        <div><FiUserCheck color='aqua' cursor="pointer" onClick={()=>showMemberAttendanceInfo(item.name)}/></div>
                        <div>
                            <p>Name:</p>
                            <p>{item.name}</p>
                        </div>
                         <div>
                            <p>Gender:</p>
                            <p>{item.gender}</p>
                        </div>
                        <div>
                            <p>Tel:</p>
                            <p>{presentTelMap[item.name]}</p>
                        </div>
                    </div>))
                }
                {report.present.length > 0 && <hr/>}
                 {(report?.absent.length > 0) && 
                 <div>
                    <p>Report Type:</p>
                    <p>Absent</p>
                </div>}
               
                {report?.absent.map((item, index)=>

                    (<div key={index} className="absent">
                        <div><FiUserMinus color='red' cursor="pointer" onClick={()=>showMemberAttendanceInfo(item.name)}/></div>
                        <div>
                            <p>Name:</p>
                            <p>{item.name}</p>
                        </div>
                        <div>
                            <p>Gender:</p>
                            <p>{item.gender}</p>
                        </div>
                        <div>
                            <p>Tel:</p>
                            <p>{absentTelMap[item.name]}</p>
                        </div>
                
                    </div>))
                }
                <hr/>
                <div>
                    <p>Pool:</p>
                    <p>{report.present.length + report.absent.length}</p>
                </div>
                <div>
                    <p>Total Present:</p>
                    <p>{report.present.length }</p>
                </div>
                <div>
                    <p>Total Absent:</p>
                    <p>{ report.absent.length}</p>
                </div>
                
            </div>
      
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

export default TrackFirstTimers;
