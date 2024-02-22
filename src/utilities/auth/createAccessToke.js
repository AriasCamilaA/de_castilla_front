"use server"
import loginService from "app/services/login_service";
import { cookies } from "next/headers";

const createAccessToken = async (email, password) => {
    const cookiesStore = cookies()
    const data = await loginService.Create({ email, password });
    const {token, refresh} = data;

    if(token && refresh){
        cookiesStore.set('token', token, {path: '/', httpOnly: true, sameSite: 'strict'});
        cookiesStore.set('refresh', refresh, {path: '/', httpOnly: true, sameSite: 'strict'});
    }
}

export default createAccessToken;