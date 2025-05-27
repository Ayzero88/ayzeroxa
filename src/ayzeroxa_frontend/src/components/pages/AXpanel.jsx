import React from 'react';
import Header from '../utils/Header';
import Panel from '../utils/Panel';
const AXpanel = ({content, setContent}) => {
  return (
    <div>
        <Header />
        <Panel content={content} setContent={setContent}/>
    </div>
  )
}

export default AXpanel;