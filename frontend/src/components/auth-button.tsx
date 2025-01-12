import React, { useState, useEffect } from "react";
import BtnLink from "@/components/BtnLink";
import { logout } from "@/app/login/actions";

export default function AuthButtonServer() {
  const [sessionState, setSessionState] = useState<string | null>(null);

  useEffect(() => {
    const getSession = localStorage.getItem("token");
    setSessionState(getSession);
  }, []);

  if (sessionState) {
    return (
      <form>
        <button
          type="submit"
          formAction={logout}
          className="flex justify-center w-full sm:w-max bg-black px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                        after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554]
                                        border-transparent hover:border-[#172554] hover:after:opacity-70 hover:after:scale-[2.5] text-white"
        >
          Cerrar Sesión
        </button>
      </form>
    );
  }
  // return (
  //   <BtnLink
  //     text="Iniciar Sesión"
  //     href="/login"
  //     className="flex justify-center w-full sm:w-max bg-black"
  //     variant="primary"
  //   />
  // );
}
