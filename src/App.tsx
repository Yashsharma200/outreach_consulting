import { useEffect, useState, type FormEvent } from 'react';

type Page = 'home' | 'about' | 'contact';
const WEB3FORMS_ACCESS_KEY = 'c037626f-fd70-4068-ba26-59bb5cc1dff4';
const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

function pageFromHash(): Page {
  const hash = window.location.hash.replace('#', '').replace('/', '');
  return hash === 'about' || hash === 'contact' ? hash : 'home';
}

function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a className="brand" href="#/" onClick={() => setOpen(false)}><span className="brand-mark">O</span><span>OUTREACH <strong>CONSULTING</strong></span></a>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
          <a className={page === 'home' ? 'active' : ''} href="#/" onClick={() => setOpen(false)}>Home</a>
          <a className={page === 'about' ? 'active' : ''} href="#/about" onClick={() => setOpen(false)}>About Us</a>
          <a className={page === 'contact' ? 'active' : ''} href="#/contact" onClick={() => setOpen(false)}>Contact Us</a>
          <a className="button button-small" href="#/contact" onClick={() => setOpen(false)}>Let's Talk →</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner"><div><strong>OUTREACH CONSULTING</strong><p>Connecting talent with opportunity.</p></div><div><a href="#/">Home</a><a href="#/about">About</a><a href="#/contact">Contact</a></div><small>© {new Date().getFullYear()} Outreach Consulting. All rights reserved.</small></div></footer>;
}

function CTA() {
  return <section className="cta"><div className="container cta-inner"><div><span className="eyebrow light">LET'S CONNECT</span><h2>Great partnerships start with a conversation.</h2><p>Whether you're hiring or looking for your next opportunity, we're here to help.</p></div><a className="button button-white" href="#/contact">Get in Touch →</a></div></section>;
}

const services = [
  { icon: '🎯', title: 'Talent Acquisition', text: 'Find the right people with a recruitment approach tailored to your organization.', className: 'rose' },
  { icon: '💼', title: 'Executive Search', text: 'Connect with experienced leaders who can drive your business forward.', className: 'lavender' },
  { icon: '✨', title: 'HR Consulting', text: 'Practical people-focused guidance to support your workforce goals.', className: 'aqua' }
];

