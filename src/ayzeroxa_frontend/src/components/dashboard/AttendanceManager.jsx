import React from 'react'
import { FaDatabase} from 'react-icons/fa';
import { MdAppRegistration} from "react-icons/md";
import { HiOutlineKey } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import Buttons from '../utils/Buttons';

const AttendanceManager = () => {

  const navigate = useNavigate();
  const handleGoToEnrollPage = ()=>{
    navigate("/enroll");
  };
  const handleGoToViewPage = ()=>{
     navigate("/view");
  };

  const handleGoToAuthPage = ()=>{
    navigate("/auth");
 };

  return (
    <div className="cd-child">
            <div className="left">
                <div className="left-left">
                    <Buttons txt="Enroll" onclick={handleGoToEnrollPage} icon= {<MdAppRegistration/> }/>
                    <Buttons txt="View" onclick={handleGoToViewPage} icon= {<FaDatabase/> }/>
                    <Buttons txt="Auth" onclick={handleGoToAuthPage} icon={<HiOutlineKey onClick={handleGoToAuthPage} cursor="pointer" size={20}/> }/> 
                </div>
                <div className="left-right"></div>
            </div>

            <div className="right">
                <div className="right-left"></div>
                <div className="right-right"></div>
            </div>
    </div>
  )
}
export default AttendanceManager;
