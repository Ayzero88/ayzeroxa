import React from 'react'
import Logo from './Logo'
import DateSlash from './DateSlash';
import { FiUser } from 'react-icons/fi';
import NumToMonth from './NumToMonth';

const MemberInfo = ({memberInfo}) => {
   
  return (
    <div className='member-info-wrap'>
        <div className='member-info-print-area'>
            <div className='print-logo-wrap'>
                <div className="print-logo"><Logo wt="4rem"/></div>
            
                    <div  className="print-title">
                        <p>Ayzeroxa</p>
                        <p className="print-town">EJIGBO</p>
                    </div>
                
            </div>

            <div className='print-info-wrap'>
                <div className="print-info-title"><p> <FiUser color='aqua'/> Member's Info</p></div>
                <hr/>
                <div className='print-info'>
                    <div className='print-info-details'>
                        <p className='subject'>Date Created:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{DateSlash({isoDate:memberInfo.createdAt}) }</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>First Name:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.firstName || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Surname:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.surName || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Tel:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.tel|| "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Email:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.email || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Sex:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.gender || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Address:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.address || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Status:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.marital || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>DOB:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumToMonth({num:memberInfo.mob }) || "Not Updated"} {memberInfo.dob || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Age Range:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.age || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>NOK:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.nok || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>NOKT:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.nokt || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Born Again:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.bornAgain || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Allow Visit:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.visitYou || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>When:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{DateSlash({isoDate: memberInfo.visitWhen})  || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Speak in tongues:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.tongues || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Channel:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.channel || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Category:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.category || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Role:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.status || "Not Updated"}</p>
                    </div>
                    <hr/>
                     <div className='print-info-details'>
                        <p className='subject'>Cell:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.cell || "Not Updated"}</p>
                    </div>
                    <hr/>
                     <div className='print-info-details'>
                        <p className='subject'>Service FeedBack:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.likeAbout || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Desired Improvement:</p>
                        <p>{memberInfo.doBetter || "Not Updated"}</p>
                    </div>
                    <hr/>
                    <div className='print-info-details'>
                        <p className='subject'>Prayer Point:</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{memberInfo.prayer || "Not Updated"}</p>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default MemberInfo;
