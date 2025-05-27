import React from "react";


const SelectInput = ({ value, onChange, name, options, ph, onClick }) => {
    return (
      <select value={value} onChange={onChange} name={name} >
        <option value={ph} >{ph}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  export default SelectInput;
  