import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Program } from '@/lib/types'

declare global {
  interface Window { Razorpay: any }
}

export default function BookProgram() {
  const router = useRouter()
  const { id } = router.query
  const [program, setProgram] = useState<Program | null>(null)
  const [seats, setSeats] = useState(30)
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    if (!id) return
    supabase.from('programs').select('*').eq('id', id).single().then(({ data }) => setProgram(data))
  }, [id])

  const loadRazorpay = () => new Promise<void>((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve()
    document.body.appendChild(script)
  })

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }

    const { data: profile } = await supabase.from('profiles').select('institution_id').eq('id', user.id).single()
    const total = (program?.price || 0) * seats

    // For free programs, skip payment
    if (total === 0) {
      await supabase.from('bookings').insert({
        institution_id: profile?.institution_id,
        program_id: id,
        scheduled_date: date,
        seats_booked: seats,
        total_amount: 0,
        status: 'confirmed',
        payment_status: 'paid',
        notes,
      })
      setBooked(true)
      setLoading(false)
      return
    }

    // Razorpay payment
    await loadRazorpay()
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: total * 100, // paise
      currency: 'INR',
      name: 'Delphi',
      description: program?.title,
      handler: async (response: any) => {
        await supabase.from('bookings').insert({
          institution_id: profile?.institution_id,
          program_id: id,
          scheduled_date: date,
          seats_booked: seats,
          total_amount: total,
          status: 'confirmed',
          payment_status: 'paid',
          payment_id: response.razorpay_payment_id,
          notes,
        })
        setBooked(true)
      },
      prefill: { email: user.email },
      theme: { color: '#185FA5' },
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
    setLoading(false)
  }

    if (booked) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">✓</div>
        <h2 className="text-2xl font-semibold mb-2">Booking confirmed!</h2>
        <p className="text-gray-500 mb-6">Our team will reach out within 24 hours with next steps.</p>
        <Link href="/dashboard" className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-800 transition-colors">
          Go to dashboard →
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <Head><title>Book program — Delphi</title></Head>
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-100">
        <Link href="/" className="text-xl font-semibold tracking-tight">Del<span className="text-brand-600">phi</span></Link>
        <Link href="/programs" className="text-sm text-gray-500">← Back to programs</Link>
      </nav>

      <main className="max-w-2xl mx-auto px-8 py-12">
        {program && (
          <div className="bg-brand-50 rounded-xl p-5 mb-8">
            <div className="text-xs text-brand-600 font-medium uppercase tracking-wider mb-1">{program.type}</div>
            <h2 className="font-semibold text-lg mb-1">{program.title}</h2>
            <div className="text-sm text-gray-500 flex gap-4">
              <span>Duration: {program.duration}</span>
              <span>Mode: {program.mode}</span>
              <span>Max {program.max_seats} seats</span>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-semibold mb-6">Book this program</h1>

        <form onSubmit={handleBook} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Preferred date *</label>
            <input required type="date" value={date} onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Number of seats *</label>
            <input required type="number" value={seats} onChange={e => setSeats(Number(e.target.value))}
              min={1} max={program?.max_seats || 100}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Additional notes</label>
            <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 resize-none"
              placeholder="Any specific requirements or customizations..." />
          </div>

          {/* Price summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Price per seat</span>
              <span>₹{program?.price.toLocaleString('en-IN') || 0}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Seats</span>
              <span>{seats}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span className="text-brand-600">₹{((program?.price || 0) * seats).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-800 transition-colors disabled:opacity-60">
            {loading ? 'Processing...' : `Confirm & pay ₹${((program?.price || 0) * seats).toLocaleString('en-IN')} →`}
          </button>
        </form>
      </main>
    </>
  )
}
