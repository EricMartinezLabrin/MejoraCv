"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import "@/app/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export interface Props {
  title: string;
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  useEffect(() => {
    document.documentElement.classList.add("dark");

    const toggleMenu = document.querySelector(
      "[data-toggle-nav]"
    ) as HTMLButtonElement;
    const navbar = document.querySelector("[data-navbar]") as HTMLDivElement;
    const overlayNav = document.querySelector(
      "[data-nav-overlay]"
    ) as HTMLDivElement;

    if (toggleMenu) {
      toggleMenu.addEventListener("click", (e) => {
        e.preventDefault();
        if (toggleMenu.getAttribute("data-open-nav") === "false") {
          toggleMenu.setAttribute("data-open-nav", "true");
          overlayNav.setAttribute("data-is-visible", "true");
          document.body.classList.add("!overflow-y-hidden");
          navbar.style.height = `${navbar.scrollHeight}px`;
        } else {
          toggleMenu.setAttribute("data-open-nav", "false");
          overlayNav.setAttribute("data-is-visible", "false");
          document.body.classList.remove("!overflow-y-hidden");
          navbar.style.height = "0px";
        }
      });

      navbar.addEventListener("click", () => {
        toggleMenu.setAttribute("data-open-nav", "false");
        overlayNav.setAttribute("data-is-visible", "false");
        document.body.classList.remove("!overflow-y-hidden");
        navbar.style.height = "0px";
      });

      overlayNav.addEventListener("click", () => {
        toggleMenu.setAttribute("data-open-nav", "false");
        overlayNav.setAttribute("data-is-visible", "false");
        document.body.classList.remove("!overflow-y-hidden");
        navbar.style.height = "0px";
      });
    }
  }, []);

  return (
    <html lang="es" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta
          name="Haz que tu cv sea visible para los reclutadores"
          content="Analizamos tu CV con IA para darte tips que te ayudarán a que pase todos los filtros de los reclutadores"
        />
        <title>Mejora CV </title>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-hidden overflow-y-auto bg-body">
        <Navbar />
        <main className="flex min-h-screen flex-col items-center py-24 px-4 lg:p-24">
          <GoogleOAuthProvider
            clientId={
              process.env.NEXT_PUBLIC_G_CLIENT_ID || "default-client-id"
            }
          >
            {children}
          </GoogleOAuthProvider>
        </main>
        <Footer />
      </body>
      <style jsx global>{`
        :root {
          --color-bg: 255 255 255;
          --color-border: 255 255 255;
          --color-box: 255 255 255;
          --box-border: 229 231 235;
          --box-sd: 226 232 240 / 0.5;
          --heading-1: 23 37 84;
          --heading-2: 31 41 55;
          --heading-3: 55 65 81;
        }

        .dark {
          --color-bg: 3 7 18;
          --color-box: 17 24 39;
          --box-border: 243 244 246 / 0.1;
          --box-sd: transparent;

          --heading-1: 255 255 255;
          --heading-2: 243 244 246;
          --heading-3: 209 213 219;
        }

        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: "Raleway", sans-serif;
        }

        [data-toggle-nav][data-open-nav="true"] #line1 {
          transform: translateY(0.375rem) rotate(40deg);
        }
        [data-toggle-nav][data-open-nav="true"] #line2 {
          transform: scaleX(0);
          opacity: 0;
        }
        [data-toggle-nav][data-open-nav="true"] #line3 {
          transform: translateY(-0.375rem) rotate(-40deg);
        }

        [data-nav-overlay][data-is-visible="true"] {
          visibility: visible;
          display: flex;
        }
      `}</style>
    </html>
  );
}
