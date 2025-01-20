import React from "react";
import Container from "@/components/Container";
import Paragraph from "@/components/Paragraph";

const Footer: React.FC = () => {
  return (
    <div className="mt-8">
      <footer className="relative bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900 pt-12 rounded-t-3xl">
        <div className="absolute right-0 top-0 h-full w-full flex justify-end">
          <div className="w-28 h-28 flex rounded-xl relative blur-2xl">
            <span className="absolute w-16 h-16 -top-1 -right-1 bg-green-500 rounded-md rotate-45"></span>
            <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-[#FCDC58] rounded-md rotate-45"></span>
            <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-primary rounded-md rotate-45"></span>
          </div>
        </div>

        <div className="absolute left-0 bottom-0 h-full w-full flex items-end">
          <div className="w-28 h-28 flex rounded-xl relative blur-2xl">
            <span className="absolute w-16 h-16 -top-1 -right-1 bg-green-500 rounded-md rotate-45"></span>
            <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-[#FCDC58] rounded-md rotate-45"></span>
            <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-primary rounded-md rotate-45"></span>
          </div>
        </div>

        <Container className="py-8 relative">
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 blur-2xl opacity-20 w-24 h-16 sm:w-48 sm:h-36 rounded-full rotate-12 skew-x-6 bg-primary"></span>

          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 w-full">
            <div className="w-full lg:w-1/3">
              <a
                href="/"
                className="relative flex items-center justify-center lg:justify-start"
              >
                <img
                  src="/MejoraCV.webp"
                  alt="logo"
                  className="h-12 w-48 object-cover flex justify-center self-center"
                />
              </a>
            </div>

            <div className="w-full lg:w-2/3">
              <Paragraph>
                Analizamos tu currículum y te brindamos consejos personalizados
                para mejorarlo, aumentando tus posibilidades de superar los
                filtros de los reclutadores y destacar en los procesos de
                selección.
              </Paragraph>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
