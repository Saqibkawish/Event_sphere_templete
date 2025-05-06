import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, role }) => {
  const { isLoggedIn, userRole } = useAuth();

  // ✅ Agar user logged in nahi hai to login page par redirect
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Agar role specified hai aur user ka role match nahi karta to unauthorized page
  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Agar sab sahi hai to requested page dikhao
  return children;
};

export default ProtectedRoute;
