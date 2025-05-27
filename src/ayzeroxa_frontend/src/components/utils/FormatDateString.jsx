

const FormatDateString = ({isoString}) => {
    
        return new Date(isoString).toISOString().split("T")[0];
};

export default FormatDateString;
