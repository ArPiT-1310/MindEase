import { useEffect, useState } from 'react'
import { api } from '@/api/client'

type MoodAnalytics={average_mood:number;mood_trend:string;common_emotions:{emotion:string,percentage:number}[];mood_patterns:any}
type SleepAnalytics={average_sleep_duration:number;sleep_quality_trend:string;sleep_patterns:any;recommendations:string[]}
type HealthInsights={overall_wellness_score:number;key_insights:any[];recommendations:string[];risk_factors:string[]}

export default function Dashboard(){
  const [mood,setMood]=useState<MoodAnalytics|null>(null)
  const [sleep,setSleep]=useState<SleepAnalytics|null>(null)
  const [ins,setIns]=useState<HealthInsights|null>(null)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    setLoading(true)
    Promise.all([
      api.get('/api/analytics/mood'),
      api.get('/api/analytics/sleep'),
      api.get('/api/analytics/overall')
    ]).then(([m,s,o])=>{setMood(m.data);setSleep(s.data);setIns(o.data)}).finally(()=>setLoading(false))
  },[])

  return (
    <div className="container">
      <h2>Your Wellness Dashboard</h2>
      {loading && <div className="card" style={{margin:'12px 0'}}>Loading AI insights… <span className="spinner" /></div>}
      <div className="analytics">
        <div className="stat">
          <h3>Average Mood</h3>
          <div style={{fontSize:32}}>{mood?.average_mood ?? '—'}</div>
          <div style={{color:'var(--muted)'}}>Trend: {mood?.mood_trend ?? '—'}</div>
        </div>
        <div className="stat">
          <h3>Sleep Duration</h3>
          <div style={{fontSize:32}}>{sleep?.average_sleep_duration ?? '—'}h</div>
          <div style={{color:'var(--muted)'}}>Quality: {sleep?.sleep_quality_trend ?? '—'}</div>
        </div>
        <div className="stat">
          <h3>Wellness Score</h3>
          <div style={{fontSize:32}}>{ins?.overall_wellness_score ?? '—'}</div>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Common Emotions</h3>
          {(mood?.common_emotions||[]).map(e=> (
            <div key={e.emotion} style={{display:'flex',justifyContent:'space-between'}}>
              <span>{e.emotion}</span>
              <span style={{color:'var(--muted)'}}>{e.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Sleep Recommendations</h3>
          <ul>
            {(sleep?.recommendations||[]).map((r,i)=>(<li key={i}>{r}</li>))}
          </ul>
        </div>
        <div className="card">
  <h3>AI Insights</h3>
  {(!ins?.key_insights || ins.key_insights.length === 0) ? (
    <p>No insights yet.</p>
  ) : (
    <ul className="insight-list">
      {ins.key_insights.map((x:any, i:number) => (
        <li key={i} className="insight-item">
          <h4>{x.title || `Insight ${i + 1}`}</h4>
          <p>{x.description || 'No description available.'}</p>
          {x.confidence_score && (
            <small>
              Confidence: {(x.confidence_score * 100).toFixed(0)}%
            </small>
          )}
        </li>
      ))}
    </ul>
  )}
</div>

      </div>
    </div>
  )
}



