import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

export const SuccessMessage = (text) => toast.success(text);

export const ErrorMessage = (text) => toast.error(text);

export const LoadingMessage = (loadingState, text) => loadingState && toast.loading(text|| "Loading...")

export const promiseToast = async (dataFunc) => {
    toast.promise(dataFunc, {
      loading: "Fetching data",
      success: (data) => {
        return "Data fetched successfully.";
      },
      error: (error) => {
        return error.message; // Return the error message
      }
    });
};

const AlertMessage = () => {
  return (
    <Toaster
        position='top-center'
        reverseOrder={false}
    />
  )
}

export default AlertMessage
