"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Admin = () => {
  const router = useRouter();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  
  async function formSumbitHandler(event: React.FormEvent) {
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    event.preventDefault();
    console.log(event);
    const data = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (data?.status == 200) {
      router.replace("/admin/dashboard");
    }
  }
  return (
    <div className="flex justify-center items-center shadow-md rounded-md h-screen w-screen">
      <div className="w-[500px] shadow-md rounded-lg p-5">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p>Welcome Back</p>
        <div>
          <form onSubmit={formSumbitHandler}>
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                className="w-full outline-red-300 p-2 h-10 rounded-md border"
                type="email"
                id="email"
                ref={emailRef}
              />
            </div>
            <div>
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                className="w-full outline-red-300 p-2 h-10 rounded-md border"
                type="password"
                id="password"
                autoComplete="off"
                ref={passwordRef}
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Sumbit Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
