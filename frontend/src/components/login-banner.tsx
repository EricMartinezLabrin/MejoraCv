"use client";
import {
  IconBrandGoogleFilled,
  IconBrandFacebookFilled,
} from "@tabler/icons-react";
// import { googleLogin } from "@/app/login/actions";
import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/api/backend";
import { Credential } from "@/lib/types";

export default function LoginBanner({ session }: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  const saveToken = (token: Credential) => {
    googleLogin(token).then((response) => {
      localStorage.setItem("token", response?.id);
      if (response.id) {
        session(response.id);
      }
    });
  };
  return (
    <div className="flex flex-col lg:flex-row fixed bottom-0 left-0 bg-input w-full z-10 py-6 px-3 items-center justify-center border rounded-t-xl gap-4 shadow-xl shadow-white/30">
      <h1 className="text-heading-1 text-lg w-max ">
        Inicia sesión para ver el reporte completo:
      </h1>
      <form className="flex flex-col lg:flex-row  gap-4">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              saveToken({ credential: credentialResponse.credential });
            } else {
              console.error("Credential is undefined");
            }
          }}
          onError={() => {
            console.error("Login Failed");
          }}
          useOneTap
        />

        <button
          type="button"
          className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
        >
          <IconBrandFacebookFilled className="w-4 h-4 me-2" />
          Inicia sesión con Facebook
        </button>
      </form>
    </div>
  );
}
