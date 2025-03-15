import { initialOtherSignUpFormData } from "@/config";
import { Button } from "../ui/button";
import FormControls from "./form-controls";

function CommonForm({
  pageLocation,
  handleSubmit,
  buttonText = "Submit",
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
  loading,
}) {
  console.log("Form data : ", formData)

  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        pageLocation={pageLocation}
        buttonText={buttonText}
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">
        {buttonText}
      </Button>
    </form>
  );
}

export default CommonForm;
