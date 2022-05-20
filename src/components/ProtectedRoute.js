import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem('user_login_jwt')) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };