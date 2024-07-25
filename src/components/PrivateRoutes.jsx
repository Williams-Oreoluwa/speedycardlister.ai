import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoutes() {  
  const token = useAuth();
  return token ? <Outlet/> : <Navigate to ='/login'/>;
}

export default PrivateRoutes;
