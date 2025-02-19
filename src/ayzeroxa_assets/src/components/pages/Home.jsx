import React from 'react';
import Banner from './Banner';
import AXpanel from './AXpanel';

const Home = ({sections, setSections}) => {
  return (
         <div>
             {sections.banner && <Banner setSections={setSections} />}
             {sections.register && <AXpanel setSections={setSections} />}
         </div>
  )
}

export default Home