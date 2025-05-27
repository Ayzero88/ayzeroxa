import React from 'react';

const MovingLine = ({bgcon, bg, wt, lwt}) => {
  return (
        <div className="moving-line-container" style={{width: wt, backgroundColor: bgcon}}>
                <div className="moving-line" style={{backgroundColor: bg, width: lwt}}></div>
        </div>
  )
}

export default MovingLine
