"use client";
import React, { useState, useEffect } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import convertPdfToImages from "@/components/PdfToPng";
import CvCheck from "@/components/CvCheck";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { uploadFile, analyzeCv } from "@/api/backend";
import { CVAnalize } from "@/lib/types";
import LoginModal from "./login-modal";
import Link from "next/link";

export default function Upload({ session }: { session: string | null }) {
  const [finalScore, setFinalScore] = useState<number | undefined>(undefined);
  const [hiddeInput, setHiddeInput] = useState<boolean>(false);
  const [img, setImg] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  const [messages, setMessages] = useState<CVAnalize[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cv, setCv] = useState<string | null>(null);
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  // Get Token from LocalStorage
  useEffect(() => {
    const getToken = localStorage.getItem("token") || "";
    setToken(getToken);
  }, []);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleFileUpload = async (files: File[]) => {
    if (files[0].type.includes("pdf")) {
      if (!token) {
        setOpenDrawer(true);
        return;
      }
      const [{ fileUrl }] = await uploadFile(files[0], token);
      setCv(fileUrl);
      const img = await convertPdfToImages(files[0]);
      setImg(img);
    } else {
      // Eliminamos el archivo subido
      files.pop();
    }
  };

  // Analiza el CV cuando se sube
  useEffect(() => {
    if (cv && token) {
      const handleMessages = async () => {
        setIsLoading(true);
        setShowTitle(true);
        const data = await analyzeCv(cv, token);
        setMessages(data);
        setIsLoading(false);
      };
      handleMessages();
    }
  }, [cv]);

  // Ocultar el input si ya se subió un archivo
  useEffect(() => {
    if (img.length > 0) {
      setHiddeInput(true);
      return;
    }
    setHiddeInput(false);
    return;
  }, [img]);

  // Calcular el score final
  useEffect(() => {
    if (!messages) return;
    if (isLoading) return;

    // Inicializar la suma de los scores
    let totalScore = 0;

    // Iterar sobre los elementos del JSON y sumar los scores
    messages.forEach((item: { score: any }) => {
      if (item.score !== undefined) {
        totalScore += item.score;
      }
    });

    setFinalScore(parseFloat((totalScore / messages.length).toFixed(1)));
  }, [messages]);

  const wordsLoading = [
    {
      text: "Estamos",
      className: "text-3xl",
    },
    {
      text: "Analizando",
      className: "text-3xl",
    },
    {
      text: "tu",
      className: "text-3xl",
    },
    {
      text: "Curriculum",
      className: "text-blue-500 dark:text-blue-500 text-3xl",
    },
    {
      text: "Vitae...",
      className: "text-blue-500 dark:text-blue-500 text-3xl",
    },
  ];

  const wordsLoaded = [
    {
      text: "¡Terminamos",
      className: "text-3xl",
    },
    {
      text: "tu",
      className: "text-blue-500 dark:text-blue-500 text-3xl",
    },
    {
      text: "Análisis!",
      className: "text-blue-500 dark:text-blue-500 text-3xl",
    },
  ];

  return (
    <>
      <section className="flex flex-wrap overflow-hidden w-full max-w-[22rem] lg:max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black/5 border-neutral-200 dark:border-neutral-800 rounded-lg ">
        <LoginModal openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <FileUpload onChange={handleFileUpload} hiddeInput={hiddeInput} />
        <div className="flex gap-4 overflow-auto lg:justify-center w-full py-5">
          {img.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="pdf"
              width="200"
              className="transition-opacity duration-1000 ease-in-out opacity-0 animate-fadeIn"
              onClick={() => openModal(image)}
            />
          ))}

          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={closeModal}
            >
              <div
                className="bg-white p-4 rounded"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage!}
                  alt="pdf"
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
          )}
        </div>
      </section>
      <section>
        <form>
          <button
            disabled={isLoading}
            type="submit"
            className={`
            ${!hiddeInput ? "hidden" : "block"}
            disabled:opacity-50 disabled:cursor-not-allowed
            my-4 w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 transition-opacity duration-1000 ease-in-out opacity-0 animate-fadeIn`}
          >
            <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ">
              {isLoading ? "Analizando..." : "Analizar"}
            </span>
          </button>
        </form>
        {img.length > 0 && (
          <Link
            href="/"
            title="Limpiar"
            className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 transition-opacity duration-1000 ease-in-out opacity-0 animate-fadeIn"
          >
            <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex justify-center ">
              Limpiar
            </span>
          </Link>
        )}
      </section>
      <div id="title" className="relative pt-3 lg:pt-10">
        {showTitle &&
          (isLoading ? (
            <TypewriterEffect key={1} words={wordsLoading} />
          ) : (
            <TypewriterEffect key={2} words={wordsLoaded} />
          ))}

        {!isLoading && messages && (
          <CvCheck Aimessages={messages} finalScore={finalScore} />
        )}
      </div>
    </>
  );
}
