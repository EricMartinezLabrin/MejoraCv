"use server";
import { googleLogin } from "@/app/login/actions";
import { redirect } from "next/navigation";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

export default async function Login() {
  return (
    <section>
      <h1 className="text-heading-1 text-2xl font-bold">Login</h1>
      <form>
        <button
          formAction={googleLogin}
          type="submit"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
        >
          <IconBrandGoogleFilled className="`w-4 h-4 me-2" />
          Sign in with Google
        </button>
      </form>
    </section>
  );
}
