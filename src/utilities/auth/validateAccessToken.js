import loginService from "app/services/login_service";
import { cookies } from "next/headers";


const validateAccessToken = async (req, res, next) => {
    const cookiesStore = cookies()
    const token = cookiesStore.get("token").value;
    const data = await loginService.UserData(token);
    if (!token) {
        res.redirect("/login");
    } else {
        console.log("Logged in as: ", data);
    }
};

export default validateAccessToken;