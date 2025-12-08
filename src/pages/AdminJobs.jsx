// src/pages/AdminJobs.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

// --- SAFE API BASE + URL HELPERS ---
function getApiBase() {
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

// Safe token helper
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export default function AdminJobs() {
  const nav = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      nav("/login?next=/admin/jobs");
      return;
    }

    let active = true;
    const jobsUrl = buildApiUrl("/api/admin/jobs");

    setLoading(true);
    setMsg("");

    fetch(jobsUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then(async (r) => {
        if (r.status === 401 || r.status === 403) {
          nav("/login?next=/admin/jobs");
          return null;
        }
        const j = await r.json();
        return j;
      })
      .then((j) => {
        if (!active || !j) return;
        if (j.ok) {
          setJobs(j.jobs || []);
        } else {
          setMsg(j.message || "Failed to load jobs.");
        }
      })
      .catch(() => {
        if (active) setMsg("Network error.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [nav]);

  return (
    <>
      <Header />

      <div className="adminJobsPageRoot">
        <style>{`
          /********************************************************
           SCOPED ADMIN JOBS PAGE STYLES
           Every selector is prefixed with .adminJobsPageRoot
          ********************************************************/

          .adminJobsPageRoot {
            --admTxt:#121158;        /* main text color */
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
            font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          }

          .adminJobsPageRoot *{
            box-sizing:border-box;
          }

          .adminJobsPageRoot .admJobsWrap{
            max-width:1100px;
            width:100%;
            margin:36px auto;
            padding:0 16px 40px;
            display:flex;
            flex-direction:column;
            gap:16px;
          }

          /**************** HEADER BAR ****************/
          .adminJobsPageRoot .admJobsTop{
            display:flex;
            flex-wrap:wrap;
            justify-content:space-between;
            align-items:flex-start;
            row-gap:12px;
          }

          .adminJobsPageRoot .admJobsTitle{
            margin:0;
            font-size:24px;
            font-weight:700;
            line-height:1.25;
            letter-spacing:-.02em;
            color:#1B1F2E; /* main heading */
            font-family:"Poppins", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          }

          .adminJobsPageRoot .admJobsTopActions{
            display:flex;
            flex-direction:column;
            gap:8px;
            min-width:140px;
          }

          /**************** BUTTON STYLE ****************/
          .adminJobsPageRoot .admBtn{
            appearance:none;
            font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
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

          .adminJobsPageRoot .admBtn:hover{
            background:rgba(255,140,0,0.08) !important;
            color:var(--admOrange) !important;
          }

          .adminJobsPageRoot .admBtn--mobileFull{}

          /**************** TABLE WRAPPER CARD ****************/
          .adminJobsPageRoot .admJobsCard{
            background:#fff;
            border:1px solid var(--admBorder);
            border-radius:var(--admCardRad);
            box-shadow:var(--admShadow);
            padding:16px;
            overflow:hidden;
          }

          .adminJobsPageRoot .admJobsCardHead{
            display:flex;
            justify-content:space-between;
            align-items:flex-start;
            flex-wrap:wrap;
            row-gap:8px;
            margin-bottom:12px;
          }

          .adminJobsPageRoot .admJobsCardTitle{
            margin:0;
            font-size:18px;
            font-weight:600;
            line-height:1.3;
            color:#000000; /* section/card heading */
            font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          }

          /**************** STATUS TEXT ****************/
          .adminJobsPageRoot .admStatusText{
            font-size:14px;
            line-height:1.4;
            font-weight:500;
            color:var(--admTxt);
            margin-top:4px;
          }

          .adminJobsPageRoot .admJobSubText{
            font-size:14px;
            line-height:1.4;
            font-weight:500;
            color:var(--admTxt);
          }

          /**************** JOBS TABLE (desktop) ****************/
          .adminJobsPageRoot .admTable{
            width:100%;
            border-collapse:collapse;
            font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          }

          .adminJobsPageRoot .admTableHead th{
            text-align:left;
            font-size:13px;
            line-height:1.3;
            font-weight:600;
            color:var(--admTxt);
            padding:10px;
            border-bottom:1px solid var(--admBorder);
            white-space:nowrap;
            vertical-align:top;
          }

          .adminJobsPageRoot .admTableBody td{
            font-size:14px;
            line-height:1.4;
            font-weight:500;
            color:var(--admTxt);
            padding:10px;
            border-bottom:1px solid var(--admBorder);
            vertical-align:top;
          }

          .adminJobsPageRoot .admTableBody tr:last-child td{
            border-bottom:none;
          }

          .adminJobsPageRoot .admJobTitleCellLink{
            color:var(--admGreen);
            text-decoration:none;
            font-weight:600;
          }
          .adminJobsPageRoot .admJobTitleCellLink:hover{
            text-decoration:underline;
          }

          .adminJobsPageRoot .admJobSubTextSmall{
            font-size:12px;
            line-height:1.4;
            font-weight:500;
            color:#64748b;
          }

          /**************** FOOTER ACTION AREA ****************/
          .adminJobsPageRoot .admJobsFooterActions{
            display:flex;
            flex-wrap:wrap;
            gap:12px;
            margin-top:8px;
          }

          /**************** MOBILE RESPONSIVE ****************/
          @media(max-width:600px){
            .adminJobsPageRoot .admJobsTop{
              flex-direction:column;
              align-items:stretch;
            }
            .adminJobsPageRoot .admJobsTopActions{
              width:100%;
            }

            .adminJobsPageRoot .admBtn--mobileFull{
              width:100% !important;
              display:block !important;
              background:transparent !important;
              border-color:var(--admOrange) !important;
              color:var(--admOrange) !important;
              box-shadow:0 20px 32px rgba(0,0,0,.08) !important;
            }

            .adminJobsPageRoot .admTableHead{
              display:none;
            }

            .adminJobsPageRoot .admTableBody tr{
              display:block;
              border:1px solid var(--admBorder);
              border-radius:var(--admCardRad);
              box-shadow:var(--admShadow);
              padding:12px 14px;
              margin-bottom:12px;
            }
            .adminJobsPageRoot .admTableBody tr:last-child{
              margin-bottom:0;
            }

            .adminJobsPageRoot .admTableBody td{
              border-bottom:none;
              padding:6px 0;
              display:block;
            }

            .adminJobsPageRoot .admTableBody td[data-col="title"]{
              padding-top:0;
            }

            .adminJobsPageRoot .admTableBody td[data-col="company"]::before{
              content:"Company: ";
              font-weight:600;
              color:#64748b;
              font-size:12px;
              margin-right:4px;
            }
            .adminJobsPageRoot .admTableBody td[data-col="location"]::before{
              content:"Location: ";
              font-weight:600;
              color:#64748b;
              font-size:12px;
              margin-right:4px;
            }
            .adminJobsPageRoot .admTableBody td[data-col="industry"]::before{
              content:"Industry: ";
              font-weight:600;
              color:#64748b;
              font-size:12px;
              margin-right:4px;
            }
            .adminJobsPageRoot .admTableBody td[data-col="date"]::before{
              content:"Date Posted: ";
              font-weight:600;
              color:#64748b;
              font-size:12px;
              margin-right:4px;
            }
            .adminJobsPageRoot .admTableBody td[data-col="actions"]::before{
              content:"";
            }

            .adminJobsPageRoot .admRowActionBtnWrap{
              width:100%;
            }
            .adminJobsPageRoot .admRowActionBtnWrap .admBtn{
              width:100% !important;
              display:block !important;
            }

            .adminJobsPageRoot .admJobsFooterActions{
              flex-direction:column;
            }
            .adminJobsPageRoot .admJobsFooterActions .admBtn{
              width:100% !important;
              display:block !important;
            }
          }
        `}</style>

        <div className="admJobsWrap">
          {/* HEADER */}
          <div className="admJobsTop">
            <h1 className="admJobsTitle">Jobs</h1>
            <div className="admJobsTopActions">
              <Link
                className="admBtn admBtn--mobileFull"
                to="/admin/jobs/new"
              >
                New Job
              </Link>
            </div>
          </div>

          {/* BODY */}
          <div className="admJobsCard">
            <div className="admJobsCardHead">
              <h2 className="admJobsCardTitle">All Jobs</h2>
            </div>

            {msg && <div className="admStatusText">{msg}</div>}

            {loading ? (
              <div className="admJobSubText">Loading…</div>
            ) : !jobs.length ? (
              <div className="admJobSubText">No jobs created yet.</div>
            ) : (
              <table className="admTable">
                <thead className="admTableHead">
                  <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Industry</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="admTableBody">
                  {jobs.map((j) => (
                    <tr key={j.id}>
                      {/* Title / link */}
                      <td data-col="title">
                        <Link
                          className="admJobTitleCellLink"
                          to={`/jobs/${j.id}`}
                        >
                          {j.title}
                        </Link>
                        <div className="admJobSubTextSmall">
                          {j.id ? `Job ID: ${j.id}` : ""}
                        </div>
                      </td>

                      {/* Company */}
                      <td data-col="company">{j.company || "—"}</td>

                      {/* Location */}
                      <td data-col="location">{j.location || "—"}</td>

                      {/* Industry */}
                      <td data-col="industry">{j.industry || "—"}</td>

                      {/* Date */}
                      <td data-col="date">{j.date_posted || "—"}</td>

                      {/* Edit action */}
                      <td data-col="actions">
                        <div className="admRowActionBtnWrap">
                          <Link
                            className="admBtn"
                            to={`/admin/jobs/${j.id}/edit`}
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="admJobsFooterActions">
            <Link
              className="admBtn admBtn--mobileFull"
              to="/admin/applications"
            >
              View Applications
            </Link>
            <Link
              className="admBtn admBtn--mobileFull"
              to="/admin"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
