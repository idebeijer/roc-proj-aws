import { axiosInstance } from "../services/axios.service";
import useAuth from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    const response = await axiosInstance.post("/auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
};
