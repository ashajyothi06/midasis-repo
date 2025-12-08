import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // flow state
  const [otpSent, setOtpSent] = useState(false);

  // ui state
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const nextFromQuery = searchParams.get("next");

  // autofocus email first render
  useEffect(() => {
    document.getElementById("login-email")?.focus();
  }, []);

  // helper to talk to backend
  const callLoginApi = async (body) => {
    const url = buildApiUrl("/api/auth/login");

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include", // uncomment if server sets cookies
      body: JSON.stringify(body),
    });

    return res.json();
  };

  // send OTP step
  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({});

    try {
      const cleanedEmail = (email || "").trim().toLowerCase();
      setEmail(cleanedEmail);

      const data = await callLoginApi({ email: cleanedEmail });

      if (data.ok && data.phase === "otp_sent") {
        setOtpSent(true);
        setMsg({
          type: "info",
          text: data.message || "Check your inbox — we sent a 6-digit code.",
        });

        // focus OTP
        setTimeout(() => {
          document.getElementById("login-otp")?.focus();
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

  // verify OTP step
  const handleLogin = async (e) => {
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

      const data = await callLoginApi({
        email: cleanedEmail,
        otp: otp.trim(),
      });

      if (data.ok && data.phase === "authenticated") {
        // persist token
        if (data.token && typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
        }

        // notify the rest of the app
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth:changed"));
          // redirect
          window.location.assign(nextFromQuery || data.next || "/");
        }
      } else {
        setMsg({
          type: "error",
          text: data.message || "Login failed.",
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

      const data = await callLoginApi({
        email: cleanedEmail,
        resend: true,
      });

      if (data.ok && data.phase === "otp_sent") {
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
    <div id="login-page">
      <style>{`
        /************************************************************
        BRAND TOKENS
        ************************************************************/
        #login-page {
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

        #login-page,
        #login-page *{
          box-sizing:border-box;
        }

        /************************************************************
        PAGE LAYOUT
        ************************************************************/
        #login-page main{
          background:var(--bg-page);
          margin-top:calc(var(--navH) * -1);
          padding-top:var(--navH);
          min-height:auto;
          display:block;
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
          color:var(--ink);
        }

        #login-page main > section{
          width:100%;
          padding-top:clamp(24px,2vw,40px);
          padding-bottom:60px;
        }

        /* 🔧 Scoped to main so it doesn't affect Header's .container */
        #login-page main .container{
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
          #login-page main .container{
            grid-template-columns:1fr;
            max-width:480px;
            padding:0 20px;
          }
          #login-page .info-col{
            order:2;
            text-align:center;
          }
          #login-page .login-col{
            order:1;
          }
        }

        @media(max-width:560px){
          #login-page main .container{
            padding:0 16px;
          }
        }

        /************************************************************
        LEFT COLUMN (INSIGHT / MARKETING)
        ************************************************************/
        #login-page .info-col{
          display:flex;
          flex-direction:column;
          align-items:flex-start;
          gap:20px;
          max-width:520px;
          position:relative;
        }

        @media(max-width:900px){
          #login-page .info-col{
            align-items:center;
          }
        }

        /* hero card with centered composition */
        #login-page .insight-card{
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

        #login-page .corner-glow{
          position:absolute;
          border-radius:50%;
          filter:blur(40px);
          opacity:.4;
          pointer-events:none;
        }
        #login-page .glow-top-right{
          top:-40px;
          right:-40px;
          width:160px;
          height:160px;
          background:radial-gradient(circle at 30% 30%,rgba(0,60,112,.35) 0%,rgba(0,0,0,0) 70%);
        }
        #login-page .glow-bottom-left{
          bottom:-40px;
          left:-40px;
          width:160px;
          height:160px;
          background:radial-gradient(circle at 30% 30%,rgba(255,106,139,.4) 0%,rgba(0,0,0,0) 70%);
        }

        #login-page .insight-layer{
          position:relative;
          width:100%;
          height:100%;
        }

        /* navy tile */
        #login-page .tile-main{
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

        /* tilted white note card */
        #login-page .tile-note{
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
        #login-page .note-eyebrow{
          font-size:12px;
          font-weight:600;
          color:#003c70;
          line-height:1.2;
          margin-bottom:4px;
        }

        /* faint background line under cards */
        #login-page .tile-watermark{
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

        /* two metric badges at top-right */
        #login-page .metrics-col{
          position:absolute;
          top:24px;
          right:24px;
          display:flex;
          flex-direction:column;
          gap:8px;
          z-index:2;
        }
        #login-page .metric-card{
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
        #login-page .metric-label{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          font-size:11px;
          line-height:1.2;
          font-weight:600;
          color:#003c70;
          margin-bottom:4px;
        }
        #login-page .metric-val{
          font-size:13px;
          font-weight:600;
          color:#0b1f34;
        }

        /* rainbow orb bottom-right */
        #login-page .orb{
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

        /* doodles bottom-left */
        #login-page .doodles{
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
        #login-page .doodles .line2{
          color:#ff9d4c;
        }

        /* text under card */
        #login-page .info-headline{
          font-size:18px;
          line-height:1.3;
          font-weight:600;
          margin:0 0 8px;
          color:var(--ink);
        }
        #login-page .info-copy{
          margin:0;
          max-width:520px;
          color:var(--muted);
          line-height:1.5;
          font-size:14.5px;
          font-weight:500;
        }

        @media(max-width:900px){
          #login-page .info-headline,
          #login-page .info-copy{
            text-align:center;
            max-width:360px;
          }
        }

        /************************************************************
        RIGHT COLUMN (LOGIN PANEL, OTP FLOW)
        ************************************************************/
        #login-page .login-col{
          background:#fff;
          border:1px solid var(--border);
          box-shadow:var(--shadow-card);
          border-radius:var(--radius-card);
          padding:24px 24px 28px;
          position:relative;
        }

        @media(max-width:500px){
          #login-page .login-col{
            padding:20px 20px 24px;
            border-radius:14px;
          }
        }

        #login-page .login-title{
          margin:0 0 4px;
          font-size:20px;
          font-weight:700;
          line-height:1.3;
          color:var(--ink);
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          letter-spacing:-.02em;
        }

        #login-page .login-desc{
          margin:0 0 16px;
          font-size:13px;
          line-height:1.4;
          font-weight:500;
          color:var(--muted);
        }

        #login-page .step-indicator{
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
        #login-page .flash{
          padding:10px 12px;
          border-radius:12px;
          font-size:13px;
          line-height:1.4;
          font-weight:500;
          border:1px solid transparent;
          margin-bottom:16px;
        }
        #login-page .flash.error{
          background:var(--status-err-bg);
          color:var(--status-err-text);
          border-color:var(--status-err-border);
        }
        #login-page .flash.info{
          background:var(--status-info-bg);
          color:var(--status-info-text);
          border-color:var(--status-info-border);
        }
        #login-page .flash.success{
          background:var(--status-ok-bg);
          color:var(--status-ok-text);
          border-color:var(--status-ok-border);
        }

        /******** SOCIAL AUTH ********/
        #login-page .section-label{
          font-size:12px;
          font-weight:600;
          color:var(--ink);
          letter-spacing:-0.02em;
          margin:0 0 8px;
        }

        #login-page .social-outer{
          display:flex;
          flex-direction:column;
          gap:12px;
          margin-bottom:20px;
        }

        #login-page .social-google-btn{
          border-radius:10px;
          border:1px solid(var(--border));
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

        #login-page .social-google-icon{
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

        #login-page .social-row{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
        }

        #login-page .social-mini{
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
        #login-page .or-row{
          display:flex;
          align-items:center;
          gap:12px;
          margin:12px 0 20px;
          color:var(--muted);
          font-size:12px;
          font-weight:500;
        }

        #login-page .or-row .line{
          flex:1;
          height:1px;
          background:var(--border);
        }

        #login-page .or-text-pill{
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

        /******** FORMS (EMAIL STEP / OTP STEP) ********/
        #login-page form{
          display:flex;
          flex-direction:column;
          gap:16px;
        }

        #login-page .field-block{
          display:flex;
          flex-direction:column;
          gap:6px;
        }

        #login-page .field-label-row{
          display:flex;
          justify-content:space-between;
          align-items:flex-end;
          flex-wrap:wrap;
          row-gap:4px;
        }

        #login-page .field-label{
          font-size:14px;
          line-height:1.3;
          font-weight:600;
          color:var(--ink);
        }

        #login-page .req-tag{
          font-size:12px;
          line-height:1.2;
          font-weight:500;
          color:var(--muted);
        }

        #login-page .hint{
          font-size:11.5px;
          line-height:1.3;
          font-weight:500;
          color:var(--muted);
          margin-top:-2px;
        }

        #login-page .input-wrapper{
          position:relative;
        }

        #login-page .input{
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
        #login-page .input:focus{
          border-color:rgba(0,60,112,.4);
          box-shadow:0 0 0 3px rgba(0,60,112,.15);
        }

        #login-page .otp-hint{
          font-size:12px;
          line-height:1.4;
          font-weight:500;
          color:var(--muted);
        }

        #login-page .resend-row{
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
        #login-page .submit-btn{
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
        #login-page .submit-btn:hover:not([disabled]){
          box-shadow:0 20px 36px rgba(0,60,112,.36);
          transform:translateY(-1px);
        }
        #login-page .submit-btn[disabled]{
          opacity:.6;
          cursor:not-allowed;
        }

        #login-page .secure-hint{
          margin-top:6px;
          font-size:11.5px;
          line-height:1.4;
          font-weight:500;
          color:var(--muted);
          text-align:left;
        }

        /******** LEGAL / SIGNUP ********/
        #login-page .legal{
          font-size:12px;
          line-height:1.4;
          font-weight:500;
          color:var(--muted);
          margin-top:16px;
        }
        #login-page .legal a{
          text-decoration:underline;
          color:var(--navy);
          font-weight:500;
        }

        #login-page .signup-row{
          font-size:13.5px;
          line-height:1.4;
          font-weight:500;
          color:var(--ink);
          margin-top:20px;
        }
        #login-page .signup-row a{
          color:var(--navy);
          font-weight:600;
          text-decoration:underline;
          text-underline-offset:2px;
        }

        /******** MOBILE POLISH ********/
        @media(max-width:500px){
          #login-page .field-label-row{
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
            {/* ======== LEFT COLUMN: HERO / VALUE PROP ======== */}
            <aside className="info-col">
              <div className="insight-card">
                <div className="corner-glow glow-top-right" />
                <div className="corner-glow glow-bottom-left" />

                <div className="insight-layer">
                  <div className="tile-main" />
                  <div className="tile-note">
                    <div className="note-eyebrow">Midasis Tech</div>
                    “Talent fast-tracked to real openings.”
                  </div>

                  <div className="tile-watermark">
                    ★ Matching skilled candidates with actively hiring teams.
                  </div>

                  <div className="metrics-col">
                    <div className="metric-card">
                      <div className="metric-label">
                        <span>* Avg reply time</span>
                        <span />
                      </div>
                      <div className="metric-val">48 hrs</div>
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
                <h3 className="info-headline">Did you know?</h3>
                <p className="info-copy">
                  Every time you update your skills, you move higher in our
                  recruiter matching queue. Strong profiles from Midasis
                  Technologies see outreach from hiring partners in under 48
                  hours on average.
                </p>
              </div>
            </aside>

            {/* ======== RIGHT COLUMN: AUTH CARD ======== */}
            <section className="login-col">
              <h2 className="login-title">Log in now!</h2>
              <p className="login-desc">
                Access your dashboard and stay visible to Midasis Technologies
                hiring partners.
              </p>

              {msg?.text && (
                <div className={`flash ${msg.type}`}>{msg.text}</div>
              )}

              {/* SOCIAL LOGIN */}
              <div className="section-label">Continue with</div>
              <div className="social-outer">
                <button
                  type="button"
                  className="social-google-btn"
                  onClick={() => {
                    // TODO: integrate Google OAuth
                  }}
                >
                  <span className="social-google-icon">G</span>
                  <span>Continue with Google</span>
                </button>

                <div className="social-row">{/* mini providers later */}</div>
              </div>

              {/* DIVIDER */}
              <div className="or-row">
                <div className="line" />
                <div className="or-text-pill">
                  {!otpSent
                    ? "Or continue with email"
                    : "We’ve emailed you a code"}
                </div>
                <div className="line" />
              </div>

              {/* EMAIL STEP */}
              {!otpSent ? (
                <form onSubmit={handleSend} noValidate>
                  <div className="field-block">
                    <div className="field-label-row">
                      <label
                        className="field-label"
                        htmlFor="login-email"
                      >
                        Email
                      </label>
                      <span className="req-tag">required</span>
                    </div>

                    <div className="input-wrapper">
                      <input
                        id="login-email"
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
                    disabled={loading || !email}
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
                    and{" "}
                    <a href="/privacy">Privacy Policy</a>.
                  </div>

                  <div className="signup-row">
                    New here? <a href="/register">Create an account</a>
                  </div>
                </form>
              ) : (
                // OTP STEP
                <form onSubmit={handleLogin} noValidate>
                  <div className="field-block">
                    <div className="field-label-row">
                      <label
                        className="field-label"
                        htmlFor="login-email-display"
                      >
                        Email
                      </label>
                    </div>

                    <div className="input-wrapper">
                      <input
                        id="login-email-display"
                        className="input"
                        type="email"
                        value={email}
                        disabled
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="field-block">
                    <div className="field-label-row">
                      <label
                        className="field-label"
                        htmlFor="login-otp"
                      >
                        Enter 6-digit code
                      </label>
                      <span className="req-tag">required</span>
                    </div>

                    <div className="hint otp-hint">
                      We sent a code to <strong>{email}</strong>. Enter it
                      below to finish signing in.
                    </div>

                    <div className="input-wrapper">
                      <input
                        id="login-otp"
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
                    {loading ? "Logging in..." : "Log in"}
                  </button>

                  <div className="secure-hint">
                    Secure single sign-on, powered by Midasis Technologies.
                  </div>

                  <div className="legal">
                    By logging in, you agree to the{" "}
                    <a href="/terms">
                      Midasis Technologies Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy">Privacy Policy</a>.
                  </div>

                  <div className="signup-row">
                    New here? <a href="/register">Create an account</a>
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
