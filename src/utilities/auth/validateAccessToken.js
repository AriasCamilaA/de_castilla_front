"use server"
import loginService from "app/services/login_service";
import { cookies } from "next/headers";

const validateAccessToken = async () => {
    try {
        const cookiesStore = cookies();
        const token = cookiesStore.get("token")?.value;
        const response = await loginService.UserData(token); // Espera a que se resuelva loginService.UserData
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error; // Lanzar el error para manejarlo en la función POST
    }
};

export default validateAccessToken;
