import React, {useState} from 'react';
import Header from '../utils/Header';
import MovingLine from '../utils/MovingLine';
import { FaArrowDown, FaArrowUp, FaHome, FaMousePointer, FaRegAddressBook, FaTimes, FaUserAlt, FaWindowClose } from 'react-icons/fa';
import { FiActivity, FiCalendar, FiCircle, FiFeather, FiFilter, FiHome, FiMapPin, FiPenTool, FiPhone, FiSearch, FiSettings, FiToggleLeft, FiToggleRight, FiTrash, FiUser, FiUsers} from 'react-icons/fi';
import Buttons from '../utils/Buttons';
import RegForm from '../utils/RegForm';
import Inputs from '../utils/Inputs';
import NumToMonth from '../utils/NumToMonth';
import SelectInput from '../utils/SelectInput';
import { MdCake, MdSensorWindow } from 'react-icons/md';
import SelectInputWithLabel from '../utils/SelectInputWithLabel';
import Footer from '../utils/Footer';
import { getDataFromDB } from '../data/IndexedDB';
import BlobToArray from '../crpt/BlobToArray';
import SyncDB from '../utils/SyncDB';
import DivSpinner from '../utils/DivSpinner';
import Tooltip from '../utils/Tooltip';
import { ayzeroxa_backend } from '../../../../declarations/ayzeroxa_backend';
import Alert from '../utils/Alert';


