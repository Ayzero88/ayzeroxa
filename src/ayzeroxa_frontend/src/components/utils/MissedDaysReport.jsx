import React, { useEffect, useRef, useState } from 'react';
import { FaCheck, FaCopy, FaTimes } from 'react-icons/fa';
import { handleCopy } from './UtilFunc';
import { FiSearch} from 'react-icons/fi';
import DateSlash from './DateSlash';
import LoadTel from './LoadTel';
import SelectInput from './SelectInput';
import SearchModeBtn from './SearchModeBtn';
import Alert from './Alert';

const MissedDaysReport = ({handleExitReport, copied, setCopied, report, setReport}) => {

    const [absentTelMap, setAbsentTelMap] = useState({});
    const [presentTelMap, setPresentTelMap] = useState({});
    const [holdReport, setHoldReport] = useState(null);
    const [filterMode, setFilterMode] = useState(false);
    const [formInput, setFormInput] = useState('');
    const [alertData, setAlertData] = useState({
            messageIsOpen: false, 
            message: '', 
            indicator: '',
            bgCol: '',
            fgCol: '',
            btnName: '',});
    const divToCopy = useRef(null);

      const handleFilter = () => {
         if (formInput) {
            setFilterMode(true);
            const filteredReport = {
                    absent: report.filter(item => item.category === formInput)
                };

                if (filteredReport.length === 0) {
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
                         setReport(filteredReport.absent);
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
  const loadTel = async () => {
    const missed = await LoadTel({
      report,
      setPre: setPresentTelMap,
      setAbs: setAbsentTelMap,
      setHoldReport
    });

    setAbsentTelMap(missed || {}); // 👈 You can now log it here
  };

  if (report) {
    loadTel();
  }
}, []);

     
  return (
    <div className='attendance-report-container'>
            <div className='attendance-report-header'>
                <div className='brand'><img src='/oikia logo.png' alt='brand'/></div>
                <h3>Absentism Report</h3>
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
                         <div>
                                <p>Number of Meetings Missed:</p>
                                <p>{report[0]?.missed}</p>
                            </div>
                            <hr/>
                        {report && report.length > 0 && report.map((item, index)=>
                            ( 

                                    <div className='absent' key={index}>
                                         <div>
                                            <p>Tel:</p>
                                            <p>{absentTelMap[item.name]}</p>
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

export default MissedDaysReport;
