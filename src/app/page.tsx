import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

export default function HomePage() {
  const Start = dynamic(() => import("~/components/start"), { ssr: false });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base-200 ">
      <Start />
      <ToastContainer />
    </main>
  );
}
