// src/pages/AdminApplications.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

// --- SAFE API BASE + URL HELPERS ---
function getApiBase() {
  // Safely read env only if process exists (avoids "process is not defined")
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

function buildApiUrl(path, paramsObj) {
  const base = getApiBase();
  const url = new URL(base + path);

  if (paramsObj && typeof paramsObj === "object") {
    Object.entries(paramsObj).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        url.searchParams.set(key, String(val));
      }
    });
  }

  return url.toString();
}

const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

// Parse filename from Content-Disposition
function filenameFromContentDisposition(cd) {
  if (!cd) return null;
  const star = /filename\*\s*=\s*[^']*'[^']*'([^;]+)/i.exec(cd);
  if (star?.[1]) {
    try {
      return decodeURIComponent(star[1]);
    } catch {}
  }
  const quoted = /filename\s*=\s*"([^"]+)"/i.exec(cd);
  if (quoted?.[1]) return quoted[1];
  const plain = /filename\s*=\s*([^;]+)/i.exec(cd);
  if (plain?.[1]) return plain[1].trim();
  return null;
}

export default function AdminApplications() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [jobId, setJobId] = useState(searchParams.get("job_id") || "");
  const [start, setStart] = useState(searchParams.get("start") || "");
  const [end, setEnd] = useState(searchParams.get("end") || "");

  // Data
  const [apps, setApps] = useState([]);
  const [jobsMap, setJobsMap] = useState({});
  const [allJobsApi, setAllJobsApi] = useState([]);
  const [publicJobs, setPublicJobs] = useState([]);

  // UI State
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);
  const [jobsLoading, setJobsLoading] = useState(false);

  // Build query string to trigger new fetches
  const qs = useMemo(() => {
    const p = new URLSearchParams();
    if (email) p.set("email", email);
    if (jobId) p.set("job_id", jobId);
    if (start) p.set("start", start);
    if (end) p.set("end", end);
    return p.toString();
  }, [email, jobId, start, end]);

  // Fetch admin applications + jobs
  const fetchApplications = async (signal) => {
    setLoading(true);
    setErr("");

    try {
      const token = getToken();

      const params = {
        email,
        job_id: jobId,
        start,
        end,
      };
      const requestUrl = buildApiUrl("/api/admin/applications", params);

      const res = await fetch(requestUrl, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        signal,
      });

      const data = await res.json();
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.message || "Failed to load applications.");
      }

      setApps(data.apps || []);
      setJobsMap(data.jobs || {});
      setAllJobsApi(Array.isArray(data.all_jobs) ? data.all_jobs : []);
    } catch (e) {
      setErr(e.message || "Network error.");
    } finally {
      setLoading(false);
    }
  };

  // Fallback: fetch public jobs if admin response didn't include all_jobs
  const fetchPublicJobs = async (signal) => {
    try {
      setJobsLoading(true);

      const publicUrl = buildApiUrl("/api/jobs", { limit: 500 });
      const res = await fetch(publicUrl, { signal });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.jobs)) setPublicJobs(data.jobs);
    } catch {
      // ignore fallback errors
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      await fetchApplications(ac.signal);

      if (!allJobsApi?.length) {
        const ac2 = new AbortController();
        fetchPublicJobs(ac2.signal);
        ac.fallbackController = ac2;
      }
    })();

    return () => {
      ac.abort();
      if (ac.fallbackController) {
        ac.fallbackController.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qs]);

  // Build job options list
  const jobOptions = useMemo(() => {
    const seen = new Set();
    const list = [];

    const push = (j) => {
      if (!j) return;
      const id = j.id || j.job_id;
      if (!id) return;
      if (seen.has(id)) return;
      seen.add(id);
      list.push({ id, title: j.title || "Untitled" });
    };

    if (Array.isArray(allJobsApi) && allJobsApi.length) {
      allJobsApi.forEach(push);
    } else {
      Object.values(jobsMap || {}).forEach(push);
      (publicJobs || []).forEach(push);
    }

    list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [allJobsApi, jobsMap, publicJobs]);

  // Handle filter submit -> update search params
  const onSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams();
    if (email) next.set("email", email);
    if (jobId) next.set("job_id", jobId);
    if (start) next.set("start", start);
    if (end) next.set("end", end);
    setSearchParams(next);
  };

  // Resume download
  const handleDownload = async (resumeName, appId) => {
    if (!resumeName) return;
    setDownloadingId(appId);

    try {
      const token = getToken();

      const resumeUrl = buildApiUrl(
        `/api/admin/uploads/${encodeURIComponent(resumeName)}`
      );

      const res = await fetch(resumeUrl, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Download failed (${res.status})`);
      }

      const cd = res.headers.get("Content-Disposition");
      const suggested =
        filenameFromContentDisposition(cd) ||
        resumeName.replace(/^[^_]+_/, "");
      const blob = await res.blob();

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = suggested;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      alert(e.message || "Failed to download file.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <>
      <Header />

      <div className="adminAppsPageRoot">
        <style>{`
          /********************************************************
           SCOPED ADMIN APPLICATIONS PAGE STYLES
           All selectors are prefixed with .adminAppsPageRoot
          ********************************************************/

          .adminAppsPageRoot {
            --admTxt:#0f172a;
            --admMut:#64748b;
            --admBorder:#e5e7eb;
            --admGreen:#0f766e;
            --admOrange:#ff8c00;
            --admCardRad:14px;
            --admShadow:0 24px 60px rgba(0,0,0,.08),
                         0 2px 4px rgba(0,0,0,.04);

            width:100%;
            display:flex;
            justify-content:center;
            color:var(--admTxt);
            font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",Roboto,"Segoe UI",sans-serif;
          }

          .adminAppsPageRoot *{
            box-sizing:border-box;
          }

          .adminAppsPageRoot .admAppsWrap{
            max-width:1100px;
            width:100%;
            margin:36px auto;
            padding:0 16px 40px;
            display:flex;
            flex-direction:column;
            gap:16px;
          }

          /**************** PAGE HEADER ****************/
          .adminAppsPageRoot .admAppsTop{
            display:flex;
            flex-wrap:wrap;
            justify-content:space-between;
            align-items:flex-start;
            row-gap:12px;
          }

          .adminAppsPageRoot .admAppsTitle{
            margin:0;
            font-size:clamp(22px,2vw,26px);
            font-weight:900;
            line-height:1.25;
            letter-spacing:-.02em;
            color:#121158; /* updated heading color */
            font-family:ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          }

          .adminAppsPageRoot .admAppsBackLink{
            font-size:14px;
            font-weight:600;
            line-height:1.3;
            color:var(--admGreen);
            text-decoration:none;
          }
          .adminAppsPageRoot .admAppsBackLink:hover{
            text-decoration:underline;
          }

          /**************** FILTER CARD ****************/
          .adminAppsPageRoot .admFilterCard{
            background:#fff;
            border:1px solid var(--admBorder);
            border-radius:var(--admCardRad);
            box-shadow:var(--admShadow);
            padding:16px;
          }

          .adminAppsPageRoot .admFilterHead{
            margin:0 0 12px;
            font-size:14px;
            font-weight:600;
            line-height:1.3;
            color:var(--admTxt);
          }

          .adminAppsPageRoot .admFilterGrid{
            display:grid;
            grid-template-columns:repeat(5,minmax(0,1fr));
            gap:12px;
          }

          @media(max-width:900px){
            .adminAppsPageRoot .admFilterGrid{
              grid-template-columns:repeat(2,minmax(0,1fr));
            }
          }

          @media(max-width:540px){
            .adminAppsPageRoot .admFilterGrid{
              grid-template-columns:1fr;
            }
          }

          .adminAppsPageRoot .admFieldBlock{
            display:flex;
            flex-direction:column;
          }

          .adminAppsPageRoot .admLabel{
            font-size:14px;
            line-height:1.3;
            font-weight:600;
            color:var(--admTxt);
            margin-bottom:4px;
          }

          .adminAppsPageRoot .admInput,
          .adminAppsPageRoot .admSelect{
            width:100%;
            padding:10px 12px;
            font-size:14px;
            line-height:1.4;
            font-weight:500;
            color:var(--admTxt);
            background:#fff;
            border:1px solid var(--admBorder);
            border-radius:10px;
            outline:none;
            font-family:inherit;
            box-shadow:0 0 0 rgba(0,0,0,0);
            transition:box-shadow .15s ease,border-color .15s ease;
          }

          .adminAppsPageRoot .admInput:focus,
          .adminAppsPageRoot .admSelect:focus{
            border-color:rgba(255,140,0,.6);
            box-shadow:0 0 0 3px rgba(255,140,0,.18);
          }

          .adminAppsPageRoot .admFilterActionBlock{
            display:flex;
            align-items:flex-end;
          }

          /**************** BUTTONS ****************/
          .adminAppsPageRoot .admBtn{
            appearance:none;
            font-family:inherit;
            font-size:14px;
            font-weight:600;
            line-height:1.3;
            color:var(--admOrange) !important;

            background:transparent !important;
            border:2px solid var(--admOrange) !important;
            border-radius:10px !important;

            padding:10px 14px !important;
            text-decoration:none !important;
            text-align:center !important;
            cursor:pointer;
            box-shadow:0 20px 32px rgba(0,0,0,.08) !important;
            transition:background .16s ease,color .16s ease,box-shadow .16s ease;

            min-width:110px;
            max-width:100%;
            display:inline-block !important;
            width:auto !important;
          }

          .adminAppsPageRoot .admBtn[disabled]{
            opacity:.5;
            cursor:not-allowed;
          }

          .adminAppsPageRoot .admBtn:hover:not([disabled]){
            background:rgba(255,140,0,0.08) !important;
            color:var(--admOrange) !important;
          }

          .adminAppsPageRoot .admBtn--mobileFull{}

          /**************** STATUS BANNER ****************/
          .adminAppsPageRoot .admBanner{
            border-radius:10px;
            padding:10px 12px;
            font-size:13px;
            line-height:1.4;
            font-weight:500;
            color:var(--admTxt);
            background:#e0f2fe;
          }

          .adminAppsPageRoot .admBanner.err{
            background:#fee2e2;
          }

          /**************** TABLE CARD ****************/
          .adminAppsPageRoot .admTableCard{
            background:#fff;
            border:1px solid var(--admBorder);
            border-radius:var(--admCardRad);
            box-shadow:var(--admShadow);
            padding:16px;
          }

          .adminAppsPageRoot .admTableHeadTitle{
            margin:0 0 12px;
            font-size:14px;
            font-weight:600;
            line-height:1.3;
            color:var(--admTxt);
          }

          .adminAppsPageRoot .admTable{
            width:100%;
            border-collapse:collapse;
            font-family:inherit;
          }

          .adminAppsPageRoot .admThead th{
            text-align:left;
            font-size:13px;
            line-height:1.3;
            font-weight:600;
            color:var(--admMut);
            padding:10px;
            border-bottom:1px solid var(--admBorder);
            white-space:nowrap;
            vertical-align:top;
          }

          .adminAppsPageRoot .admTbody td{
            font-size:14px;
            line-height:1.4;
            font-weight:500;
            color:var(--admTxt);
            padding:10px;
            border-bottom:1px solid var(--admBorder);
            vertical-align:top;
          }

          .adminAppsPageRoot .admTbody tr:last-child td{
            border-bottom:none;
          }

          .adminAppsPageRoot .admResumeName{
            font-size:12px;
            line-height:1.4;
            font-weight:500;
            color:var(--admMut);
            margin-top:4px;
            word-break:break-word;
          }

          .adminAppsPageRoot .admNoApps{
            font-size:14px;
            line-height:1.4;
            font-weight:500;
            color:var(--admMut);
            padding:10px;
          }

          .adminAppsPageRoot .admBackFooter{
            font-size:14px;
            font-weight:600;
            line-height:1.4;
          }

          .adminAppsPageRoot .admBackFooter a{
            color:var(--admGreen);
            text-decoration:none;
          }

          .adminAppsPageRoot .admBackFooter a:hover{
            text-decoration:underline;
          }

          /**************** MOBILE RESPONSIVE ****************/
          @media(max-width:600px){
            .adminAppsPageRoot .admAppsTop{
              flex-direction:column;
              align-items:stretch;
            }

            .adminAppsPageRoot .admBtn--mobileFull{
              width:100% !important;
              display:block !important;
              background:transparent !important;
              border-color:var(--admOrange) !important;
              color:var(--admOrange) !important;
              box-shadow:0 20px 32px rgba(0,0,0,.08) !important;
            }

            .adminAppsPageRoot .admThead{
              display:none;
            }

            .adminAppsPageRoot .admTbody tr{
              display:block;
              border:1px solid var(--admBorder);
              border-radius:var(--admCardRad);
              box-shadow:var(--admShadow);
              padding:12px 14px;
              margin-bottom:12px;
            }

            .adminAppsPageRoot .admTbody tr:last-child{
              margin-bottom:0;
            }

            .adminAppsPageRoot .admTbody td{
              border-bottom:none;
              padding:6px 0;
              display:block;
            }

            .adminAppsPageRoot .admTbody td[data-col="date"]::before{
              content:"Date: ";
              font-weight:600;
              color:var(--admMut);
              font-size:12px;
              margin-right:4px;
            }

            .adminAppsPageRoot .admTbody td[data-col="job"]::before{
              content:"Job: ";
              font-weight:600;
              color:var(--admMut);
              font-size:12px;
              margin-right:4px;
            }

            .adminAppsPageRoot .admTbody td[data-col="name"]::before{
              content:"Full Name: ";
              font-weight:600;
              color:var(--admMut);
              font-size:12px;
              margin-right:4px;
            }

            .adminAppsPageRoot .admTbody td[data-col="email"]::before{
              content:"Email: ";
              font-weight:600;
              color:var(--admMut);
              font-size:12px;
              margin-right:4px;
            }

            .adminAppsPageRoot .admTbody td[data-col="phone"]::before{
              content:"Phone: ";
              font-weight:600;
              color:var(--admMut);
              font-size:12px;
              margin-right:4px;
            }

            .adminAppsPageRoot .admTbody td[data-col="resume"]::before{
              content:"Resume: ";
              font-weight:600;
              color:var(--admMut);
              font-size:12px;
              margin-right:4px;
            }

            .adminAppsPageRoot .admResumeBtnWrap .admBtn{
              width:100% !important;
              display:block !important;
            }
          }
        `}</style>

        <div className="admAppsWrap">
          {/* PAGE HEADER */}
          <div className="admAppsTop">
            <h1 className="admAppsTitle">Applications</h1>
            <Link className="admAppsBackLink" to="/admin/jobs">
              ← Back to Jobs
            </Link>
          </div>

          {/* FILTER CARD */}
          <section className="admFilterCard">
            <h2 className="admFilterHead">Filters</h2>

            <form onSubmit={onSubmit}>
              <div className="admFilterGrid">
                <div className="admFieldBlock">
                  <label className="admLabel">Email</label>
                  <input
                    className="admInput"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="candidate@example.com"
                  />
                </div>

                <div className="admFieldBlock">
                  <label className="admLabel">Job Role</label>
                  <select
                    className="admSelect"
                    name="job_id"
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)}
                  >
                    <option value="">
                      {jobsLoading ? "Loading jobs…" : "All"}
                    </option>
                    {jobOptions.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admFieldBlock">
                  <label className="admLabel">Start</label>
                  <input
                    className="admInput"
                    type="date"
                    name="start"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>

                <div className="admFieldBlock">
                  <label className="admLabel">End</label>
                  <input
                    className="admInput"
                    type="date"
                    name="end"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>

                {/* Submit button cell */}
                <div className="admFilterActionBlock">
                  <button
                    className="admBtn admBtn--mobileFull"
                    type="submit"
                  >
                    Filter
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* STATUS BANNERS */}
          {err && <div className="admBanner err">{err}</div>}
          {loading && !err && <div className="admBanner">Loading…</div>}

          {/* TABLE CARD */}
          {!loading && (
            <section className="admTableCard">
              <h2 className="admTableHeadTitle">Results</h2>

              <table className="admTable">
                <thead className="admThead">
                  <tr>
                    <th>Date</th>
                    <th>Job</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Resume</th>
                  </tr>
                </thead>

                <tbody className="admTbody">
                  {apps.length === 0 ? (
                    <tr>
                      <td className="admNoApps" colSpan={6}>
                        No applications found.
                      </td>
                    </tr>
                  ) : (
                    apps.map((a) => {
                      const jobTitle =
                        jobsMap?.[a.job_id]?.title ||
                        a.job_title ||
                        "—";
                      const isRowDownloading = downloadingId === a.id;
                      return (
                        <tr key={a.id}>
                          <td data-col="date">
                            {(a.applied_at || "")
                              .slice(0, 16)
                              .replace("T", " ")}
                          </td>

                          <td data-col="job">{jobTitle}</td>

                          <td data-col="name">{a.full_name}</td>

                          <td data-col="email">{a.email}</td>

                          <td data-col="phone">{a.phone || "—"}</td>

                          <td data-col="resume">
                            <div className="admResumeBtnWrap">
                              <button
                                type="button"
                                className="admBtn"
                                onClick={() =>
                                  handleDownload(a.resume, a.id)
                                }
                                disabled={
                                  !a.resume || isRowDownloading
                                }
                                title={
                                  a.resume
                                    ? "Download resume"
                                    : "No resume"
                                }
                              >
                                {isRowDownloading
                                  ? "Downloading…"
                                  : "Download"}
                              </button>
                            </div>

                            {a.resume && (
                              <div className="admResumeName">
                                {a.resume.replace(/^[^_]+_/, "")}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
