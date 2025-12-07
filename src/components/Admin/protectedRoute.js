
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const storedUser = JSON.parse(localStorage.getItem("adminsInfo")); 
  // Example: { role: "admin" }

  if (!storedUser) return <Navigate to="/admin-login" />;

  if (!allowedRoles.includes(storedUser.role)) {
    return <Navigate to="/admin-login" />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
