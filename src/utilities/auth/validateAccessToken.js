import loginService from "app/services/login_service";
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";


const validateAccessToken = async () => {
    const cookiesStore = cookies()
    const token = cookiesStore.get("token")?.value;
    const data = await loginService.UserData(token);
};

export default validateAccessToken;