"use server"
import loginService from "app/services/login_service";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

const createAccessToken = async (email, password) => {
    const cookiesStore = cookies();
    try {
        const data = await loginService.Create({ email, password });
        const { token, refresh } = data;
        if (token && refresh) {
            // Obtener la hora actual
            const now = new Date();
            // Calcular la hora después de 2 horas
            const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

            cookiesStore.set('token', token, { 
                path: '/', 
                httpOnly: true, 
                sameSite: 'lax', 
                expires: twoHoursLater // Establecer la expiración en 2 horas
            });
            cookiesStore.set('refresh', refresh, { 
                path: '/', 
                httpOnly: true, 
                sameSite: 'lax', 
                expires: twoHoursLater // Establecer la expiración en 2 horas
            });
            redirect("/admin");
            return data;
        }
    } catch (error) {
        throw new Error("Credenciales incorrectas");
    }
};

export default createAccessToken;
