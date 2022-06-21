import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { BackdropLoader } from "./BackdropLoader";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const veryifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? veryifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {}, [isLoading]);

  return <>{isLoading ? <BackdropLoader /> : <Outlet />}</>;
};

export default PersistLogin;
