"use client";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FrogetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseState, setResponseState] = useState("");
  const formsumbitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("api/forgot-password", {
        email: email,
      })
      .then((response) => {
        setLoading(false);
        if (response.data.status == 400) {
          setResponseState(response.data.errors.error);
        } else if (response.data.status == 200) {
          toast.success(response.data.message);
        } else if (response.data.status == 500) {
          toast.success(response.data.message);
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
          <h1 className="font-bold text-2xl">Forgot Password</h1>
          <p>Dont' worry! Please enter your email</p>
          <form onSubmit={formsumbitHandler}>
            <div className="mt-3">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                className="w-full h-10 p-2 border rounded-md outline-red-400"
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-red-500 mt-3">{responseState}</p>
              <button
                className="bg-black mt-3 text-white p-2 rounded-lg"
                disabled={loading}
              >
                {loading ? "Processing" : "Forget Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FrogetPassword;
