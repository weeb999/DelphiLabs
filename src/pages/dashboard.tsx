import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Booking, Institution } from '@/lib/types'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-blue-50 text-blue-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
}

const PAYMENT_COLORS: Record<string, string> = {
  unpaid: 'bg-red-50 text-red-600',
  paid: 'bg-green-50 text-green-600',
  refunded: 'bg-gray-100 text-gray-500',
}

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [institution, setInstitution] = useState<Institution | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }

      const { data: profile } = await supabase.from('profiles').select('*, institutions(*)').eq('id', user.id).single()
      if (profile?.institutions) setInstitution(profile.institutions as Institution)

      const { data: bData } = await supabase
        .from('bookings')
        .select('*, program:programs(*)')
        .eq('institution_id', profile?.institution_id)
        .order('created_at', { ascending: false })
      setBookings(bData || [])
      setLoading(false)
    }
    load()
  }, [])

  const totalSpend = bookings.filter(b => b.payment_status === 'paid').reduce((sum, b) => sum + b.total_amount, 0)
  const activeBookings = bookings.filter(b => ['pending', 'confirmed'].includes(b.status)).length

  return (
    <>
      <Head><title>Dashboard — Delphi</title></Head>
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-100">
        <Link href="/" className="text-xl font-semibold tracking-tight">Del<span className="text-brand-600">phi</span></Link>
        <div className="flex gap-4 items-center">
          <Link href="/programs" className="text-sm text-gray-500 hover:text-gray-900">Browse programs</Link>
          <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
            className="text-sm text-red-500 hover:text-red-700">Sign out</button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold">
              {institution ? institution.name : 'Your Dashboard'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {institution ? `${institution.city} · ${institution.plan} plan` : 'Loading...'}
            </p>
          </div>
          <Link href="/programs" className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-800 transition-colors">
            + Book a program
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total bookings', value: bookings.length },
            { label: 'Active programs', value: activeBookings },
            { label: 'Total spent', value: `₹${totalSpend.toLocaleString('en-IN')}` },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-5">
              <div className="text-sm text-gray-500 mb-1">{s.label}</div>
              <div className="text-2xl font-semibold text-brand-600">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Bookings table */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-medium">Your bookings</h2>
          </div>
          {loading ? (
            <div className="py-12 text-center text-gray-400">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-gray-400 mb-4">No bookings yet</div>
              <Link href="/programs" className="text-brand-600 text-sm font-medium">Browse programs →</Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs">
                <tr>
                  <th className="px-5 py-3 text-left">Program</th>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Payment</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium">{b.program?.title || '—'}</td>
                    <td className="px-5 py-4 text-gray-500">{b.scheduled_date ? new Date(b.scheduled_date).toLocaleDateString('en-IN') : '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${PAYMENT_COLORS[b.payment_status]}`}>{b.payment_status}</span>
                    </td>
                    <td className="px-5 py-4 text-right font-medium">₹{b.total_amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  )
}
