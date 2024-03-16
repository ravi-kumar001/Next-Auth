import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import SignOut from "@/components/signOut";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const AdminDashBoard = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <>
      <div className="flex justify-center items-center mt-4 px-4">
        <h1>Hello Admin ! How are You?</h1>
        <h1>{session && JSON.stringify(session)}</h1>
      </div>
      <SignOut type="Admin" />
    </>
  );
};

export default AdminDashBoard;
