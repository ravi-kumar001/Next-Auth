"use client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword({ params }: { params: { email: string } }) {
  const searchParams = useSearchParams();
  const [passwordState, setPasswordState] = useState({
    password: "",
    cnfPassword: "",
  });
  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);
  const formsumbitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/reset-password", {
        email: params.email,
        signature: searchParams.get("signature"),
        password: passwordState.password,
        cnfPassword: passwordState.cnfPassword,
      })
      .then((response) => {
        setLoading(false);
        if (response.data.status == 400) {
          toast.error(response.data.errors.error);
        } else if (response.data.status == 200) {
          toast.success(response.data.message);
        } else if (response.data.status == 500) {
          setErrorState(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="p-4 shadow-lg">
          <h1 className="font-bold text-2xl">Reset Your Password</h1>
          <form onSubmit={formsumbitHandler}>
            <div className="mt-3">
              <label className="block" htmlFor="password">
                Enter New Password
              </label>
              <input
                className="w-full h-10 p-2 border rounded-md outline-red-400"
                type="password"
                id="password"
                onChange={(e) =>
                  setPasswordState((prevState) => {
                    return {
                      ...prevState,
                      password: e.target.value,
                    };
                  })
                }
              />
              <label className="block" htmlFor="cnfPassword">
                Confirm Password
              </label>
              <input
                className="w-full h-10 p-2 border rounded-md outline-red-400"
                type="password"
                id="cnfPassword"
                onChange={(e) =>
                  setPasswordState((prevState) => {
                    return {
                      ...prevState,
                      cnfPassword: e.target.value,
                    };
                  })
                }
              />
              <p className="text-red-500 mt-3">{errorState}</p>
              <button
                className="bg-black mt-3 text-white p-2 rounded-lg"
                disabled={loading}
              >
                {loading ? "Processing" : "Reset Password"}
              </button>
            </div>
          </form>
          <div className="mt-3 text-center ">
            <Link href={"/login"}>Back to Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