const View = () => {
    const [registry, setRegistry] = useState([]);
    const [holderUsers, setHoldUsers] = useState([]);
    const [sortedRegistry, setSortedRegistry] = useState([]);
    const [tableMess, setTableMess] = useState("Click Fetch...");
    const [edit, setEdit] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [id, setId] = useState('');
    const [formInput, setFormInput] = useState({
        id: "",
        firstName: "",
        surName: "",
        gender: "",
        dob: "",
        mob: "",
        channel: "",
        tel: "",
        address: "",
        town: "",
        status: "",
        category: "",
        unit: "",
        createdAt: "",
    });
    const [oldData, setOldData] =  useState({});
    const [searchInput, setSearchInput] = useState("");
    const [findMe, setFindMe] = useState(false);
    const [memberName, setMemberName] = useState([]);
    const [town, setTown] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [showAdvFilters, setShowAdvFilters] = useState(false);
    const [showCake, setShowCake] = useState(false);
    const [showTownInput, setShowTownInput] = useState(false);
    const [searchTownInput, setSearchTownInput] = useState("");
    const [searchMale, setSearchMale] = useState(false);
    const [searchFemale, setSearchFemale] = useState(false);
    const [advInputs, setAdvInputs] = useState({
            town: "",
            gender: "",
            status: "",
            category: "",
            unit: "",
    });
    const [dateInput, setDateInput] = useState({
        day: "",
        month: "",
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const [oldSelectedItems, setOldSelectedItems] = useState([]);
    const [showSearchIcon, setShowSearchIcon] = useState(true);
    const [showSearchIcon1, setShowSearchIcon1] = useState(true);
    const [showSearchIcon2, setShowSearchIcon2] = useState(true);
    const [showSearchIcon3, setShowSearchIcon3] = useState(true);
    const [showSearchIcon4, setShowSearchIcon4] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [isOn, setIsOn] = useState({
        male: false,
        female: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [alertData, setAlertData] = useState({
        messageIsOpen: false, 
        message: '', 
        indicator: '',
        bgCol: '',
        fgCol: '',
        btnName: '',});

    const handleFormInputChange = (e) => {
        const {name, value} = e.target;
        setFormInput(prev=>{
          return {...prev, [name]:value};
        }); 
    };

    const handleAdvInputChange = (e)=>{
        const {name, value} = e.target;
        setAdvInputs(prev=>({
            ...prev, [name]: value
        }));
    };
    const handleDateChange = (e)=>{
        const {name, value} = e.target;
        setDateInput(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleClearInputs = ()=>{
      setFormInput({
        id: "",
        firstName: "",
        surName: "",
        gender: "",
        dob: "",
        mob: "",
        channel: "",
        tel: "",
        address: "",
        status: "",
        category: "",
        unit: "",
      });

      setSelectedItems([]);
    };
  
    const fetchRegistry = async()=>{
        try {
            setIsLoading(true);
            const indexedDBResponse = await getDataFromDB("members", "m");
       
            if(indexedDBResponse){
              
                    const members = await BlobToArray({encryptedData: indexedDBResponse.data});
                    

                    const names = members.map((member) => {
                        return `${member.firstName} ${member.surName}`;
                    });
        
                    const towns = members.map((member) => {
                        return member.town.toLowerCase();
                    });
        
                    const uniqueTowns = [...new Set(towns)];
        
                    setRegistry(members); 
                    setHoldUsers(members);
                    setMemberName(names)
                    setTown(uniqueTowns);
                    setIsLoading(false);
            }else {

                 setAlertData({
                    messageIsOpen: true, 
                    message: 'No data found! initialize data store', 
                    indicator: "#0077b6", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
                setTableMess("No data found!")
            };
     
        } catch (error) {
                console.error("Error fetching registry", error);
                setAlertData({
                    messageIsOpen: true, 
                    message: 'Error fetching registry', 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
        }finally{
            setIsLoading(false);
        };
    };

    const handleEdit= (id) => {

        const selected = registry.find((reg)=> reg.id === id);
        setFormInput(selected);
        setOldData(selected);
        setEdit(true);
        setId(id);
        setSelectedItems(selected.unit.split(" "));
        setOldSelectedItems(selected.unit.split(" "));
       
    };

    const handleUpdate = async() =>{
     
        if((formInput === oldData ) && (selectedItems.length === oldSelectedItems.length)){
  
            setAlertData({
                    messageIsOpen: true, 
                    message: 'No changes made', 
                    indicator: "#f4ca16", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
            return;
        };
        
        if(!formInput.firstName || !formInput.surName || !formInput.gender || !formInput.tel || !formInput.address || !formInput.status || !formInput.category || selectedItems.length === 0){

             setAlertData({
                    messageIsOpen: true, 
                    message: 'All fields are required', 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
            return;
         };

         const stringifyUnits = selectedItems.join(" ");

         const formInputUpdate = {
            ...formInput, 
            town: formInput.town.toLowerCase(),
            unit: stringifyUnits,
         };

         setIsLoading1(true);

         const response = await ayzeroxa_backend.updateUser(formInputUpdate);
       
         if(response){
       
             setAlertData({
                    messageIsOpen: true, 
                    message: `You successfully updated ${formInput.firstName} ${formInput.surName}'s profile.`, 
                    indicator: "aqua", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
            
            handleExit();
            await SyncDB();
            fetchRegistry();
            setIsLoading1(false)
            
         }else{

              setAlertData({
                    messageIsOpen: true, 
                    message: "Error updating profile", 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
         };

        try {
            
        } catch (error) {
            console.error("Error updating profile", error);
                setAlertData({
                    messageIsOpen: true, 
                    message: "Error updating profile", 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
        }finally{
            setIsLoading1(false);
        };
    };

    const handleDelete = async(id) =>{
        const selectedId = registry.find((reg)=> reg.id === id);

        if (!selectedId) {
          
                setAlertData({
                    messageIsOpen: true, 
                    message: "User not found!", 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
            return;
        };
        const newRegistry = registry.filter(reg => reg.id !== selectedId.id);
        setRegistry(newRegistry);

        try {
               setIsLoading2(true);
                const response = await ayzeroxa_backend.deleteUser(selectedId.id);
            
                if(response){
                  
                setAlertData({
                    messageIsOpen: true, 
                    message: "Member was deleted successfully!", 
                    indicator: "aqua", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
                    await SyncDB();
                    setIsLoading2(false);
                }else{
                   
                setAlertData({
                    messageIsOpen: true, 
                    message: "Failed to delete member", 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
                }

        } catch (error) {
            console.error("Error: deleting a member", error);  
                setAlertData({
                    messageIsOpen: true, 
                    message: "Error deleting member", 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
        }finally{
            setIsLoading2(false);
        };

    };

    const handleShowSearch = ()=>{
        setShowFilters(false);
        setShowAdvFilters(false);
        setShowCake(false);
        if(registry.length > 0){
            setFindMe(prev => !prev);
            if(findMe){
                setIsSorted(false);
            }
        }else{
                setAlertData({
                    messageIsOpen: true, 
                    message: "Fetch registry to find me.", 
                    indicator: "#0077b6", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
        };
    };

    const handleShowTownInput= () =>{

        if(registry.length > 0){
            setShowTownInput(true);
        };

    };

    const handleExit = ()=>{
        handleClearInputs();
        setEdit(false);
    };

    const escapeRegExp=(string)=> {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }; 

    const escapedSearchInput = escapeRegExp(searchInput);
    const escapedSearchInput1 = escapeRegExp(searchTownInput);
    const escapedSearchInput2 = escapeRegExp(advInputs.town);

    let filteredData;
    let filteredTown;
    let filteredTown1

    if(searchInput.length > 0){
        filteredData= memberName.length > 0 && memberName.filter((name)=> {
        
          if (!name) return null; // Skip if name is falsy
          
          const regex = new RegExp(`^${escapedSearchInput.slice(0,3)}`, 'i'); // 'i' flag for case-insensitive matching
          
          return regex.test(name);

      });
    };
    if(searchTownInput.length > 0){
        filteredTown= town.length > 0 && town.filter((name)=> {
        
          if (!name) return null; // Skip if name is falsy
          
          const regex = new RegExp(`^${escapedSearchInput1.slice(0,3)}`, 'i'); // 'i' flag for case-insensitive matching
          
          return regex.test(name);

      });
    };
    if(advInputs.town.length > 0){
        filteredTown1= town.length > 0 && town.filter((name)=> {
        
          if (!name) return null; // Skip if name is falsy
          
          const regex = new RegExp(`^${escapedSearchInput2.slice(0,3)}`, 'i'); // 'i' flag for case-insensitive matching
          
          return regex.test(name);

      });
    };

    const handleChoice =(item)=> {
       
        const filteredRegistryByName = registry.find((member)=> {
            const firstName = member.firstName;
            const surName = member.surName;
            const fullName = `${firstName} ${surName}`;

            if(fullName === item){
                return member;
            };
        });
        if (filteredRegistryByName){
          
            setSortedRegistry([filteredRegistryByName]);
            setSearchInput('');
            setIsSorted(true);
        };
    };

    const handleChoiceTown =(item)=> {
        const filteredRegistryByTown = registry.filter((member)=> member.town === item);
        if (filteredRegistryByTown.length > 0){
            setSortedRegistry(filteredRegistryByTown);
            setSearchTownInput('');
            setIsSorted(true);
            setDisabled(true);
            setIsOn({male: true, female: true});
            setAdvInputs({
                town: "",
                gender: "",
                status: "",
                category: "",
                unit: "",
        })
        };
    };

    const handleChoiceTown1 =(item)=> {
           setAdvInputs(prev=>({...prev, town: item}));     
    };

    const handleShowFilters = ()=>{
        setFindMe(false);
        setShowAdvFilters(false);
        setShowCake(false);
        if(registry.length > 0){
            setShowFilters(prev=> !prev);
            setSearchMale(false);
            setSearchFemale(false);
        }else{
         
            setAlertData({
                    messageIsOpen: true, 
                    message: "Fetch registry to find me.", 
                    indicator: "#0077b6", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
            
        };
    };

    const handleSearchMale = ()=>{

        setSearchMale(prev => !prev);
        setSearchFemale(false);
        if(searchMale) {
            setRegistry(holderUsers);
            setIsOn({female: false});
            setDisabled(false); 
            return;
        };
        
        const getMales = registry.filter((member)=> member.gender === "male");
        setRegistry(getMales);
        setIsOn({female: true}); 
        setDisabled(true);
    };

    const handleSearchFemale = ()=>{
        setSearchFemale(prev => !prev);
        setSearchMale(false);
        if(searchFemale) {
            setRegistry(holderUsers);
            setIsOn({male: false});
            setDisabled(false); 
            return;
        };
       
        const getFemales = registry.filter((member)=> member.gender === "female");
        setRegistry(getFemales);
        setIsOn({male: true});
        setDisabled(true); 
    
        
    };

    const handleShowAdvFilters = ()=>{
        setFindMe(false);
        setShowFilters(false);
        setShowCake(false);
        if(registry.length > 0){
            setShowAdvFilters(prev => !prev)
        }else{
          
            setAlertData({
                    messageIsOpen: true, 
                    message: "Fetch registry to find me.", 
                    indicator: "#0077b6", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
        };
    };

    const handleCakeFilters =()=>{
        setFindMe(false);
        setShowFilters(false);
        setShowAdvFilters(false);
        if(registry.length > 0){
            setShowCake(prev => !prev);
        }else{
    
            setAlertData({
                    messageIsOpen: true, 
                    message: "Fetch registry to find me.", 
                    indicator: "#0077b6", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
        };
    };

    const handleSearchCategories = () =>{
        setIsOn({male: true, female: true});
        setFormInput({...formInput, status: "", unit: ""});
        const getCategory = registry.filter((member)=> member.category === formInput.category);
        handleSearchMess(getCategory);
        setShowSearchIcon(false);
        setRegistry(getCategory);  
        setShowSearchIcon(false);
        setDisabled(true);
    };

    const handleExitCategories = () =>{
        setRegistry(holderUsers);
        setShowSearchIcon(true);
        setFormInput({...formInput, category: ""});
        setDisabled(false);
        setIsOn({male: false, female: false});
    };


    const handleSearchStatus = () =>{
        setIsOn({male: true, female: true});
        const getStatus = registry.filter((member)=> member.status === formInput.status);
        handleSearchMess(getStatus);
        setRegistry(getStatus);  
        setShowSearchIcon1(false);
        setDisabled(true);
    };

    const handleExitStatus = () =>{
        setRegistry(holderUsers);
        setShowSearchIcon1(true);
        setFormInput({...formInput, status: ""});
        setDisabled(false);
        setIsOn({male: false, female: false});
    };

    const handleSearchUnit = () =>{
        setIsOn({male: true, female: true});
        const getUnit = registry.filter(member => {
            const units = member.unit.split(" ");
            return units.includes(formInput.unit.toLowerCase());
          });

        handleSearchMess(getUnit);
        setRegistry(getUnit);  
        setShowSearchIcon2(false);
        setDisabled(true);
    };

    const handleExitUnit = () =>{
        setRegistry(holderUsers);
        setShowSearchIcon2(true);
        setFormInput({...formInput, unit: ""});
        setDisabled(false);
        setIsOn({male: false, female: false});
    };

    const handleSearchMess = (res)=>{
        if(res.length === 0){
        
            setAlertData({
                    messageIsOpen: true, 
                    message: "No data found! click on exit (X).", 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
            return;
      };
    };
    const handleExitTown = ()=>{
        setShowTownInput(false);
        setRegistry(holderUsers);
        setIsOn({male: false, female: false});
        setDisabled(false);
        setIsSorted(false)
      
    };

    // **Search function**: Runs only when the button is clicked
    const handleAdvSearch = () => {
        const results = registry.filter((item) =>
          Object.keys(advInputs).every((key) => {
            const inputValue = advInputs[key].trim().toLowerCase();
      
            if (inputValue === "") return true; // skip empty inputs
      
            if (key === "unit") {
              const units = item.unit.toLowerCase().split(" ");
              return units.includes(inputValue); // check if unit matches
            }
      
            return item[key]?.toLowerCase() === inputValue; // match other fields
          })
        );
      
        if (results.length > 0) {
          handleSearchMess(results);
          setRegistry(results);
          setShowSearchIcon3(false);
        } else {
      
           setAlertData({
                    messageIsOpen: true, 
                    message: "No search parameter entered.", 
                    indicator: "red", 
                    bgCol: 'rgba(0, 0, 0, 0.8)', 
                    fgCol: '#fff', 
                    btnName: 'Close'});
          
        }
      };
      
  const handleExitAdvSearch = ()=>{
    setRegistry(holderUsers);
    setShowSearchIcon3(true);
    setShowAdvFilters(true);
    setAdvInputs({
            town: "",
            gender: "",
            status: "",
            category: "",
            unit: "",
    })
  };

  const handleCakeSearch = () =>{
        const getBirthDay = registry.filter((dob)=> {
                const day = dob.dob;
                const month = dob.mob;
                return `${day} ${month}` === `${dateInput.day} ${dateInput.month}` || `${month}` === `${dateInput.month}`;
                
        });
        handleSearchMess(getBirthDay);
        setRegistry(getBirthDay);
        setShowSearchIcon4(false);
        
  };

  const handleExitCakeSearch = () =>{
        setRegistry(holderUsers);
        setShowSearchIcon4(true);
        setDateInput({day: "", month: ""});
  };

    const fetchColor  = registry.length > 0 ? "lime" : "gray" 
    const findMeColor  = findMe ? "lime" : "gray" 
    const filtersColor  = showFilters ? "lime" : "gray" 
    const advFiltersColor  = showAdvFilters ? "lime" : "gray" 
    const cakeColor  = showCake ? "lime" : "gray" 

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

   const style={
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1,
        userSelect: disabled ? "none" : "auto",
        cursor: disabled ? "not-allowed" : "pointer",
      };
   

  return (
    <div>
            <Header/>
            <div className="registry">
                <div className="page-title"><FaRegAddressBook size={20}/> <h3>REGISTRY</h3> </div>
                <MovingLine wt="8rem"/>
                <div  className="registry-panel" style={{marginTop: "1rem"}}>
                    <Buttons txt="Fetch" icon={isSorted ? <FiFilter color='lime'/> :  <FaArrowDown color={fetchColor}/>} onclick={fetchRegistry}/>
                    {registry.length > 0 && 
                        <div className="count"><FiUsers/> {isSorted ? sortedRegistry.length : registry.length}</div>}
                    <Tooltip text="Find By First Name" position='bottom'><FiSearch cursor="pointer" onClick={handleShowSearch} color={findMeColor} /></Tooltip>
                   {findMe && 
                     <div className="search-wrap" >
                        <Inputs type="text"  wt="100%" ph="Find me via first name" value={searchInput}  onchange={(e)=>setSearchInput(e.target.value)} fs="1rem" autoComp="off"/> 
                        {filteredData && filteredData.length > 0 ? 
                          <div className='display-items'>
                                  {filteredData.length > 0 && filteredData.map((item, index)=>
                                      (<ul key={index}>
                                          <li onClick={()=>handleChoice(item)}> <FaUserAlt color='aqua'/> {item} </li> 
                                      </ul>))}
                          </div> 
                          : 
                          null} 
                    </div>}
                    
                    <div className="filters">
                    <Tooltip text="Filter" position='bottom'><FiFilter cursor="pointer" onClick={handleShowFilters} color={filtersColor} /></Tooltip>
                        {showFilters && <ul>
                           {!isOn.male && <li>Male {searchMale ? <FiToggleRight size={20} cursor="pointer" onClick={handleSearchMale} color='lime'/> : <FiToggleLeft size={20} cursor="pointer" onClick={handleSearchMale}/>}</li>}
                           {!isOn.female &&  <li> Female {searchFemale ? <FiToggleRight size={20} cursor="pointer" onClick={handleSearchFemale} color='lime'/> : <FiToggleLeft size={20} cursor="pointer" onClick={handleSearchFemale}/>}</li>}
                           
                            <li style={style}>
                            <SelectInput 
                                value={formInput?.category}
                                onChange={handleFormInputChange}
                                name="category"
                                ph="Category"
                                options={["Adult", "Teen", "Child", "Baby"]}
                                />
                            </li>
                            {showSearchIcon && ((formInput.category && formInput.category !== "Category") && (<FiSearch cursor="pointer" onClick={handleSearchCategories} style={style}/>))}
                            {!showSearchIcon && <FaTimes cursor="pointer" onClick={handleExitCategories}/>}
                            <li  style={style}>
                                <SelectInput 
                                    value={formInput?.status}
                                    onChange={handleFormInputChange}
                                    name="status"
                                    ph="Status"
                                    options={["Pastor", "DCN", "Leader", "Worker", "Member", "First Timer", "Visitor"]}
                                />
                            </li>
                            {showSearchIcon1 && ((formInput.status && formInput.status !== "Status") && (<FiSearch cursor="pointer" onClick={handleSearchStatus} style={style}/>))}
                            {!showSearchIcon1 && <FaTimes cursor="pointer" onClick={handleExitStatus}/>}
                            <li  style={style}>
                                    <SelectInput 
                                        value={formInput?.unit}
                                        onChange={handleFormInputChange}
                                        name="unit"
                                        ph="Unit"
                                        options={["Protocol", "BAC", "TAD", "FUP", "Admin", "Edt", "Ambience", "Children", "Teens", "Vol", "none"]}
                                    />
                            </li>
                            {showSearchIcon2 && ((formInput.unit && formInput.unit !== "Category") && (<FiSearch cursor="pointer" onClick={handleSearchUnit} style={style}/>))}
                            {!showSearchIcon2 && <FaTimes cursor="pointer" onClick={handleExitUnit}/>}
                            <li className="town">
                                    {showTownInput ? <FaWindowClose onClick={handleExitTown}/> : <FiSearch onClick={handleShowTownInput}/> } Town
                                    {showTownInput && <Inputs type="text" ph="Find me via town" value={searchTownInput}  onchange={(e)=>setSearchTownInput(e.target.value)} fs="1rem" autoComp="off"/> }
                                        {filteredTown && filteredTown.length > 0 ? 
                                                <div className='display-items'>
                                                        {filteredTown.length > 0 && filteredTown.map((item, index)=>
                                                            (<ul key={index}>
                                                                <li onClick={()=>handleChoiceTown(item)}> <FaHome color='aqua'/> {item} </li> 
                                                            </ul>))}
                                                </div> 
                                                : 
                                            null} 
                            </li>
                        </ul>}
                    </div>
                    <Tooltip text="Advance Filter" position='bottom'><MdSensorWindow cursor="pointer" onClick={handleShowAdvFilters} color={advFiltersColor} /> </Tooltip> 
                    {showAdvFilters && 
                        <div className="advance">
                                 {showSearchIcon3 && <FiSearch cursor="pointer" onClick={handleAdvSearch} style={style}/>}
                                 {!showSearchIcon3 && <FaTimes cursor="pointer" onClick={handleExitAdvSearch}/>}
                                <Inputs type="text" value={advInputs?.town} ph="Town" name="town"  onchange={handleAdvInputChange} fs="1rem" autoComp="off"/> 
                                {filteredTown1 && filteredTown1.length > 0 ? 
                                                <div className='display-items adj-display'>
                                                        {filteredTown1.length > 0 && filteredTown1.map((item, index)=>
                                                            (<ul key={index}>
                                                                <li onClick={()=>handleChoiceTown1(item)}> <FaHome color='aqua'/> {item} </li> 
                                                            </ul>))}
                                                </div> 
                                                : 
                                            null} 
                                
                                <div className="cat-stat-unit">
                               
                                    <SelectInput 
                                            value={advInputs?.gender}
                                            onChange={handleAdvInputChange}
                                            name="gender"
                                            ph="Gender"
                                            options={["male", "female"]}
                                        />
                                        <SelectInput 
                                            value={advInputs?.status}
                                            onChange={handleAdvInputChange}
                                            name="status"
                                            ph="Status"
                                            options={["Pastor", "DCN", "Leader", "Worker", "Member", "First Timer", "Visitor"]}
                                        />
                                        <SelectInput 
                                            value={advInputs?.category}
                                            onChange={handleAdvInputChange}
                                            name="category"
                                            ph="Category"
                                            options={["Adult", "Teen", "Child", "Baby"]}
                                        />
                                        <SelectInput 
                                            value={advInputs?.unit}
                                            onChange={handleAdvInputChange}
                                            name="unit"
                                            ph="Unit"
                                            options={["Protocol", "BAC", "TAD", "FUP", "Admin", "Edt", "Sanctuary", "Ambience", "Children", "Teens", "Vol", "none"]}
                                        />

                                       
                                </div>
                            
                        </div>}
                        <Tooltip text="Search Birthdays" position='bottom'><MdCake cursor="pointer" onClick={handleCakeFilters} color={cakeColor} /></Tooltip>  
                    <div>
                    {showCake && 
                    <div className="birthDate">
                        <SelectInput 
                            value={dateInput?.day}
                            onChange={handleDateChange}
                            name="day"
                            ph="Day"
                            options={days}
                        />
                        <SelectInputWithLabel 
                            value={dateInput?.month}
                            onChange={handleDateChange}
                            name="month"
                            ph="Month"
                            options={monthOptions}
                        />

                        {showSearchIcon4 && <FiSearch cursor="pointer" onClick={handleCakeSearch} style={style}/>}
                        {!showSearchIcon4 && <FaTimes cursor="pointer" onClick={handleExitCakeSearch}/>}
             </div>}
                    </div>
                    
                </div>
                <div className="table-wrap">
                        {isLoading && <DivSpinner mess="Fetching..."/>}
                        {isLoading2 && <DivSpinner mess="Deleting..."/>}
                        <table>
                            <thead>
                                <tr>
                                    <th><FiUser color='aqua'/> SN</th>
                                    <th><FiUser color='aqua'/> FN</th>
                                    <th><FiHome color='aqua'/> ADDRESS</th>
                                    <th><FiMapPin color='aqua'/> TOWN</th>
                                    <th><FiPhone color='aqua'/> TEL</th>
                                    <th><FiUsers color='aqua'/> SEX</th>
                                    <th><FiCalendar color='aqua'/> DOB</th>
                                    <th><FiCalendar color='aqua'/> MOB</th>
                                    <th><FiActivity color='aqua'/> CAT</th>
                                    <th><FiFeather color='aqua'/> STAT</th>
                                    <th><FiCircle color='aqua'/> UNIT</th>
                                    <th><FiSettings color='aqua'/> ACTION</th>
                                </tr>
                            </thead>
                          
                            <tbody>
                                {registry.length > 0 ? 
                                
                                    (isSorted ? sortedRegistry : registry).map((reg, index) =>(

                                        <tr key={reg.id}>
                                                <td>{reg.surName}</td>
                                                <td>{reg.firstName}</td>
                                                <td>{reg.address}</td>
                                                <td>{reg.town}</td>
                                                <td>{reg.tel}</td>
                                                <td>{reg.gender}</td>
                                                <td>{reg.dob}</td>
                                                <td>{NumToMonth({num: reg.mob})}</td>
                                                <td>{reg.category}</td>
                                                <td>{reg.status}</td>
                                                <td>{reg.unit}</td>
                                                <td><div style={{display: "flex", gap: "1rem", justifyContent: "center"}}>
                                                <Tooltip text="Edit" position='bottom'><FiPenTool color='#ccc' cursor="pointer" onClick = {()=>handleEdit(reg.id)}/></Tooltip>
                                                <Tooltip text="Delete" position='bottom'><FiTrash color='red' cursor="pointer" onClick = {()=>handleDelete(reg.id)} /></Tooltip>
                                                    </div></td>
                                        </tr>

                                    )) : <tr><td onClick={fetchRegistry} style={{cursor: "pointer"}}> <FaMousePointer/> {tableMess}</td></tr>
                            }
                            </tbody>
                        </table>
                </div>
                {edit && 
                <div className="update-wrap">
                        <FaTimes color='red' size={20} onClick={handleExit} cursor="pointer"/>
                        <RegForm 
                            title="Update Profile" 
                            btnText="Update" 
                            btnIcon={<FaArrowUp/>} 
                            formInput={formInput} 
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems} 
                            handleFormInputChange={handleFormInputChange} 
                            handleSubmit={handleUpdate} 
                            isLoading={isLoading1} 
                            type="update"/>
                
                </div>}
            </div>
            <div style={{display: "flex", justifyContent: "center", marginBottom: "1rem"}}> <Footer/></div>

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

export default View
