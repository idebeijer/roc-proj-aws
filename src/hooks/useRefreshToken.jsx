import { axiosInstance } from "../services/axios.service";
import useAuth from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    const response = await axiosInstance.post("/auth/refresh", {
      withCredentials: true,
      data: {
        refreshToken: auth.refreshToken,
      },
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.refreshToken);
      return { ...prev, refreshToken: response.data.refreshToken };
    });
    return response.data.refreshToken;
  };

  return refresh;
};
