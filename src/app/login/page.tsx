"use client";

import React from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import useAccess from "@/app/store/AccessService";
import useAuth from "@/app/store/AuthService";
import useLoader from "@/app/store/LoaderService";
import { getApiGuestClient } from "@/app/utis/ApiService";
import { extractApiError } from "@/app/utis/HandleApiCallError";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import { EmailInput, PasswordInput } from "@/app/forms";

interface FormValues {
  email: string;
  password: string;
}

// Validation Schema
const validationRules = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Please enter your email address."),
    password: yup.string().required("Please provide your Password."),
  })
  .required("Please fill out all the required fields.");

const LoginPage: React.FC = () => {
  const { startLoading, stopLoading } = useLoader();
  const { login, setToken, updateUser } = useAuth();
  const { setAccess } = useAccess();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationRules),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Login attempt started..."); // Debug log
    startLoading();

    try {
      const client = await getApiGuestClient();
      console.log("Sending data to API:", data); // Debug log
      const res = await client.post("/api/signin", data);
      console.log("API Response:", res.data); // Debug log

      if (res.data.status === "success") {
        setToken(res.data.access_token);
        updateUser(res.data.data);
        login();
        toast.success("🎉 Welcome to your dashboard!");
      } else {
        const errorData = extractApiError(res.data);
        console.log("Extracted Error Data:", errorData); // Debug log
        showError(errorData);
      }
    } catch (error) {
      console.error("Login request error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      console.log("Stopping loading..."); // Debug log
      stopLoading();
    }
  };

  const showError = (errorData: any) => {
    console.log("showError called with:", errorData); // Debug log

    if (errorData?.type === "validation") {
      errorData.errors.forEach((error: any) => {
        console.log(
          "Setting error for:",
          error.fieldName,
          "->",
          error.messages
        ); // Debug log
        if (error.fieldName) {
          setError(error.fieldName, {
            type: error.type,
            message: error.messages,
          });
        }
      });
    }
    if (errorData?.type === "api_error") {
      console.log("Displaying toast error:", errorData.error_message); // Debug log
      toast.error(errorData.error_message);
    }
  };

  return (
    <AuthLayout>
      <section className="bg-slate-300 min-h-[100vh] flex justify-center md:items-center p-4">
        <div className="login-box border-slate-400 rounded-md w-full h-auto md:h-2/3 md:w-2/3 bg-white p-6 shadow-lg">
          <div className="login-card-body flex flex-col md:flex-row justify-center items-center mt-4">
            <div className="left-column h-full w-full flex flex-col justify-center items-center px-4">
              <img
                src={"/"}
                alt="Site Logo"
                className="max-w-[150px] md:max-w-[200px]"
              />
              <h1 className="font-bold text-2xl uppercase">Welcome Back</h1>
            </div>
            <div className="right-column w-full md:border-l-2 md:pl-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="formControl">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <EmailInput
                        {...field}
                        isRequired={true}
                        id="email"
                        label="Email"
                        placeholder="Email"
                        error={errors?.email}
                      />
                    )}
                  />
                </div>
                <div className="formControl">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <PasswordInput
                        {...field}
                        isRequired={true}
                        id="password"
                        label="Password"
                        placeholder="Password"
                        error={errors?.password}
                      />
                    )}
                  />
                </div>
                <div className="formControl">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};

export default LoginPage;
