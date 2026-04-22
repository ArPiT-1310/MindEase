export default function Home(){
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Talk. Reflect. <span className="accent">Heal.</span></h1>
          <p>With Mindy — your AI companion for mental wellness. Experience personalized emotional support anytime, anywhere.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center'}}>
            <a className="btn primary" href="/chat">Start Chat with Mindy</a>
            <a className="btn" href="/login">Sign In</a>
          </div>
        </div>
      </section>

      <section className="container">
        <h2>Powerful Features for Your <span className="accent">Mental Wellness</span></h2>
        <div className="cards">
          {[
            {t:'Mood Tracking',d:'Track your emotions and discover patterns in your mental wellness journey.'},
            {t:'AI Companion',d:'Chat with Mindy, your personal AI wellness companion available 24/7.'},
            {t:'Wellness Insights',d:'Get personalized insights and recommendations based on your data.'},
            {t:'Sleep & Activity',d:'Monitor your sleep patterns and activities for better wellness.'},
          ].map((c)=> (
            <div key={c.t} className="card">
              <h3>{c.t}</h3>
              <p style={{color:'var(--muted)'}}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <h2>How Mentara Works</h2>
        <div className="grid-3">
          {[
            {n:'01',t:'Sign Up & Meet Mindy',d:'Create your account and get introduced to Mindy, your personal AI wellness companion.'},
            {n:'02',t:'Track Your Mood',d:'Log your daily emotions and activities to help Mindy understand your patterns.'},
            {n:'03',t:'Get Personalized Insights',d:'Receive AI-powered recommendations and support tailored to your unique needs.'},
          ].map((c)=> (
            <div key={c.n} className="card">
              <div style={{fontSize:28,opacity:.7}}>{c.n}</div>
              <h3>{c.t}</h3>
              <p style={{color:'var(--muted)'}}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <h2>What Our Users Say</h2>
        <div className="grid-3">
          {[
            {n:'Sarah Johnson',r:'“MindEase has been a game‑changer for my mental health. Mindy feels like a real friend who truly understands me.”'},
            {n:'Michael Chen',r:'“The mood tracking feature helped me identify stress patterns I never noticed. The insights are incredibly valuable.”'},
            {n:'Emily Rodriguez',r:'“Having 24/7 access to emotional support through Mindy has made such a difference in managing my daily stress.”'},
          ].map((t)=> (
            <div key={t.n} className="testimonial">
              <strong>{t.n}</strong>
              <p style={{color:'var(--muted)'}}>{t.r}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}




