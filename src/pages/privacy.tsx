import Layout from '../components/Layout'
import Link from 'next/link'

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-6 text-slate-300">Last updated: June 20, 2026</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-slate-200">We respect your privacy. This Privacy Policy explains how Delphi Labs collects, uses, and discloses information when you use our website and services.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <ul className="list-disc pl-5 text-slate-200">
            <li>Personal data you provide (name, email, phone, organization).</li>
            <li>Usage data (pages visited, IP address, device and browser information).</li>
            <li>Cookies and similar tracking technologies.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">How We Use Information</h2>
          <p className="text-slate-200">We use collected information to provide and improve our services, communicate with you about programs and requests, process inquiries, and comply with legal obligations.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Third Parties &amp; Data Sharing</h2>
          <p className="text-slate-200">We may share data with trusted third-party service providers (analytics, hosting, email delivery) and where required by law.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Cookies</h2>
          <p className="text-slate-200">We use cookies for essential site functionality and analytics. You can control cookie settings in your browser.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-slate-200">For questions about privacy, contact us at <a href="mailto:contact@delphilabs.in" className="underline">contact@delphilabs.in</a>.</p>
        </section>

        <div className="mt-8 flex gap-4">
          <a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white px-4 py-2 rounded">Download PDF</a>
          <Link href="/" className="text-slate-300 underline">Back to Home</Link>
        </div>
      </div>
    </Layout>
  )
}
