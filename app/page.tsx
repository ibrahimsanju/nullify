import { Login } from "./components/Login";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session =await getServerSession()
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>{session?.user?.name}</div>
      <Login></Login>
    </div>
  );
}
