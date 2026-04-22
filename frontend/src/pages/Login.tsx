import { useState } from 'react'
import { api, setToken } from '@/api/client'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const navigate=useNavigate()

  async function submit(e:React.FormEvent){
    e.preventDefault()
    setError('')
    try{
      const {data}=await api.post('/api/auth/login',{username,password})
      setToken(data.access_token)
      navigate('/dashboard')
    }catch(err:any){
      setError(err?.response?.data?.detail||'Login failed')
    }
  }

  return (
    <div className="auth">
      <h2>Sign In</h2>
      <form onSubmit={submit}>
        <div className="field">
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} required />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        {error && <div style={{color:'#ff8a8a',marginBottom:8}}>{error}</div>}
        <button className="btn primary" type="submit">Sign In</button>
      </form>
      <p style={{marginTop:12,color:'var(--muted)'}}>No account? <Link to="/register">Create one</Link></p>
    </div>
  )
}




