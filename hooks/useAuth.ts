import axios from "axios";
import { useState } from "react";

interface UserData {
    memberID: string;
    fullName: string;
}

interface AuthResponse {
    loginData: UserData;
}

const useAuth = () => {
    const [user, setUser] = useState<UserData | null>(null);

    const loginUser = async (user: string, password: string) => {
        try {
            // Ganti 'login' dengan URL endpoint yang sesuai
            const response = await axios.post<AuthResponse>('https://golangapi-j5iu.onrender.com/api/member/mobile/dashboard/login', { user, password }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setUser(response.data.loginData);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return {
        user,
        login: loginUser,
        logout,
    };
}

export default useAuth;
