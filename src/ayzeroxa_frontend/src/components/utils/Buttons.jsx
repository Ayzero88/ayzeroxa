
import React from 'react';

const Buttons = ({bg, p, wt, col, txt, onclick, icon, disabled}) => {
    const style = {backgroundColor: bg, padding: p, width: wt,  color: col};
  return (
    <button className=".button" onClick={onclick} style={style} disabled={disabled}> {icon} {txt} </button>
  )
};

export default Buttons;
