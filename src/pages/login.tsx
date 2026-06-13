import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else window.location.href = '/dashboard'
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      if (data.user) {
        await supabase.from('profiles').insert({ id: data.user.id, full_name: name, role: 'institution_admin' })
        setMessage('Account created! Please check your email to verify.')
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Head><title>{mode === 'login' ? 'Sign in' : 'Sign up'} — Delphi</title></Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-md shadow-sm">
          <Link href="/" className="text-xl font-semibold tracking-tight block mb-8">Del<span className="text-brand-600">phi</span></Link>

          <h1 className="text-2xl font-semibold mb-1">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
          <p className="text-gray-500 text-sm mb-6">{mode === 'login' ? 'Sign in to your institution dashboard' : 'Start managing your programs today'}</p>

          {message && <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg mb-4">{message}</div>}
          {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-1">Full name</label>
                <input required value={name} onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                  placeholder="Dr. Rajesh Kumar" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="you@institution.edu" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-800 transition-colors disabled:opacity-60">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in →' : 'Create account →'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-brand-600 font-medium">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
