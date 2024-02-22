"use server"
import { cookies } from "next/headers";

export async function cerrarSession(event) {
  try {
    const { req, res } = event;
    const cookiesStore = cookies(req, res);

    await cookiesStore.delete("token", {
      path: "/",
      httpOnly: true,
      sameSite: "lax", // Consider using "lax" instead of "strict"
    });
    await cookiesStore.delete("refresh", {
      path: "/",
      httpOnly: true,
      sameSite: "lax", // Consider using "lax" instead of "strict"
    });

    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } catch (error) {
    console.error("Error deleting cookies:", error);
    // Handle errors gracefully (e.g., display an error message)
  }
}

// (Optional)
// Add loading indicator logic and success handling here
