import { Credential } from "@/lib/types";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

export const googleLogin = async (credential: Credential) => {
  try {
    const response = await fetch(`${backendUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadFile = async (files: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append("files", files);
    const response = await fetch(`${backendUrl}/files`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const analyzeCv = async (cvUrl: string, token: string) => {
  try {
    const response = await fetch(`${backendUrl}/eval`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pdfUrl: cvUrl }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
