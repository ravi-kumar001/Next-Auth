"use client";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MagicPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: "",
  });
  const formSumbitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/magic-link", {
        email: email,
      })
      .then((res) => {
        const response = res.data;
        setLoading(false);
        if (response.status == 200) {
          toast.success(response.message);
        } else if (response.status == 500) {
          toast.error(response.message);
        } else if (response.status == 400) {
          setError(response.errors);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
        console.log(error);
      });
  };
  return (
    <Fragment>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="p-4 shadow-lg">
          <h1 className="font-bold text-2xl">Magic Link Login</h1>
          <form onSubmit={formSumbitHandler}>
            <div className="mt-3">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                className="w-full mt-3 h-10 p-2 border rounded-md outline-purple-400"
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-red-500 mt-3">{error.email}</p>
              <button
                className="bg-blue-500 w-full mt-4 text-white p-2 rounded-lg"
                disabled={loading}
              >
                {loading ? "Processing" : "Sumbit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default MagicPage;
