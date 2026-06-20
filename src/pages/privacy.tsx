import Layout from '../components/Layout'
import Link from 'next/link'

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="text-3xl font-bold mb-4 text-slate-900">Privacy Policy</h1>
        <p className="mb-6 text-slate-500">Last updated: June 20, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-slate-800">Overview</h2>
          <p className="text-slate-600 leading-relaxed">We respect your privacy. This Privacy Policy explains how Delphi Labs collects, uses, and discloses information when you use our website and services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-slate-800">Information We Collect</h2>
          <ul className="list-disc pl-5 text-slate-600 space-y-2 leading-relaxed">
            <li>Personal data you provide (name, email, phone, organization).</li>
            <li>Usage data (pages visited, IP address, device and browser information).</li>
            <li>Cookies and similar tracking technologies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-slate-800">How We Use Information</h2>
          <p className="text-slate-600 leading-relaxed">We use collected information to provide and improve our services, communicate with you about programs and requests, process inquiries, and comply with legal obligations.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-slate-800">Third Parties &amp; Data Sharing</h2>
          <p className="text-slate-600 leading-relaxed">We may share data with trusted third-party service providers (analytics, hosting, email delivery) and where required by law.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-slate-800">Cookies</h2>
          <p className="text-slate-600 leading-relaxed">We use cookies for essential site functionality and analytics. You can control cookie settings in your browser.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-slate-800">Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            For questions about privacy, contact us at{" "}
            <a href="mailto:contact@delphilabs.in" className="text-brand-600 hover:underline font-medium">
              contact@delphilabs.in
            </a>.
          </p>
        </section>

        <div className="mt-12 flex gap-4">
          <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-medium transition-colors text-sm">
            View Document
          </a>
          <Link href="/" className="text-slate-500 hover:text-slate-800 self-center text-sm font-medium transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  )
}
