import { useEffect, useState } from 'react'
import { api } from '@/api/client'

type SleepData = {
  id?: number
  date: string
  bedtime?: string
  wake_time?: string
  sleep_duration_hours?: number
  sleep_quality_score?: number
  deep_sleep_hours?: number
  rem_sleep_hours?: number
  light_sleep_hours?: number
  sleep_notes?: string
}

type MoodEntry = {
  id?: number
  date: string
  mood_score: number
  emotions?: string[]
  energy_level?: number
  stress_level?: number
  anxiety_level?: number
  depression_level?: number
  notes?: string
  triggers?: string[]
  activities?: string[]
}

type HealthMetric = {
  id?: number
  date: string
  metric_type: string
  value: number
  unit?: string
  notes?: string
}

export default function Health(){
  // Sleep form/state
  const [sleepForm,setSleepForm]=useState<SleepData>({date: new Date().toISOString().slice(0,16), sleep_quality_score:7})
  const [sleepList,setSleepList]=useState<SleepData[]>([])

  // Mood form/state
  const [moodForm,setMoodForm]=useState<MoodEntry>({date: new Date().toISOString().slice(0,16), mood_score:6})
  const [moodList,setMoodList]=useState<MoodEntry[]>([])

  // Health metric form/state
  const [metricForm,setMetricForm]=useState<HealthMetric>({date: new Date().toISOString().slice(0,16), metric_type:'steps', value: 1000})
  const [metricList,setMetricList]=useState<HealthMetric[]>([])

  async function load(){
    const [sleep,mood,metrics] = await Promise.all([
      api.get('/api/health/sleep?limit=10'),
      api.get('/api/health/mood?limit=10'),
      api.get('/api/health/metrics?limit=10'),
    ])
    setSleepList(sleep.data)
    setMoodList(mood.data)
    setMetricList(metrics.data)
  }

  useEffect(()=>{ load() },[])

  function iso(dt: string){
    // If input is "YYYY-MM-DDTHH:mm" return ISO; else pass-through
    if(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(dt)) return new Date(dt).toISOString()
    return dt
  }

  async function submitSleep(e:React.FormEvent){
    e.preventDefault()
    const payload = { ...sleepForm, date: iso(sleepForm.date), bedtime: sleepForm.bedtime? iso(sleepForm.bedtime): undefined, wake_time: sleepForm.wake_time? iso(sleepForm.wake_time): undefined }
    const {data}=await api.post('/api/health/sleep', payload)
    setSleepList([data, ...sleepList])
  }

  async function submitMood(e:React.FormEvent){
    e.preventDefault()
    const payload = { ...moodForm, date: iso(moodForm.date) }
    const {data}=await api.post('/api/health/mood', payload)
    setMoodList([data, ...moodList])
  }

  async function submitMetric(e:React.FormEvent){
    e.preventDefault()
    const payload = { ...metricForm, date: iso(metricForm.date) }
    const {data}=await api.post('/api/health/metrics', payload)
    setMetricList([data, ...metricList])
  }

  return (
    <div className="container">
      <h2>Track Your Health</h2>
      <div className="cards">
        <div className="card">
          <h3>Sleep</h3>
          <form onSubmit={submitSleep}>
            <div className="field"><label>Date & time</label><input type="datetime-local" value={sleepForm.date} onChange={e=>setSleepForm({...sleepForm,date:e.target.value})} required /></div>
            <div className="row">
              <div className="field" style={{flex:1}}><label>Bedtime</label><input type="datetime-local" value={sleepForm.bedtime||''} onChange={e=>setSleepForm({...sleepForm,bedtime:e.target.value})} /></div>
              <div className="field" style={{flex:1}}><label>Wake time</label><input type="datetime-local" value={sleepForm.wake_time||''} onChange={e=>setSleepForm({...sleepForm,wake_time:e.target.value})} /></div>
            </div>
            <div className="row">
              <div className="field" style={{flex:1}}><label>Duration (h)</label><input type="number" step="0.1" value={sleepForm.sleep_duration_hours??''} onChange={e=>setSleepForm({...sleepForm,sleep_duration_hours: Number(e.target.value)})} /></div>
              <div className="field" style={{flex:1}}><label>Quality (1-10)</label><input type="number" min={1} max={10} value={sleepForm.sleep_quality_score??''} onChange={e=>setSleepForm({...sleepForm,sleep_quality_score: Number(e.target.value)})} /></div>
            </div>
            <div className="field"><label>Notes</label><textarea value={sleepForm.sleep_notes||''} onChange={e=>setSleepForm({...sleepForm,sleep_notes:e.target.value})} /></div>
            <button className="btn primary" type="submit">Save Sleep</button>
          </form>
          <ul style={{marginTop:12}}>
            {sleepList.map((s)=> (<li key={s.id}>{new Date(s.date).toLocaleString()} — {s.sleep_duration_hours??'—'}h, q:{s.sleep_quality_score??'—'}</li>))}
          </ul>
        </div>

        <div className="card">
          <h3>Mood</h3>
          <form onSubmit={submitMood}>
            <div className="field"><label>Date & time</label><input type="datetime-local" value={moodForm.date} onChange={e=>setMoodForm({...moodForm,date:e.target.value})} required /></div>
            <div className="field"><label>Mood score (1-10)</label><input type="number" min={1} max={10} value={moodForm.mood_score} onChange={e=>setMoodForm({...moodForm,mood_score:Number(e.target.value)})} required /></div>
            <div className="field"><label>Emotions (comma separated)</label><input value={(moodForm.emotions||[]).join(',')} onChange={e=>setMoodForm({...moodForm,emotions:e.target.value? e.target.value.split(',').map(x=>x.trim()).filter(Boolean): undefined})} /></div>
            <div className="row">
              <div className="field" style={{flex:1}}><label>Energy</label><input type="number" min={1} max={10} value={moodForm.energy_level??''} onChange={e=>setMoodForm({...moodForm,energy_level:Number(e.target.value)})} /></div>
              <div className="field" style={{flex:1}}><label>Stress</label><input type="number" min={1} max={10} value={moodForm.stress_level??''} onChange={e=>setMoodForm({...moodForm,stress_level:Number(e.target.value)})} /></div>
            </div>
            <div className="field"><label>Notes</label><textarea value={moodForm.notes||''} onChange={e=>setMoodForm({...moodForm,notes:e.target.value})} /></div>
            <button className="btn primary" type="submit">Save Mood</button>
          </form>
          <ul style={{marginTop:12}}>
            {moodList.map((m)=> (<li key={m.id}>{new Date(m.date).toLocaleString()} — mood:{m.mood_score}</li>))}
          </ul>
        </div>

        <div className="card">
          <h3>Health Metric</h3>
          <form onSubmit={submitMetric}>
            <div className="field"><label>Date & time</label><input type="datetime-local" value={metricForm.date} onChange={e=>setMetricForm({...metricForm,date:e.target.value})} required /></div>
            <div className="row">
              <div className="field" style={{flex:1}}><label>Type</label><input value={metricForm.metric_type} onChange={e=>setMetricForm({...metricForm,metric_type:e.target.value})} required /></div>
              <div className="field" style={{flex:1}}><label>Value</label><input type="number" step="0.1" value={metricForm.value} onChange={e=>setMetricForm({...metricForm,value:Number(e.target.value)})} required /></div>
            </div>
            <div className="row">
              <div className="field" style={{flex:1}}><label>Unit</label><input value={metricForm.unit||''} onChange={e=>setMetricForm({...metricForm,unit:e.target.value})} /></div>
            </div>
            <div className="field"><label>Notes</label><textarea value={metricForm.notes||''} onChange={e=>setMetricForm({...metricForm,notes:e.target.value})} /></div>
            <button className="btn primary" type="submit">Save Metric</button>
          </form>
          <ul style={{marginTop:12}}>
            {metricList.map((h)=> (<li key={h.id}>{new Date(h.date).toLocaleString()} — {h.metric_type}: {h.value}{h.unit? ` ${h.unit}`:''}</li>))}
          </ul>
        </div>
      </div>

      <p style={{color:'var(--muted)'}}>Note: Your AI companion uses your recent mood and sleep data to personalize responses.</p>
    </div>
  )
}



