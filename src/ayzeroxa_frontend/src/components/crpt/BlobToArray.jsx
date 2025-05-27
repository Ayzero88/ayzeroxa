import { ayzeroxa_backend } from "../../../../declarations/ayzeroxa_backend";
const BlobToArray = async ({ encryptedData }) => {
  try {
    const decryptedBlob = await ayzeroxa_backend.decrypt(encryptedData);  
    let cleanedResponse = decryptedBlob.trim();
    
     // Step 3: Convert Motoko syntax to JSON
     cleanedResponse = cleanedResponse
     .replace(/\(/g, "[") // Convert tuples to JSON arrays
     .replace(/\)/g, "]") // Convert closing tuples
     .replace(/=/g, ":") // Replace assignment `=` with `:` for JSON
     .replace(/;/g, ",") // Replace `;` with `,` to properly separate key-value pairs

     // Ensure keys are properly quoted
     .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')

     // Ensure string values are properly quoted (except for numbers)
     .replace(/:\s*([a-zA-Z_]+)([,}])/g, ': "$1"$2')

     // Wrap dates (createdAt) in double quotes
     .replace(/:\s*(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/g, ': "$1"');

     const jsonData = JSON.parse(cleanedResponse);
     const members = jsonData.map(([id, user]) => ({ id, ...user }));
     return members;
  } catch (error) {
    console.error("Decryption Error:", error);
    return [];
  }
};

export default BlobToArray;
