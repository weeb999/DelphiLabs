import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════
   NEURAL CANVAS — hero background
════════════════════════════════════════ */
function NeuralCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 70;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8,
      p: Math.random() * Math.PI * 2,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.p += 0.018;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 180) {
          const a = (1 - d / 180) * 0.22;
          const g = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
          g.addColorStop(0, `rgba(58,130,246,${a})`);
          g.addColorStop(1, `rgba(99,179,255,${a * 0.6})`);
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = g; ctx.lineWidth = 0.9; ctx.stroke();
        }
      }
      nodes.forEach(n => {
        const bright = 0.7 + 0.3 * Math.sin(n.p);
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        glow.addColorStop(0, `rgba(96,165,250,${bright * 0.55})`);
        glow.addColorStop(1, "rgba(37,99,235,0)");
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${bright})`; ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

/* ════════════════════════════════════════
   ICONS
════════════════════════════════════════ */
const Ico = {
  ai: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:22,height:22}}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  robot: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:22,height:22}}><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7M8 11V9M16 11V9" strokeLinecap="round"/><circle cx="9" cy="15" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.5" fill="currentColor" stroke="none"/><path d="M9 4h6M12 4V7" strokeLinecap="round"/></svg>,
  people: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:22,height:22}}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:22,height:22}}><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:15,height:15}}><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:14,height:14}}><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:13,height:13}}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeLinecap="round"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="currentColor" style={{width:15,height:15}}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  li: <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  ig: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:18,height:18}}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>,
  yt: <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}><path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>,
  tag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:13,height:13}}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" strokeLinecap="round" strokeLinejoin="round"/><line x1="7" y1="7" x2="7.01" y2="7" strokeLinecap="round"/></svg>,
};

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const PROGRAMS = [
  { cat:"AI & Machine Learning", icon:"ai",    accent:"#3B82F6", light:"#BFDBFE", name:"Prompt Engineering for Students", type:"Workshop",         hrs:"4 hrs",  price:"₹1,000" },
  { cat:"AI & Machine Learning", icon:"ai",    accent:"#3B82F6", light:"#BFDBFE", name:"Gen-AI Foundational Workshop",   type:"Workshop",         hrs:"4 hrs",  price:"₹1,000" },
  { cat:"Robotics & IoT",        icon:"robot", accent:"#06B6D4", light:"#A5F3FC", name:"Robotics — IoT Foundations",     type:"Workshop",         hrs:"4 hrs",  price:"₹1,000" },
  { cat:"Soft Skills",           icon:"people",accent:"#8B5CF6", light:"#DDD6FE", name:"Corporate Compass",              type:"Training Program", hrs:"15 hrs", price:"₹3,000" },
  { cat:"Soft Skills",           icon:"people",accent:"#8B5CF6", light:"#DDD6FE", name:"Resume Building Workshop",        type:"Workshop",         hrs:"4 hrs",  price:"₹1,000" },
  { cat:"Aptitude",              icon:"chart", accent:"#10B981", light:"#A7F3D0", name:"AptiSprint",                     type:"Training Program", hrs:"15 hrs", price:"₹3,000" },
];

const TESTIMONIALS = [
  { name:"Priya S.", role:"Computer Science, 3rd Year", text:"Delphi Labs gave me confidence to walk into any interview. The Gen-AI workshop opened my eyes to what's actually happening in the industry.", stars:5 },
  { name:"Rahul M.", role:"Electronics Engineering",     text:"The Robotics workshop was unlike anything we do in college. Hands-on, fast-paced, and genuinely industry-relevant. Worth every rupee.", stars:5 },
  { name:"Anjali K.", role:"MBA Student",                text:"Corporate Compass transformed how I think about communication and workplace readiness. I felt the shift within the first hour.", stars:5 },
];

const WHY = [
  { icon:"🎯", title:"Industry-Oriented",   desc:"Every module mirrors what hiring teams actually test for — not what textbooks cover." },
  { icon:"⚡", title:"Hands-on First",      desc:"Build, test, and ship. Each session ends with something tangible in your portfolio." },
  { icon:"🧠", title:"Expert Trainers",     desc:"Learn from practitioners actively working in AI, robotics, and corporate environments." },
  { icon:"🚀", title:"Career Acceleration", desc:"Leave with a polished resume, interview confidence, and workplace mindset." },
];

const BENEFITS = ["Industry Aligned Programs","Placement Readiness Training","Technical Skill Development","Soft Skill Enhancement","Custom Training Programs"];

/* ════════════════════════════════════════
   CSS
════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#060D1F;
  --surface:#080F22;
  --card:#0D1730;
  --raise:#122040;
  --blue:#2563EB;
  --blue-bright:#3B82F6;
  --blue-glow:#60A5FA;
  --sky:#93C5FD;
  --white:#FFFFFF;
  --muted:rgba(148,163,184,0.85);
  --border:rgba(59,130,246,0.12);
  --border-bright:rgba(96,165,250,0.25);
  --radius-lg:20px;
  --radius-xl:28px;
}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:var(--surface);color:var(--white);overflow-x:hidden;-webkit-font-smoothing:antialiased}
::selection{background:rgba(59,130,246,0.35)}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--ink)}
::-webkit-scrollbar-thumb{background:var(--blue);border-radius:3px}

/* ── Typography ── */
.hero-h{font-size:clamp(44px,6.5vw,88px);font-weight:900;line-height:1.0;letter-spacing:-0.045em}
.section-h{font-size:clamp(30px,4vw,54px);font-weight:800;line-height:1.08;letter-spacing:-0.035em}
.card-h{font-size:17px;font-weight:700;letter-spacing:-0.02em;line-height:1.3}
.body{font-size:16px;line-height:1.75;color:var(--muted);font-weight:400}

/* ── Gradients ── */
.gt{background:linear-gradient(140deg,#fff 20%,#93C5FD 55%,#3B82F6 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gt-blue{background:linear-gradient(130deg,#60A5FA,#3B82F6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* ── Buttons ── */
.btn{display:inline-flex;align-items:center;gap:8px;font-family:'Inter',sans-serif;font-weight:600;font-size:14px;letter-spacing:-0.01em;border:none;cursor:pointer;transition:all .22s cubic-bezier(.4,0,.2,1);white-space:nowrap}
.btn-p{padding:13px 26px;border-radius:12px;background:linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%);color:#fff;box-shadow:0 4px 24px rgba(37,99,235,0.45),inset 0 1px 0 rgba(255,255,255,0.12)}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 40px rgba(37,99,235,0.6),inset 0 1px 0 rgba(255,255,255,0.15);background:linear-gradient(135deg,#3B82F6 0%,#2563EB 100%)}
.btn-o{padding:13px 26px;border-radius:12px;background:rgba(59,130,246,0.08);color:var(--sky);border:1px solid rgba(59,130,246,0.28)}
.btn-o:hover{background:rgba(59,130,246,0.15);border-color:rgba(96,165,250,0.5);transform:translateY(-2px);box-shadow:0 8px 32px rgba(37,99,235,0.2)}
.btn-sm{padding:10px 20px;font-size:13px;border-radius:10px}

/* ── Pill label ── */
.pill{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--sky);background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.22);padding:5px 14px;border-radius:100px;margin-bottom:22px}

/* ── Glass card ── */
.glass{background:rgba(13,23,48,0.7);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--border)}
.glass-hi{background:rgba(13,23,48,0.85);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border:1px solid var(--border-bright)}

/* ── Nav ── */
.nav-link{color:rgba(203,213,225,0.7);font-size:14px;font-weight:500;text-decoration:none;transition:color .18s;cursor:pointer;letter-spacing:-0.005em}
.nav-link:hover{color:#fff}

/* ── Program cards ── */
.prog-card{transition:transform .3s cubic-bezier(.4,0,.2,1),box-shadow .3s,border-color .3s;cursor:default}
.prog-card:hover{transform:translateY(-7px)}

/* ── Feature cards ── */
.feat-card{transition:transform .28s,border-color .28s}
.feat-card:hover{transform:translateY(-5px);border-color:rgba(96,165,250,0.3) !important}

/* ── Grid bg ── */
.grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(59,130,246,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.05) 1px,transparent 1px);background-size:72px 72px;mask-image:radial-gradient(ellipse 85% 85% at 50% 50%,black 0%,transparent 100%)}

/* ── Glow orbs ── */
.orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}

/* ── Divider ── */
.divider{border:none;border-top:1px solid var(--border);margin:0}

/* ── Input ── */
.field{width:100%;padding:13px 16px;background:rgba(59,130,246,0.05);border:1px solid rgba(59,130,246,0.15);border-radius:11px;color:#fff;font-family:'Inter',sans-serif;font-size:14px;font-weight:400;outline:none;transition:border-color .2s,background .2s}
.field:focus{border-color:rgba(96,165,250,0.55);background:rgba(59,130,246,0.08)}
.field::placeholder{color:rgba(148,163,184,0.4)}

/* ── Scroll animation ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
.au{animation:fadeUp .75s cubic-bezier(.4,0,.2,1) forwards}
.au1{animation-delay:.1s;opacity:0}
.au2{animation-delay:.22s;opacity:0}
.au3{animation-delay:.34s;opacity:0}

/* ── Responsive ── */
@media(max-width:780px){
  .desk-nav{display:none !important}
  .mob-btn{display:flex !important}
  .two-col{grid-template-columns:1fr !important}
  .three-col{grid-template-columns:1fr !important}
  .prog-grid{grid-template-columns:1fr !important}
  .stats-grid{grid-template-columns:1fr 1fr !important}
  .foot-grid{grid-template-columns:1fr !important}
  .form-2{grid-template-columns:1fr !important}
}
`;

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function DelphiLabs() {
  const [tIdx, setTIdx] = useState(0);
  const [form, setForm] = useState({ name:"", email:"", org:"", phone:"", message:"" });
  const [menu, setMenu] = useState(false);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    const fn = () => setNav(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenu(false); };
  const setF = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <style>{CSS}</style>

      {/* ═══════ NAV ═══════ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:200,
        padding:"0 32px",
        background: nav ? "rgba(6,13,31,0.88)" : "transparent",
        backdropFilter: nav ? "blur(24px)" : "none",
        WebkitBackdropFilter: nav ? "blur(24px)" : "none",
        borderBottom: nav ? "1px solid rgba(59,130,246,0.12)" : "none",
        transition:"all .3s",
      }}>
        <div style={{ maxWidth:1240,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:70 }}>
          {/* Logo */}
          <div style={{ display:"flex",alignItems:"center",gap:11,cursor:"pointer" }} onClick={() => go("hero")}>
            <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#2563EB,#60A5FA)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:16,letterSpacing:"-0.03em",boxShadow:"0 0 20px rgba(37,99,235,0.5)" }}>D</div>
            <span style={{ fontWeight:800,fontSize:15,letterSpacing:"-0.025em" }}>DELPHI<span style={{ color:"#60A5FA" }}>.</span>LABS</span>
          </div>
          {/* Desktop links */}
          <div className="desk-nav" style={{ display:"flex",alignItems:"center",gap:36 }}>
            {[["Programs","programs"],["About","about"],["For Colleges","colleges"],["Contact","contact"]].map(([l,id]) => (
              <a key={id} className="nav-link" onClick={() => go(id)}>{l}</a>
            ))}
          </div>
          <div className="desk-nav" style={{ display:"flex",alignItems:"center",gap:12 }}>
            <button className="btn btn-o btn-sm" onClick={() => go("colleges")}>Partner With Us</button>
            <button className="btn btn-p btn-sm" onClick={() => go("programs")}>Explore Programs</button>
          </div>
          {/* Mobile */}
          <button className="mob-btn" style={{ display:"none",background:"none",border:"1px solid rgba(59,130,246,0.25)",borderRadius:9,padding:"7px 9px",color:"var(--sky)",cursor:"pointer",alignItems:"center" }} onClick={() => setMenu(!menu)}>
            {menu ? Ico.x : Ico.menu}
          </button>
        </div>
        {menu && (
          <div style={{ background:"rgba(6,13,31,0.97)",borderTop:"1px solid var(--border)",padding:"24px 32px 28px",display:"flex",flexDirection:"column",gap:18 }}>
            {[["Programs","programs"],["About","about"],["For Colleges","colleges"],["Contact","contact"]].map(([l,id]) => (
              <a key={id} className="nav-link" style={{ fontSize:17 }} onClick={() => go(id)}>{l}</a>
            ))}
            <button className="btn btn-p" style={{ marginTop:8,justifyContent:"center" }} onClick={() => go("programs")}>Explore Programs</button>
          </div>
        )}
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section id="hero" style={{ position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden",paddingTop:80 }}>
        <div className="grid-bg" />
        <NeuralCanvas />
        {/* Orbs */}
        <div className="orb" style={{ width:700,height:700,background:"rgba(37,99,235,0.18)",top:"-15%",left:"40%",transform:"translateX(-50%)" }} />
        <div className="orb" style={{ width:500,height:500,background:"rgba(96,165,250,0.1)",bottom:"-10%",right:"-5%" }} />
        <div className="orb" style={{ width:300,height:300,background:"rgba(37,99,235,0.12)",bottom:"20%",left:"-5%" }} />
        {/* Horizontal shimmer line */}
        <div style={{ position:"absolute",top:"38%",left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(96,165,250,0.2),rgba(59,130,246,0.4),rgba(96,165,250,0.2),transparent)",pointerEvents:"none" }} />

        <div style={{ position:"relative",zIndex:2,maxWidth:1240,margin:"0 auto",padding:"0 32px",width:"100%" }}>
          <div style={{ maxWidth:820 }}>
            <div className="pill au au1">
              <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--blue-glow)",display:"inline-block",boxShadow:"0 0 6px var(--blue-glow)" }} />
              Innovation in Education
            </div>
            <h1 className="hero-h au au2" style={{ marginBottom:28 }}>
              Build Industry-Ready<br />
              <span className="gt">Skills for Tomorrow</span>
            </h1>
            <p className="body au au3" style={{ fontSize:18,maxWidth:540,marginBottom:44 }}>
              Master AI, Robotics, Aptitude, Communication, and Career Skills through hands-on workshops and industry-focused training programs.
            </p>
            <div style={{ display:"flex",gap:14,flexWrap:"wrap" }} className="au au3">
              <button className="btn btn-p" style={{ fontSize:15,padding:"15px 30px" }} onClick={() => go("programs")}>
                Explore Programs {Ico.arrow}
              </button>
              <button className="btn btn-o" style={{ fontSize:15,padding:"15px 30px" }} onClick={() => go("colleges")}>
                Partner With Us
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="stats-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginTop:96 }}>
            {[
              { v:"1000+",  l:"Students Trained" },
              { v:"Industry", l:"Aligned Curriculum" },
              { v:"Hands-on", l:"Learning Experience" },
              { v:"Career",   l:"Focused Programs" },
            ].map((s,i) => (
              <div key={i} className="glass" style={{ borderRadius:16,padding:"22px 24px",textAlign:"center",borderColor:"rgba(59,130,246,0.15)" }}>
                <div style={{ fontSize:26,fontWeight:900,letterSpacing:"-0.04em",marginBottom:6 }} className="gt-blue">{s.v}</div>
                <div style={{ fontSize:12,color:"var(--muted)",fontWeight:500,letterSpacing:"0.01em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" style={{ padding:"130px 32px",maxWidth:1240,margin:"0 auto" }}>
        <div className="two-col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center" }}>
          <div>
            <div className="pill">Who We Are</div>
            <h2 className="section-h" style={{ marginBottom:24 }}>
              Learning Beyond<br /><span className="gt">the Classroom</span>
            </h2>
            <p className="body" style={{ marginBottom:18 }}>
              Delphi Labs bridges the gap between academic learning and industry expectations through immersive workshops, training programs, and technology-driven learning experiences.
            </p>
            <p className="body" style={{ marginBottom:36 }}>
              Our mission is to equip students with practical skills, confidence, and industry exposure required to succeed in the modern workforce.
            </p>
            <button className="btn btn-p btn-sm" onClick={() => go("programs")}>See All Programs {Ico.arrow}</button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
            {[
              { e:"🤖",t:"AI & Robotics",      d:"Cutting-edge technology workshops" },
              { e:"💬",t:"Soft Skills",         d:"Communication & workplace readiness" },
              { e:"📊",t:"Aptitude",            d:"Analytical & quantitative training" },
              { e:"🎯",t:"Career Development",  d:"Resume, interviews & placement prep" },
            ].map(c => (
              <div key={c.t} className="glass feat-card" style={{ padding:26,borderRadius:18,border:"1px solid var(--border)" }}>
                <div style={{ fontSize:30,marginBottom:14,lineHeight:1 }}>{c.e}</div>
                <div style={{ fontWeight:700,fontSize:14,marginBottom:6,letterSpacing:"-0.01em" }}>{c.t}</div>
                <div style={{ fontSize:12,color:"var(--muted)",lineHeight:1.6 }}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROGRAMS ═══════ */}
      <section id="programs" style={{ padding:"110px 32px",position:"relative",overflow:"hidden" }}>
        <div className="orb" style={{ width:600,height:600,background:"rgba(37,99,235,0.1)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:0 }} />
        <div style={{ maxWidth:1240,margin:"0 auto",position:"relative",zIndex:1 }}>
          <div style={{ textAlign:"center",marginBottom:68 }}>
            <div className="pill" style={{ justifyContent:"center" }}>Our Programs</div>
            <h2 className="section-h" style={{ marginBottom:14 }}>Skills That Get You Hired</h2>
            <p className="body" style={{ maxWidth:440,margin:"0 auto",fontSize:16 }}>Every program is built around what industry actually expects — not what textbooks cover.</p>
          </div>

              <div className="prog-grid" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
            {PROGRAMS.map((p,i) => (
              <div key={i} className="glass prog-card" style={{
                borderRadius:22,padding:30,
                border:"1px solid rgba(59,130,246,0.13)",
                position:"relative",overflow:"hidden",
              }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${p.accent}40`;e.currentTarget.style.borderColor=`${p.accent}40`}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor="rgba(59,130,246,0.13)"}}>
                {/* Top accent stripe */}
                <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${p.accent},${p.accent}00)` }} />
                {/* Glow in corner */}
                <div style={{ position:"absolute",top:-40,right:-40,width:140,height:140,borderRadius:"50%",background:`${p.accent}12`,filter:"blur(30px)",pointerEvents:"none" }} />

                <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:22 }}>
                  <div style={{ width:46,height:46,borderRadius:13,background:`${p.accent}18`,border:`1px solid ${p.accent}30`,display:"flex",alignItems:"center",justifyContent:"center",color:p.light }}>
                    {Ico[p.icon]}
                  </div>
                  <span style={{ fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:p.light,background:`${p.accent}15`,border:`1px solid ${p.accent}25`,padding:"4px 10px",borderRadius:100 }}>{p.type}</span>
                </div>

                <div style={{ fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:p.light,opacity:0.7,marginBottom:8 }}>{p.cat}</div>
                <h3 className="card-h" style={{ marginBottom:20,fontSize:18 }}>{p.name}</h3>

                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:5,color:"var(--muted)",fontSize:13 }}>
                    {Ico.clock} {p.hrs}
                  </div>
                  <div style={{ fontSize:22,fontWeight:900,letterSpacing:"-0.03em",color:"#fff" }}>{p.price}</div>
                </div>

                <button onClick={() => go("contact")}
                  style={{ marginTop:18,width:"100%",padding:"12px",background:`${p.accent}10`,border:`1px solid ${p.accent}25`,borderRadius:11,color:p.light,fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:13,cursor:"pointer",transition:"all .2s",letterSpacing:"-0.01em" }}
                  onMouseEnter={e=>{e.target.style.background=`${p.accent}25`;e.target.style.borderColor=`${p.accent}55`}}
                  onMouseLeave={e=>{e.target.style.background=`${p.accent}10`;e.target.style.borderColor=`${p.accent}25`}}>
                  Enrol Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHY DELPHI ═══════ */}
      <section style={{ padding:"110px 32px" }}>
        <div style={{ maxWidth:1240,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start" }} className="two-col">
            <div style={{ position:"sticky",top:120 }}>
              <div className="pill">Why Delphi Labs</div>
              <h2 className="section-h" style={{ marginBottom:20 }}>
                Built Different.<br /><span className="gt">By Design.</span>
              </h2>
              <p className="body" style={{ marginBottom:36 }}>
                We don't run a classroom. We run a launchpad — where every session is engineered to close the gap between where you are and where industry needs you to be.
              </p>
              <button className="btn btn-p btn-sm" onClick={() => go("contact")}>Start Your Journey {Ico.arrow}</button>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              {WHY.map((w,i) => (
                <div key={i} className="glass feat-card" style={{ padding:"28px 30px",borderRadius:18,border:"1px solid var(--border)",display:"flex",gap:22,alignItems:"flex-start" }}>
                  <div style={{ fontSize:32,lineHeight:1,flexShrink:0 }}>{w.icon}</div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:15,marginBottom:8,letterSpacing:"-0.015em" }}>{w.title}</div>
                    <p className="body" style={{ fontSize:14,margin:0 }}>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SOFTWARE PRODUCT ═══════ */}
      <section style={{ padding:"60px 32px" }}>
        <div style={{ maxWidth:1240,margin:"0 auto" }}>
          <div style={{ borderRadius:28,position:"relative",overflow:"hidden",padding:"72px 60px",background:"linear-gradient(135deg,#0A1628 0%,#061022 100%)",border:"1px solid rgba(59,130,246,0.2)" }}>
            <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 65% 50%,rgba(37,99,235,0.18) 0%,transparent 65%)" }} />
            <div style={{ position:"absolute",top:0,left:"10%",right:"10%",height:1,background:"linear-gradient(90deg,transparent,rgba(96,165,250,0.5),transparent)" }} />
            {/* Floating grid */}
            <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)",backgroundSize:"48px 48px",pointerEvents:"none" }} />

            <div style={{ position:"relative",zIndex:1,display:"grid",gridTemplateColumns:"1fr auto",gap:40,alignItems:"center" }} className="two-col">
              <div>
                <div className="pill" style={{ marginBottom:18 }}>Software Products</div>
                <h2 className="section-h" style={{ marginBottom:18,fontSize:"clamp(26px,3.5vw,42px)" }}>Student Management System</h2>
                <p className="body" style={{ maxWidth:540,fontSize:16 }}>
                  A complete platform for managing student records, attendance, communication, assessments, and training operations — built for institutions that take outcomes seriously.
                </p>
              </div>
              <div>
                <div style={{ padding:"14px 28px",borderRadius:12,background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",color:"rgba(148,163,184,0.5)",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:13,letterSpacing:"0.04em",textTransform:"uppercase",textAlign:"center" }}>
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOR COLLEGES ═══════ */}
      <section id="colleges" style={{ padding:"130px 32px" }}>
        <div style={{ maxWidth:1240,margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center" }}>
            <div>
              <div className="pill">For Institutions</div>
              <h2 className="section-h" style={{ marginBottom:20 }}>
                Partner With<br /><span className="gt">Delphi Labs</span>
              </h2>
              <p className="body" style={{ marginBottom:36 }}>
                We collaborate with colleges, universities, and institutions to deliver industry-relevant workshops, faculty development programs, and skill development initiatives tailored to your students.
              </p>
              <button className="btn btn-p" onClick={() => go("contact")}>Request a Proposal {Ico.arrow}</button>
            </div>

            <div className="glass-hi" style={{ borderRadius:24,padding:36 }}>
              <div style={{ fontSize:13,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--muted)",marginBottom:24 }}>What your institution gets</div>
              <div style={{ display:"flex",flexDirection:"column",gap:0 }}>
                {BENEFITS.map((b,i) => (
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:14,padding:"16px 0",borderBottom: i < BENEFITS.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div style={{ width:26,height:26,borderRadius:8,background:"rgba(37,99,235,0.2)",border:"1px solid rgba(96,165,250,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--sky)",flexShrink:0 }}>
                      {Ico.check}
                    </div>
                    <span style={{ fontSize:15,fontWeight:500,letterSpacing:"-0.01em" }}>{b}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-p" style={{ width:"100%",marginTop:28,justifyContent:"center" }} onClick={() => go("contact")}>
                Get in Touch {Ico.arrow}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section style={{ padding:"100px 32px",background:"linear-gradient(180deg,transparent,rgba(37,99,235,0.04),transparent)" }}>
        <div style={{ maxWidth:1240,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:56 }}>
            <div className="pill" style={{ justifyContent:"center" }}>Testimonials</div>
            <h2 className="section-h">What Students Say</h2>
          </div>
          <div style={{ maxWidth:680,margin:"0 auto" }}>
            <div className="glass-hi" style={{ borderRadius:24,padding:"52px 52px",textAlign:"center",position:"relative",overflow:"hidden",minHeight:220 }}>
              <div style={{ position:"absolute",top:0,left:"20%",right:"20%",height:1,background:"linear-gradient(90deg,transparent,rgba(96,165,250,0.4),transparent)" }} />
              <div style={{ display:"flex",justifyContent:"center",gap:3,marginBottom:22,color:"#FBBF24" }}>
                {Array(TESTIMONIALS[tIdx].stars).fill(0).map((_,i) => <span key={i}>{Ico.star}</span>)}
              </div>
              <p style={{ fontSize:18,lineHeight:1.72,color:"rgba(226,232,240,0.9)",marginBottom:30,fontStyle:"italic",letterSpacing:"-0.01em" }}>
                "{TESTIMONIALS[tIdx].text}"
              </p>
              <div style={{ fontWeight:700,fontSize:15,letterSpacing:"-0.01em" }}>{TESTIMONIALS[tIdx].name}</div>
              <div style={{ color:"var(--muted)",fontSize:13,marginTop:5 }}>{TESTIMONIALS[tIdx].role}</div>
            </div>
            <div style={{ display:"flex",justifyContent:"center",gap:8,marginTop:24 }}>
              {TESTIMONIALS.map((_,i) => (
                <button key={i} onClick={() => setTIdx(i)} style={{ width: i===tIdx ? 28 : 8,height:8,borderRadius:4,background: i===tIdx ? "var(--blue-bright)" : "rgba(255,255,255,0.15)",border:"none",cursor:"pointer",transition:"all .35s" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" style={{ padding:"110px 32px" }}>
        <div style={{ maxWidth:700,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:52 }}>
            <div className="pill" style={{ justifyContent:"center" }}>Contact Us</div>
            <h2 className="section-h" style={{ marginBottom:14 }}>
              Let's Build Something<br /><span className="gt">Together</span>
            </h2>
            <p className="body">For program inquiries, partnerships, or college collaborations.</p>
          </div>

          <div className="glass-hi" style={{ borderRadius:26,padding:"44px 44px",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",top:0,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(96,165,250,0.35),transparent)" }} />

            <div className="form-2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
              {[["Full Name","name","text","Your full name"],["Email Address","email","email","you@email.com"]].map(([l,k,t,ph]) => (
                <div key={k}>
                  <label style={{ fontSize:12,fontWeight:700,letterSpacing:"0.04em",textTransform:"uppercase",color:"rgba(148,163,184,0.7)",display:"block",marginBottom:9 }}>{l}</label>
                  <input className="field" type={t} placeholder={ph} value={form[k]} onChange={setF(k)} />
                </div>
              ))}
            </div>
            <div className="form-2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
              {[["Organisation","org","text","College / Company"],["Phone","phone","tel","+91 98765 43210"]].map(([l,k,t,ph]) => (
                <div key={k}>
                  <label style={{ fontSize:12,fontWeight:700,letterSpacing:"0.04em",textTransform:"uppercase",color:"rgba(148,163,184,0.7)",display:"block",marginBottom:9 }}>{l}</label>
                  <input className="field" type={t} placeholder={ph} value={form[k]} onChange={setF(k)} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom:26 }}>
              <label style={{ fontSize:12,fontWeight:700,letterSpacing:"0.04em",textTransform:"uppercase",color:"rgba(148,163,184,0.7)",display:"block",marginBottom:9 }}>Message</label>
              <textarea className="field" rows={5} placeholder="Tell us about your requirements, institution, or the program you're interested in…" value={form.message} onChange={setF("message")} style={{ resize:"vertical" }} />
            </div>
            <button className="btn btn-p" style={{ width:"100%",justifyContent:"center",fontSize:15,padding:"16px" }}>
              Get In Touch {Ico.arrow}
            </button>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ borderTop:"1px solid rgba(59,130,246,0.1)",padding:"64px 32px 36px",position:"relative" }}>
        <div style={{ position:"absolute",top:0,left:"30%",right:"30%",height:1,background:"linear-gradient(90deg,transparent,rgba(96,165,250,0.25),transparent)" }} />
        <div style={{ maxWidth:1240,margin:"0 auto" }}>
          <div className="foot-grid" style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:52,marginBottom:52 }}>
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:11,marginBottom:18 }}>
                <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#2563EB,#60A5FA)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:16,boxShadow:"0 0 16px rgba(37,99,235,0.4)" }}>D</div>
                <span style={{ fontWeight:800,fontSize:15,letterSpacing:"-0.025em" }}>DELPHI<span style={{ color:"#60A5FA" }}>.</span>LABS</span>
              </div>
              <p style={{ fontSize:14,color:"var(--muted)",lineHeight:1.7,maxWidth:290,marginBottom:24 }}>Building Industry-Ready Professionals through AI, Robotics, and Skill Development.</p>
              <div style={{ display:"flex",gap:10 }}>
                {[["LinkedIn",Ico.li],["Instagram",Ico.ig],["YouTube",Ico.yt]].map(([n,ic]) => (
                  <a key={n} href="#" style={{ width:38,height:38,borderRadius:10,background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.18)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)",textDecoration:"none",transition:"all .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="rgba(37,99,235,0.2)";e.currentTarget.style.color=`#93C5FD`;e.currentTarget.style.borderColor="rgba(96,165,250,0.4)" }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(59,130,246,0.08)";e.currentTarget.style.color="var(--muted)";e.currentTarget.style.borderColor="rgba(59,130,246,0.18)" }}>
                    {ic}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(148,163,184,0.5)",marginBottom:18 }}>Quick Links</div>
              {[["Home","hero"],["Programs","programs"],["For Colleges","colleges"],["About","about"],["Contact","contact"]].map(([l,id]) => (
                <div key={id} style={{ marginBottom:12 }}>
                  <a className="nav-link" style={{ fontSize:14 }} onClick={() => go(id)}>{l}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(148,163,184,0.5)",marginBottom:18 }}>Programs</div>
              {["AI & Machine Learning","Robotics & IoT","Soft Skills","Aptitude Training","Career Development"].map(p => (
                <div key={p} style={{ marginBottom:12 }}>
                  <a className="nav-link" style={{ fontSize:14 }} onClick={() => go("programs")}>{p}</a>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(59,130,246,0.1)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
            <span style={{ fontSize:13,color:"rgba(148,163,184,0.35)" }}>© 2025 Delphi Labs. All rights reserved.</span>
            <span style={{ fontSize:13,color:"rgba(148,163,184,0.35)" }}>Building the workforce of tomorrow, today.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