function Home() {
  return <>
    <section className="hero"><div className="container hero-content"><span className="eyebrow">WELCOME TO OUTREACH CONSULTING</span><h1>Connecting <span>Talent</span> with Opportunity</h1><p>Helping ambitious organizations discover exceptional people and empowering professionals to take their next step.</p><div className="hero-actions"><a href="#/contact" className="button button-yellow">Contact Us →</a><a href="#/about" className="button button-outline">Discover Our Story</a></div></div><div className="orb orb-one"/><div className="orb orb-two"/></section>
    <section className="section"><div className="container split"><div><span className="eyebrow dark">WHO WE ARE</span><h2>People-first recruitment. Meaningful results.</h2><p>At Outreach Consulting, we believe the right connections create lasting impact. We partner with businesses and professionals to make hiring more thoughtful, personal, and effective.</p><a className="text-link" href="#/about">Learn more about us →</a></div><div className="feature-art"><div className="feature-circle">People<br/>+<br/>Possibility</div><span className="feature-chip top">Better matches</span><span className="feature-chip bottom">Stronger teams</span></div></div></section>
    <section className="section services-section"><div className="container"><div className="section-heading"><span className="eyebrow dark">WHAT WE DO</span><h2>Our Services</h2><p>Solutions designed around people, potential, and progress.</p></div><div className="card-grid">{services.map(s => <article key={s.title} className={'service-card ' + s.className}><div className="card-icon">{s.icon}</div><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></div></section>
    <section className="section"><div className="container"><div className="section-heading"><span className="eyebrow dark">OUR DIFFERENCE</span><h2>Why Choose Outreach Consulting?</h2></div><div className="card-grid">{[{title:'Tailored Solutions',icon:'◎',text:'We take time to understand what makes every organization and candidate unique.'},{title:'People-First Approach',icon:'♡',text:'We build trust through clear communication and genuine relationships.'},{title:'Long-Term Partnerships',icon:'↗',text:'We focus on connections that deliver value well beyond the first introduction.'}].map((x,i)=><article key={x.title} className={'why-card why-'+i}><span className="why-icon">{x.icon}</span><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></div></section>
    <CTA />
  </>;
}

function About() {
  return <>
    <section className="page-hero"><div className="container"><span className="eyebrow">GET TO KNOW US</span><h1>About Outreach Consulting</h1><p>Building connections that help people and organizations thrive.</p></div></section>
    <section className="section"><div className="container split"><div><span className="eyebrow dark">OUR STORY</span><h2>Recruitment with a human touch.</h2><p>Outreach Consulting helps employers connect with talent and professionals explore meaningful career opportunities. Our approach combines an understanding of business needs with respect for individual ambitions.</p><p>We believe successful recruitment starts with listening, continues through collaboration, and grows into lasting relationships.</p></div><div className="about-visual"><span>🤝</span><h3>People. Purpose. Progress.</h3></div></div></section>
    <section className="section services-section"><div className="container"><div className="section-heading"><span className="eyebrow dark">WHAT DRIVES US</span><h2>Our Values</h2></div><div className="card-grid"><article className="service-card rose"><div className="card-icon">💬</div><h3>Open Communication</h3><p>We believe in clarity, transparency, and timely conversations.</p></article><article className="service-card lavender"><div className="card-icon">🤝</div><h3>Trust & Partnership</h3><p>We build relationships founded on respect and accountability.</p></article><article className="service-card aqua"><div className="card-icon">🌱</div><h3>Long-Term Impact</h3><p>We work toward outcomes that benefit everyone involved.</p></article></div></div></section>
    <CTA />
  </>;
}

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ok:boolean;message:string}|null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = new FormData(form);
    payload.append('access_key', WEB3FORMS_ACCESS_KEY);
    payload.append('subject', 'New enquiry — Outreach Consulting');
    payload.append('from_name', 'Outreach Consulting Website');
    setLoading(true); setStatus(null);
    try {
      const response = await fetch(FORM_ENDPOINT, {method:'POST',body:payload,headers:{Accept:'application/json'}});
      const result = await response.json() as {success?: boolean; message?: string};
      if (!response.ok || !result.success) throw new Error(result.message || 'Could not submit your enquiry.');
      form.reset();
      setStatus({ok:true,message:'Thank you! Your enquiry has been sent successfully.'});
    } catch {
      setStatus({ok:false,message:'Sorry, your enquiry could not be sent. Please try again.'});
    } finally { setLoading(false); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Full Name *<input name="name" type="text" placeholder="Your full name" autoComplete="name" required /></label><label>Email Address *<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label></div>
    <div className="form-row"><label>Phone Number<input name="phone" type="tel" placeholder="Your phone number" autoComplete="tel" /></label><label>I'm Enquiring As *<select name="enquiryType" defaultValue="" required><option value="" disabled>Select an option</option><option value="Employer">Employer</option><option value="Job Seeker">Job Seeker</option><option value="Other">Other</option></select></label></div>
    <label>Message *<textarea name="message" rows={6} placeholder="Tell us how we can help..." required /></label>
    <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{display:'none'}} aria-hidden="true" />
    <p className="form-note">By submitting, you agree to be contacted regarding your enquiry. Please don't include sensitive personal information.</p>
    <button className="button button-purple" type="submit" disabled={loading}>{loading?'Sending...':'Send Enquiry →'}</button>
    {status && <p role="status" className={status.ok?'form-status success':'form-status error'}>{status.message}</p>}
  </form>;
}

function Contact() {
  return <>
    <section className="page-hero"><div className="container"><span className="eyebrow">GET IN TOUCH</span><h1>Let's Start a Conversation</h1><p>Hiring for your team or exploring your next career move? We'd love to hear from you.</p></div></section>
    <section className="section contact-intro"><div className="container"><div className="contact-grid"><article className="contact-choice rose"><span className="contact-choice-icon">💼</span><h2>For Employers</h2><p>Share your hiring requirements. We'll help you connect with professionals who fit your needs.</p><a href="#enquiry-form">Tell us about your hiring →</a></article><article className="contact-choice aqua"><span className="contact-choice-icon">🚀</span><h2>For Job Seekers</h2><p>Exploring new opportunities? Tell us about your background and the roles you're interested in.</p><a href="#enquiry-form">Start a conversation →</a></article></div></div></section>
    <section className="section form-section" id="enquiry-form"><div className="container form-container"><div className="section-heading"><span className="eyebrow dark">SEND US A MESSAGE</span><h2>How Can We Help You?</h2><p>Fill in the form below and our team will get back to you.</p></div><ContactForm /></div></section>
    <CTA />
  </>;
}

export default function App() {
  const [page,setPage] = useState<Page>(pageFromHash);
  useEffect(()=>{const change=()=>{setPage(pageFromHash());window.scrollTo({top:0,behavior:'instant'});};window.addEventListener('hashchange',change);return()=>window.removeEventListener('hashchange',change);},[]);
  return <><Header page={page}/><main>{page==='home'?<Home/>:page==='about'?<About/>:<Contact/>}</main><Footer/></>;
}
