import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";

/* ===== extra pages from jobs/auth/admin app ===== */
import Login from "./pages/Login";
import Register from "./pages/Register";

import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";

import Dashboard from "./pages/Dashboard";

import Admin from "./pages/Admin";
import AdminJobs from "./pages/AdminJobs";
import AdminJobForm from "./pages/AdminJobForm";
import AdminApplications from "./pages/AdminApplications";

const queryClient = new QueryClient();

/* ---------------- JWT helpers (JS only, no TS types) ---------------- */
const getToken = () => (typeof window !== "undefined"
  ? localStorage.getItem("token") || ""
  : ""
);

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function isAuthed() {
  const t = getToken();
  if (!t) return false;
  const p = parseJwt(t);
  if (!p) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  return typeof p.exp === "number" ? p.exp > nowSec : true;
}

function getRole() {
  const t = getToken();
  const p = t ? parseJwt(t) : null;
  return p && p.role ? p.role : null;
}

/* ---------------- Route guards (JS) ---------------- */

function RequireAuth({ children }) {
  const authed = isAuthed();
  const loc = useLocation();

  if (!authed) {
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(loc.pathname + loc.search)}`}
        replace
      />
    );
  }
  return children;
}

function RequireAdmin({ children }) {
  const authed = isAuthed();
  const role = getRole();
  const loc = useLocation();

  if (!authed) {
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(loc.pathname + loc.search)}`}
        replace
      />
    );
  }

  if (role !== "admin") {
    // Non-admins get kicked to user dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

/* -------------------- App -------------------- */

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ===== EXISTING PUBLIC ROUTES (UNCHANGED) ===== */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetail />} />

          {/* ===== AUTH ROUTES ===== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ===== PUBLIC JOB ROUTES ===== */}
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />

          {/* ===== USER AREA (JWT REQUIRED) ===== */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          {/* ===== ADMIN AREA (JWT + role=admin) ===== */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <Admin />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <RequireAdmin>
                <AdminJobs />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/jobs/new"
            element={
              <RequireAdmin>
                <AdminJobForm />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/jobs/:id/edit"
            element={
              <RequireAdmin>
                <AdminJobForm />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <RequireAdmin>
                <AdminApplications />
              </RequireAdmin>
            }
          />

          {/* KEEP THIS LAST */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
