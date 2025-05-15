// components/PrivateRoute.js
import { Navigate } from "react-router-dom";



const AdminPrivateRoute = ({ children, adminAuthenticated }) => {
  return adminAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default AdminPrivateRoute;
