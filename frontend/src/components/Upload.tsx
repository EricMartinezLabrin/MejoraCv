"use client";
import React, { useState, useRef, useEffect } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import convertPdfToImages from "@/components/PdfToPng";
import { useChat } from "ai/react";
import CvCheck from "@/components/CvCheck";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { useRouter } from "next/navigation";
// import { createClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import Score from "@/components/score";

export default function Upload({ session }: { session: string | null }) {
  const router = useRouter();
  const prompt = `Analiza el archivo adjunto y retorna un reporte que siga el formato [{"title":"response","comments":"response","score":0},{...}], evaluando aspectos clave como palabras clave relevantes, experiencia laboral, educación, habilidades técnicas, certificaciones, formato, títulos claros, años de experiencia, estabilidad laboral, lenguaje y gramática, personalización, y compatibilidad ATS, el score maximo es 5, no uses etiqeutas, si el score es inferior a 5, incluye dentro de comments consejos practicos y orientados al cv que acabas de leer para llegar a score 5, si el archivo no es un CV, retorna [{"error":"El archivo no es un CV"}], no te disculpes, no hagas comentarios, unicamente puedes responder las dos opciones que te di.`;
  const [finalScore, setFinalScore] = useState<number | undefined>(undefined);
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const [hiddeInput, setHiddeInput] = useState<boolean>(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialInput: prompt,
      onError(error) {
        console.error(error);
      },
    });
  const [img, setImg] = useState<string[]>([]);
  const [response, setResponse] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const uploadFile = async (file: File, type: string, name: string) => {
    const buckerName = type === "pdf" ? "pdf" : "Images";
    const hash = Math.random().toString(36).substring(7);
    const filePath = `${name}-${hash}`;
    const { data, error } = await supabase.storage
      .from(buckerName)
      .upload(filePath, file);
    if (error) {
      console.error("Error uploading file: ", error.message);
    } else {
      alert("File uploaded successfully!");
    }
  };

  const handleFileUpload = async (files: File[]) => {
    if (files[0].type.includes("pdf")) {
      console.log(files[0]);
      const img = await convertPdfToImages(files[0]);
      setImg(img);
      uploadFile(files[0], "pdf", files[0].name);
    } else {
      // Eliminamos el archivo subido
      files.pop();
    }
  };

  // Ocultar el input si ya se subió un archivo
  useEffect(() => {
    if (img.length > 0) {
      setHiddeInput(true);
      return;
    }
    setHiddeInput(false);
    return;
  }, [img]);

  // Obtener la respuesta del bot
  useEffect(() => {
    if (messages.length > 1) {
      setResponse(messages[messages?.length - 1]?.content);
    }
  }, [messages]);

  // Calcular el score final
  useEffect(() => {
    if (!response) return;
    if (isLoading) return;
    // Parsear el JSON
    const jsonData = JSON.parse(response);

    // Inicializar la suma de los scores
    let totalScore = 0;

    // Iterar sobre los elementos del JSON y sumar los scores
    jsonData.forEach((item: { score: number }) => {
      if (item.score !== undefined) {
        totalScore += item.score;
      }
    });
    setFinalScore(parseFloat((totalScore / jsonData.length).toFixed(1)));
  }, [response]);

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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push("#title", { scroll: true });
            setShowTitle(true);
            handleInputChange({
              target: { value: prompt },
            } as React.ChangeEvent<HTMLInputElement>);
            handleSubmit(event, {
              experimental_attachments: img.map((image) => ({
                url: image,
                contentType: "image/png", // o el tipo de imagen correcto
              })),
            });

            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        >
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
          <a
            href="/"
            title="Limpiar"
            className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 transition-opacity duration-1000 ease-in-out opacity-0 animate-fadeIn"
          >
            <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex justify-center ">
              Limpiar
            </span>
          </a>
        )}
      </section>
      <div id="title" className="relative pt-3 lg:pt-10">
        {showTitle &&
          (isLoading ? (
            <TypewriterEffect key={1} words={wordsLoading} />
          ) : (
            <TypewriterEffect key={2} words={wordsLoaded} />
          ))}

        {!isLoading &&
          response &&
          (console.log(response),
          (<CvCheck AiResponse={response} finalScore={finalScore} />))}
      </div>
    </>
  );
}
