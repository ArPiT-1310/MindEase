import { useEffect, useRef, useState } from 'react'
import { api } from '@/api/client'

type Msg = { id?: number; content: string; is_user_message: boolean }

export default function Chat(){
  const [input,setInput]=useState('')
  const [messages,setMessages]=useState<Msg[]>([])
  const boxRef = useRef<HTMLDivElement>(null)
  const [typing,setTyping]=useState(false)

  async function load(){
    const {data}=await api.get('/api/chat/history?limit=50')
    setMessages(data.reverse())
  }

  useEffect(()=>{ load() },[])
  useEffect(()=>{ boxRef.current?.scrollTo({top:1e9,behavior:'smooth'}) },[messages])

  async function send(){
    if(!input.trim()) return
    const user:Msg={content:input,is_user_message:true}
    setMessages(prev=>[...prev,user])
    setInput('')
    setTyping(true)
    const {data}=await api.post('/api/chat/send',{content:user.content,message_type:'text'})
    setTyping(false)
    setMessages(prev=>[...prev,{content:data.message,is_user_message:false}])
  }

  return (
    <div className="container chat">
      <h2>Chat with Mindy</h2>
      <div className="chat-box" ref={boxRef}>
        {messages.map((m,i)=> (
          <div key={i} className={`msg ${m.is_user_message?'user':'ai'}`}>{m.content}</div>
        ))}
        {typing && <div className="msg ai">Mindy is typing… <span className="spinner" /></div>}
      </div>
      <div className="row" style={{marginTop:8}}>
        <input placeholder="Type a message..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') send()}} />
        <button className="btn primary" onClick={send}>Send</button>
      </div>
    </div>
  )
}



