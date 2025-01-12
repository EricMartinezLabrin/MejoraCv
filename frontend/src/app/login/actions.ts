import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logout() {
  localStorage.removeItem("token");

  // revalidatePath("/", "layout");
  redirect("/");
}
