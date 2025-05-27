import React, { useRef } from 'react';
import { FaCheck, FaCopy, FaTimes } from 'react-icons/fa';
import { handleCopy } from './UtilFunc';

const AttendanceReport = ({handleExitReport, copied, setCopied, report}) => {
const divToCopy = useRef(null);
    
  return (
    <div className='attendance-report-container'>

            <div className='attendance-report-header'>
                <div className='brand'><img src='/oikia logo.png' alt='brand'/></div>
                <h3>Attendance Report</h3>
            </div>
       
        <div className='attendance-report'>
                <div className='exit-copy-report'>
                    {copied ? <FaCheck color='aqua'/> : <FaCopy color='#ccc' size={20} onClick={()=>handleCopy({divToCopy: divToCopy, setCopied: setCopied})} cursor="pointer"/>}
                    <FaTimes color='red' size={20} onClick={handleExitReport} cursor="pointer"/>
                </div>
            
            
            <div ref={divToCopy} className='attendance-report-details'>
                <div>
                    <p>Report Date:</p>
                    <p>{report.date}</p>
                </div>
                <div>
                    <p>Adult | Male:</p>
                    <p>{report.adultMale}</p>
                </div>
                <div>
                    <p>Adult | Female:</p>
                    <p>{report.adultFemale}</p>
                </div>
                <div>
                    <p>Teenagers:</p>
                    <p>{report.teenagers}</p>
                </div>
                <div>
                    <p>Children:</p>
                    <p>{report.children}</p>
                </div>
                
                <hr/>
                <div>
                    <p>Total:</p>
                    <p>{report.total}</p>
                </div>
                <hr/>
                <div>
                    <p>Workers:</p>
                    <p>{report.workers}</p>
                </div>
                <div>
                    <p>First Timers: </p>
                    <p>{report.firstTimers}</p>
                </div>
            </div>
      
        </div>
    </div>
  )
}

export default AttendanceReport;
