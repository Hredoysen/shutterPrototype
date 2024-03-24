import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


interface AuthorityGuardI {
  authority?: string[];
  children?: ReactNode;
}

function AuthorityGuard(props: AuthorityGuardI) {
  const { authority = [], children } = props;
  const roleMatched = true;
  return roleMatched ? <>{children}</> : <Navigate to="/error-forbidden" />;
}

export default AuthorityGuard;
