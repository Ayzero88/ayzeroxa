import React, { useRef, useState } from 'react';
import { FaCheck, FaCopy, FaTimes } from 'react-icons/fa';
import { handleCopy } from './UtilFunc';
import { FiUserCheck, FiUserMinus } from 'react-icons/fi';
import Alert from './Alert';

const TrackFirstTimers = ({handleExitReport, copied, setCopied, report, showMemberAttendanceInfo}) => {
const divToCopy = useRef(null);
  const [alertData, setAlertData] = useState({
      messageIsOpen: false, 
      message: '', 
      indicator: '',
      bgCol: '',
      fgCol: '',
      btnName: '',});

    
    
  return (
    <div className='attendance-report-container'>

            <div className='attendance-report-header'>
                <div className='brand'><img src='/oikia logo.png' alt='brand'/></div>
                <h3>First Timers Attendance Report</h3>
            </div>
       
        <div className='attendance-report'>
        <div className='exit-copy-report'>
            {copied ? <FaCheck color='aqua'/> : <FaCopy color='#ccc' size={20} onClick={()=>handleCopy({divToCopy: divToCopy, setCopied: setCopied})} cursor="pointer"/>}
            <FaTimes color='red' size={20} onClick={handleExitReport} cursor="pointer"/>
        </div>
            
            <div ref={divToCopy} className='attendance-report-details'>
                {(report?.present.length > 0) && <div>
                    <p>Report Type:</p>
                    <p>Present</p>
                </div>}
                {report && report.present.map((item, index)=>
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
                            <p>{item.tel}</p>
                        </div>
                    </div>))
                }
                {report.present.length > 0 && <hr/>}
                 {(report?.absent.length > 0) && 
                 <div>
                    <p>Report Type:</p>
                    <p>Absent</p>
                </div>}
               
                {report && report.absent.map((item, index)=>

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
                            <p>{item.tel}</p>
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
