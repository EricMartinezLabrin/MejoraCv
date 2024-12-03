"use client";
import React, { useState, useEffect } from "react";
import Upload from "@/components/Upload";
import LoginBanner from "@/components/login-banner";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import Check from "@/components/Check";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();
      if (error) return console.error(error);
      setSession(data?.session);
    };
    isLoggedIn();
  }, []);
  const item = {
    title: "Lenguaje y Gramática",
    comments:
      "El CV muestra personalización hacia el campo de 3D, pero podría fortalecerse con una declaración de objetivos o un resumen profesional que vincule tus habilidades y",
    score: 4,
  };
  return (
    <main>
      <Upload session={session} />
      {!session && <LoginBanner />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 ">
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
        <Check key="index" checked={item} blur="" />
      </div>
    </main>
  );
}
