"use client";
import React, { useState, useEffect } from "react";
import Upload from "@/components/Upload";
import LoginBanner from "@/components/login-banner";
import { useAuthStore } from "@/store/authStore";
import TopAds from "@/components/ads/top-ads";
import MiddleAds from "@/components/ads/middle-ads";
import BottomAds from "@/components/ads/bottom-ads";

export default function Home() {
  const [session, setSession] = useState<string | null>(null);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    setSession(token);
  }, [token]);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = async () => {
      const clientId = localStorage.getItem("token");
      setSession(clientId);
    };
    isLoggedIn();
  }, []);

  return (
    <main>
      <TopAds />
      <Upload session={session} />

      {!session && <LoginBanner session={setSession} />}
      <BottomAds />
    </main>
  );
}
