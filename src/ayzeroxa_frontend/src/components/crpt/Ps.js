

const Ps = ({ps}) => {
 
        // Regular expressions to check for a capital letter, a symbol, and a number
          const hasCapitalLetter = /[A-Z]/.test(ps);
          const hasSymbol = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(ps);
          const hasNumber = /\d/.test(ps);

          const hasKeyLength = ps.length >=8;  

          // Check if all conditions are met
          return hasCapitalLetter && hasSymbol && hasNumber && hasKeyLength;


}

export default Ps;