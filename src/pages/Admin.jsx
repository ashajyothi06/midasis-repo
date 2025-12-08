import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ⬇️ ADD THESE (fix paths if needed)
import Header from "../components/Header";
import Footer from "../components/Footer";

// --- SAFE API BASE LOGIC (aligned with other pages) ---
function getApiBase() {
  // Safely read env only if process exists (avoids "process is not defined")
  const fromEnv =
    typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_BASE;

  const raw = fromEnv || "https://midasistechnology.com";

  try {
    // Normalise and trim trailing slash
    return new URL(raw).toString().replace(/\/+$/, "");
  } catch {
    // Fallback to browser origin if available
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin.replace(/\/+$/, "");
    }
    // Last-resort hardcoded base
    return "https://midasistechnology.com";
  }
}

// Build a fully qualified URL for API calls.
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

export default function Admin() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({
    total_jobs: 0,
    total_apps: 0,
    apps_today: 0,
    recent_jobs: [],
    recent_apps: [],
  });

  // fetch dashboard summary
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      nav("/login?next=/admin");
      return;
    }

    let active = true;
    setLoading(true);

    const summaryUrl = buildApiUrl("/api/admin/summary");

    fetch(summaryUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then(async (r) => {
        if (r.status === 401 || r.status === 403) {
          nav("/login?next=/admin");
          return null;
        }
        const j = await r.json();
        return j;
      })
      .then((j) => {
        if (!active || !j) return;
        if (j.ok) {
          setData(j);
        } else {
          setMsg(j.message || "Failed to load.");
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

  // --- Authenticated resume downloader ---
  const downloadResume = async (fname) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        nav("/login?next=/admin");
        return;
      }

      const resumeUrl = buildApiUrl(
        `/api/admin/uploads/${encodeURIComponent(fname)}`
      );

      const res = await fetch(resumeUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `Download failed (${res.status}).`);
      }

      // Try to extract a nice filename from Content-Disposition
      const disp = res.headers.get("Content-Disposition") || "";
      let niceName = fname;
      const match = /filename\*?=(?:UTF-8'')?("?)([^";]+)\1/i.exec(disp);
      if (match && match[2]) {
        try {
          niceName = decodeURIComponent(match[2]);
        } catch {
          niceName = match[2];
        }
      }

      // blob -> object URL -> trigger download
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = niceName || "resume";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert(e.message || "Could not download file.");
    }
  };

  return (
    <>
      {/* GLOBAL HEADER */}
      <Header />

      <div className="adminPageRoot">
        <style>{`
        /********************************************************
         SCOPED ADMIN DASHBOARD STYLES
        ********************************************************/

        .adminPageRoot {
          --admTxt:#121158;         /* body text colour */
          --admMut:#64748b;         /* muted / helper text */
          --admBorder:#e5e7eb;
          --admGreen:#0f766e;
          --admOrange:#ff8c00;
          --admCardRad:14px;
          --admChipRad:999px;
          --admShadow:0 24px 60px rgba(0,0,0,.08),
                       0 2px 4px rgba(0,0,0,.04);

          display:flex;
          justify-content:center;
          width:100%;
          color:var(--admTxt);
          font-family:"Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          background:#f6f8fb;
        }

        .adminPageRoot * {
          box-sizing:border-box;
        }

        .adminPageRoot .admWrap {
          max-width:1100px;
          width:100%;
          margin:36px auto;
          padding:0 16px 40px;
          display:flex;
          flex-direction:column;
          gap:16px;
        }

        /**************** HEADER ****************/
        .adminPageRoot .admTop {
          display:flex;
          flex-wrap:wrap;
          justify-content:space-between;
          align-items:flex-start;
          row-gap:12px;
        }

        /* MAIN HEADING: 24px Poppins, #1B1F2E */
        .adminPageRoot .admTitle {
          margin:0;
          font-size:24px;
          font-weight:700;
          line-height:1.25;
          color:#1B1F2E;
          letter-spacing:-.02em;
          font-family:"Poppins",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        .adminPageRoot .admHeaderLogoutWrap {
          min-width:140px;
          display:flex;
          flex-direction:column;
          gap:8px;
        }

        /**************** BUTTONS ****************/
        .adminPageRoot .admBtn {
          appearance:none;
          font-family:"Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
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

        .adminPageRoot .admBtn:hover {
          background:rgba(255,140,0,0.08) !important;
          color:var(--admOrange) !important;
        }

        .adminPageRoot .admBtn--cta {}
        .adminPageRoot .admBtn--row { min-width:auto; }
        .adminPageRoot .admBtn--mobileFull {}

        /**************** STATUS TEXT ****************/
        /* other text colour #121158 */
        .adminPageRoot .admStatusText {
          font-size:14px;
          line-height:1.4;
          font-weight:500;
          color:#121158;
          font-family:"Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        /**************** STATS GRID ****************/
        .adminPageRoot .admStatsGrid {
          display:grid;
          gap:16px;
          grid-template-columns:repeat(3,minmax(0,1fr));
        }

        @media(max-width:900px){
          .adminPageRoot .admStatsGrid {
            grid-template-columns:1fr;
          }
        }

        .adminPageRoot .admCard {
          background:#fff;
          border:1px solid var(--admBorder);
          border-radius:var(--admCardRad);
          box-shadow:var(--admShadow);
          padding:16px;
          display:flex;
          flex-direction:column;
          gap:12px;
        }

        .adminPageRoot .admStatRow {
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
        }

        .adminPageRoot .admStatLeft {
          display:flex;
          flex-direction:column;
          gap:6px;
        }

        /* CARD TITLES: 18px Roboto, #000000 */
        .adminPageRoot .admStatTitle {
          margin:0;
          font-size:18px;
          line-height:1.3;
          font-weight:600;
          color:#000000;
          font-family:"Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        /* MAIN NUMBERS: 24px Poppins, #1B1F2E */
        .adminPageRoot .admStatNum {
          font-size:24px;
          line-height:1.2;
          font-weight:700;
          color:#1B1F2E;
          letter-spacing:-0.02em;
          font-family:"Poppins",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        .adminPageRoot .admChip {
          display:inline-block;
          border:1px solid var(--admBorder);
          border-radius:var(--admChipRad);
          padding:4px 8px;
          font-size:12px;
          line-height:1.2;
          font-weight:600;
          color:var(--admMut);
          box-shadow:0 8px 16px rgba(0,0,0,.06);
          white-space:nowrap;
        }

        /**************** MAIN GRID (jobs / apps) ****************/
        .adminPageRoot .admMainGrid {
          display:grid;
          gap:16px;
          grid-template-columns:1fr 1fr;
        }

        @media(max-width:900px){
          .adminPageRoot .admMainGrid {
            grid-template-columns:1fr;
          }
        }

        .adminPageRoot .admSectionHead {
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          flex-wrap:nowrap;
          gap:12px;
        }

        /* SECTION HEADINGS: 18px Roboto, #000000 */
        .adminPageRoot .admSectionTitle {
          margin:0;
          font-size:18px;
          line-height:1.3;
          font-weight:600;
          color:#000000;
          flex:1 1 auto;
          font-family:"Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        .adminPageRoot .admSectionActionWrap {
          flex-shrink:0;
          min-width:max-content;
          display:flex;
          flex-direction:column;
          gap:8px;
        }

        /**************** JOB LIST ****************/
        .adminPageRoot .admList {
          margin:0;
          padding:0;
          list-style:none;
          display:flex;
          flex-direction:column;
          gap:12px;
        }

        .adminPageRoot .admItem {
          border-bottom:1px solid var(--admBorder);
          padding-bottom:12px;
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          column-gap:12px;
          row-gap:8px;
          flex-wrap:nowrap;
        }

        .adminPageRoot .admItem:last-child {
          border-bottom:none;
          padding-bottom:0;
        }

        .adminPageRoot .admItemMain {
          flex:1 1 auto;
          min-width:0;
        }

        /* JOB TITLES: treated as main heading-ish -> Poppins 24? or 18? 
           We'll keep them strong but slightly smaller than main title: 18px Poppins, #1B1F2E */
        .adminPageRoot .admJobHeading {
          margin:0 0 4px;
          font-size:18px;
          line-height:1.3;
          font-weight:700;
          letter-spacing:-0.02em;
          font-family:"Poppins",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          color:#1B1F2E;
        }

        .adminPageRoot .admJobHeading a {
          color:#1B1F2E;
          text-decoration:none;
        }

        .adminPageRoot .admJobHeading a:hover {
          text-decoration:underline;
        }

        /* general muted/meta text */
        .adminPageRoot .admMut {
          color:var(--admMut);
          font-size:13px;
          line-height:1.4;
          font-weight:500;
          font-family:"Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        .adminPageRoot .admItemRightWrap {
          flex-shrink:0;
          display:flex;
          flex-direction:column;
          align-items:flex-end;
          gap:8px;
          min-width:max-content;
        }

        /**************** APPLICATIONS TABLE ****************/
        .adminPageRoot .admTable {
          width:100%;
          border-collapse:collapse;
          font-family:"Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        .adminPageRoot .admTableHead th {
          text-align:left;
          font-size:14px;
          line-height:1.3;
          font-weight:600;
          color:#000000; /* use heading colour for header labels */
          padding-bottom:6px;
          border-bottom:1px solid var(--admBorder);
          vertical-align:top;
          white-space:nowrap;
        }

        .adminPageRoot .admTableBody td {
          font-size:14px;
          line-height:1.4;
          font-weight:500;
          color:#121158; /* body text */
          padding:8px 0;
          border-bottom:1px solid var(--admBorder);
          vertical-align:top;
        }

        .adminPageRoot .admTableBody tr:last-child td {
          border-bottom:none;
        }

        .adminPageRoot .admCandidateName {
          font-size:14px;
          line-height:1.4;
          font-weight:600;
          color:#121158;
          margin:0 0 2px;
          font-family:"Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        .adminPageRoot .admCandidateEmail {
          font-size:12px;
          line-height:1.4;
          font-weight:500;
          color:var(--admMut);
          font-family:"Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        }

        .adminPageRoot .admTableBtnOuter {
          display:flex;
          flex-direction:column;
          align-items:flex-start;
          gap:8px;
        }

        /**************** MOBILE RESPONSIVE ****************/
        @media(max-width:600px){

          .adminPageRoot .admTop {
            flex-direction:column;
            align-items:stretch;
          }

          .adminPageRoot .admHeaderLogoutWrap {
            width:100%;
          }

          .adminPageRoot .admSectionHead {
            flex-direction:column;
            align-items:stretch;
          }

          .adminPageRoot .admSectionActionWrap {
            width:100%;
          }

          .adminPageRoot .admItem {
            flex-wrap:wrap;
          }

          .adminPageRoot .admItemRightWrap {
            width:100%;
            flex-direction:column;
            align-items:stretch;
          }

          .adminPageRoot .admTableHead {
            display:none;
          }

          .adminPageRoot .admTableBody tr {
            display:block;
            border:1px solid var(--admBorder);
            border-radius:var(--admCardRad);
            box-shadow:var(--admShadow);
            padding:12px 14px;
            margin-bottom:12px;
          }

          .adminPageRoot .admTableBody tr:last-child {
            margin-bottom:0;
          }

          .adminPageRoot .admTableBody td {
            border-bottom:none;
            padding:4px 0;
            display:block;
          }

          .adminPageRoot .admTableBody td:nth-child(1)::before {
            content:"When: ";
            font-weight:600;
            color:var(--admMut);
            font-size:12px;
            margin-right:4px;
          }
          .adminPageRoot .admTableBody td:nth-child(2)::before {
            content:"Candidate:";
            font-weight:600;
            color:var(--admMut);
            font-size:12px;
            display:block;
            margin-bottom:2px;
          }
          .adminPageRoot .admTableBody td:nth-child(3)::before {
            content:"Role: ";
            font-weight:600;
            color:var(--admMut);
            font-size:12px;
            margin-right:4px;
          }
          .adminPageRoot .admTableBody td:nth-child(4)::before {
            content:"Resume:";
            font-weight:600;
            color:var(--admMut);
            font-size:12px;
            margin-right:4px;
          }

          .adminPageRoot .admBtn--mobileFull {
            width:100% !important;
            display:block !important;
            background:transparent !important;
            border-color:var(--admOrange) !important;
            color:var(--admOrange) !important;
            box-shadow:0 20px 32px rgba(0,0,0,.08) !important;
          }
        }

      `}</style>

        <div className="admWrap">
          {/* HEADER */}
          <div className="admTop">
            <h1 className="admTitle">Admin Dashboard</h1>
            <div className="admHeaderLogoutWrap">
              {/* space for future controls (logout, etc.) */}
            </div>
          </div>

          {/* status / loading */}
          {msg && <div className="admStatusText">{msg}</div>}
          {loading ? <div className="admStatusText">Loading…</div> : null}

          {/* STATS */}
          <div className="admStatsGrid">
            <div className="admCard">
              <div className="admStatRow">
                <div className="admStatLeft">
                  <div className="admStatTitle">Total Jobs</div>
                  <div className="admStatNum">{data.total_jobs}</div>
                </div>
                <span className="admChip">All time</span>
              </div>
            </div>

            <div className="admCard">
              <div className="admStatRow">
                <div className="admStatLeft">
                  <div className="admStatTitle">Total Applications</div>
                  <div className="admStatNum">{data.total_apps}</div>
                </div>
                <span className="admChip">All time</span>
              </div>
            </div>

            <div className="admCard">
              <div className="admStatRow">
                <div className="admStatLeft">
                  <div className="admStatTitle">Applications Today</div>
                  <div className="admStatNum">{data.apps_today}</div>
                </div>
                <span className="admChip">Last 24h</span>
              </div>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="admMainGrid">
            {/* RECENT JOBS */}
            <div className="admCard">
              <div className="admSectionHead">
                <h3 className="admSectionTitle">Recent Jobs</h3>
                <div className="admSectionActionWrap">
                  <Link
                    className="admBtn admBtn--cta admBtn--mobileFull"
                    to="/admin/jobs"
                  >
                    See all
                  </Link>
                </div>
              </div>

              {data.recent_jobs?.length ? (
                <ul className="admList">
                  {data.recent_jobs.map((j) => (
                    <li className="admItem" key={j.id}>
                      <div className="admItemMain">
                        <p className="admJobHeading">
                          <Link to={`/jobs/${j.id}`}>{j.title}</Link>
                        </p>
                        <div className="admMut">
                          {j.company} • {j.location} • {j.industry}
                        </div>
                        <div className="admChip" style={{ marginTop: "8px" }}>
                          {j.date_posted}
                        </div>
                      </div>

                      <div className="admItemRightWrap">
                        <Link
                          className="admBtn admBtn--row admBtn--mobileFull"
                          to={`/admin/jobs/${j.id}/edit`}
                        >
                          Edit
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="admStatusText">
                  No jobs yet. Create your first job.
                </div>
              )}
            </div>

            {/* RECENT APPLICATIONS */}
            <div className="admCard">
              <div className="admSectionHead">
                <h3 className="admSectionTitle">Recent Applications</h3>
                <div className="admSectionActionWrap">
                  <Link
                    className="admBtn admBtn--cta admBtn--mobileFull"
                    to="/admin/applications"
                  >
                    Filter / Export
                  </Link>
                </div>
              </div>

              {data.recent_apps?.length ? (
                <table className="admTable">
                  <thead className="admTableHead">
                    <tr>
                      <th>When</th>
                      <th>Candidate</th>
                      <th>Role</th>
                      <th>Resume</th>
                    </tr>
                  </thead>
                  <tbody className="admTableBody">
                    {data.recent_apps.map((a) => (
                      <tr key={a.id}>
                        <td>
                          {(a.applied_at || "")
                            .slice(0, 16)
                            .replace("T", " ")}
                        </td>

                        <td>
                          <div className="admCandidateName">
                            {a.full_name}
                          </div>
                          <div className="admCandidateEmail">
                            {a.email}
                          </div>
                        </td>

                        <td>{a.job_title}</td>

                        <td>
                          <div className="admTableBtnOuter">
                            <button
                              className="admBtn admBtn--row admBtn--mobileFull"
                              type="button"
                              onClick={() => downloadResume(a.resume)}
                              title="Download resume"
                            >
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="admStatusText">No applications yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* GLOBAL FOOTER */}
      <Footer />
    </>
  );
}
