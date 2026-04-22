import { useState } from 'react'
import { api, setToken } from '@/api/client'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [form,setForm]=useState({
    email:'',username:'',password:'',first_name:'',last_name:'',date_of_birth:''
  })
  const [error,setError]=useState('')
  const navigate=useNavigate()

  async function submit(e:React.FormEvent){
    e.preventDefault()
    setError('')
    try{
      await api.post('/api/auth/register',{
        ...form,
        date_of_birth: form.date_of_birth || null
      })
      const {data}=await api.post('/api/auth/login',{username:form.username,password:form.password})
      setToken(data.access_token)
      navigate('/dashboard')
    }catch(err:any){
      setError(err?.response?.data?.detail||'Registration failed')
    }
  }

  function set<K extends keyof typeof form>(k:K,v:string){setForm(prev=>({...prev,[k]:v}))}

  return (
    <div className="auth">
      <h2>Create Account</h2>
      <form onSubmit={submit}>
        <div className="row">
          <div className="field" style={{flex:1}}>
            <label>First name</label>
            <input value={form.first_name} onChange={e=>set('first_name',e.target.value)} />
          </div>
          <div className="field" style={{flex:1}}>
            <label>Last name</label>
            <input value={form.last_name} onChange={e=>set('last_name',e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} required />
        </div>
        <div className="field">
          <label>Username</label>
          <input value={form.username} onChange={e=>set('username',e.target.value)} required />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e=>set('password',e.target.value)} required />
        </div>
        <div className="field">
          <label>Date of birth</label>
          <input type="date" value={form.date_of_birth} onChange={e=>set('date_of_birth',e.target.value)} />
        </div>
        {error && <div style={{color:'#ff8a8a',marginBottom:8}}>{error}</div>}
        <button className="btn primary" type="submit">Create Account</button>
      </form>
    </div>
  )
}




