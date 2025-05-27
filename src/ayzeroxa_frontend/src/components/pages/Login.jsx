import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import Logo from "../utils/Logo";
import AppName from "../utils/AppName";
import { FiLogIn } from "react-icons/fi";
import Footer from "../utils/Footer";
import MovingLine from "../utils/MovingLine";
import { ayzeroxa_backend } from "../../../../declarations/ayzeroxa_backend";
import { useUser } from "../context/UserContext";
import { Principal } from "@dfinity/principal";
import Alert from "../utils/Alert";


function Login() {
  const [authClient, setAuthClient] = useState(null);
  const navigate = useNavigate();
  const {userRole, setUserRole } = useUser();
  const [alertData, setAlertData] = useState({
    messageIsOpen: false, 
    message: '', 
    indicator: '',
    bgCol: '',
    fgCol: '',
    btnName: '',});

  useEffect(() => {
        AuthClient.create().then(setAuthClient); 
  }, []);

  const handleLogin = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
  
         // Convert principal to Principal object
         const principalObj = Principal.fromText(principal);

        // Call the backend to get user role
        const userRoleInfo = await ayzeroxa_backend.getRole(principalObj);
        if(userRoleInfo.length > 0){
            const key = userRoleInfo[0]
            const role = Object.keys(key)[0];
          
        setUserRole({
            principal: principal,
            role: role,
            authenticated: true,
          });

        // Save role in localStorage for persistence (optional)
           localStorage.setItem("p", principal);
           localStorage.setItem("r", role);
           localStorage.setItem("a", true);
        

           // Save current route to sessionStorage
           if(role === "admin"){  
             navigate("/");   
                
            };

            if(role === "leader"){  
              navigate("/leader");   
                
            };

             if(role === "user"){  
              navigate("/user");   
                
            };
       
        }else{

          setAlertData({
            messageIsOpen: true, 
            message: `You are not authorized to access this application. Send your token to the admin to validate access. Thank you: ${principalObj}.`, 
            indicator: "red", 
            bgCol: '#1b2328', 
            fgCol: '#fff', 
            btnName: 'Close'});
            return;       
        };
      },
    });
  };

  

  useEffect(() => {
   
    const storedPrincipal = localStorage.getItem("p");
    const storedRole = localStorage.getItem("r");
    const storedAuth = localStorage.getItem("a");

    if (storedPrincipal && storedRole && storedAuth) {
      setUserRole({
        principal: storedPrincipal,
        role: storedRole,
        authenticated: storedAuth,
      });
       
            navigate("/");
    };
    
  }, []);
  

 
  return (

    <div className='banner'>
                <Logo/>
                <h3 style={{textAlign: 'center'}}>OIKIA CC</h3>
                <AppName/>
            
                <div className='home-btn'>
                    <button className='reg' onClick={handleLogin}>
                         <FiLogIn/> Log in with Internet Identity
                    </button>
                </div>
    
                <Footer/>
                <div className='version'>1.0 βeta</div>
                <MovingLine/>


                { alertData.messageIsOpen && (
                    <Alert
                        message={alertData.message}
                        onClose={() => setAlertData({messageIsOpen: false})} // Close the message display
                        indicator={alertData.indicator}
                        bgCol={alertData.bgCol}
                        fgCol={alertData.fgCol}
                        btnName={alertData.btnName}
                />
                )}
               
        
    </div>
   
  );
}

export default Login;
