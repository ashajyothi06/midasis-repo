import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// --- SAFE API BASE + URL HELPERS ---
function getApiBase() {
  // Safely read env var only if `process` exists (avoids "process is not defined")
  const fromEnv =
    typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_BASE;

  const raw = fromEnv || "https://midasistechnology.com";

  try {
    return new URL(raw).toString().replace(/\/+$/, "");
  } catch {
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin.replace(/\/+$/, "");
    }
    return "https://midasistechnology.com";
  }
}

function buildApiUrl(path) {
  const base = getApiBase();
  return base + path;
}

export default function Register() {
  // server can flip us between "register" and "login"
  const [mode, setMode] = useState("register");

  // form state
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // flow state
  const [otpSent, setOtpSent] = useState(false);

  // ui state
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // autofocus first meaningful field
  useEffect(() => {
    if (mode === "register") {
      document.getElementById("reg-name")?.focus();
    } else {
      document.getElementById("reg-email")?.focus();
    }
  }, [mode]);

  // helper to talk to backend
  const callAuth = async (body) => {
    const url = buildApiUrl("/api/auth");

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include", // we are using JWT in localStorage not cookies, leave off
      body: JSON.stringify(body),
    });

    return res.json();
  };

  // step 1: send OTP
  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({});

    try {
      const cleanedEmail = (email || "").trim().toLowerCase();
      setEmail(cleanedEmail);

      const payload = {
        mode,
        action: "send",
        email: cleanedEmail,
        ...(mode === "register" ? { name, contact } : {}),
      };

      const data = await callAuth(payload);

      if (data.ok && data.phase === "otp_sent") {
        // backend might force login mode if user already exists
        if (data.mode && data.mode !== mode) {
          setMode(data.mode);
        }

        setOtpSent(true);
        setMsg({
          type: "info",
          text:
            data.message ||
            "Check your inbox — we sent a 6-digit code.",
        });

        // focus OTP
        setTimeout(() => {
          document.getElementById("reg-otp")?.focus();
        }, 0);
      } else {
        setMsg({
          type: "error",
          text: data.message || "Failed to send code.",
        });
      }
    } catch {
      setMsg({
        type: "error",
        text: "Network error. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // step 2: verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setMsg({
        type: "error",
        text: "Please enter the 6-digit code.",
      });
      return;
    }

    setLoading(true);
    setMsg({});
    try {
      const cleanedEmail = (email || "").trim().toLowerCase();

      const data = await callAuth({
        mode,
        action: "verify",
        email: cleanedEmail,
        otp: otp.trim(),
      });

      if (data.ok && data.phase === "authenticated") {
        if (data.token && typeof window !== "undefined") {
          // persist token
          localStorage.setItem("token", data.token);
          // notify the rest of the app
          window.dispatchEvent(new Event("auth:changed"));
          // redirect
          window.location.assign(data.next || "/dashboard");
        }
      } else {
        setMsg({
          type: "error",
          text: data.message || "Verification failed.",
        });
      }
    } catch {
      setMsg({
        type: "error",
        text: "Network error. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // resend OTP
  const handleResend = async () => {
    setLoading(true);
    setMsg({});
    try {
      const cleanedEmail = (email || "").trim().toLowerCase();
      setEmail(cleanedEmail);

      const data = await callAuth({
        mode,
        action: "send",
        resend: true,
        email: cleanedEmail,
        ...(mode === "register" ? { name, contact } : {}),
      });

      if (data.ok && data.phase === "otp_sent") {
        if (data.mode && data.mode !== mode) {
          setMode(data.mode);
        }
        setMsg({
          type: "info",
          text: "Code re-sent. Check your email.",
        });
      } else {
        setMsg({
          type: "error",
          text: data.message || "Failed to resend code.",
        });
      }
    } catch {
      setMsg({
        type: "error",
        text: "Network error. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="register-page">
      <style>{`
        /************************************************************
        BRAND TOKENS (match Login.jsx)
        ************************************************************/
        #register-page {
          --navH:64px;
          --container:1200px;

          --ink:#0b1f34;
          --muted:#5b6b7b;

          --navy:#003c70;
          --border:rgba(0,60,112,0.18);

          --bg-page:#ffffff;

          --radius-card:16px;
          --radius-lg:20px;

          --shadow-card:
            0 24px 60px rgba(0,0,0,.08),
            0 2px 4px rgba(0,0,0,.04);

          --status-ok-bg:#ecfdf5;
          --status-ok-text:#047857;
          --status-ok-border:#a7f3d0;

          --status-err-bg:#fef2f2;
          --status-err-text:#b91c1c;
          --status-err-border:#fecaca;

          --status-info-bg:#e0f2fe;
          --status-info-text:#0369a1;
          --status-info-border:#7dd3fc;
        }

        #register-page,
        #register-page *{
          box-sizing:border-box;
        }

        /************************************************************
        PAGE LAYOUT
        ************************************************************/
        #register-page main{
          background:var(--bg-page);
          margin-top:calc(var(--navH) * -1);
          padding-top:var(--navH);
          min-height:auto;
          display:block;
          align-items:flex-start;
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
          color:var(--ink);
        }

        #register-page main > section{
          width:100%;
          padding-top:clamp(24px,2vw,40px);
          padding-bottom:60px;
        }

        /* Scoped to main so it doesn't affect Header's .container */
        #register-page main .container{
          max-width:var(--container);
          margin:0 auto;
          padding:0 24px;
          width:100%;
          display:grid;
          grid-template-columns:1fr minmax(360px,420px);
          column-gap:48px;
          row-gap:32px;
          align-items:flex-start;
        }

        /* Stack on mobile: form first, hero card second */
        @media(max-width:900px){
          #register-page main .container{
            grid-template-columns:1fr;
            max-width:480px;
            padding:0 20px;
          }
          #register-page .info-col{
            order:2;
            text-align:center;
          }
          #register-page .reg-col{
            order:1;
          }
        }

        @media(max-width:560px){
          #register-page main .container{
            padding:0 16px;
          }
        }

        /************************************************************
        LEFT COLUMN (INSIGHT / MARKETING)
        ************************************************************/
        #register-page .info-col{
          display:flex;
          flex-direction:column;
          align-items:flex-start;
          gap:20px;
          max-width:520px;
          position:relative;
        }

        @media(max-width:900px){
          #register-page .info-col{
            align-items:center;
          }
        }

        /* hero card visuals cloned from Login.jsx */
        #register-page .insight-card{
          position:relative;
          width:100%;
          max-width:480px;
          height:240px;
          border-radius:20px;
          background:
            radial-gradient(circle at 20% 20%,rgba(0,60,112,.06) 0%,rgba(255,255,255,0) 70%),
            radial-gradient(circle at 80% 0%,rgba(255,255,255,.9) 0%,rgba(255,255,255,0) 70%),
            linear-gradient(#ffffff 0%, #eef4ff 100%);
          border:1px solid rgba(0,60,112,0.15);
          box-shadow:
            0 40px 80px rgba(0,0,0,.08),
            0 4px 8px rgba(0,0,0,.04);
          overflow:hidden;

          display:flex;
          align-items:center;
          justify-content:flex-start;
          padding:24px;
        }

        #register-page .corner-glow{
          position:absolute;
          border-radius:50%;
          filter:blur(40px);
          opacity:.4;
          pointer-events:none;
        }
        #register-page .glow-top-right{
          top:-40px;
          right:-40px;
          width:160px;
          height:160px;
          background:radial-gradient(circle at 30% 30%,rgba(0,60,112,.35) 0%,rgba(0,0,0,0) 70%);
        }
        #register-page .glow-bottom-left{
          bottom:-40px;
          left:-40px;
          width:160px;
          height:160px;
          background:radial-gradient(circle at 30% 30%,rgba(255,106,139,.4) 0%,rgba(0,0,0,0) 70%);
        }

        #register-page .insight-layer{
          position:relative;
          width:100%;
          height:100%;
        }

        #register-page .tile-main{
          position:absolute;
          top:20px;
          left:16px;
          width:150px;
          height:120px;
          background:#002747;
          border-radius:16px;
          box-shadow:0 32px 64px rgba(0,0,0,.4);
          transform:rotate(-6deg);
        }

        #register-page .tile-note{
          position:absolute;
          top:52px;
          left:70px;
          background:#ffffff;
          border-radius:14px;
          border:1px solid rgba(0,60,112,.15);
          box-shadow:0 32px 64px rgba(0,0,0,.18);
          transform:rotate(4deg);
          min-width:200px;
          max-width:220px;
          padding:14px 16px 16px;
          font-size:13px;
          line-height:1.45;
          font-weight:500;
          color:#0b1f34;
          text-shadow:0 1px 1px rgba(255,255,255,.6);
        }
        #register-page .note-eyebrow{
          font-size:12px;
          font-weight:600;
          color:#003c70;
          line-height:1.2;
          margin-bottom:4px;
        }

        #register-page .tile-watermark{
          position:absolute;
          top:140px;
          left:24px;
          font-size:13px;
          line-height:1.4;
          font-weight:500;
          color:#0b1f34;
          opacity:.5;
          width:240px;
          user-select:none;
        }

        #register-page .metrics-col{
          position:absolute;
          top:24px;
          right:24px;
          display:flex;
          flex-direction:column;
          gap:8px;
          z-index:2;
        }
        #register-page .metric-card{
          background:rgba(255,255,255,.9);
          backdrop-filter:blur(6px);
          -webkit-backdrop-filter:blur(6px);
          border:1px solid rgba(0,60,112,.15);
          border-radius:10px;
          box-shadow:0 16px 32px rgba(0,0,0,.12);
          padding:8px 10px;
          min-width:150px;
          font-size:12px;
          line-height:1.4;
          font-weight:500;
          color:#0b1f34;
        }
        #register-page .metric-label{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          font-size:11px;
          line-height:1.2;
          font-weight:600;
          color:#003c70;
          margin-bottom:4px;
        }
        #register-page .metric-val{
          font-size:13px;
          font-weight:600;
          color:#0b1f34;
        }

        #register-page .orb{
          position:absolute;
          right:36px;
          bottom:32px;
          width:60px;
          height:60px;
          border-radius:50%;
          background:conic-gradient(
            from 0deg,
            #ffd57a,
            #ff9d4c,
            #ff6a8b,
            #7d7dff,
            #37c0ff,
            #ffd57a
          );
          box-shadow:0 24px 48px rgba(0,0,0,.2);
          border:2px solid rgba(255,255,255,.7);
        }

        #register-page .doodles{
          position:absolute;
          left:24px;
          bottom:32px;
          display:flex;
          flex-direction:column;
          gap:8px;
          font-size:12px;
          line-height:1;
          font-weight:600;
          color:#ff6a8b;
          text-shadow:0 1px 1px rgba(255,255,255,.6);
        }
        #register-page .doodles .line2{
          color:#ff9d4c;
        }

        #register-page .info-headline{
          font-size:18px;
          line-height:1.3;
          font-weight:600;
          margin:0 0 8px;
          color:var(--ink);
        }
        #register-page .info-copy{
          margin:0;
          max-width:520px;
          color:var(--muted);
          line-height:1.5;
          font-size:14.5px;
          font-weight:500;
        }

        @media(max-width:900px){
          #register-page .info-headline,
          #register-page .info-copy{
            text-align:center;
            max-width:360px;
          }
        }

        /************************************************************
        RIGHT COLUMN (REGISTER / VERIFY CARD)
        ************************************************************/
        #register-page .reg-col{
          background:#fff;
          border:1px solid var(--border);
          box-shadow:var(--shadow-card);
          border-radius:var(--radius-card);
          padding:24px 24px 28px;
          position:relative;
        }

        @media(max-width:500px){
          #register-page .reg-col{
            padding:20px 20px 24px;
            border-radius:14px;
          }
        }

        #register-page .reg-title{
          margin:0 0 4px;
          font-size:20px;
          font-weight:700;
          line-height:1.3;
          color:var(--ink);
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          letter-spacing:-.02em;
        }

        #register-page .reg-desc{
          margin:0 0 16px;
          font-size:13px;
          line-height:1.4;
          font-weight:500;
          color:var(--muted);
        }

        #register-page .step-indicator{
          font-size:12px;
          line-height:1.3;
          font-weight:600;
          color:var(--navy);
          background:rgba(0,60,112,.06);
          border:1px solid rgba(0,60,112,.22);
          border-radius:999px;
          padding:4px 10px;
          width:max-content;
          box-shadow:0 8px 24px rgba(0,0,0,.06);
          margin-bottom:16px;
        }

        /* flash / status */
        #register-page .flash{
          padding:10px 12px;
          border-radius:12px;
          font-size:13px;
          line-height:1.4;
          font-weight:500;
          border:1px solid transparent;
          margin-bottom:16px;
        }
        #register-page .flash.error{
          background:var(--status-err-bg);
          color:var(--status-err-text);
          border-color:var(--status-err-border);
        }
        #register-page .flash.info{
          background:var(--status-info-bg);
          color:var(--status-info-text);
          border-color:var(--status-info-border);
        }
        #register-page .flash.success{
          background:var(--status-ok-bg);
          color:var(--status-ok-text);
          border-color:var(--status-ok-border);
        }

        /******** SOCIAL AUTH ********/
        #register-page .section-label{
          font-size:12px;
          font-weight:600;
          color:var(--ink);
          letter-spacing:-0.02em;
          margin:0 0 8px;
        }

        #register-page .social-outer{
          display:flex;
          flex-direction:column;
          gap:12px;
          margin-bottom:20px;
        }

        #register-page .social-google-btn{
          border-radius:10px;
          border:1px solid var(--border);
          box-shadow:0 8px 16px rgba(0,0,0,.04);
          padding:12px 16px;
          background:#fff;
          cursor:pointer;
          display:flex;
          align-items:center;
          gap:12px;
          font-size:15px;
          font-weight:600;
          line-height:1.4;
          color:var(--ink);
          text-align:left;
        }

        #register-page .social-google-icon{
          width:20px;
          height:20px;
          border-radius:4px;
          background:#fff;
          border:1px solid rgba(0,0,0,.08);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:12px;
          font-weight:600;
          color:#DB4437;
          line-height:1;
        }

        #register-page .social-row{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
        }

        #register-page .social-mini{
          flex:0 0 auto;
          width:52px;
          height:48px;
          border-radius:10px;
          border:1px solid var(--border);
          background:#fff;
          box-shadow:0 8px 16px rgba(0,0,0,.04);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:18px;
          line-height:1;
          font-weight:600;
          color:var(--navy);
          cursor:pointer;
        }

        /******** DIVIDER ********/
        #register-page .or-row{
          display:flex;
          align-items:center;
          gap:12px;
          margin:12px 0 20px;
          color:var(--muted);
          font-size:12px;
          font-weight:500;
        }

        #register-page .or-row .line{
          flex:1;
          height:1px;
          background:var(--border);
        }

        #register-page .or-text-pill{
          background:#fff;
          border-radius:999px;
          padding:2px 10px;
          line-height:1.3;
          border:1px solid var(--border);
          box-shadow:0 8px 16px rgba(0,0,0,.03);
          font-size:12px;
          font-weight:500;
          color:var(--muted);
        }

        /******** FORMS ********/
        #register-page form{
          display:flex;
          flex-direction:column;
          gap:16px;
        }

        #register-page .field-block{
          display:flex;
          flex-direction:column;
          gap:6px;
        }

        #register-page .field-label-row{
          display:flex;
          justify-content:space-between;
          align-items:flex-end;
          flex-wrap:wrap;
          row-gap:4px;
        }

        #register-page .field-label{
          font-size:14px;
          line-height:1.3;
          font-weight:600;
          color:var(--ink);
        }

        #register-page .req-tag{
          font-size:12px;
          line-height:1.2;
          font-weight:500;
          color:var(--muted);
        }

        #register-page .hint{
          font-size:11.5px;
          line-height:1.3;
          font-weight:500;
          color:var(--muted);
          margin-top:-2px;
        }

        #register-page .input-wrapper{
          position:relative;
        }

        #register-page .input{
          width:100%;
          height:50px;
          border-radius:10px;
          border:1px solid var(--border);
          padding:0 12px;
          background:#fff;
          color:var(--ink);
          font-size:15.5px;
          line-height:1.4;
          outline:none;
          transition:box-shadow .15s ease, border-color .15s ease;
        }
        #register-page .input:focus{
          border-color:rgba(0,60,112,.4);
          box-shadow:0 0 0 3px rgba(0,60,112,.15);
        }

        #register-page .otp-hint{
          font-size:12px;
          line-height:1.4;
          font-weight:500;
          color:var(--muted);
        }

        #register-page .resend-row{
          font-size:12px;
          line-height:1.4;
          font-weight:500;
          color:var(--navy);
          text-decoration:underline;
          text-underline-offset:2px;
          cursor:pointer;
          margin-top:-4px;
          width:max-content;
        }

        /******** ACTION BUTTONS ********/
        #register-page .submit-btn{
          border-radius:10px;
          width:100%;
          height:48px;
          border:1px solid var(--navy);
          background:var(--navy);
          color:#fff;
          font-size:16px;
          font-weight:600;
          line-height:1.3;
          cursor:pointer;
          box-shadow:0 16px 32px rgba(0,60,112,.32);
          transition:box-shadow .15s ease, transform .15s ease;
        }
        #register-page .submit-btn:hover:not([disabled]){
          box-shadow:0 20px 36px rgba(0,60,112,.36);
          transform:translateY(-1px);
        }
        #register-page .submit-btn[disabled]{
          opacity:.6;
          cursor:not-allowed;
        }

        #register-page .secure-hint{
          margin-top:6px;
          font-size:11.5px;
          line-height:1.4;
          font-weight:500;
          color:var(--muted);
          text-align:left;
        }

        /******** LEGAL / SWITCH ********/
        #register-page .legal{
          font-size:12px;
          line-height:1.4;
          font-weight:500;
          color:var(--muted);
          margin-top:16px;
        }
        #register-page .legal a{
          text-decoration:underline;
          color:var(--navy);
          font-weight:500;
        }

        #register-page .signup-row{
          font-size:13.5px;
          line-height:1.4;
          font-weight:500;
          color:var(--ink);
          margin-top:20px;
        }
        #register-page .signup-row a{
          color:var(--navy);
          font-weight:600;
          text-decoration:underline;
          text-underline-offset:2px;
        }

        @media(max-width:500px){
          #register-page .field-label-row{
            flex-direction:column;
            align-items:flex-start;
            gap:4px;
          }
        }
      `}</style>
      <Header/>

      <main>
        <section>
          <div className="container">
            {/* ======== LEFT COLUMN ======== */}
            <aside className="info-col">
              <div className="insight-card">
                <div className="corner-glow glow-top-right" />
                <div className="corner-glow glow-bottom-left" />

                <div className="insight-layer">
                  <div className="tile-main" />
                  <div className="tile-note">
                    <div className="note-eyebrow">Midasis Tech</div>
                    “Stand out to live recruiters, not just algorithms.”
                  </div>

                  <div className="tile-watermark">
                    ★ Build your profile once. Get discovered by hiring
                    partners on repeat.
                  </div>

                  <div className="metrics-col">
                    <div className="metric-card">
                      <div className="metric-label">
                        <span>* First outreach</span>
                        <span />
                      </div>
                      <div className="metric-val">48 hrs avg</div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-label">
                        <span>Active companies</span>
                        <span />
                      </div>
                      <div className="metric-val">140+</div>
                    </div>
                  </div>

                  <div className="orb" />

                  <div className="doodles">
                    <div className="line1">✦</div>
                    <div className="line2">▢</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="info-headline">Why create your profile?</h3>
                <p className="info-copy">
                  Recruiters at Midasis Technologies browse talent based on
                  fresh skills, availability and notice period. Profiles that
                  are fully filled (name + contact + verified email) are
                  prioritized first in outreach.
                </p>
              </div>
            </aside>

            {/* ======== RIGHT COLUMN ======== */}
            <section className="reg-col">
              <h2 className="reg-title">
                {mode === "register"
                  ? "Create your profile"
                  : "Welcome back"}
              </h2>

              <p className="reg-desc">
                {mode === "register"
                  ? "Get visible to active hiring partners at Midasis Technologies."
                  : "Sign back in to update skills and get new matches."}
              </p>

              {msg?.text && (
                <div className={`flash ${msg.type}`}>{msg.text}</div>
              )}

              {/* DIVIDER */}
              <div className="or-row">
                <div className="line" />
                <div className="or-text-pill">
                  {!otpSent
                    ? mode === "register"
                      ? " register with email"
                      : " continue with email"
                    : "We’ve emailed you a code"}
                </div>
                <div className="line" />
              </div>

              {/* STEP 1: DETAILS + SEND OTP */}
              {!otpSent ? (
                <form onSubmit={handleSend} noValidate>
                  {mode === "register" && (
                    <>
                      {/* Name */}
                      <div className="field-block">
                        <div className="field-label-row">
                          <label
                            className="field-label"
                            htmlFor="reg-name"
                          >
                            Full name
                          </label>
                          <span className="req-tag">required</span>
                        </div>

                        <div className="input-wrapper">
                          <input
                            id="reg-name"
                            className="input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Jane Doe"
                            autoComplete="name"
                          />
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="field-block">
                        <div className="field-label-row">
                          <label
                            className="field-label"
                            htmlFor="reg-contact"
                          >
                            Contact number
                          </label>
                          <span className="req-tag">required</span>
                        </div>

                        <div className="hint">
                          Recruiters may reach out here (no spam).
                        </div>

                        <div className="input-wrapper">
                          <input
                            id="reg-contact"
                            className="input"
                            type="tel"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="+91 98765 43210"
                            autoComplete="tel"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Email */}
                  <div className="field-block">
                    <div className="field-label-row">
                      <label
                        className="field-label"
                        htmlFor="reg-email"
                      >
                        Email
                      </label>
                      <span className="req-tag">required</span>
                    </div>

                    <div className="input-wrapper">
                      <input
                        id="reg-email"
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        autoComplete="email"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <button
                    className="submit-btn"
                    type="submit"
                    disabled={
                      loading ||
                      !email ||
                      (mode === "register" &&
                        (!name.trim() || !contact.trim()))
                    }
                  >
                    {loading ? "Sending..." : "Send code"}
                  </button>

                  <div className="secure-hint">
                    We’ll email you a one-time code. No password needed.
                  </div>

                  <div className="legal">
                    By continuing, you agree to the{" "}
                    <a href="/terms">
                      Midasis Technologies Terms of Service
                    </a>{" "}
                    and <a href="/privacy">Privacy Policy</a>.
                  </div>

                  <div className="signup-row">
                    Already have an account?{" "}
                    <a href="/login">Log in</a>
                  </div>
                </form>
              ) : (
                // STEP 2: OTP VERIFY
                <form onSubmit={handleVerify} noValidate>
                  {/* Email (locked) */}
                  <div className="field-block">
                    <div className="field-label-row">
                      <label
                        className="field-label"
                        htmlFor="reg-email-display"
                      >
                        Email
                      </label>
                    </div>

                    <div className="input-wrapper">
                      <input
                        id="reg-email-display"
                        className="input"
                        type="email"
                        value={email}
                        disabled
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* OTP */}
                  <div className="field-block">
                    <div className="field-label-row">
                      <label
                        className="field-label"
                        htmlFor="reg-otp"
                      >
                        Enter 6-digit code
                      </label>
                      <span className="req-tag">required</span>
                    </div>

                    <div className="hint otp-hint">
                      We sent a code to <strong>{email}</strong>. Enter it
                      below to finish{" "}
                      {mode === "register"
                        ? "creating your profile."
                        : "signing in."}
                    </div>

                    <div className="input-wrapper">
                      <input
                        id="reg-otp"
                        className="input"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        placeholder="••••••"
                        value={otp}
                        onChange={(e) =>
                          setOtp(
                            e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6)
                          )
                        }
                        required
                        disabled={loading}
                        autoComplete="one-time-code"
                        title="Please enter the 6-digit code"
                      />
                    </div>

                    <div
                      className="resend-row"
                      onClick={handleResend}
                    >
                      {loading ? "Sending..." : "Resend code"}
                    </div>
                  </div>

                  <button
                    className="submit-btn"
                    type="submit"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading
                      ? "Verifying..."
                      : mode === "register"
                      ? "Create account"
                      : "Log in"}
                  </button>

                  <div className="secure-hint">
                    Secure single sign-on, powered by Midasis Technologies.
                  </div>

                  <div className="legal">
                    By continuing, you agree to the{" "}
                    <a href="/terms">
                      Midasis Technologies Terms of Service
                    </a>{" "}
                    and <a href="/privacy">Privacy Policy</a>.
                  </div>

                  <div className="signup-row">
                    Already have an account?{" "}
                    <a href="/login">Log in</a>
                  </div>
                </form>
              )}
            </section>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
