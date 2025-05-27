
const DateSlash = ({isoDate}) => {
  return new Date(isoDate).toLocaleDateString("en-GB");
}

export default DateSlash
