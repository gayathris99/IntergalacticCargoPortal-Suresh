import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'


export default function App () {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={
            <PublicRoute>
                <Login />
            </PublicRoute>
        } />
        <Route path='/signup' element={
            <PublicRoute>
                <Signup />
            </PublicRoute>
        } />
        <Route path='/dashboard' element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        } />
    </Routes>
  </BrowserRouter>

  )
}