import * as React from "react";
import { Navigate } from "react-router-dom";
import { isValidTokenService } from "../../lib/service/account-service";

interface protectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<protectedRouteProps> = ({ children }) => {
  const [isValid, setIsValid] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const validateToken = async () => {
      const tokenIsValid = await isValidTokenService();
      setIsValid(tokenIsValid);
    };
    validateToken();
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
