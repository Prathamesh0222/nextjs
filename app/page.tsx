import axios from "axios";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

  async function getUserDetails() {
    try {
      const user = await client.user.findFirst({});
      return {
        name: user?.firstName,
        email: user?.email
      }
    }  catch(e) {
      console.log(e);
    }
  }

export default async function Home() {
  const userDetails = await getUserDetails();
  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="flex justify-center">
        <div className="border rounded-lg p-8 transition ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-slate-800 duration-300 text-white">
         <div>
          {userDetails?.email}
         </div>
         <div className="text-center">
         {userDetails?.name} 
         </div>
        </div>
        
      </div>
    </div>
  );
}
