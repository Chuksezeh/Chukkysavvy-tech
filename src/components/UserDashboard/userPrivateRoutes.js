


import { Navigate } from "react-router-dom";

const UserPrivateRoute = ({ children, isAuthenticated, loadingRoute }) => {
  if (loadingRoute) {
    return <div>Loading...</div>; // Wait until auth check is done
  }

  return isAuthenticated ? children : <Navigate to="/user-login" />;
};

export default UserPrivateRoute;