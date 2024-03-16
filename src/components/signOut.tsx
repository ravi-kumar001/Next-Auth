"use client";
import React from "react";
import { signOut } from "next-auth/react";

function SignOut({ type }: { type?: string }) {
  return (
    <div>
      <button
        className="bg-yellow-300 rounded-md p-2 mt-3"
        onClick={() =>
          signOut({
            callbackUrl: type == "Admin" ? "/admin" : "/login",
            redirect: true,
          })
        }
      >
        Sign Out
      </button>
    </div>
  );
}

export default SignOut;
