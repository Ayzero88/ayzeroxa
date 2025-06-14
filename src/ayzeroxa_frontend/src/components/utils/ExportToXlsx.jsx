import React from 'react'
import { FaFileExcel, FaFileExport } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const ExportToXlsx = ({jsonData,fileName, bookName,  pd}) => {

    const handleExportToExcel = () => {
        if(jsonData){
            const ws = XLSX.utils.json_to_sheet(jsonData); // registry is your result data
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, bookName);
            XLSX.writeFile(wb, `${fileName}.xlsx`);
        }else{
            console.log("No data to export");
        }
    };
  return (
    <div>
        <div className='export-mode' onClick={handleExportToExcel} style={{padding: pd}}><div> <FaFileExcel/> Export </div></div>
    </div>
  )
}

export default ExportToXlsx
