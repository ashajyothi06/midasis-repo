// src/pages/Jobs.jsx
import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// --- SAFE API BASE LOGIC ---
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

function buildApiUrl(path, paramsObj = {}) {
  const base = getApiBase();
  const url = new URL(base + path);

  Object.entries(paramsObj).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      url.searchParams.set(key, String(val));
    }
  });

  return url.toString();
}

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    ok: true,
    filters: { q: "", industry: "", date: "any", sort: "relevance" },
    industries: [],
    total: 0,
    count: 0,
    jobs: [],
  });

  // read current filters from URL
  const q = searchParams.get("q") || "";
  const industry = searchParams.get("industry") || "";
  const date = searchParams.get("date") || "any";
  const sort = searchParams.get("sort") || "relevance";

  // local form mirrors URL
  const [form, setForm] = useState({ q, industry, date, sort });

  // sync form whenever URL params change
  useEffect(() => {
    setForm({ q, industry, date, sort });
  }, [q, industry, date, sort]);

  const queryString = useMemo(() => {
    const sp = new URLSearchParams();
    if (form.q) sp.set("q", form.q);
    if (form.industry) sp.set("industry", form.industry);
    if (form.date && form.date !== "any") sp.set("date", form.date);
    if (form.sort && form.sort !== "relevance") sp.set("sort", form.sort);
    return sp.toString();
  }, [form]);

  const applyFilters = (e) => {
    e?.preventDefault?.();
    setSearchParams(queryString);
  };

  // for scroll focus etc. after load
  const listRef = useRef(null);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);

    const requestUrl = buildApiUrl("/api/jobs", {
      q,
      industry,
      date,
      sort,
      limit: "50",
    });

    fetch(requestUrl, { signal: ac.signal, cache: "no-store" })
      .then((r) => r.json())
      .then((resp) => {
        // normalize response so we never blow up .map()
        setData((prev) => ({
          ...prev,
          ...resp,
          ok: resp?.ok !== undefined ? resp.ok : true,
          industries: Array.isArray(resp?.industries)
            ? resp.industries
            : prev.industries || [],
          jobs: Array.isArray(resp?.jobs) ? resp.jobs : [],
        }));
      })
      .catch(() => {
        setData((d) => ({
          ...d,
          ok: false,
          jobs: [],
        }));
      })
      .finally(() => {
        setLoading(false);
      });

  return () => ac.abort();
  }, [q, industry, date, sort]);

  // safe arrays for mapping
  const industries = Array.isArray(data.industries) ? data.industries : [];
  const jobs = Array.isArray(data.jobs) ? data.jobs : [];

  return (
    <div id="jobs-page">
      <style>{`
        /************************************************************
        JOBS PAGE THEME
        ************************************************************/

        #jobs-page {
          --navH:64px;

          --container:1200px;

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

        #jobs-page,
        #jobs-page *{
          box-sizing:border-box;
        }

        /************************************************************
        HERO BANNER (unchanged sizes)
        ************************************************************/
        #jobs-page .jobs-hero{
          position:relative;
          width:100%;
          min-height:220px;
          max-height:280px;
          background-image:url("https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1600");
          background-size:cover;
          background-position:center;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        #jobs-page .jobs-hero::before{
          content:"";
          position:absolute;
          inset:0;
          background:rgba(0,0,0,0.45);
        }

        #jobs-page .jobs-hero-inner{
          position:relative;
          text-align:center;
          padding:20px 24px 18px;
          max-width:780px;
          margin:0 auto;
          background:rgba(255,255,255,0.08);
          border-radius:18px;
          border:1px solid rgba(255,255,255,0.35);
          box-shadow:0 18px 40px rgba(0,0,0,.35);
          backdrop-filter:blur(6px);
          -webkit-backdrop-filter:blur(6px);
        }

        #jobs-page .jobs-hero-title{
          margin:0 0 10px;
          font-size:26px;
          font-weight:700;
          letter-spacing:-.02em;
          font-family:"Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color:#ffffff;
        }

        #jobs-page .jobs-hero-sub{
          margin:0;
          font-size:22px;
          font-weight:400;
          line-height:1.5;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color:#ffffff;
        }

        #jobs-page .jobs-hero-breadcrumb{
          margin-top:12px;
          font-size:13px;
          font-weight:500;
          font-family:"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color:#f9fafb;
        }
        #jobs-page .jobs-hero-breadcrumb a{
          color:#f9fafb;
          text-decoration:underline;
          text-underline-offset:2px;
        }
        #jobs-page .jobs-hero-breadcrumb .sep{
          margin:0 6px;
        }

        /************************************************************
        PAGE WRAPPER / BACKDROP
        ************************************************************/
        #jobs-page main{
          background:var(--bg-page);
          margin-top:calc(var(--navH) * -1);
          padding-top:var(--navH);
          min-height:auto;
          display:block;
        }

        #jobs-page main > section{
          padding-top:clamp(24px,2vw,32px);
          padding-bottom:60px;
        }

        #jobs-page main .container{
          max-width:var(--container);
          margin:0 auto;
          padding:0 24px;
        }

        @media(max-width:560px){
          #jobs-page main .container{
            padding:0 16px;
          }
        }

        /* ===== STATUS BANNER (inside jobs section) ===== */
        #jobs-page .status{
          margin:0 0 16px;
          padding:10px 12px;
          border-radius:12px;
          font-size:18px; /* +2px */
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          font-weight:500;
          border:1px solid transparent;
        }
        #jobs-page .status.ok{
          background:var(--status-ok-bg);
          color:var(--status-ok-text);
          border-color:var(--status-ok-border);
        }
        #jobs-page .status.error{
          background:var(--status-err-bg);
          color:var(--status-err-text);
          border-color:var(--status-err-border);
        }

        /* ===== CARD BASE ===== */
        #jobs-page .card{
          background:var(--bg-card);
          border:1px solid var(--border);
          border-radius:var(--radius);
          box-shadow:var(--shadow);
          position:relative;
          overflow:hidden;
        }

        /************************************************************
        SECTION INTRO (below hero)
        ************************************************************/
        #jobs-page .jobs-head{
          display:flex;
          flex-direction:column;
          gap:4px;
          margin:24px 0 24px;
        }

        #jobs-page .jobs-eyebrow{
          font-size:14px;
          font-weight:600;
          color:var(--navy);
          background:rgba(0,60,112,.06);
          border:1px solid rgba(0,60,112,.22);
          border-radius:999px;
          padding:4px 10px;
          line-height:1.2;
          width:max-content;
          box-shadow:0 8px 24px rgba(0,0,0,.06);
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        #jobs-page .jobs-title{
          margin:0;
          font-size:26px;
          font-weight:700;
          line-height:1.25;
          color:#1B1F2E;
          letter-spacing:-.02em;
          font-family:"Poppins", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        #jobs-page .jobs-sub{
          color:#000000;
          font-size:22px;
          line-height:1.5;
          max-width:640px;
          margin:0;
          font-weight:400;
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        /************************************************************
        GRID: FILTERS + LIST
        ************************************************************/
        #jobs-page .jobs-grid{
          display:grid;
          grid-template-columns:280px 1fr;
          gap:28px;
          align-items:flex-start;
        }
        @media(max-width:900px){
          #jobs-page .jobs-grid{
            grid-template-columns:1fr;
          }
        }

        /* ===== FILTERS CARD ===== */
        #jobs-page .filters-card{
          padding:clamp(18px,2.4vw,28px);
        }

        #jobs-page .jobs-filter-heading{
          font-size:18px; /* +2px */
          font-weight:600;
          line-height:1.3;
          color:var(--ink);
          margin:0 0 12px;
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        #jobs-page .jobs-filter-block{
          margin:16px 0;
        }

        #jobs-page .jobs-filter-label{
          font-size:18px; /* +2px */
          line-height:1.3;
          font-weight:600;
          color:var(--ink);
          margin-bottom:6px;
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          display:block;
        }

        #jobs-page .jobs-row{
          display:flex;
          flex-wrap:wrap;
          gap:10px 16px;
          align-items:flex-start;
        }

        /* shared inputs inside jobs section */
        #jobs-page .input,
        #jobs-page .select{
          height:46px;
          border:1px solid var(--border);
          border-radius:12px;
          padding:0 14px;
          width:100%;
          background:#fff;
          color:var(--ink);
          font-size:19px; /* +2px */
          line-height:1.4;
          outline:none;
          transition:box-shadow .15s ease, border-color .15s ease;
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }
        #jobs-page .input:focus,
        #jobs-page .select:focus{
          border-color:rgba(0,60,112,.4);
          box-shadow:0 0 0 3px rgba(0,60,112,.15);
        }

        /* radio labels (Sort By) */
        #jobs-page .radio-label{
          display:flex;
          gap:8px;
          align-items:center;
          color:var(--ink);
          font-size:18px; /* +2px */
          font-weight:500;
          line-height:1.3;
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        /* apply filters button */
        #jobs-page .actions{
          display:flex;
          justify-content:flex-start;
          margin-top:8px;
        }
        @media(max-width:900px){
          #jobs-page .actions{
            justify-content:center;
          }
        }

        #jobs-page .btn{
          border-radius:9999px;
          padding:11px 18px;
          font-weight:600;
          line-height:1.3;
          font-size:19px; /* +2px */
          cursor:pointer;
          min-width:160px;
          text-align:center;

          background:transparent;
          border:2px solid var(--btn-border);
          color:var(--btn-text);
          box-shadow:0 20px 32px rgba(0,0,0,.08);
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          transition:all .16s ease;
        }
        #jobs-page .btn-primary:hover:not(:disabled){
          background:var(--btn-hover-bg);
          color:var(--btn-hover-text);
          box-shadow:0 24px 36px rgba(0,60,112,.22);
          transform:translateY(-1px);
        }
        #jobs-page .btn[disabled]{
          opacity:.5;
          cursor:not-allowed;
          transform:none !important;
          background:transparent !important;
        }

        /************************************************************
        JOB LIST COLUMN
        ************************************************************/
        #jobs-page .list-col{
          display:flex;
          flex-direction:column;
          gap:16px;
        }

        #jobs-page .job-card{
          background:#fff;
          border:1px solid var(--border);
          border-radius:var(--radius);
          box-shadow:var(--shadow);
          padding:16px 18px;
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        @media(max-width:500px){
          #jobs-page .job-card{
            border-radius:14px;
            padding:14px 16px;
          }
        }

        #jobs-page .job-eyebrow{
          display:inline-block;
          font-size:16px; /* +2px */
          font-weight:600;
          line-height:1.2;
          color:var(--navy);
          background:rgba(0,60,112,.06);
          border:1px solid rgba(0,60,112,.22);
          border-radius:999px;
          padding:4px 8px;
          box-shadow:0 8px 16px rgba(0,0,0,.06);
        }

        #jobs-page .job-title{
          margin:10px 0 6px;
          font-size:20px; /* +2px */
          font-weight:700;
          line-height:1.3;
          color:var(--navy);
          letter-spacing:-0.02em;
          font-family:"Poppins", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }
        #jobs-page .job-title a{
          color:var(--navy);
          text-decoration:none;
        }
        #jobs-page .job-title a:hover{
          text-decoration:underline;
        }

        #jobs-page .job-rowline{
          display:flex;
          flex-wrap:wrap;
          gap:8px 16px;
          font-size:17px; /* +2px */
          line-height:1.5;
          font-weight:500;
          color:var(--muted);
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }
        #jobs-page .job-rowline strong{
          color:var(--ink);
          font-weight:600;
        }

        #jobs-page .job-divider{
          border:none;
          border-top:1px solid var(--border);
          margin:14px 0;
        }

        #jobs-page .req-head{
          font-size:17px; /* +2px */
          font-weight:600;
          color:var(--ink);
          margin-bottom:6px;
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        #jobs-page .skills-row{
          display:flex;
          flex-wrap:wrap;
          gap:6px 6px;
        }

        #jobs-page .skill-chip{
          background:var(--chip-bg);
          border:1px solid var(--chip-border);
          border-radius:999px;
          padding:6px 10px;
          font-size:16.5px; /* +2px from 14.5 */
          line-height:1.2;
          color:var(--ink);
          font-weight:500;
          box-shadow:0 8px 16px rgba(0,0,0,.06);
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        /* EMPTY STATE CARD */
        #jobs-page .empty-card{
          padding:clamp(18px,2.4vw,24px);
          text-align:left;
          font-size:18px; /* +2px */
          line-height:1.5;
          font-weight:500;
          color:var(--muted);
          font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        /* RESPONSIVE TWEAKS FOR JOBS SECTION TEXT */
        @media(max-width:500px){
          #jobs-page .jobs-title{
            font-size:26px; /* +2px from 24 */
            line-height:1.22;
            margin-bottom:4px;
          }

          #jobs-page .jobs-sub{
            font-size:22px; /* +2px from 20 */
            line-height:1.45;
          }

          #jobs-page .radio-label{
            font-size:16px; /* +2px from 14 */
          }

          #jobs-page .btn{
            width:100%;
            min-width:0;
          }

          #jobs-page .jobs-hero-inner{
            padding:18px 16px 16px;
          }

          /* keep hero text sizes same as before (no +2px here) */
          #jobs-page .jobs-hero-title{
            font-size:24px;
          }

          #jobs-page .jobs-hero-sub{
            font-size:20px;
          }
        }
      `}</style>
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="jobs-hero">
          <div className="jobs-hero-inner">
            <h1 className="jobs-hero-title">Trending Job Searches</h1>
            <p className="jobs-hero-sub">
              Explore roles across industries. Filter by skill, industry, and
              timeline — then send us your resume so we can match you faster.
            </p>
            <p className="jobs-hero-breadcrumb">
              <Link to="/">Home</Link>
              <span className="sep">›</span>
              <span>Trending Job Searches</span>
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            {/* API status / error message */}
            {!data.ok && (
              <div className="status error" role="status" aria-live="polite">
                Could not load jobs. Please try adjusting filters or refresh.
              </div>
            )}

            <header className="jobs-head">{/* (optional text later) */}</header>

            <div className="jobs-grid">
              {/* ================= FILTERS CARD ================= */}
              <aside className="card filters-card">
                <h4 className="jobs-filter-heading">Search &amp; Filters</h4>

                <form onSubmit={applyFilters}>
                  {/* Sort By */}
                  <div className="jobs-filter-block">
                    <label className="jobs-filter-label">Sort By</label>
                    <div className="jobs-row">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="sort"
                          value="relevance"
                          checked={form.sort !== "date"}
                          onChange={() =>
                            setForm((f) => ({ ...f, sort: "relevance" }))
                          }
                        />
                        <span>Relevance</span>
                      </label>

                      <label className="radio-label">
                        <input
                          type="radio"
                          name="sort"
                          value="date"
                          checked={form.sort === "date"}
                          onChange={() =>
                            setForm((f) => ({ ...f, sort: "date" }))
                          }
                        />
                        <span>Date Posted</span>
                      </label>
                    </div>
                  </div>

                  {/* Date Posted */}
                  <div className="jobs-filter-block">
                    <label
                      className="jobs-filter-label"
                      htmlFor="dateFilter"
                    >
                      Date Posted
                    </label>
                    <select
                      id="dateFilter"
                      className="select"
                      name="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, date: e.target.value }))
                      }
                    >
                      <option value="any">Anytime</option>
                      <option value="24h">Past 24 hours</option>
                      <option value="7d">Past 7 days</option>
                      <option value="30d">Past 30 days</option>
                    </select>
                  </div>

                  {/* Industry */}
                  <div className="jobs-filter-block">
                    <label
                      className="jobs-filter-label"
                      htmlFor="industryFilter"
                    >
                      Industry
                    </label>
                    <select
                      id="industryFilter"
                      className="select"
                      name="industry"
                      value={form.industry}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          industry: e.target.value,
                        }))
                      }
                    >
                      <option value="">All</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Keyword */}
                  <div className="jobs-filter-block">
                    <label
                      className="jobs-filter-label"
                      htmlFor="keywordFilter"
                    >
                      Keyword / Skill
                    </label>
                    <input
                      id="keywordFilter"
                      className="input"
                      type="text"
                      name="q"
                      placeholder="e.g. React, Data Engineer"
                      value={form.q}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, q: e.target.value }))
                      }
                    />
                  </div>

                  <div className="actions">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Loading…" : "Apply Filters"}
                    </button>
                  </div>
                </form>
              </aside>

              {/* ================= JOB LIST COLUMN ================= */}
              <section className="list-col" ref={listRef}>
                {jobs.map((j) => (
                  <article className="job-card" key={j.id}>
                    <div className="job-eyebrow">
                      {j.industry || "General"}
                    </div>

                    <h3 className="job-title">
                      <Link to={`/jobs/${encodeURIComponent(j.id)}`}>
                        {j.title}
                      </Link>
                    </h3>

                    <div className="job-rowline">
                      <span>
                        <strong>Location:</strong>{" "}
                        <span>{j.location || "—"}</span>
                      </span>

                      {(j.salary_min || j.salary_max) && (
                        <span>
                          <strong>Salary:</strong>{" "}
                          <span>
                            {j.salary_min ?? "?"} - {j.salary_max ?? "?"}
                            {j.salary_unit === "per_hour"
                              ? " /hr"
                              : j.salary_unit === "per_month"
                              ? " /mo"
                              : j.salary_unit === "per_annum"
                              ? " /yr"
                              : ""}
                          </span>
                        </span>
                      )}
                    </div>

                    <hr className="job-divider" />

                    <div className="req-head">Key Skills</div>
                    <div className="skills-row">
                      {(j.skills || []).map((s, idx) => (
                        <span className="skill-chip" key={idx}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}

                {!loading && jobs.length === 0 && (
                  <div className="card empty-card">
                    No jobs found. Try adjusting filters.
                  </div>
                )}
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
