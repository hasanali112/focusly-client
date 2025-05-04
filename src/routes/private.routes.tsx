import { useAppSelector } from "@/hooks/useAppSelector";
import { Navigate, useLocation } from "react-router-dom";

const ProtectRoutes = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);

  if (token) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectRoutes;
