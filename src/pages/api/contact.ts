import type { NextApiRequest, NextApiResponse } from 'next'
// We'll call Resend REST API directly to avoid type mismatches
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { name, email, org, phone, message } = req.body || {}
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' })

  const to = process.env.CONTACT_EMAIL || 'contact@delphilabs.in'
  const subject = `Website contact: ${name}`
  const html = `
    <h2>New contact request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Organisation:</strong> ${org || '-'}</p>
    <p><strong>Phone:</strong> ${phone || '-'}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `
  try {
    // primary email to site owner
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Delphi Labs <no-reply@delphilabs.in>',
        to: to,
        subject,
        html,
      }),
    })

    // confirmation to user (best-effort)
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Delphi Labs <no-reply@delphilabs.in>',
          to: email,
          subject: `Thanks for contacting Delphi Labs`,
          html: `<p>Hi ${name},</p><p>Thanks for reaching out — we've received your message and will contact you shortly.</p><p>-- Delphi Labs</p>`,
        }),
      })
    } catch (e) {
      console.warn('confirmation email failed', e)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send error', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
