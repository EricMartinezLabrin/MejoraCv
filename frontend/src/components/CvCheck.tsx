"use client";
import React, { useEffect, useState } from "react";
import Check from "@/components/Check";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import Score from "@/components/score";

type checkedType = {
  title: string;
  comments: string;
  score: number;
};

export default function CvCheck(props: any) {
  const { AiResponse, finalScore } = props;
  const responseJSON = JSON.parse(AiResponse);
  const [session, setSession] = useState<Session | null>(null);

  const getSession = async () => {
    const supabase = createClient();
    const { error, data } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
    }
    setSession(data.session);
  };
  useEffect(() => {
    getSession();
  });

  if (responseJSON.some((item: any) => item.error !== undefined))
    return (
      <div className="text-center text-red-500">El archivo no es un C.V.</div>
    );

  // Paso 1: Filtrar elementos con score 1, 4 o 5
  const relevantItems = responseJSON?.filter(
    (item: checkedType) =>
      item.score === 1 || item.score === 4 || item.score === 5
  );
  const otherItems = responseJSON?.filter(
    (item: checkedType) =>
      item.score !== 1 && item.score !== 4 && item.score !== 5
  );

  // Paso 2: Asegurar que al menos uno de los primeros cuatro elementos tenga score 4 o 5
  const highScoreItems = relevantItems.filter(
    (item: checkedType) => item.score === 4 || item.score === 5
  );
  const lowScoreItems = relevantItems.filter(
    (item: checkedType) => item.score === 1
  );

  // Mezclar elementos de puntuación baja
  const shuffledLowScoreItems = lowScoreItems.sort(() => Math.random() - 0.5);

  // Elegir los primeros 4 elementos
  let firstFour = [];
  if (highScoreItems.length > 0) {
    // Añadir al menos un elemento con score 4 o 5
    firstFour.push(highScoreItems.pop()!);
  }

  // Rellenar los primeros 4 elementos con elementos de puntuación baja
  firstFour = [
    ...firstFour,
    ...shuffledLowScoreItems.slice(0, 4 - firstFour.length),
  ];

  // Mezclar los primeros 4 elementos
  firstFour = firstFour.sort(() => Math.random() - 0.5);

  // Combinar con el resto de los elementos
  const finalOrder = [...firstFour, ...otherItems, ...highScoreItems];

  return (
    <section className="transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn max-w-[22rem] lg:max-w-4xl">
      {finalScore && <Score finalScore={finalScore} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
        {finalOrder.map(
          (item: any, index: number) => (
            console.log("el item es:", item),
            (
              <Check
                key="index"
                checked={item}
                blur={!session && index >= 3 ? "blur" : ""}
              />
            )
          )
        )}
      </div>
    </section>
  );
}
