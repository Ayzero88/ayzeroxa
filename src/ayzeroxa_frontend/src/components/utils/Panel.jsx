import React, { useState } from 'react';
import { FaDashcube, FaIdBadge, FaTimes, FaUsers } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight, FiUserPlus} from 'react-icons/fi';
import Footer from './Footer';
import MovingLine from './MovingLine';
import AttendanceManager from '../dashboard/AttendanceManager';
import Exit from './Exit';
import CreateUser from './CreateUser';
import IdManager from './IdManager';
 

const Panel = ({content, setContent}) => {
    const [showDashBoard, setShowDashBoard] = useState(true);
    const [showExp, setShowExp] = useState(true);

    const handleDashToggle = ()=>{
        setShowDashBoard(prev => !prev);
    };

    const handleContents = (content)=>{
        switch(content) {
            case 1:
                setContent({createUser: true, home: true});
                break;
            case 2:
                setContent({idManager: true, home: true});
                break;
            case 3:
                setContent({attendanceConfig: true, home: true});
                break;
            
        };
    };

    const handleExit = ()=>{
        setContent({home: true});
        setShowExp(true);
    };
  
  return (
    <div className='dash-wrap'>
       { showDashBoard && 

       <div className='dashboard'>
            <h3><FaDashcube color='cyan'/> Axpanel</h3>
            <hr/>
            <div className='dash-menu'>
                    <ul>
                            <li onClick={()=>handleContents(1)}> <FiUserPlus color='aqua'/> Create User </li>
                            <li onClick={()=>handleContents(2)}> <FaIdBadge color='aqua'/> Identity Manager </li>
                            <li onClick={()=>handleContents(3)}> <FaUsers color='aqua'/> Attendance Manager </li>
                    </ul>
                    <Footer/>
            </div>
            
        </div>}
        <div className='cd' style={{width: showDashBoard ? '80%' : "100%"}}>
            {content.home && 
            <div className='dash-title'>
                <div className="panel-logo"><FaDashcube color='cyan' size={50}/></div>
               
                 <h1>AXPANEL</h1>
                 <MovingLine wt="100%" bgcon="transparent"/>
                
            </div>}
            <div className='nav'>
                 <ul>
                    {showExp && <li onClick={handleDashToggle}>{showDashBoard ? <FiArrowLeft size={20} color='#ffff'/> : <FiArrowRight size={20} color='#ffff'/> }</li>}
                    
                 </ul>
            </div>

            {(content.attendanceConfig || content.createUser || content.idManager) &&
            <div className="exit-btn">
                <Exit icon={<FaTimes color='red'/>} handleClick={handleExit} />
            </div>}

            {content.attendanceConfig && <AttendanceManager />}
            {content.createUser && <CreateUser />}
            {content.idManager && <IdManager />}
        </div>
    </div>
  )
}

export default Panel;