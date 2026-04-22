import { Route, Routes, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Dashboard from './pages/Dashboard'
import Health from './pages/Health'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect, useState } from 'react'

function useAuth() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  useEffect(() => {
    const handle = () => setToken(localStorage.getItem('token'))
    window.addEventListener('storage', handle)
    return () => window.removeEventListener('storage', handle)
  }, [])
  return { token }
}

function App() {
  const { token } = useAuth()
  return (
    <div className="layout">
      <nav className="nav container">
        <div className="brand"><span>🧠</span>Mentara</div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/chat">Chat with Mindy</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/health">Health</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <div>
          {token ? <Link className="btn" to="/profile">Signed In</Link> : <Link className="btn" to="/login">Sign In</Link>}
          <a className="btn primary" href="/register">Get Started</a>
        </div>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login" replace />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/health" element={token ? <Health /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} MindEase</div>
      </footer>
    </div>
  )
}

export default App



