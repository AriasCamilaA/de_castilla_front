import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const passwordResetService = {
    // Solicitar token para restablecimiento de contraseña
    requestPasswordResetToken: async (email) => {
        try {
            const resetUrl = url + "password_reset/";
            const response = await axios.post(resetUrl, { email });
            return response.data;
        } catch (error) {
            console.error("API ERROR: Password Reset Request: " + error);
            throw error;
        }
    }
}

export default passwordResetService;
