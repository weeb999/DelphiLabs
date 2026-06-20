import Layout from '../components/Layout'
import Link from 'next/link'

export default function Terms() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-24 px-6">
        <div className="text-center mb-12">
          <div className="pill" style={{ display:"inline-flex", alignItems:"center", padding:"6px 14px", borderRadius:"20px", background:"rgba(37,99,235,0.08)", color:"var(--blue-bright)", fontSize:"12px", fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:"16px" }}>
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-slate-900" style={{ letterSpacing: "-0.03em" }}>Terms of Service</h1>
          <p className="text-lg text-slate-500">Last updated: June 20, 2026</p>
        </div>

        <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-8 md:p-12 shadow-sm">
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-slate-900">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Acceptance of Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">By using Delphi Labs services you agree to these Terms and Conditions. Please read them carefully before utilizing our platform or engaging with any of our programs.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-slate-900">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Use of Service
            </h2>
            <p className="text-slate-600 leading-relaxed">You agree to use the service only for lawful purposes and to comply with all applicable laws and regulations. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the service.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-slate-900">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Intellectual Property
            </h2>
            <p className="text-slate-600 leading-relaxed">All content, trademarks, logos, and materials presented on Delphi Labs are the property of Delphi Labs or its respective licensors. You may not reproduce, distribute, or create derivative works from our content without explicit written permission.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-slate-900">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed">To the fullest extent permitted by applicable law, Delphi Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the site or our programs.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-slate-900">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Governing Law
            </h2>
            <p className="text-slate-600 leading-relaxed">These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions.</p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16}}><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  )
}
