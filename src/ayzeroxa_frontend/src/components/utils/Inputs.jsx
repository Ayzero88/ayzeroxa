import React from 'react';

const Inputs = ({type, ph, name, value, onchange, autoComp, ml, bg, wt, col, p, fs, bd }) => {
    const style = {backgroundColor: bg, padding: p, width: wt,  color: col, fontSize: fs, border: bd} ;

  return (
        <input  className="inputs" type={type} placeholder={ph} value={value} onChange={onchange} name={name} autoComplete={autoComp} maxLength={ml} style={{style}}/>
  )
}

export default Inputs;
