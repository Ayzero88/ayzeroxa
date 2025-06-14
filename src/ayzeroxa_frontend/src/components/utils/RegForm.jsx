import React, { useEffect, useRef } from 'react'
import Inputs from './Inputs'
import SelectInput from './SelectInput'
import Buttons from './Buttons'
import SelectInputWithLabel from './SelectInputWithLabel'
import DivSpinner from './DivSpinner'
import MultipleSelector from './MultipleSelector'
import Logo from './Logo'
import { FiUser } from 'react-icons/fi'


const RegForm = ({formInput, setFormInput, selectedItems, setSelectedItems, handleFormInputChange, title, handleSubmit, btnText, btnIcon, isLoading, type}) => {
   const hasLoaded = useRef(false); // to track if formInput was loaded from storage
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
    const channels = ["Member", "Outreach", "Banner", "Spirit Led", "Visit", "Online", "Other"];
    const category = ["Adult", "Teen", "Child", "Baby"];
    const role = ["Pastor", "DCN", "Leader", "Worker", "Member", "Vol", "First Timer", "Visitor"];
    const employed =["Employed", "Unemployed", "Self Employed", "Student"];
    const marital = ["Married", "Single", "Widow", "Widower", "Divorced"];
    const yesOrNo = ["Yes", "No"];
    const ageRange = ["0-10", "11-18", "18-25", "26-35", "36-45", "46-55", "Above 55"]
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

 useEffect(() => {
  const retrieveEntries = () => {
    const retrieved = sessionStorage.getItem("fI");
    if (retrieved) {
      const data = JSON.parse(retrieved);
      setFormInput(data);
      setTimeout(() => {
        hasLoaded.current = true;
      }, 0);
    } else {
      hasLoaded.current = true; // still allow saving later if nothing was stored
    };
  };

  retrieveEntries();
}, []);

useEffect(() => {
  if (!hasLoaded.current) return;
  const saveEntries = () => {
    const entries = JSON.stringify(formInput);
    sessionStorage.setItem("fI", entries);
  };
  saveEntries();
}, [formInput]);
  return (
    <div className="enroll-wrap">
    <div className="enroll-title"><FiUser size={25} color='aqua'/> <h2>{title}</h2></div>
      <div className="enroll">
            <div className='enroll-logo'><Logo wt="2rem"/></div>
          <div className="form">
               {isLoading && <DivSpinner mess={type=== "create" ? "Creating..." : "Updating..."}/>}
               <div className='form-inputs'>
                   <Inputs type="text" ph="First Name *"  name="firstName" value={formInput?.firstName ?? ""} onchange={handleFormInputChange} autoComp="off"/>
                  <Inputs type="text" ph="Surname *"  name="surName" value={formInput?.surName ?? ""} onchange={handleFormInputChange} autoComp="off"/>
               </div>
               <div className='form-inputs'>
                  <Inputs type="email" ph="Email"  name="email" value={formInput?.email ?? ""} onchange={handleFormInputChange} autoComp="off"/>
                  <Inputs type="text" ph="Telephone Number *"  name="tel" value={formInput?.tel ?? ""} onchange={handleFormInputChange} autoComp="off"/>
               </div>
                <div className='form-inputs'>
                   <Inputs type="text" ph="Address"  name="address" value={formInput?.address ?? ""} onchange={handleFormInputChange} autoComp="off"/>
                  <Inputs type="text" ph="Town *"  name="town" value={formInput?.town ?? ""} onchange={handleFormInputChange} autoComp="off"/>

               </div>
               <div className='form-inputs'>
                   <Inputs type="text" ph="Next of Kin"  name="nok" value={formInput?.nok ?? ""} onchange={handleFormInputChange} autoComp="off"/>
                  <Inputs type="text" ph="Next of Kin Tel"  name="nokt" value={formInput?.nokt ?? ""} onchange={handleFormInputChange} autoComp="off"/>

               </div>
              
              <div className='form-select'>
                        <div className="gender">
                           <div>
                              <p>Male*</p>
                              <Inputs type="radio" name="gender" checked={formInput?.gender=== "male"}  value ="male" onchange={handleFormInputChange} autoComp="off"/>
                           </div>
                           <div>
                              <p>Female</p>
                              <Inputs type="radio" name="gender" checked={formInput?.gender=== "female"} value ="female" onchange={handleFormInputChange} autoComp="off"/>
                           </div>
                           <div>
                              <SelectInput
                                 value={formInput?.employed ?? ""}
                                 onChange={handleFormInputChange}
                                 name="employed"
                                 ph="Employed?"
                                 options={employed}
                              />
                           </div>
                           <div>
                              <SelectInput
                                 value={formInput?.bornAgain ?? ""}
                                 onChange={handleFormInputChange}
                                 name="bornAgain"
                                 ph="Born Again?"
                                 options={yesOrNo}
                              />
                           </div>
                        </div>
                        <div>
                           <div className="birth-date">
                                 <SelectInput 
                                    value={formInput?.dob ?? ""}
                                    onChange={handleFormInputChange}
                                    name="dob"
                                    ph="DOB"
                                    options={days}
                                 />
                                 <SelectInputWithLabel 
                                    value={formInput?.mob ?? ""}
                                    onChange={handleFormInputChange}
                                    name="mob"
                                    ph="MOB"
                                    options={monthOptions}
                                 />
                                 <SelectInput
                                    value={formInput?.channel ?? ""}
                                    onChange={handleFormInputChange}
                                    name="channel"
                                    ph="Channel"
                                    options={channels}
                                 />
                                 <SelectInput
                                    value={formInput?.marital ?? ""}
                                    onChange={handleFormInputChange}
                                    name="marital"
                                    ph="Marital"
                                    options={marital}
                                 />
                                 
                           </div>
              </div>
               
                     
               </div>
           
                     <div className="cat-stat-units">
                        <div>
                        <SelectInput 
                           value={formInput?.category ?? ""}
                           onChange={handleFormInputChange}
                           name="category"
                           ph="Category *"
                           options={category}
                        />
                     </div>
                     <div>
                        <SelectInput 
                           value={formInput?.status ?? ""}
                           onChange={handleFormInputChange}
                           name="status"
                           ph="Role *"
                           options={role}
                        />
                     </div>
                     <div>
                        <SelectInput 
                           value={formInput?.age ?? ""}
                           onChange={handleFormInputChange}
                           name="age"
                           ph="Age-Range"
                           options={ageRange}
                        />
                     </div>
                     <div>
                        <MultipleSelector  setSelectedItems={setSelectedItems} selectedItems={selectedItems} itemsArray={units}/>
                     </div>
                  </div>
                  <div className='first-timers-wrap'>
                        <div className='tongues-visit-date'>
                              <SelectInput 
                                 value={formInput?.tongues ?? ""}
                                 onChange={handleFormInputChange}
                                 name="tongues"
                                 ph="Tongues?"
                                 options={yesOrNo}
                              />
                              <SelectInput 
                                 value={formInput?.visitYou ?? ""}
                                 onChange={handleFormInputChange}
                                 name="visitYou"
                                 ph="Visit you?"
                                 options={yesOrNo}
                              />
                              <div className='first-timer-when'>
                                 <p>When?:</p>
                                 <div className="date-container"><Inputs type="date" wt="5rem" name="visitWhen" value={formInput?.visitWhen ?? ""} onchange={handleFormInputChange}/> </div>
                              </div>
                              
                        </div>
                           
                              <Inputs type="text" ml={100} name="likeAbout" ph="What do like about the service?" value={formInput?.likeAbout ?? ""} onchange={handleFormInputChange} autoComp="off"/>  
                              <Inputs type="text" ml={100} name="doBetter" ph="What improvement will you love to see?" value={formInput?.doBetter ?? ""} onchange={handleFormInputChange} autoComp="off"/>  
                              <Inputs type="text" ml={150} name="prayer" ph="Prayer Point?" value={formInput?.prayer ?? ""} onchange={handleFormInputChange} autoComp="off"/>  
                  </div>
               </div>
               <Buttons txt={btnText} onclick={handleSubmit} icon={btnIcon}/>
      </div> 
    </div>
  )
}

export default RegForm;
