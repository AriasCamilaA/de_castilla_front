
"use server"
import loginService from "app/services/login_service";
import { cookies } from "next/headers";


const validateAccessToken = async () => {
    const cookiesStore = cookies()
    const token = cookiesStore.get("token")?.value;
    const data = await loginService.UserData(token);
    return data;
};

export default validateAccessToken;