// src/pages/AdminJobForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

// --- SAFE API BASE + URL HELPERS (same pattern used everywhere else) ---
function getApiBase() {
  const fromEnv =
    typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_BASE;

  const raw = fromEnv || "https://midasistechnology.com";

  try {
    return new URL(raw).toString().replace(/\/+$/, ""); // trim trailing slash
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

export default function AdminJobForm() {
  const nav = useNavigate();
  const { id } = useParams(); // undefined for /new
  const isEdit = !!id;

  const [form, setForm] = useState({
    sector: "",
    industry: "",
    title: "",
    company: "",
    location: "",
    employment_type: "Contract",
    salary_min: "",
    salary_max: "",
    salary_unit: "per_hour",
    hours: "",
    date_posted: "",
    client_industry: "",
    work_arrangement: "",
    duration: "",
    schedule: "",
    skills: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Load job data if editing
  useEffect(() => {
    const token = getToken();
    if (!token) {
      nav(`/login?next=/admin/jobs${isEdit ? `/${id}/edit` : "/new"}`);
      return;
    }

    if (!isEdit) {
      setLoading(false);
      return;
    }

    let active = true;
    const jobUrl = buildApiUrl(`/api/admin/jobs/${id}`);

    fetch(jobUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then(async (r) => {
        if (r.status === 401 || r.status === 403) {
          nav(`/login?next=/admin/jobs/${id}/edit`);
          return null;
        }
        const j = await r.json();
        return j;
      })
      .then((j) => {
        if (!active || !j) return;
        if (j.ok) {
          const job = j.job;
          setForm({
            sector: job.sector || "",
            industry: job.industry || "",
            title: job.title || "",
            company: job.company || "",
            location: job.location || "",
            employment_type: job.employment_type || "Contract",
            salary_min: job.salary_min || "",
            salary_max: job.salary_max || "",
            salary_unit: job.salary_unit || "per_hour",
            hours: job.hours || "",
            date_posted: job.date_posted || "",
            client_industry: job.client_industry || "",
            work_arrangement: job.work_arrangement || "",
            duration: job.duration || "",
            schedule: job.schedule || "",
            skills: Array.isArray(job.skills)
              ? job.skills.join(", ")
              : job.skills || "",
            description: job.description || "",
          });
        } else {
          setMsg(j.message || "Failed to load job.");
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
  }, [id, isEdit, nav]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    const token = getToken();
    if (!token) {
      nav(`/login?next=/admin/jobs${isEdit ? `/${id}/edit` : "/new"}`);
      setSaving(false);
      return;
    }

    const payload = { ...form };

    try {
      const saveUrl = buildApiUrl(
        `/api/admin/jobs${isEdit ? `/${id}` : ""}`
      );

      const r = await fetch(saveUrl, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (r.status === 401 || r.status === 403) {
        nav(`/login?next=/admin/jobs${isEdit ? `/${id}/edit` : "/new"}`);
        return;
      }

      const j = await r.json();
      if (j.ok) {
        nav("/admin/jobs");
      } else {
        setMsg(j.message || "Save failed.");
      }
    } catch {
      setMsg("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header />

      <div className="adminJobFormPageRoot">
        <style>{`
          /********************************************************
           SCOPED ADMIN JOB FORM PAGE STYLES
           Everything is prefixed with .adminJobFormPageRoot
          ********************************************************/

          .adminJobFormPageRoot {
            --admHead:#1B1F2E;
            --admSub:#000000;
            --admBody:#121158;
            --admBorder:#e5e7eb;
            --admOrange:#ff8c00;
            --admCardRad:14px;
            --admShadow:0 24px 60px rgba(0,0,0,.08),
                         0 2px 4px rgba(0,0,0,.04);

            width:100%;
            display:flex;
            justify-content:center;
            color:var(--admBody);
            font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          }

          .adminJobFormPageRoot * {
            box-sizing:border-box;
          }

          .adminJobFormPageRoot .admFormWrap {
            max-width:900px;
            width:100%;
            margin:36px auto;
            padding:0 16px 40px;
          }

          /**************** HEADER ****************/
          .adminJobFormPageRoot .admFormHeader {
            margin:0 0 16px;
          }

          .adminJobFormPageRoot .admFormTitle {
            margin:0 0 4px;
            font-size:24px;
            font-weight:700;
            line-height:1.25;
            letter-spacing:-.02em;
            color:var(--admHead);
            font-family:"Poppins", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          }

          .adminJobFormPageRoot .admFormSub {
            margin:0;
            font-size:18px;
            line-height:1.5;
            font-weight:400;
            color:var(--admSub);
            max-width:640px;
            font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          }

          /**************** CARD ****************/
          .adminJobFormPageRoot .admCard {
            background:#fff;
            border:1px solid var(--admBorder);
            border-radius:var(--admCardRad);
            box-shadow:var(--admShadow);
            padding:16px;
          }

          /**************** FORM GRID ****************/
          .adminJobFormPageRoot .admRowGrid {
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:12px;
            margin-bottom:12px;
          }

          @media(max-width:900px){
            .adminJobFormPageRoot .admRowGrid {
              grid-template-columns:1fr;
            }
          }

          .adminJobFormPageRoot .admFieldBlock {
            display:flex;
            flex-direction:column;
          }

          .adminJobFormPageRoot .admLabel {
            font-size:16px;
            line-height:1.3;
            font-weight:600;
            color:var(--admBody);
            margin-bottom:4px;
            font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          }

          /**************** INPUTS ****************/
          .adminJobFormPageRoot .admInput,
          .adminJobFormPageRoot .admSelect,
          .adminJobFormPageRoot .admTextarea {
            width:100%;
            padding:10px 12px;
            font-size:16px;
            line-height:1.4;
            font-weight:500;
            color:var(--admBody);
            background:#fff;
            border:1px solid var(--admBorder);
            border-radius:10px;
            outline:none;
            font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
            box-shadow:0 0 0 rgba(0,0,0,0);
            transition:box-shadow .15s ease, border-color .15s ease;
          }

          .adminJobFormPageRoot .admInput:focus,
          .adminJobFormPageRoot .admSelect:focus,
          .adminJobFormPageRoot .admTextarea:focus {
            border-color:rgba(255,140,0,.6);
            box-shadow:0 0 0 3px rgba(255,140,0,.18);
          }

          .adminJobFormPageRoot .admTextarea {
            resize:vertical;
            min-height:160px;
          }

          /**************** STATUS TEXT ****************/
          .adminJobFormPageRoot .admMsg {
            font-size:14px;
            line-height:1.4;
            font-weight:500;
            color:var(--admBody);
            margin-top:8px;
          }

          /**************** ACTION ROW ****************/
          .adminJobFormPageRoot .admActionsRow {
            margin-top:16px;
            display:flex;
            flex-wrap:wrap;
            gap:12px;
          }

          /**************** BUTTON ****************/
          .adminJobFormPageRoot .admBtn {
            appearance:none;
            font-family:"Roboto", system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
            font-size:16px;
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

            min-width:120px;
            max-width:100%;

            display:inline-block !important;
            width:auto !important;
          }

          .adminJobFormPageRoot .admBtn[disabled] {
            opacity:.5;
            cursor:not-allowed;
          }

          .adminJobFormPageRoot .admBtn:hover:not([disabled]) {
            background:rgba(255,140,0,0.08) !important;
            color:var(--admOrange) !important;
          }

          @media(max-width:600px){
            .adminJobFormPageRoot .admBtn {
              width:100% !important;
              display:block !important;
            }
            .adminJobFormPageRoot .admActionsRow {
              flex-direction:column;
            }
          }
        `}</style>

        <div className="admFormWrap">
          {/* HEADER */}
          <header className="admFormHeader">
            <h1 className="admFormTitle">
              {isEdit ? "Edit Job" : "Create Job"}
            </h1>
            <p className="admFormSub">
              {isEdit
                ? "Update job details and save changes."
                : "Fill out the fields below to publish a new role."}
            </p>
          </header>

          {/* CARD */}
          <div className="admCard">
            {loading ? (
              <div className="admMsg">Loading…</div>
            ) : (
              <form onSubmit={onSubmit}>
                {/* Row 1: Sector / Industry */}
                <div className="admRowGrid">
                  <div className="admFieldBlock">
                    <label className="admLabel">Sector</label>
                    <input
                      className="admInput"
                      name="sector"
                      value={form.sector}
                      onChange={onChange}
                    />
                  </div>

                  <div className="admFieldBlock">
                    <label className="admLabel">Industry</label>
                    <input
                      className="admInput"
                      name="industry"
                      value={form.industry}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Title / Company */}
                <div className="admRowGrid">
                  <div className="admFieldBlock">
                    <label className="admLabel">Title</label>
                    <input
                      className="admInput"
                      name="title"
                      value={form.title}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="admFieldBlock">
                    <label className="admLabel">Company</label>
                    <input
                      className="admInput"
                      name="company"
                      value={form.company}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Location / Employment Type */}
                <div className="admRowGrid">
                  <div className="admFieldBlock">
                    <label className="admLabel">Location</label>
                    <input
                      className="admInput"
                      name="location"
                      value={form.location}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="admFieldBlock">
                    <label className="admLabel">Employment Type</label>
                    <select
                      className="admSelect"
                      name="employment_type"
                      value={form.employment_type}
                      onChange={onChange}
                    >
                      <option value="Contract">Contract</option>
                      <option value="Full-time">Full-time</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Salary Min / Salary Max */}
                <div className="admRowGrid">
                  <div className="admFieldBlock">
                    <label className="admLabel">Salary Min</label>
                    <input
                      className="admInput"
                      name="salary_min"
                      value={form.salary_min}
                      onChange={onChange}
                    />
                  </div>

                  <div className="admFieldBlock">
                    <label className="admLabel">Salary Max</label>
                    <input
                      className="admInput"
                      name="salary_max"
                      value={form.salary_max}
                      onChange={onChange}
                    />
                  </div>
                </div>

                {/* Row 5: Salary Unit / Hours */}
                <div className="admRowGrid">
                  <div className="admFieldBlock">
                    <label className="admLabel">Salary Unit</label>
                    <select
                      className="admSelect"
                      name="salary_unit"
                      value={form.salary_unit}
                      onChange={onChange}
                    >
                      <option value="per_hour">Per Hour</option>
                      <option value="per_month">Per Month</option>
                      <option value="per_annum">Per Annum</option>
                    </select>
                  </div>

                  <div className="admFieldBlock">
                    <label className="admLabel">Hours (if hourly)</label>
                    <input
                      className="admInput"
                      name="hours"
                      value={form.hours}
                      onChange={onChange}
                    />
                  </div>
                </div>

                {/* Row 6: Date Posted / Client Industry */}
                <div className="admRowGrid">
                  <div className="admFieldBlock">
                    <label className="admLabel">Date Posted</label>
                    <input
                      className="admInput"
                      type="date"
                      name="date_posted"
                      value={form.date_posted}
                      onChange={onChange}
                    />
                  </div>

                  <div className="admFieldBlock">
                    <label className="admLabel">Client Industry</label>
                    <input
                      className="admInput"
                      name="client_industry"
                      value={form.client_industry}
                      onChange={onChange}
                    />
                  </div>
                </div>

                {/* Row 7: Work Arrangement / Duration */}
                <div className="admRowGrid">
                  <div className="admFieldBlock">
                    <label className="admLabel">Work Arrangement</label>
                    <input
                      className="admInput"
                      name="work_arrangement"
                      value={form.work_arrangement}
                      onChange={onChange}
                      placeholder="e.g., 3 days office / 2 WFH"
                    />
                  </div>

                  <div className="admFieldBlock">
                    <label className="admLabel">Duration</label>
                    <input
                      className="admInput"
                      name="duration"
                      value={form.duration}
                      onChange={onChange}
                      placeholder="e.g., 12–18 months Contract"
                    />
                  </div>
                </div>

                {/* Row 8: Schedule / Skills */}
                <div className="admRowGrid">
                  <div className="admFieldBlock">
                    <label className="admLabel">Schedule</label>
                    <input
                      className="admInput"
                      name="schedule"
                      value={form.schedule}
                      onChange={onChange}
                      placeholder="e.g., Monday to Friday"
                    />
                  </div>

                  <div className="admFieldBlock">
                    <label className="admLabel">Skills (comma separated)</label>
                    <input
                      className="admInput"
                      name="skills"
                      value={form.skills}
                      onChange={onChange}
                    />
                  </div>
                </div>

                {/* Description */}
                <div
                  className="admFieldBlock"
                  style={{ marginBottom: "12px" }}
                >
                  <label className="admLabel">Description (full text)</label>
                  <textarea
                    className="admTextarea"
                    name="description"
                    rows={10}
                    value={form.description}
                    onChange={onChange}
                    placeholder="Paste the complete job description here..."
                  />
                </div>

                {/* Message */}
                {msg ? <div className="admMsg">{msg}</div> : null}

                {/* Actions */}
                <div className="admActionsRow">
                  <button className="admBtn" type="submit" disabled={saving}>
                    {saving ? "Saving…" : "Save"}
                  </button>

                  <button
                    className="admBtn"
                    type="button"
                    onClick={() => nav("/admin/jobs")}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
