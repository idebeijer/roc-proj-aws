import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthProvider not found");

  return context;
};

export default useAuth;
