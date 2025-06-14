import { getDataFromDB } from '../data/IndexedDB';

const GetUserNumberTel = async({name, storageName, storageId}) => {
   
          try {
              const indexedDBResponse = await getDataFromDB(storageName, storageId);
              if(indexedDBResponse){
                            
                  const members = indexedDBResponse.data;
                
                  const names = members.map((member) => {
                      return {name: `${member.firstName} ${member.surName}`, tel: member.tel};
                  });
  
                  const getTel = names.find((item) => item.name.toLowerCase() === name.toLowerCase());
                  if(getTel && getTel.tel){
  
                       return getTel.tel;
                       
                  }else{
                     return false;
                  };
              };
          } catch (error) {
              console.error("Error fetching user's tel", error);
          }
      };
export default GetUserNumberTel;
