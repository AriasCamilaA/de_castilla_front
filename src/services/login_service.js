import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const loginService = {
    Create : async (user) => {
        try {
            const url_login = url + "login/";
            const response = await axios.post(url_login, user);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: LOGIN: "+error);
        }
        
    },
    Refresh : async (user) => {
        try {
            const url_login = url + "login/refresh/";
            const response = await axios.post(url_login,user);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: LOGIN REFRESH: "+error);
        }
        
    },
    UserData : async (token) => {
        try {
            const url_user = url + "auth/me/";
            const response = await axios.get(url_user, {
                headers: { Authorization: `Bearer ${token}` }  
                });
            const data = response.data;
            return data;
        } catch (error) {   
            console.error("API ERROR: USER DATA: "+error);
        }
    },
}

export default loginService;