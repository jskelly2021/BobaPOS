import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * allowedRoles: e.g. ['manager'] or ['cashier','manager']
 * If user is not logged in ⇒ redirect to /login
 * If logged in but role not allowed ⇒ redirect to /unauthorized
 * Otherwise ⇒ render child routes (<Outlet />)
 */
export function RequireAuth({ allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (user === null) {
    // still loading? you could render a spinner here
    return <div>Loading…</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.position)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
}
