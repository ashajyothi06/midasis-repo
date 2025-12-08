import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


// --- SAFE API BASE + URL HELPERS ---
function getApiBase() {
  // Safely read env var only if `process` exists
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

export default function JobDetail() {
  const { jobId } = useParams();
  const nav = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // status / flash
  const [msg, setMsg] = useState({ type: "", text: "" });

  // apply form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeAlerts, setAgreeAlerts] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // for focusing first invalid field like Contact page does
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const firstErrorRef = useRef(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // fetch job on mount / jobId change
  useEffect(() => {
    let active = true;
    setLoading(true);

    const jobUrl = buildApiUrl(`/api/jobs/${jobId}`);

    fetch(jobUrl)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        if (data.ok) {
          setJob(data.job);
        } else {
          setMsg({
            type: "error",
            text: data.message || "Failed to load job.",
          });
        }
      })
      .catch(() => {
        if (active) {
          setMsg({ type: "error", text: "Network error." });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [jobId]);

  // match Contact page UX: focus first invalid field after submit attempt
  useEffect(() => {
    if (!firstErrorRef.current) return;
    firstErrorRef.current.focus();
    firstErrorRef.current = null;
  }, [errors]);

  // basic validation for the Apply form
  const validateApply = useCallback(() => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Please enter your full name.";
    if (!resume) e.resume = "Please upload your resume.";
    if (!agreeTerms)
      e.agreeTerms = "You must accept Terms and Privacy Policy.";
    return e;
  }, [fullName, resume, agreeTerms]);

  // resume file
  const onFile = (e) => {
    setResume(e.target.files?.[0] || null);
    setErrors((prev) => ({ ...prev, resume: "" }));
  };

  // submit application
  const handleApply = async (e) => {
    e.preventDefault();

    if (!token) {
      nav(`/login?next=${encodeURIComponent(`/jobs/${jobId}`)}`);
      return;
    }

    setMsg({});
    const eMap = validateApply();
    setErrors(eMap);

    // focus first error
    if (Object.keys(eMap).length) {
      const firstKey = Object.keys(eMap)[0];
      const firstEl =
        formRef.current?.querySelector('[name="' + firstKey + '"]') || null;
      if (firstEl) firstErrorRef.current = firstEl;
      return;
    }

    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("full_name", fullName);
      fd.append("phone", phone);
      fd.append("resume", resume);
      fd.append("agree_terms", agreeTerms ? "true" : "false");
      fd.append("agree_alerts", agreeAlerts ? "true" : "false");

      const applyUrl = buildApiUrl(`/api/apply/${jobId}`);

      const res = await fetch(applyUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const data = await res.json();

      if (data.ok) {
        setMsg({
          type: "success",
          text: data.message || "Application submitted!",
        });
        setFullName("");
        setPhone("");
        setResume(null);
        setAgreeTerms(false);
        setAgreeAlerts(false);
        setErrors({});
      } else {
        setMsg({
          type: "error",
          text: data.message || "Failed to submit.",
        });
      }
    } catch {
      setMsg({
        type: "error",
        text: "Network error. Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="jobdetail-page">
      <style>{`
        /************************************************************
        JOB DETAIL PAGE THEME
        Mirrors #contact-page vibe (navy palette, serif headers)
        ************************************************************/

        #jobdetail-page{
          --navH:64px;

          --container:1200px;

          --ink:#0b1f34;
          --muted:#5b6b7b;

          --navy:#003c70;
          --navy-700:#002747;

          --border:rgba(0,60,112,0.18);
          --border-soft:rgba(0,60,112,0.08);

          --bg-card:#ffffff;
          --bg-page:
            radial-gradient(
              circle at 20% 20%,
              rgba(0,60,112,0.08) 0%,
              rgba(255,255,255,0) 60%
            ),
            radial-gradient(
              circle at 80% 0%,
              rgba(255,255,255,.8) 0%,
              rgba(255,255,255,0) 70%
            ),
            #f6f8fb;

          --radius:16px;
          --shadow:0 24px 60px rgba(0,0,0,.08),
                   0 2px 4px rgba(0,0,0,.04);

          --btn-border:var(--navy);
          --btn-text:var(--navy);
          --btn-hover-bg:var(--navy);
          --btn-hover-text:#ffffff;

          --chip-bg:rgba(0,60,112,0.06);
          --chip-border:rgba(0,60,112,0.22);

          --status-ok-bg:#ecfdf5;
          --status-ok-border:#a7f3d0;
          --status-ok-text:#047857;

          --status-err-bg:#fef2f2;
          --status-err-border:#fecaca;
          --status-err-text:#b91c1c;
        }

        #jobdetail-page,
        #jobdetail-page *{
          box-sizing:border-box;
        }

        /* LAYOUT/SCAFFOLDING */
        #jobdetail-page main{
          background:var(--bg-page);
          /* pull under fixed navbar to remove gap, like Contact */
          margin-top:calc(var(--navH) * -1);
          padding-top:var(--navH);
          min-height:auto;
          display:block;
        }

        #jobdetail-page main > section{
          padding-top:clamp(24px,2vw,32px);
          padding-bottom:60px;
        }

        #jobdetail-page .container{
          max-width:var(--container);
          margin:0 auto;
          padding:0 24px;
        }

        @media(max-width:560px){
          #jobdetail-page .container{
            padding:0 16px;
          }
        }

        /* STATUS BANNER (flash msgs) */
        #jobdetail-page .status{
          margin:0 0 16px;
          padding:10px 12px;
          border-radius:12px;
          font-size:14px;
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
          font-weight:500;
          border:1px solid transparent;
        }
        #jobdetail-page .status.ok{
          background:var(--status-ok-bg);
          color:var(--status-ok-text);
          border-color:var(--status-ok-border);
        }
        #jobdetail-page .status.error{
          background:var(--status-err-bg);
          color:var(--status-err-text);
          border-color:var(--status-err-border);
        }

        /* GRID: JOB META (left col) + APPLY CARD (right col) */
        #jobdetail-page .split{
          display:grid;
          grid-template-columns:1.4fr .9fr;
          gap:28px;
          align-items:flex-start;
        }
        @media(max-width:980px){
          #jobdetail-page .split{
            grid-template-columns:1fr;
          }
        }

        /* CARD BASE */
        #jobdetail-page .card{
          background:var(--bg-card);
          border:1px solid var(--border);
          border-radius:var(--radius);
          box-shadow:var(--shadow);
          position:relative;
          overflow:hidden;
        }

        /* JOB HEADER CARD */
        #jobdetail-page .role-head{
          padding:clamp(18px,2.4vw,28px);
          margin-bottom:24px;
        }

        #jobdetail-page .eyebrow{
          font-size:12px;
          font-weight:600;
          color:var(--navy);
          background:rgba(0,60,112,.06);
          border:1px solid rgba(0,60,112,.22);
          border-radius:999px;
          padding:4px 10px;
          line-height:1.2;
          display:inline-block;
          width:max-content;
          box-shadow:0 8px 24px rgba(0,0,0,.06);
          margin-bottom:8px;
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }

        #jobdetail-page .job-title{
          margin:0 0 6px;
          color:var(--ink);
          font-size:clamp(24px,2.2vw,28px);
          line-height:1.25;
          font-weight:900;
          letter-spacing:-.02em;
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
        }

        #jobdetail-page .meta-row{
          display:flex;
          flex-wrap:wrap;
          column-gap:16px;
          row-gap:6px;
          font-size:13px;
          line-height:1.4;
          font-weight:500;
          color:var(--muted);
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }

        #jobdetail-page .meta-chip{
          display:flex;
          flex-wrap:wrap;
          gap:4px;
          align-items:baseline;
        }

        #jobdetail-page .meta-label{
          color:var(--ink);
          font-weight:600;
        }

        /* LEFT DETAIL CARD */
        #jobdetail-page .details{
          padding:clamp(18px,2.4vw,28px);
        }

        #jobdetail-page .details-headrow{
          display:flex;
          flex-wrap:wrap;
          gap:12px 16px;
          font-size:12.5px;
          line-height:1.4;
          font-weight:500;
          color:var(--muted);
          margin-bottom:12px;
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }

        #jobdetail-page .inline-wrap{
          display:flex;
          flex-wrap:wrap;
          gap:4px;
        }

        #jobdetail-page .inline-label{
          color:var(--ink);
          font-weight:600;
        }

        #jobdetail-page .section-heading{
          font-size:14px;
          line-height:1.3;
          font-weight:600;
          color:var(--navy);
          margin:16px 0 6px;
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }

        #jobdetail-page .desc{
          font-size:14px;
          line-height:1.5;
          color:var(--ink);
          white-space:pre-wrap;
          font-family: Georgia, Cambria, "Times New Roman", Times, serif;
        }

        #jobdetail-page .skills-wrap{
          display:flex;
          flex-wrap:wrap;
          margin-top:6px;
        }
        #jobdetail-page .skill-chip{
          background:var(--chip-bg);
          border:1px solid var(--chip-border);
          border-radius:999px;
          padding:5px 10px;
          margin:4px 6px 0 0;
          font-size:12.5px;
          line-height:1.2;
          color:var(--ink);
          font-weight:500;
          box-shadow:0 8px 16px rgba(0,0,0,.06);
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }

        /* RIGHT APPLY CARD */
        #jobdetail-page .apply{
          padding:clamp(18px,2.4vw,28px);
        }

        #jobdetail-page .apply-title{
          font-size:clamp(18px,1.6vw,20px);
          font-weight:900;
          color:var(--ink);
          line-height:1.3;
          margin:0 0 4px;
          letter-spacing:-0.02em;
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
        }

        #jobdetail-page .apply-sub{
          font-size:14px;
          line-height:1.4;
          color:var(--muted);
          font-weight:500;
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }

        /* FORM ELEMENTS (match Contact form system) */
        #jobdetail-page .grid{
          display:grid;
          gap:16px;
          margin-top:16px;
        }

        #jobdetail-page .field{
          display:flex;
          flex-direction:column;
          gap:6px;
        }

        #jobdetail-page .label{
          font-weight:600;
          font-size:14px;
          line-height:1.3;
          color:var(--ink);
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }

        #jobdetail-page .input,
        #jobdetail-page .file,
        #jobdetail-page .checkbox-hack{
          height:46px;
          border:1px solid var(--border);
          border-radius:12px;
          padding:0 14px;
          font-size:15px;
          line-height:1.4;
          color:var(--ink);
          background:#fff;
          transition:box-shadow .15s ease, border-color .15s ease;
          font-family: system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }

        #jobdetail-page .file{
          display:flex;
          align-items:center;
          padding:10px 14px;
          height:auto;
          min-height:46px;
        }

        #jobdetail-page input[type="file"]{
          font-size:14px;
        }

        #jobdetail-page .input:focus,
        #jobdetail-page .file:focus-within{
          outline:none;
          border-color:rgba(0,60,112,.4);
          box-shadow:0 0 0 3px rgba(0,60,112,.15);
        }

        #jobdetail-page .invalid{
          border-color:#fecaca !important;
          background:#fffafa;
        }

        #jobdetail-page .err{
          color:#b91c1c;
          font-size:13px;
          line-height:1.3;
          font-family: system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }

        /* check rows (terms + alerts) */
        #jobdetail-page .check-row{
          display:flex;
          align-items:flex-start;
          gap:8px;
          font-size:13px;
          line-height:1.4;
          color:var(--ink);
          font-weight:500;
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }
        #jobdetail-page .check-row input[type="checkbox"]{
          margin-top:4px;
          width:16px;
          height:16px;
        }
        #jobdetail-page .check-text a{
          color:var(--navy);
          text-decoration:underline;
        }

        /* submit button (match Contact .btn.btn-primary) */
        #jobdetail-page .actions{
          display:flex;
          justify-content:center;
          margin-top:8px;
        }

        #jobdetail-page .btn{
          border-radius:9999px;
          padding:11px 18px;
          font-weight:600;
          line-height:1.3;
          font-size:15px;
          cursor:pointer;
          min-width:180px;
          text-align:center;

          background:transparent;
          border:2px solid var(--btn-border);
          color:var(--btn-text);
          box-shadow:0 20px 32px rgba(0,0,0,.08);
          font-family: system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
          transition:all .16s ease;
        }

        #jobdetail-page .btn-primary:hover{
          background:var(--btn-hover-bg);
          color:var(--btn-hover-text);
          box-shadow:0 24px 36px rgba(0,60,112,.22);
          transform:translateY(-1px);
        }

        #jobdetail-page .btn[disabled]{
          opacity:.5;
          cursor:not-allowed;
          transform:none !important;
          background:transparent !important;
        }

        /* login hint under button */
        #jobdetail-page .login-hint{
          font-size:12px;
          line-height:1.4;
          text-align:center;
          color:var(--muted);
          margin-top:10px;
          font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
        }
        #jobdetail-page .login-hint a{
          color:var(--navy);
          text-decoration:underline;
          font-weight:600;
        }

        /***********************
         MOBILE POLISH
        ***********************/
        @media(max-width:560px){
          #jobdetail-page .role-head,
          #jobdetail-page .details,
          #jobdetail-page .apply{
            padding:20px 16px;
            border-radius:14px;
          }

          #jobdetail-page .job-title{
            font-size:22px;
            line-height:1.22;
            margin-bottom:4px;
          }

          #jobdetail-page .apply-title{
            font-size:20px;
            line-height:1.22;
            margin-bottom:4px;
          }

          #jobdetail-page .apply-sub{
            font-size:13px;
            line-height:1.4;
          }

          #jobdetail-page .actions{
            justify-content:center;
          }

          #jobdetail-page .btn{
            width:100%;
            min-width:0;
          }
        }
      `}</style>
      <Header/>

      <main>
        <section>
          <div className="container">
            {/* ===== STATUS MESSAGE (like Contact.status) ===== */}
            {msg.text ? (
              <div
                className={`status ${
                  msg.type === "success" || msg.type === "ok"
                    ? "ok"
                    : "error"
                }`}
                role="status"
                aria-live="polite"
              >
                {msg.text}
              </div>
            ) : null}

            {/* ===== JOB HEADER CARD ===== */}
            <header className="card role-head">
              {loading ? (
                <>
                  <div className="eyebrow">Loading…</div>
                  <h1 className="job-title">Loading job…</h1>
                </>
              ) : !job ? (
                <>
                  <div className="eyebrow">Not Found</div>
                  <h1 className="job-title">Job not found</h1>
                  <div className="meta-row" style={{ marginTop: "10px" }}>
                    <Link
                      to="/jobs"
                      style={{
                        color: "var(--navy)",
                        fontWeight: 600,
                        textDecoration: "underline",
                      }}
                    >
                      Back to jobs
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="eyebrow">Open Role</div>

                  <h1 className="job-title">{job.title}</h1>

                  <div className="meta-row">
                    <div className="meta-chip">
                      <span className="meta-label">Location:</span>
                      <span>{job.location || "—"}</span>
                    </div>

                    {(job.salary_min || job.salary_max) && (
                      <div className="meta-chip">
                        <span className="meta-label">Salary:</span>
                        <span>
                          {job.salary_min || "?"} - {job.salary_max || "?"}
                          {job.salary_unit === "per_hour"
                            ? " /hr"
                            : job.salary_unit === "per_month"
                            ? " /mo"
                            : job.salary_unit === "per_annum"
                            ? " /yr"
                            : ""}
                        </span>
                      </div>
                    )}

                    <div className="meta-chip">
                      <span className="meta-label">Job Code:</span>
                      <span>{job.id}</span>
                    </div>
                  </div>
                </>
              )}
            </header>

            {/* ===== BODY SPLIT: DETAILS LEFT / APPLY RIGHT ===== */}
            {!loading && job && (
              <div className="split">
                {/* LEFT: DETAILS */}
                <article className="card details">
                  <div className="details-headrow">
                    {job.client_industry && (
                      <div className="inline-wrap">
                        <span className="inline-label">Industry:</span>
                        <span>{job.client_industry}</span>
                      </div>
                    )}
                    {job.duration && (
                      <div className="inline-wrap">
                        <span className="inline-label">Duration:</span>
                        <span>{job.duration}</span>
                      </div>
                    )}
                    {job.schedule && (
                      <div className="inline-wrap">
                        <span className="inline-label">Schedule:</span>
                        <span>{job.schedule}</span>
                      </div>
                    )}
                    {job.work_arrangement && (
                      <div className="inline-wrap">
                        <span className="inline-label">Work:</span>
                        <span>{job.work_arrangement}</span>
                      </div>
                    )}
                  </div>

                  <div className="section-heading">About the Role</div>
                  <div className="desc">{job.description}</div>

                  <div className="section-heading">Skills</div>
                  <div className="skills-wrap">
                    {(job.skills || []).map((s, i) => (
                      <span className="skill-chip" key={i}>
                        {s}
                      </span>
                    ))}
                  </div>
                </article>

                {/* RIGHT: APPLY FORM */}
                <aside className="card apply" aria-label="Job application form">
                  <h2 className="apply-title">Apply Now</h2>
                  <div className="apply-sub">{job.title}</div>
                  <div className="apply-sub">{job.location}</div>

                  <form
                    className="grid"
                    onSubmit={handleApply}
                    encType="multipart/form-data"
                    ref={formRef}
                    noValidate
                  >
                    <div className="field">
                      <label className="label" htmlFor="fullName">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        className={`input ${
                          errors.fullName ? "invalid" : ""
                        }`}
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setErrors((prev) => ({ ...prev, fullName: "" }));
                        }}
                        required
                      />
                      {errors.fullName && (
                        <span className="err">{errors.fullName}</span>
                      )}
                    </div>

                    <div className="field">
                      <label className="label" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        className="input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 555 555 0199"
                      />
                    </div>

                    <div className="field">
                      <label className="label" htmlFor="resume">
                        Upload Resume
                      </label>
                      <div
                        className={`file ${errors.resume ? "invalid" : ""}`}
                      >
                        <input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={onFile}
                          required
                          style={{
                            border: "none",
                            width: "100%",
                            outline: "none",
                            background: "transparent",
                          }}
                        />
                      </div>
                      <span className="err">{errors.resume || ""}</span>
                      <div
                        style={{
                          fontSize: "12px",
                          lineHeight: "1.4",
                          color: "var(--muted)",
                          fontFamily:
                            'system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif',
                        }}
                      >
                        PDF, DOC, or DOCX only
                      </div>
                    </div>

                    <div className="field">
                      <div className="check-row">
                        <input
                          id="agreeTerms"
                          name="agreeTerms"
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => {
                            setAgreeTerms(e.target.checked);
                            setErrors((prev) => ({ ...prev, agreeTerms: "" }));
                          }}
                          required
                        />
                        <div className="check-text">
                          I agree to the{" "}
                          <a href="#">Terms of Service</a> and{" "}
                          <a href="#">Privacy Policy</a>.
                        </div>
                      </div>
                      {errors.agreeTerms && (
                        <span className="err">{errors.agreeTerms}</span>
                      )}
                    </div>

                    <div className="field">
                      <div className="check-row">
                        <input
                          id="agreeAlerts"
                          name="agreeAlerts"
                          type="checkbox"
                          checked={agreeAlerts}
                          onChange={(e) => setAgreeAlerts(e.target.checked)}
                        />
                        <div className="check-text">
                          Send me job alerts.
                        </div>
                      </div>
                    </div>

                    <div className="actions">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? "Applying…" : "Submit Application"}
                      </button>
                    </div>

                    {!token && (
                      <div className="login-hint">
                        You need to be logged in.&nbsp;
                        <Link
                          to={`/login?next=/jobs/${jobId}`}
                          style={{
                            color: "var(--navy)",
                            textDecoration: "underline",
                            fontWeight: 600,
                          }}
                        >
                          Login
                        </Link>
                      </div>
                    )}
                  </form>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
