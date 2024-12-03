"use client";

import * as PDFJS from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
// import "pdfjs-dist/legacy/build/pdf.worker.mjs";

const convertPdfToImages = (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const images: string[] = [];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const pdf = await PDFJS.getDocument({ data }).promise;
        const canvas = document.createElement("canvas");

        for (let i = 0; i < pdf.numPages; i++) {
          const page = await pdf.getPage(i + 1);
          const viewport = page.getViewport({ scale: 1 });
          const context = canvas.getContext("2d");
          if (context === null) {
            throw new Error("Failed to get 2D rendering context for canvas.");
          }
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport: viewport })
            .promise;
          images.push(canvas.toDataURL());
        }

        canvas.remove();
        resolve(images);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};

export default convertPdfToImages;
