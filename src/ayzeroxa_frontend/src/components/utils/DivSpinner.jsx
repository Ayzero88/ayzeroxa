import React from 'react'
import MovingLine from './MovingLine'

const DivSpinner = ({mess}) => {
  return (
    <div className="spinner-container">

           
           <div className="spinner-content">
                <p>{mess}</p> 
                <MovingLine wt="5rem" lwt="1rem"/>
            </div>
              
              
    </div>
  )
}

export default DivSpinner
