import React, { useState } from 'react'
import Inputs from './Inputs'
import SelectInput from './SelectInput'
import Buttons from './Buttons'
import { FaUser } from 'react-icons/fa'
import SelectInputWithLabel from './SelectInputWithLabel'
import DivSpinner from './DivSpinner'
import MultipleSelector from './MultipleSelector'
import Logo from './Logo'


const RegForm = ({formInput, selectedItems, setSelectedItems, handleFormInputChange, title, handleSubmit, btnText, btnIcon, isLoading, type}) => {
 
   const monthOptions = [
      { label: "JAN", value: 1 },
      { label: "FEB", value: 2 },
      { label: "MAR", value: 3 },
      { label: "APR", value: 4 },
      { label: "MAY", value: 5 },
      { label: "JUN", value: 6 },
      { label: "JUL", value: 7 },
      { label: "AUG", value: 8 },
      { label: "SEP", value: 9 },
      { label: "OCT", value: 10 },
      { label: "NOV", value: 11 },
      { label: "DEC", value: 12 },
    ];

    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const channels = ["Member", "Outreach", "Banner", "Spirit Led", "Visit", "Other"];
    const units = [
      { label: "Protocol", value: "protocol" },
      { label: "BAC", value: "bac" },
      { label: "TAD", value: "tad" },
      { label: "FUP", value: "fup" },
      { label: "Admin", value: "admin" },
      { label: "Edt", value: "edt" },
      { label: "Sanctuary", value: "sanctuary" },
      { label: "Ambience", value: "ambience" },
      { label: "Children", value: "Children" },
      { label: "Teens", value: "Teens" },
      { label: "Vol", value: "vol" },
      { label: "None", value: "none" }
    ];
  return (
    <div className="enroll-wrap">
    <div className="enroll-title"><FaUser size={25} color='aqua'/> <h2>{title}</h2></div>
      <div className="enroll">
            <Logo wt="2rem"/>
          <div className="form">
               {isLoading && <DivSpinner mess={type=== "create" ? "Creating..." : "Updating..."}/>}
               <Inputs type="text" ph="First Name"  name="firstName" value={formInput?.firstName} onchange={handleFormInputChange} autoComp="off"/>
               <Inputs type="text" ph="Surname"  name="surName" value={formInput?.surName} onchange={handleFormInputChange} autoComp="off"/>

               <div className="gender">
                  <div>
                     <p>Male</p>
                     <Inputs type="radio" name="gender" checked={formInput?.gender=== "male"}  value ="male" onchange={handleFormInputChange} autoComp="off"/>
                  </div>
                  <div>
                     <p>Female</p>
                     <Inputs type="radio" name="gender" checked={formInput?.gender=== "female"} value ="female" onchange={handleFormInputChange} autoComp="off"/>
                  </div>
               </div>
               <div>
               <div className="birth-date">
                     <SelectInput 
                        value={formInput?.dob}
                        onChange={handleFormInputChange}
                        name="dob"
                        ph="DOB"
                        options={days}
                     />
                     <SelectInputWithLabel 
                        value={formInput?.mob}
                        onChange={handleFormInputChange}
                        name="mob"
                        ph="MOB"
                        options={monthOptions}
                     />
                     <SelectInput
                        value={formInput?.channel}
                        onChange={handleFormInputChange}
                        name="channel"
                        ph="Channel"
                        options={channels}
                     />
                  </div>
                     
               </div>
               <div className="cat-stat-units">
                     <div>
                     <SelectInput 
                        value={formInput?.category}
                        onChange={handleFormInputChange}
                        name="category"
                        ph="Category"
                        options={["Adult", "Teen", "Child", "Baby"]}
                     />
                  </div>
                  <div>
                     <SelectInput 
                        value={formInput?.status}
                        onChange={handleFormInputChange}
                        name="status"
                        ph="Status"
                        options={["Pastor", "DCN", "Leader", "Worker", "Member", "First Timer"]}
                     />
                  </div>
                  <div>
                     <MultipleSelector  setSelectedItems={setSelectedItems} selectedItems={selectedItems} itemsArray={units}/>
                  </div>
               </div>

               <Inputs type="text" ph="Telephone Number"  name="tel" value={formInput?.tel} onchange={handleFormInputChange} autoComp="off"/>
               
               <Inputs type="text" ph="Address"  name="address" value={formInput?.address} onchange={handleFormInputChange} autoComp="off"/>

               <Inputs type="text" ph="Town"  name="town" value={formInput?.town} onchange={handleFormInputChange} autoComp="off"/>

               
               <Buttons txt={btnText} onclick={handleSubmit} icon={btnIcon}/>
      </div> 
    </div>

     
    </div>
  )
}

export default RegForm
