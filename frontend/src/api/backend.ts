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
    console.error(error);
  }
};
