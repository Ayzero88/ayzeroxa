import React, { useRef } from 'react';
import { FaCheck, FaCopy, FaTimes } from 'react-icons/fa';
import { handleCopy } from './UtilFunc';
import { FiPhone, FiUserMinus } from 'react-icons/fi';
import DateSlash from './DateSlash';

const MissedDaysReport = ({handleExitReport, getUserNumberTel, copied, setCopied, report}) => {
   
    const divToCopy = useRef(null);
  return (
    <div className='attendance-report-container'>
            <div className='attendance-report-header'>
                <div className='brand'><img src='/oikia logo.png' alt='brand'/></div>
                <h3>Absentism Report</h3>
            </div>
                   
            <div className='attendance-report'>
                    <div className='exit-copy-report'>
                        {copied ? <FaCheck color='aqua'/> : <FaCopy color='#ccc' size={20} onClick={()=>handleCopy({divToCopy: divToCopy, setCopied: setCopied})} cursor="pointer"/>}
                        <FaTimes color='red' size={20} onClick={handleExitReport} cursor="pointer"/>
                    </div>
                    <div ref={divToCopy} className='attendance-report-details'>
                         <div>
                                <p>Number of Meetings Missed:</p>
                                <p>{report[0]?.missed}</p>
                            </div>
                            <hr/>
                        {report && report.length > 0 && report.map((item, index)=>
                            ( 

                                    <div className='absent' key={index}>
                                        <div>
                                            <FiUserMinus color='red' cursor="pointer"/>
                                            <FiPhone color='aqua' cursor="pointer" onClick={()=>getUserNumberTel(item.name)}/>
                                        </div>
                                        <div>
                                            <p>Name:</p>
                                            <p>{item.name}</p>
                                        </div>
                                        <div>
                                            <p>Last Seen:</p>
                                            <p>{DateSlash({isoDate: item.lastSeen})}</p>
                                        </div>
                                </div>
                            ))}
                    </div>
                    

            </div>
    </div>
  )
}

export default MissedDaysReport;
