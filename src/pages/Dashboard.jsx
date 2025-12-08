// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

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

export default function Dashboard() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({
    user: null,
    recent_jobs: [],
    my_recent_apps: [],
    industries: [],
  });

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      nav(`/login?${createSearchParams({ next: "/dashboard" })}`);
      return;
    }

    let active = true;
    setLoading(true);

    const dashUrl = buildApiUrl("/api/user/dashboard");

    fetch(dashUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then(async (r) => {
        if (r.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
          }
          nav(`/login?${createSearchParams({ next: "/dashboard" })}`);
          return null;
        }
        const json = await r.json();
        return json;
      })
      .then((json) => {
        if (!active || !json) return;
        if (json.ok) {
          setData(json);
        } else {
          setMsg(json.message || "Failed to load dashboard.");
        }
      })
      .catch(() => active && setMsg("Network error."))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [nav]);

  const user = data.user || {};
  const displayName =
    user.name || (user.email ? user.email.split("@")[0] : "");

  return (
    <div id="dash-page">
      <style>{`
        /************************************************************
        DASHBOARD THEME
        ************************************************************/

        #dash-page{
          --navH:64px;

          --container:1100px;

          --ink:#1B1F2E;
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

        #dash-page,
        #dash-page *{
          box-sizing:border-box;
        }

        /* ===== PAGE WRAPPER ===== */
        #dash-page main{
          background:var(--bg-page);

          margin-top:calc(var(--navH) * -1);
          padding-top:var(--navH);

          min-height:auto;
          display:block;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        #dash-page main > section{
          padding-top:clamp(24px,2vw,32px);
          padding-bottom:60px;
        }

        /* Scope container styles to main so Header's .container is untouched */
        #dash-page main .container{
          max-width:var(--container);
          margin:0 auto;
          padding:0 24px;
        }
        @media(max-width:560px){
          #dash-page main .container{
            padding:0 16px;
          }
        }

        /* ===== STATUS FLASH BANNER ===== */
        #dash-page .status{
          margin:0 0 16px;
          padding:10px 12px;
          border-radius:12px;
          font-size:20px;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight:500;
          border:1px solid transparent;
          color:#000000;
        }
        #dash-page .status.ok{
          background:var(--status-ok-bg);
          color:var(--status-ok-text);
          border-color:var(--status-ok-border);
        }
        #dash-page .status.error{
          background:var(--status-err-bg);
          color:var(--status-err-text);
          border-color:var(--status-err-border);
        }

        /* ===== CARD ===== */
        #dash-page .card{
          background:var(--bg-card);
          border:1px solid var(--border);
          border-radius:var(--radius);
          box-shadow:var(--shadow);
          padding:16px 18px 18px;
          margin-bottom:16px;
          position:relative;
          overflow:hidden;
        }
        @media(max-width:500px){
          #dash-page .card{
            border-radius:14px;
            padding:14px 16px 16px;
          }
        }

        /* ===== TOP WELCOME ROW ===== */
        #dash-page .top{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          gap:12px;
          flex-wrap:wrap;
          margin-bottom:16px;
        }

        #dash-page .welcome-head{
          margin:0;
          font-size:24px;
          font-weight:700;
          line-height:1.25;
          color:#121158;
          letter-spacing:-.02em;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        #dash-page .btn-row{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
        }

        /* shared pill button */
        #dash-page .btn{
          border-radius:9999px;
          padding:11px 18px;
          font-weight:600;
          line-height:1.3;
          font-size:15px;
          cursor:pointer;
          text-align:center;
          text-decoration:none;
          min-width:140px;

          background:transparent;
          border:2px solid var(--btn-border);
          color:var(--btn-text);
          box-shadow:0 20px 32px rgba(0,0,0,.08);
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          transition:all .16s ease;
          display:inline-block;
        }

        #dash-page .btn:hover{
          background:var(--btn-hover-bg);
          color:var(--btn-hover-text);
          box-shadow:0 24px 36px rgba(0,60,112,.22);
          transform:translateY(-1px);
        }

        /* ===== QUICK SEARCH ===== */
        #dash-page .section-head-row{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          flex-wrap:wrap;
          gap:8px 10px;
          margin-bottom:8px;
        }

        /* MAIN SECTION HEADINGS */
        #dash-page .section-title{
          margin:0;
          font-size:24px;
          line-height:1.3;
          font-weight:700;
          color:#1B1F2E;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        #dash-page .btn-ghost-inline{
          text-decoration:none;
          font-size:20px;
          line-height:1.3;
          font-weight:600;
          color:var(--navy);
          background:rgba(0,60,112,.06);
          border:1px solid rgba(0,60,112,.22);
          border-radius:999px;
          padding:8px 10px;
          box-shadow:0 8px 20px rgba(0,0,0,.06);
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        #dash-page .btn-ghost-inline:hover{
          background:rgba(0,60,112,.12);
        }

        /* SUB TEXT / LABELS */
        #dash-page .search-label{
          color:#000000;
          font-size:20px;
          line-height:1.4;
          font-weight:500;
          margin-bottom:10px;
          display:block;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        #dash-page .quick-search-grid{
          display:grid;
          grid-template-columns:1fr 180px 180px auto;
          gap:10px;
        }
        @media(max-width:800px){
          #dash-page .quick-search-grid{
            grid-template-columns:1fr 1fr;
          }
          #dash-page .quick-search-grid .fullrow{
            grid-column:1 / -1;
          }
        }
        @media(max-width:480px){
          #dash-page .quick-search-grid{
            grid-template-columns:1fr;
          }
        }

        #dash-page .input-field,
        #dash-page .select-field{
          width:100%;
          border:1px solid var(--border);
          border-radius:12px;
          padding:10px 12px;
          background:#fff;
          color:var(--ink);
          font-size:17px;
          line-height:1.4;
          outline:none;
          transition:box-shadow .15s ease, border-color .15s ease;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        #dash-page .input-field:focus,
        #dash-page .select-field:focus{
          border-color:rgba(0,60,112,.4);
          box-shadow:0 0 0 3px rgba(0,60,112,.15);
        }

        #dash-page .quick-btn{
          border-radius:9999px;
          padding:11px 18px;
          font-weight:600;
          line-height:1.3;
          font-size:17px;
          cursor:pointer;
          text-align:center;
          min-width:140px;

          background:transparent;
          border:2px solid var(--btn-border);
          color:var(--btn-text);
          box-shadow:0 20px 32px rgba(0,0,0,.08);
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          transition:all .16s ease;
        }
        #dash-page .quick-btn:hover{
          background:var(--btn-hover-bg);
          color:var(--btn-hover-text);
          box-shadow:0 24px 36px rgba(0,60,112,.22);
          transform:translateY(-1px);
        }
        @media(max-width:800px){
          #dash-page .quick-btn{
            width:100%;
            min-width:0;
          }
        }

        /* ===== TWO-COLUMN GRID ===== */
        #dash-page .cols2{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:16px;
        }
        @media (max-width:900px){
          #dash-page .cols2{
            grid-template-columns:1fr;
          }
        }

        #dash-page .mut{
          color:#000000;
          font-size:20px;
          line-height:1.4;
          font-weight:500;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        /* ===== LISTS ===== */
        #dash-page .list{
          list-style:none;
          margin:0;
          padding:0;
        }

        #dash-page .item{
          padding:10px 0;
          border-bottom:1px solid var(--border);
          display:flex;
          justify-content:space-between;
          gap:12px;
          align-items:flex-start;
        }
        #dash-page .item:last-child{
          border-bottom:none;
        }

        #dash-page .job-mainline{
          font-size:20px;
          line-height:1.4;
          font-weight:600;
          color:var(--navy);
          text-decoration:none;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        #dash-page .job-mainline:hover{
          text-decoration:underline;
        }

        #dash-page .job-subline{
          font-size:20px;
          line-height:1.4;
          color:#000000;
          font-weight:500;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        #dash-page .chip{
          display:inline-block;
          background:var(--chip-bg);
          border:1px solid var(--chip-border);
          border-radius:999px;
          padding:6px 10px;
          font-size:14px;
          font-weight:500;
          line-height:1.2;
          color:var(--navy);
          box-shadow:0 8px 16px rgba(0,0,0,.06);
          white-space:nowrap;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        /* ===== TABLE ===== */
        #dash-page table{
          width:100%;
          border-collapse:collapse;
        }

        #dash-page th{
          font-size:20px;
          font-weight:600;
          color:#1B1F2E;
          text-align:left;
          padding:10px;
          border-bottom:1px solid var(--border);
          background:rgba(0,60,112,.06);
          border-radius:0;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        #dash-page td{
          font-size:20px;
          line-height:1.4;
          color:#000000;
          padding:10px;
          border-bottom:1px solid var(--border);
          vertical-align:top;
          background:#fff;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        #dash-page .link-inline{
          color:var(--navy);
          text-decoration:none;
          font-weight:600;
          font-size:20px;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        #dash-page .link-inline:hover{
          text-decoration:underline;
        }

        /* ===== FOOTER ===== */
        #dash-page .dash-footer{
          margin-top:32px;
          color:#000000;
          font-size:20px;
          line-height:1.4;
          border-top:1px solid var(--border);
          padding-top:16px;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        #dash-page .footer-row{
          display:flex;
          justify-content:space-between;
          gap:12px;
          flex-wrap:wrap;
        }

        #dash-page .footer-links a{
          color:#000000;
          text-decoration:none;
          font-weight:600;
          font-size:20px;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        #dash-page .footer-links a:hover{
          color:var(--navy);
          text-decoration:underline;
        }
      `}</style>
      <Header/>

      <main>
        <section>
          <div className="container">
            {/* status / error banner */}
            {msg ? (
              <div
                className={`status ${msg ? "error" : "ok"}`}
                role="status"
                aria-live="polite"
              >
                {msg}
              </div>
            ) : null}

            {/* welcome + CTAs row */}
            <div className="top">
              <h1 className="welcome-head">
                {loading
                  ? "Loading…"
                  : `Welcome${displayName ? `, ${displayName}` : ""}`}
              </h1>

              <div className="btn-row">
                {/* room for future CTAs */}
              </div>
            </div>

            {/* quick search card */}
            <div className="card">
              <div className="section-head-row">
                <h3 className="section-title">Quick Search</h3>
                <Link className="btn-ghost-inline" to="/jobs">
                  Advanced
                </Link>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const q = (fd.get("q") || "").toString();
                  const industry = (fd.get("industry") || "").toString();
                  const date = (fd.get("date") || "any").toString();

                  const search = new URLSearchParams({
                    q,
                    industry,
                    date,
                  }).toString();

                  if (
                    typeof window !== "undefined" &&
                    window.location
                  ) {
                    window.location.assign(`/jobs?${search}`);
                  } else {
                    nav(`/jobs?${search}`);
                  }
                }}
              >
                <label className="search-label">
                  Search by title, skill, or company.
                </label>

                <div className="quick-search-grid">
                  <input
                    className="input-field"
                    type="search"
                    name="q"
                    placeholder="e.g. React developer, QA Lead…"
                  />

                  <select
                    className="select-field"
                    name="industry"
                    defaultValue=""
                  >
                    <option value="">All Industries</option>
                    {(data.industries || []).map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>

                  <select
                    className="select-field"
                    name="date"
                    defaultValue="any"
                  >
                    <option value="any">Anytime</option>
                    <option value="24h">Past 24 hours</option>
                    <option value="7d">Past 7 days</option>
                    <option value="30d">Past 30 days</option>
                  </select>

                  <button className="quick-btn fullrow" type="submit">
                    Find Jobs
                  </button>
                </div>
              </form>
            </div>

            {/* 2-col: recent jobs / my applications */}
            <div className="cols2">
              {/* Recent Jobs */}
              <div className="card">
                <div className="section-head-row">
                  <h3 className="section-title">Recent Jobs</h3>
                  <Link className="btn-ghost-inline" to="/jobs">
                    See all
                  </Link>
                </div>

                {loading ? (
                  <div className="mut">Loading…</div>
                ) : (data.recent_jobs || []).length ? (
                  <ul className="list">
                    {data.recent_jobs.map((j) => (
                      <li className="item" key={j.id}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div>
                            <Link
                              className="job-mainline"
                              to={`/jobs/${j.id}`}
                            >
                              {j.title}
                            </Link>
                          </div>
                          <div className="job-subline">
                            {(j.company || "—")} • {(j.location || "—")} •{" "}
                            {(j.industry || "—")}
                          </div>
                        </div>

                        <span className="chip">
                          {j.date_posted || ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mut">
                    No jobs to show yet. Try searching above.
                  </div>
                )}
              </div>

              {/* My Recent Applications */}
              <div className="card">
                <div className="section-head-row">
                  <h3 className="section-title">My Recent Applications</h3>
                  <Link className="btn-ghost-inline" to="/jobs">
                    View
                  </Link>
                </div>

                {loading ? (
                  <div className="mut">Loading…</div>
                ) : (data.my_recent_apps || []).length ? (
                  <table>
                    <thead>
                      <tr>
                        <th>When</th>
                        <th>Role</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.my_recent_apps.map((a) => (
                        <tr key={a.id}>
                          <td>
                            {(a.applied_at || "")
                              .slice(0, 16)
                              .replace("T", " ")}
                          </td>
                          <td>
                            <Link
                              className="link-inline"
                              to={`/jobs/${a.job_id}`}
                            >
                              {a.job_title}
                            </Link>
                          </td>
                          <td>Submitted</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="mut">
                    You haven’t applied to any jobs yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
