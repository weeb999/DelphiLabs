import Link from 'next/link'
import Image from 'next/image'
import logo from '../../Logo delphi PNG.png'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  const router = useRouter()
  const hideHeaderOn = ['/', '/delphi-labs']
  const hideHeader = hideHeaderOn.includes(router.pathname)

  return (
    <div className={(hideHeader ? 'delphi-dark ' : '') + 'min-h-screen flex flex-col'}>
      {!hideHeader && (
        <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src={logo} alt="Delphi Labs" width={140} height={40} style={{ objectFit: 'cover', background: 'transparent', transform: 'scale(1.08)' }} />
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium">
              <Link href="/programs" className="hover:text-brand-600 transition-colors">Programs</Link>
              <Link href="/delphi-labs" className="hover:text-brand-600 transition-colors">Delphi Labs</Link>
              <a href="#contact" className="bg-brand-500 text-white px-4 py-2 rounded-full text-sm">Get a demo</a>
            </nav>
          </div>
        </header>
      )}

      <main className="flex-1">{children}</main>

      <footer className="bg-[#2563EB]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-white">
          <span>© 2026 Delphi Labs. All rights reserved.</span>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="/privacy" className="hover:opacity-90">Privacy</Link>
            <Link href="/terms" className="hover:opacity-90">Terms</Link>
            <a href="mailto:contact@delphilabs.in" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">contact@delphilabs.in</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
