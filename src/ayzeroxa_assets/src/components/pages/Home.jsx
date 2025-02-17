import React from 'react';
import Banner from './Banner';
import Register from './Register';
import Attendance from './Attendance';

const Home = ({sections, setSections}) => {
  return (
         <div>
             {sections.banner && <Banner setSections={setSections} />}
             {sections.register && <Register setSections={setSections} />}
             {sections.authenticate && <Attendance setSections={setSections} />}
         </div>
  )
}

export default Home