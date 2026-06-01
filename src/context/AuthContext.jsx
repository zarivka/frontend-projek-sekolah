import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/index.js'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

// AuthProvider component to wrap around the app and provide auth state and functions
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Function to fetch current user data using the token
  const fetchMe = async () => {
    try {
      const res = await api.get('/auth/me')
      setUser(res.data)
    } catch (err) {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  // On mount, check for token and fetch user data if token exists
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchMe().finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  // Authentication for login & registration
  const login = async (nim, password) => {
    const res = await api.post('/auth/login', { nim_nls: nim, password })
    const token = res.data.token
    localStorage.setItem('token', token)
    await fetchMe()
    return res
  }

  const register = async (name, nim, password) => {
    const res = await api.post('/auth/register', { name, nim_nls: nim, password })
    const token = res.data.token
    localStorage.setItem('token', token)
    await fetchMe()
    return res
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
