import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Program, ProgramType } from '@/lib/types'

const TYPE_LABELS: Record<ProgramType, string> = {
  workshop: 'Workshop',
  training: 'Training',
  internship: 'Internship',
  custom: 'Custom',
}

const MODE_COLORS: Record<string, string> = {
  online: 'bg-green-50 text-green-700',
  offline: 'bg-blue-50 text-blue-700',
  hybrid: 'bg-purple-50 text-purple-700',
}

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [filter, setFilter] = useState<ProgramType | 'all'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      let query = supabase.from('programs').select('*').eq('is_active', true).order('created_at', { ascending: false })
      if (filter !== 'all') query = query.eq('type', filter)
      const { data } = await query
      setPrograms(data || [])
      setLoading(false)
    }
    fetchPrograms()
  }, [filter])

  return (
    <>
      <Head><title>Programs — Delphi</title></Head>

      <main className="max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-semibold mb-2">Browse programs</h1>
        <p className="text-gray-500 mb-8">Premium programs for schools and colleges, delivered by industry experts.</p>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {(['all', 'workshop', 'training', 'internship', 'custom'] as const).map((t) => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${filter === t ? 'bg-brand-600 text-white border-brand-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
              {t === 'all' ? 'All' : TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading programs...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((p) => (
              <div key={p.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium bg-brand-50 text-brand-600 px-2 py-1 rounded-md">{TYPE_LABELS[p.type]}</span>
                  <span className={`text-xs px-2 py-1 rounded-md ${MODE_COLORS[p.mode]}`}>{p.mode}</span>
                </div>
                <h3 className="font-medium mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{p.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Duration: {p.duration}</span>
                  <span className="font-semibold text-brand-600">₹{p.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {p.tags?.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                <Link href={`/book/${p.id}`}
                  className="mt-4 block text-center bg-brand-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-brand-800 transition-colors">
                  Book this program →
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
