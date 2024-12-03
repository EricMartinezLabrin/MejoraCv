import {
  IconBrandGoogleFilled,
  IconBrandFacebookFilled,
} from "@tabler/icons-react";
import { googleLogin } from "@/app/login/actions";

export default function LoginBanner() {
  return (
    <div className="flex flex-col lg:flex-row fixed bottom-0 left-0 bg-input w-full z-10 py-6 px-3 items-center justify-center border rounded-t-xl gap-4 shadow-xl shadow-white/30">
      <h1 className="text-heading-1 text-lg w-max ">
        Inicia sesión para ver el reporte completo:
      </h1>
      <form className="flex flex-col lg:flex-row  gap-4">
        <button
          formAction={googleLogin}
          type="submit"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
        >
          <IconBrandGoogleFilled className="`w-4 h-4 me-2" />
          Inicia sesión con Google
        </button>

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
