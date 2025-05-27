import React from 'react';

const SelectInputWithLabel = ({ value, onChange, name, options, ph, wt}) => {
  return (
        <select value={value} onChange={onChange} name={name} style={{width: wt}}>
          <option value={ph} >{ph}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      
  )
}

export default SelectInputWithLabel;
