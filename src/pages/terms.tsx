import Layout from '../components/Layout'
import Link from 'next/link'

export default function Terms() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-6 text-slate-300">Last updated: June 20, 2026</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
          <p className="text-slate-200">By using Delphi Labs services you agree to these Terms. Please read them carefully.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Use of Service</h2>
          <p className="text-slate-200">You agree to use the service only for lawful purposes and to comply with applicable laws and regulations.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
          <p className="text-slate-200">All content and trademarks are the property of Delphi Labs or its licensors. You may not reproduce content without permission.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
          <p className="text-slate-200">To the extent permitted by law, Delphi Labs is not liable for indirect or consequential damages arising from use of the site.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Governing Law</h2>
          <p className="text-slate-200">These Terms are governed by the laws of the applicable jurisdiction.</p>
        </section>

        <div className="mt-8 flex gap-4">
          <a href="/terms-of-service.pdf" target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white px-4 py-2 rounded">Download PDF</a>
          <Link href="/" className="text-slate-300 underline">Back to Home</Link>
        </div>
      </div>
    </Layout>
  )
}
