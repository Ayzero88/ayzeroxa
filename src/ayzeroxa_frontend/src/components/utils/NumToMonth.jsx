import React from 'react';

const NumToMonth = ({num}) => {

    const months = {
        1: "JAN", 2: "FEB", 3: "MAR", 4: "APR", 5: "MAY", 6: "JUN",
        7: "JUL", 8: "AUG", 9: "SEP", 10: "OCT", 11: "NOV", 12: "DEC"
      };

// Function to convert number to month
    const getMonthName = months[num] || "Invalid month";
    return getMonthName;
}

export default NumToMonth;
