

export const handleCopy = ({divToCopy, setCopied}) =>{
    const content = divToCopy.current.innerText; // Use innerHTML if you want raw HTML
    navigator.clipboard.writeText(content)
      .then(() => console.log('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
    setCopied(true);
    setTimeout(()=>{
        setCopied(false);
    }, 1000)

};

  export const countValueOccurrences = ({array, keyName, value}) =>{
    return array.reduce((count, obj) => {
      return obj[keyName] === value ? count + 1 : count;
    }, 0);
  }
  

  export const countMatchingPairs = ({array, key1, value1, key2, value2})=> {
    return array.reduce((count, obj) => {
      return obj[key1] === value1 && obj[key2] === value2 ? count + 1 : count;
    }, 0);
  }
  
  
  