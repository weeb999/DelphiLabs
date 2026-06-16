import Link from 'next/link'
import { ReactNode } from 'react'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900">Del<span className="text-brand-500">phi</span></Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/programs" className="hover:text-brand-600 transition-colors">Programs</Link>
            <Link href="/delphi-labs" className="hover:text-brand-600 transition-colors">Delphi Labs</Link>
            <a href="#contact" className="bg-brand-500 text-white px-4 py-2 rounded-full text-sm">Get a demo</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white/40 backdrop-blur-sm border-t border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <span>© 2026 Delphi Platform. All rights reserved.</span>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="/privacy" className="hover:text-brand-600">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-600">Terms</Link>
            <a href="mailto:hello@delphi.in" className="hover:text-brand-600">hello@delphi.in</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
