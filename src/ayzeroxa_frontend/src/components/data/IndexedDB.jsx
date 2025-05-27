export const openDB = (dbName = "Ayzeroxa") => {
  return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 2); // Change version to 2

      request.onupgradeneeded = (event) => {
          const db = event.target.result;

          // Ensure "members" store exists
          if (!db.objectStoreNames.contains("members")) {
              db.createObjectStore("members", { keyPath: "id" });
          }

          // Ensure "attendance" store exists
          if (!db.objectStoreNames.contains("attendance")) {
              db.createObjectStore("attendance", { keyPath: "id" });
          }
      };

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
  });
};


export const getDataFromDB = async (storeName, id) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
  });
};


  export const updateDB = async (storeName, data, id) => {
    const db = await openDB();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
  
    store.clear(); // Clear old data
    store.put({ id: id, data: data }); // Store the entire array as a single item
  
    return new Promise((resolve) => {
      transaction.oncomplete = () => resolve("Database updated.");
    });
  };
  
  