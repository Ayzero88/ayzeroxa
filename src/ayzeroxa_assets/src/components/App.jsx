import React, { useState } from 'react';
import Home from './pages/Home';

const App = () => {

    const [sections, setSections] = useState({
        register: false,
        authenticate: false,
        banner: true,
     });
    

  return (
    <div>
            <Home  sections={sections} setSections={setSections}/>
    </div>
  )
}

export default App