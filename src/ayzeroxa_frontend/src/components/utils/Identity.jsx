import { Principal } from '@dfinity/candid/lib/cjs/idl'
import React from 'react'
import { FaIdCard } from 'react-icons/fa'
import { FiTrash, FiUser } from 'react-icons/fi'

const Identity = ({identity, handleDelete}) => {
  return (
    <div className='identity-wrap'>
            <h2> <FaIdCard color='aqua'/> Registered Identities</h2>
            <hr/>
            <div className='identity-card-wrap'>
               {identity.map(([principal, info], index) =>(
               
                <div className='identity-card' key={index}>
                        <div>
                            <FiUser color={info.authenticated ? 'aqua' : 'gray'}/>
                        </div>
                        <div>
                            <p>ID:</p>
                            <p style={{color: 'lightblue'}}> {principal.toText()}</p>
                        </div>
                        <div>
                            <p>Role:</p>
                            <p style={{color: 'pink'}}>{Object.keys(info.role)[0]}</p>
                        </div>
                        
                        <div className='trash-identity'><FiTrash color="red" cursor="pointer" onClick={()=>handleDelete(principal.toText())}/></div>
                        
                    </div>
            
            ))}
            </div>
            

    </div>
  )
}

export default Identity
