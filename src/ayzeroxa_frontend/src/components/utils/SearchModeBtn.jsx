import React from 'react';

const SearchModeBtn = ({onclick, pd}) => {
  return (
    
        <div className='search-mode' onClick={onclick} style={{padding: pd}}><div>Search Result</div></div>
  )
}

export default SearchModeBtn
