import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialUserSignUpFormData, initialOtherSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { SuccessMessage, ErrorMessage, LoadingMessage, promiseToast } from "@/components/Alert-Toast";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialUserSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  async function handleRegisterUser(event) {
    event.preventDefault();
    
    const data = await registerService(signUpFormData);

    if(data?.success){
      console.log("Registered Data: ", data)
      SuccessMessage("Registered Successfully...!");
      setTimeout(() => {
        window.location.href = "/auth"
      }, 2000);
      setLoading(false);
    }
    else{
      setLoading(false);
      ErrorMessage(data.message);
    }    
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    
    // loading && LoadingMessage(loading, "Loading Please Wait...");
    const data = await loginService(signInFormData);
    console.log(data, "datadatadatadatadata");
    
    if (data?.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      
      SuccessMessage("Login Successfully...!");
      setLoading(false);
      setTimeout(() => {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      }, 1000);
      

    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
      setLoading(false);
      // ErrorMessage("Invalid email or password!");
      ErrorMessage(data?.message);
    }
  }

  //check auth user

  async function checkAuthUser() {
    try {
      
      const data = await checkAuthService();
      if (data?.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
    setSignInFormData(initialSignInFormData);
  }

  useEffect(() => {
    
    checkAuthUser();
    
  }, []);

  console.log(auth, "gf");

  return ( 
    <AuthContext.Provider
      value={{
        loading,
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
