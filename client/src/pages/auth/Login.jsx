import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useLoginUserMutation } from "@/store/authapi";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};


const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
 const [loginUser,{loading,error}]=useLoginUserMutation();
  const {toast}=useToast();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(formData).unwrap();
      // console.log(result)
      if (result?.success) {
        toast({
          title: result?.message,
          variant: "success",
        });
      } else {
        toast({
          title: result?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An unexpected error occurred.",
        description: error?.message || "Please try again later.",
        variant: "destructive",
      });
      console.log("Error during login ", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have account{" "}
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign In"}
      />
    </div>
  );
};

export default AuthLogin;
