import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useRegisterUserMutation } from "@/store/authapi";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData).unwrap();
      if (result?.success) {
        toast({
          title: result?.message,
          variant: "success",
        });
        navigate("/auth/login");
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
      console.log("Error during register ", error);
    }
  };
  const [formData, setFormData] = useState(initialState);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have account{" "}
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign Up"}
      />
    </div>
  );
};

export default AuthRegister;
