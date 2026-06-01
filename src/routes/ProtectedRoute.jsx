import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-slate-600">Memuat...</div>
  }

  // The following code will checks if user is authenticated and has the required role to access the route. If not authenticated, redirect to login. If authenticated but doesn't have required role, redirect to home
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Authenticated but not allowed -> show forbidden page
    return <Navigate to="/forbidden" replace />
  }

  return children
}

export default ProtectedRoute
