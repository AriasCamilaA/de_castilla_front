"use server"
import { cookies } from "next/headers";

const cerrarSession = async() => {
  const cookiesStore = cookies();
  try {
    cookiesStore.delete("token");
    cookiesStore.delete("refresh");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } catch (error) {
    console.error("Error deleting cookies:", error);
  }
}

export default cerrarSession;