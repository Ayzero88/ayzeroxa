
import { ayzeroxa_backend } from "../../../../declarations/ayzeroxa_backend";
import { getDataFromDB, updateDB } from "../data/IndexedDB";


const SyncDB = async() => {

        try {
            const motokoResponse = await ayzeroxa_backend.getAllUsers();
             if(motokoResponse){
                     const members = motokoResponse.map(([id, user]) => ({ id, ...user }));
                     const indexedResponse = await getDataFromDB("members", "m");

                    if(indexedResponse){
                    
                            if(members.length === 0 && indexedResponse.length > 0)return;
                            if(members.length !== indexedResponse.length){
                                await updateDB("members", members, "m");
                            };
                                
                    }else{
                        
                        await updateDB("members", members, "m");
                        return true;
                    };   
             }
        } catch (error) {
            console.error("Failed to sync dbs:", error);
            return [];
        };
};

export default SyncDB;
