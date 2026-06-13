import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', institution_name: '', city: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('leads').insert({ ...form, source: 'landing_page' })
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Delphi — Premium Platform for Institutional Excellence</title>
        <meta name="description" content="Delphi connects schools and colleges with premium workshops, training, and internship programs." />
      </Head>

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-4 fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50 transition-all shadow-sm">
        <span className="text-2xl font-bold tracking-tight text-slate-900">Del<span className="text-brand-500">phi</span></span>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-600">
          <a href="#solutions" className="hover:text-brand-600 transition-colors">Solutions</a>
          <a href="#how-it-works" className="hover:text-brand-600 transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-brand-600 transition-colors">Pricing</a>
          <a href="#contact" className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-full transition-all shadow-[0_4px_14px_0_rgba(55,138,221,0.39)] hover:shadow-[0_6px_20px_rgba(55,138,221,0.23)] hover:-translate-y-0.5">
            Get a demo
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative max-w-5xl mx-auto px-8 pt-40 pb-24 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <span className="inline-block bg-white/60 border border-brand-100 text-brand-600 text-xs font-bold px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm shadow-sm animate-pulse">
          🎓 Trusted by 50+ premium institutions across India
        </span>
        <h1 className="text-6xl font-bold tracking-tight leading-[1.1] mb-8 text-slate-900 drop-shadow-sm">
          One platform to connect companies<br />
          with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-500">schools & colleges</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
          Delphi is the single window for B2B institutions to deliver workshops, training programs,
          internships, and more — without juggling multiple vendors.
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <a href="#contact" className="bg-brand-500 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-600 transition-all shadow-[0_4px_14px_0_rgba(55,138,221,0.39)] hover:shadow-[0_6px_20px_rgba(55,138,221,0.23)] transform hover:-translate-y-1">
            Start for free →
          </a>
          <Link href="/programs" className="bg-white/80 border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold hover:bg-white transition-all backdrop-blur-sm shadow-sm hover:shadow-md transform hover:-translate-y-1">
            Browse programs
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-4xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: '200+', label: 'Schools & colleges' },
            { num: '50+', label: 'Corporate partners' },
            { num: '1', label: 'Platform. Zero chaos.' },
          ].map((s) => (
            <div key={s.label} className="bg-white/60 border border-white/80 rounded-2xl p-8 text-center backdrop-blur-md shadow-xl shadow-slate-200/50 hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-brand-500 to-indigo-500 mb-2">{s.num}</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="max-w-5xl mx-auto px-8 py-24 border-t border-slate-200/50 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-300/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">Solutions</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything your institution needs</h2>
          <p className="text-slate-600 text-lg">Stop managing 5 different vendors. Delphi brings all premium services under one roof.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🎤', title: 'Workshops', desc: 'Industry-led, on-site or virtual premium sessions' },
            { icon: '📜', title: 'Training', desc: 'Certified programs by top-tier industry experts' },
            { icon: '💼', title: 'Internships', desc: 'Real-world placements with leading companies' },
            { icon: '🧩', title: 'Custom', desc: 'Tailored specifically to your institutional goals' },
          ].map((s) => (
            <div key={s.title} className="bg-white/60 border border-white/80 rounded-2xl p-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-brand-100 hover:bg-white/90 transition-all duration-300 group hover:-translate-y-2 backdrop-blur-sm">
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{s.icon}</div>
              <div className="text-xl font-bold text-slate-900 mb-3">{s.title}</div>
              <div className="text-slate-600 leading-relaxed font-medium">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-8 py-24 border-t border-slate-200/50">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">Workflow</p>
          <h2 className="text-4xl font-bold text-slate-900">Get started in 3 steps</h2>
        </div>
        <div className="flex flex-col gap-10">
          {[
            { n: '1', title: 'Onboard your institution', desc: 'Create your profile and tell us your needs — training, workshops, internships, or all three.' },
            { n: '2', title: 'Browse & select programs', desc: 'Pick from our curated catalog of premium options or request a fully custom program.' },
            { n: '3', title: 'Deliver & track outcomes', desc: 'Delphi manages all coordination, scheduling, and reporting — you focus entirely on your students.' },
          ].map((step) => (
            <div key={step.n} className="flex gap-8 items-start bg-white/60 border border-white/80 p-8 rounded-2xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-brand-100 hover:bg-white/90 transition-all duration-300 backdrop-blur-sm group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-400 to-indigo-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">{step.n}</div>
              <div>
                <div className="text-2xl font-bold text-slate-900 mb-2">{step.title}</div>
                <div className="text-lg text-slate-600 leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-5xl mx-auto px-8 py-24 border-t border-slate-200/50 relative">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-slate-600 text-lg">Start free, scale as you grow. Absolutely no hidden vendor fees.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {[
            { plan: 'Starter', price: 'Free', sub: 'forever', features: ['Up to 2 programs/year', 'Basic dashboard', 'Email support'], cta: 'Get started', highlight: false },
            { plan: 'Growth', price: '₹9,999', sub: '/month', features: ['Unlimited programs', 'Dedicated account manager', 'Custom branding', 'Priority support'], cta: 'Start free trial', highlight: true },
            { plan: 'Enterprise', price: 'Custom', sub: '', features: ['Multi-campus support', 'SLA guarantee', 'On-site onboarding', 'API access'], cta: 'Contact us', highlight: false },
          ].map((p) => (
            <div key={p.plan} className={`relative rounded-3xl p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${p.highlight ? 'bg-white border-2 border-brand-400 shadow-2xl shadow-brand-500/20 md:scale-105 z-10' : 'bg-white/60 border border-white/80 shadow-xl shadow-slate-200/50 hover:bg-white/90'}`}>
              {p.highlight && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs bg-gradient-to-r from-brand-500 to-indigo-500 text-white px-5 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-lg">Most popular</span>}
              <div className="text-brand-500 font-bold mb-2 uppercase tracking-wide">{p.plan}</div>
              <div className="text-5xl font-extrabold text-slate-900 mb-2">{p.price}<span className="text-lg font-medium text-slate-500"> {p.sub}</span></div>
              <ul className="my-8 space-y-4">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-slate-700 font-medium items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 text-brand-600 text-sm font-bold shadow-sm">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`block text-center py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${p.highlight ? 'bg-brand-500 text-white hover:bg-brand-600' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="max-w-3xl mx-auto px-8 py-24 border-t border-slate-200/50">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">Get in touch</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Book a free demo</h2>
          <p className="text-slate-600 text-lg">We&apos;ll reach out within 24 hours to schedule a comprehensive walkthrough.</p>
        </div>
        
        <div className="bg-white/80 border border-white rounded-3xl p-10 backdrop-blur-xl shadow-2xl shadow-brand-500/10">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6 animate-bounce">🎉</div>
              <div className="text-3xl font-extrabold text-slate-900 mb-2">Thank you!</div>
              <div className="text-slate-600 text-lg font-medium">We&apos;ll be in touch shortly to schedule your demo.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all shadow-inner" placeholder="Dr. Rajesh Kumar" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all shadow-inner" placeholder="principal@college.edu" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all shadow-inner" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Institution name</label>
                  <input value={form.institution_name} onChange={e => setForm({ ...form, institution_name: e.target.value })}
                    className="w-full bg-white/50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all shadow-inner" placeholder="MIT College of Engineering" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-white/50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all shadow-inner" placeholder="Mumbai" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">What are you looking for?</label>
                <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all resize-none shadow-inner"
                  placeholder="We need workshops and internship programs for 500 students..." />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-brand-500 to-indigo-500 text-white py-4 rounded-xl font-extrabold text-lg hover:from-brand-600 hover:to-indigo-600 transition-all shadow-[0_4px_14px_0_rgba(55,138,221,0.39)] hover:shadow-[0_6px_20px_rgba(55,138,221,0.23)] disabled:opacity-60 transform hover:-translate-y-1">
                {loading ? 'Submitting...' : 'Book free demo →'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/50 px-8 py-8 mt-12 bg-white/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium">
          <span>© 2026 Delphi Platform. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Terms</a>
            <a href="mailto:hello@delphi.in" className="hover:text-brand-600 transition-colors">hello@delphi.in</a>
          </div>
        </div>
      </footer>
    </>
  )
}
