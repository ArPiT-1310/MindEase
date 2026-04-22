import { useEffect, useState } from 'react'
import { api, clearToken } from '@/api/client'
import { useNavigate } from 'react-router-dom'

type User={id:number;email:string;username:string;first_name?:string;last_name?:string;date_of_birth?:string}

export default function Profile(){
  const [user,setUser]=useState<User|null>(null)
  const [saving,setSaving]=useState(false)
  const navigate=useNavigate()

  useEffect(()=>{ api.get('/api/auth/me').then(({data})=>setUser(data)) },[])

  async function save(){
    if(!user) return
    setSaving(true)
    await api.put('/api/auth/me',{
      first_name:user.first_name,last_name:user.last_name,date_of_birth:user.date_of_birth
    })
    setSaving(false)
  }

  function signOut(){
    clearToken()
    navigate('/login')
  }

  if(!user) return <div className="container">Loading...</div>

  return (
    <div className="container">
      <h2>Profile</h2>
      <div className="auth" style={{maxWidth:600}}>
        <div className="field"><label>Email</label><input value={user.email} disabled /></div>
        <div className="field"><label>Username</label><input value={user.username} disabled /></div>
        <div className="row">
          <div className="field" style={{flex:1}}><label>First name</label><input value={user.first_name||''} onChange={e=>setUser({...user,first_name:e.target.value})} /></div>
          <div className="field" style={{flex:1}}><label>Last name</label><input value={user.last_name||''} onChange={e=>setUser({...user,last_name:e.target.value})} /></div>
        </div>
        <div className="field"><label>Date of birth</label><input type="date" value={user.date_of_birth||''} onChange={e=>setUser({...user,date_of_birth:e.target.value})} /></div>
        <div className="row">
          <button className="btn primary" onClick={save} disabled={saving}>{saving?'Saving...':'Save'}</button>
          <button className="btn" onClick={signOut}>Sign Out</button>
        </div>
      </div>
    </div>
  )
}




