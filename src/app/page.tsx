import SignOut from "@/components/signOut";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <div className="flex justify-center items-center h-screen flex-col">
        <h1 className="bg-purple-300 text-3xl font-bold p-4 rounded-md">
          Hi Ravi! This is Your Home Page
        </h1>
        <p>{JSON.stringify(session)}</p>
        <br />
        <SignOut />
      </div>
    </div>
  );
}