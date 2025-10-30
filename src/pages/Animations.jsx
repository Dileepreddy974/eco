import React from 'react';

export default function Animations() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="animate-fade-in-down" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', color: '#1f2937' }}>
        🎨 Animation Showcase
      </h1>

      {/* Fade Animations */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Fade Animations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="animate-fade-in glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Fade In
          </div>
          <div className="animate-fade-in-up glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Fade In Up
          </div>
          <div className="animate-fade-in-down glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Fade In Down
          </div>
          <div className="animate-fade-in-left glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Fade In Left
          </div>
          <div className="animate-fade-in-right glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Fade In Right
          </div>
        </div>
      </section>

      {/* Scale & Pulse Animations */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left stagger-1" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Scale & Pulse Animations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="animate-scale-in clay-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Scale In
          </div>
          <div className="animate-pulse clay-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Pulse
          </div>
          <div className="animate-heartbeat clay-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            💚 Heartbeat
          </div>
        </div>
      </section>

      {/* Bounce Animations */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left stagger-2" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Bounce Animations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="animate-bounce-in glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Bounce In
          </div>
          <div className="animate-bounce glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            🌱 Bounce
          </div>
        </div>
      </section>

      {/* Rotation Animations */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left stagger-3" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Rotation Animations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="clay-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div className="animate-spin" style={{ display: 'inline-block', fontSize: '2rem' }}>⚙️</div>
            <div>Spin</div>
          </div>
          <div className="clay-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div className="animate-spin-slow" style={{ display: 'inline-block', fontSize: '2rem' }}>🌍</div>
            <div>Spin Slow</div>
          </div>
          <div className="clay-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div className="animate-wiggle" style={{ display: 'inline-block', fontSize: '2rem' }}>🔔</div>
            <div>Wiggle</div>
          </div>
        </div>
      </section>

      {/* Slide Animations */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left stagger-4" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Slide Animations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="animate-slide-in-left glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Slide In Left
          </div>
          <div className="animate-slide-in-right glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Slide In Right
          </div>
          <div className="animate-slide-in-up glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Slide In Up
          </div>
          <div className="animate-slide-in-down glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            Slide In Down
          </div>
        </div>
      </section>

      {/* Glow Animations */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left stagger-5" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Glow Animations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="animate-glow clay-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #4ade80, #22c55e)', color: 'white' }}>
            Glow
          </div>
          <div className="animate-glow-pulse clay-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white' }}>
            Glow Pulse
          </div>
        </div>
      </section>

      {/* Float Animations */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Float Animations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="animate-float glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            ☁️ Float
          </div>
          <div className="animate-float-slow glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            🎈 Float Slow
          </div>
        </div>
      </section>

      {/* Hover Effects */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Hover Effects (Try hovering!)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="hover-lift clay-card" style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}>
            Hover Lift
          </div>
          <div className="hover-scale clay-card" style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}>
            Hover Scale
          </div>
          <div className="hover-glow clay-card" style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}>
            Hover Glow
          </div>
          <div className="hover-rotate clay-card" style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}>
            🔄 Hover Rotate
          </div>
        </div>
      </section>

      {/* Gradient Animation */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Gradient Animation
        </h2>
        <div className="gradient-animate" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
          backgroundSize: '200% 200%',
          padding: '3rem',
          borderRadius: '16px',
          textAlign: 'center',
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          Animated Gradient Background
        </div>
      </section>

      {/* Staggered Animations */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Staggered Animations
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="animate-fade-in-up stagger-1 glass-card" style={{ padding: '1rem' }}>
            Item 1 - Delay 0.1s
          </div>
          <div className="animate-fade-in-up stagger-2 glass-card" style={{ padding: '1rem' }}>
            Item 2 - Delay 0.2s
          </div>
          <div className="animate-fade-in-up stagger-3 glass-card" style={{ padding: '1rem' }}>
            Item 3 - Delay 0.3s
          </div>
          <div className="animate-fade-in-up stagger-4 glass-card" style={{ padding: '1rem' }}>
            Item 4 - Delay 0.4s
          </div>
          <div className="animate-fade-in-up stagger-5 glass-card" style={{ padding: '1rem' }}>
            Item 5 - Delay 0.5s
          </div>
        </div>
      </section>

      {/* Shimmer Loading Effect */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="animate-fade-in-left" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#4ade80' }}>
          Shimmer Loading Effect
        </h2>
        <div className="shimmer-effect" style={{
          height: '60px',
          borderRadius: '8px',
          backgroundColor: '#e5e7eb',
          position: 'relative',
          overflow: 'hidden'
        }}>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="animate-fade-in clay-card" style={{ padding: '2rem', marginTop: '3rem', background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.1))' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#1f2937' }}>
          📚 How to Use These Animations
        </h2>
        <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
          Simply add the animation class to any element:
        </p>
        <code style={{ 
          display: 'block', 
          padding: '1rem', 
          background: 'rgba(0,0,0,0.05)', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          marginBottom: '1rem'
        }}>
          {'<div className="animate-fade-in">Content</div>'}
        </code>
        <p style={{ color: '#4b5563' }}>
          Combine with modifiers like <code>stagger-1</code>, <code>duration-slow</code>, or <code>fill-forwards</code> for custom effects!
        </p>
      </section>
    </div>
  );
}
