
import { ayzeroxa_backend } from "../../../../declarations/ayzeroxa_backend";
import { getDataFromDB, updateDB } from "../data/IndexedDB";


const SyncDB = async() => {

        try {
            const motokoResponse = await ayzeroxa_backend.getEncryptedUsers();
            
            const indexedResponse = await getDataFromDB("members", "m");

            if(indexedResponse){
             
                    if(motokoResponse.length === 0 && indexedResponse.length > 0)return;
                    if(motokoResponse.length !== indexedResponse.length){
                        await updateDB("members", motokoResponse, "m");
                    
                    };
            }else{
                
                await updateDB("members", motokoResponse, "m");
                return true;
            };   
        } catch (error) {
            console.error("Failed to parse decrypted data:", error);
            return [];
        };
};

export default SyncDB;
