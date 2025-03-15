import AlertMessage, { promiseToast } from "@/components/Alert-Toast";
import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { GraduationCap, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
    loading,
  } = useContext(AuthContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.role !== "" &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    if(signUpFormData?.role==="user"){
      return (
        signUpFormData &&
        signUpFormData.role !== "" &&
        signUpFormData.userName !== "" &&
        signUpFormData.userRollNumber !== "" &&
        signUpFormData.userBranch !== "" &&
        signUpFormData.userRegisteredSEM !== "" &&
        signUpFormData.userDegree !== "" &&
        signUpFormData.userMobileNumber !== "" &&
        signUpFormData.userEmail !== "" &&
        signUpFormData.password !== ""

      );
    } else {
      return (
        signUpFormData &&
        signUpFormData.role !== "" &&
        signUpFormData.userName !== "" &&
        signUpFormData.userBranch !== "" &&
        signUpFormData.userEmail !== "" &&
        signUpFormData.password !== ""
      )
    }
  }
  console.log(signInFormData);
  
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b text-white sticky top-0 w-full bg-slate-900">
        <Link to={"/"} className="flex items-center justify-center dark:hover:text-yellow-600">
          <GraduationCap className="h-8 w-8 mr-4" />
          {/* <span className="font-extrabold text-xl">LEARN</span>
          <Plus strokeWidth={4} /> */}
          <span className="font-extrabold text-xl">EduNex</span>
          
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background">
        <AlertMessage/>
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-screen-sm mx-4 my-2"
        >
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={handleLoginUser}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 ">
                <CommonForm
                  pageLocation={"AdminInstructorSignUpForm"}
                  formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleSubmit={handleRegisterUser}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
