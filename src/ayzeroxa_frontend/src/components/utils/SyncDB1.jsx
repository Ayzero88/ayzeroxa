
import { ayzeroxa_backend } from '../../../../declarations/ayzeroxa_backend';
import { getDataFromDB, updateDB} from '../data/IndexedDB';

const SyncDB1 = async() => {
   try {
             const motokoResponse = await ayzeroxa_backend.getAttendance();
            
             const indexedResponse = await getDataFromDB("attendance", "a");
 
             if(indexedResponse){
                    
                     if(motokoResponse.length === 0 && indexedResponse.length > 0)return;
                     if(motokoResponse.length !== indexedResponse.length){
                        
                         await updateDB("attendance", motokoResponse, "a");
                         
                     };
             }else{
                 
                 await updateDB("attendance", motokoResponse, "a");
                 return true;
             };   
         } catch (error) {
             console.error("Failed to parse decrypted data:", error);
             return [];
         };
}

export default SyncDB1;
