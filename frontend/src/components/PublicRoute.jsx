import { Navigate } from 'react-router-dom'

export default function PublicRoute({ children }) {
    const role = localStorage.getItem('role')
    if (role) return <Navigate to="/dashboard" />
    return children
}