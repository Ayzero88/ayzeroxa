import React from 'react'
import { FiActivity, FiArrowDownRight, FiCheck, FiFeather, FiMapPin, FiUser, FiUsers } from 'react-icons/fi';
import DivSpinner from './DivSpinner';
import { FaTimes } from 'react-icons/fa';

const Member = ({handleCheckIn, handleExitCheckIn, membersData, isLoading}) => {

  return (
    <div className="member">
            {isLoading && <DivSpinner mess="Checking in..."/>}
            <div className="check-in">
                  
                  <div><FaTimes color='aqua' cursor="pointer" onClick = {handleExitCheckIn}/></div>
                  <div><FiCheck color='aqua' cursor="pointer" onClick = {handleCheckIn}/></div>
                  
            </div>

            <div><h2><FiUser color='aqua' /> {membersData.firstName} {membersData.surName}</h2></div>
            <div>
                <p><FiFeather color='aqua'/> {membersData.status}</p>
            </div>
            <div>
                <p><FiActivity color='aqua'/> {membersData.category}</p>
            </div>

            <div>
                <p><FiUsers color='aqua'/> {membersData.gender}</p>
            </div>

            <div>
                <p><FiMapPin color='aqua'/> {membersData.town}</p>
            </div>

            {membersData.channel && <div>
                <p><FiArrowDownRight color='aqua'/> {membersData.channel}</p>
            </div>}
      
    </div>
  )
}

export default Member;
