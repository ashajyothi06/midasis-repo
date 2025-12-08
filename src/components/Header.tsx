import React, { useCallback, useEffect, useState } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link, NavLink } from "react-router-dom";

/* ---------------- NAV ITEMS (public) ---------------- */

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services", hasDropdown: true },
  { label: "CONTACT", href: "/contact" },
  { label: "JOBS", href: "/jobs" },
];

/* ---------------- SERVICES DROPDOWN ITEMS ---------------- */

const serviceDropdownItems = [
  { label: "AI Services & Products", href: "/services/ai-services" },
  { label: "Project Services", href: "/services/project-services" },
  { label: "Staff Augmentation", href: "/services/staff-augmentation" },
  {
    label: "Permanent Placement Service",
    href: "/services/permanent-placement",
  },
  { label: "Software Testing", href: "/services/software-testing" },
  {
    label: "Professional Consulting",
    href: "/services/professional-consulting",
  },
  {
    label: "Application Maintenance & Management",
    href: "/services/application-maintenance",
  },
  { label: "DevOps And Automation Services", href: "/services/devops-automation" },

  // Cyber Security Services
  { label: "Cloud Security", href: "/services/cloud-security" },
  { label: "Mobile Security", href: "/services/mobile-security" },
  { label: "Application Security", href: "/services/application-security" },
  { label: "Network Security", href: "/services/network-security" },
  { label: "Audit & Compliance", href: "/services/audit-and-compliance" },
  {
    label: "SOC & Global Threat Management",
    href: "/services/soc-global-threat-management",
  },
];

/* ---------------- SAFE API BASE (no process!) ---------------- */

function getApiBase(): string {
  let raw: string | undefined;

  // Prefer Vite env if available
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    raw = (import.meta as any)?.env?.VITE_API_BASE as string | undefined;
  } catch {
    raw = undefined;
  }

  // Optional: allow window-global override if you ever need it
  if (!raw && typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    raw =
      (window as any).__API_BASE__ ||
      (window as any).VITE_API_BASE ||
      undefined;
  }

  if (!raw) {
    raw = "https://midasistechnology.com";
  }

  try {
    return new URL(raw).toString().replace(/\/+$/, "");
  } catch {
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin.replace(/\/+$/, "");
    }
    return "https://midasistechnology.com";
  }
}

function buildApiUrl(path: string): string {
  const base = getApiBase();
  return base + path;
}

const brandNavy = "#003c70";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const [me, setMe] = useState<any>({ loading: true, authenticated: false });

  const location = useLocation();

  const isAuthed = !!me?.authenticated;
  const role = me?.user?.role || null;
  const emailOrName =
    me?.user?.email ||
    me?.user?.name ||
    (me?.user?.email ? me.user.email.split("@")[0] : "");

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href === "/services")
      return location.pathname.startsWith("/services");
    return (
      location.pathname === href || location.pathname.startsWith(href)
    );
  };

  /* ---------------- AUTH LOGIC ---------------- */

  const handleLogout = async () => {
    try {
      const logoutUrl = buildApiUrl("/api/auth/logout");
      await fetch(logoutUrl, { method: "POST" });
    } finally {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("auth:changed"));
      window.location.assign("/");
    }
  };

  const loadMe = useCallback(() => {
    const ac = new AbortController();
    const token = localStorage.getItem("token");

    if (!token) {
      setMe({ loading: false, ok: true, authenticated: false });
      return () => ac.abort();
    }

    setMe((m: any) => ({ ...m, loading: true }));

    fetch(buildApiUrl("/api/auth/me"), {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: ac.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (
          data &&
          data.authenticated === false &&
          (data.reason === "expired" || data.reason === "invalid")
        ) {
          localStorage.removeItem("token");
          setMe({ loading: false, ok: true, authenticated: false });
          return;
        }
        setMe({ loading: false, ...data });
      })
      .catch(() => {
        setMe({ loading: false, ok: true, authenticated: false });
      });

    return () => ac.abort();
  }, []);

  // initial auth load
  useEffect(() => {
    return loadMe();
  }, [loadMe]);

  // reload auth on route change
  useEffect(() => {
    return loadMe();
  }, [location.pathname, loadMe]);

  // refresh auth when tab focused or custom "auth:changed" fired
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") loadMe();
    };
    const onAuthChanged = () => loadMe();

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("auth:changed", onAuthChanged);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("auth:changed", onAuthChanged);
    };
  }, [loadMe]);

  // watch localStorage changes for "token"
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") {
        loadMe();
        window.dispatchEvent(new Event("auth:changed"));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [loadMe]);

  // close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-card w-full py-4 px-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center">
          <span className="text-3xl font-bold">
            <span className="text-navy">Midasis</span>
            <span className="text-accent">Technologies</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* PUBLIC NAV ONLY IF NOT ADMIN */}
          {!me.loading && (!isAuthed || role !== "admin") && (
            <>
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-1 font-semibold text-sm tracking-wide transition-colors hover:text-accent",
                          isActive(item.href)
                            ? "text-accent"
                            : "text-navy"
                        )}
                        onMouseEnter={() => setServicesDropdownOpen(true)}
                        onMouseLeave={() => setServicesDropdownOpen(false)}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform",
                            servicesDropdownOpen && "rotate-180"
                          )}
                        />
                      </Link>

                      {servicesDropdownOpen && (
                        <div
                          className="absolute top-full left-0 mt-2 w-80 bg-card rounded-lg shadow-xl border border-border py-2 z-50"
                          onMouseEnter={() => setServicesDropdownOpen(true)}
                          onMouseLeave={() => setServicesDropdownOpen(false)}
                        >
                          {serviceDropdownItems.map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              className="block px-4 py-3 text-sm text-foreground hover:bg-secondary hover:text-accent transition-colors border-b border-border/40 last:border-none"
                            >
                              {service.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "font-semibold text-sm tracking-wide hover:text-accent transition-colors",
                        isActive(item.href)
                          ? "text-accent"
                          : "text-navy"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Search icon */}
          <Search className="w-5 h-5 text-navy hover:text-accent cursor-pointer" />

          {/* RIGHT SIDE: AUTH + DASHBOARD/ADMIN LINKS */}
          <div className="flex items-center gap-3 ml-4">
            {/* Dashboard for non-admin authenticated users */}
            {!me.loading && isAuthed && role !== "admin" && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  cn(
                    "font-semibold text-sm tracking-wide hover:text-accent transition-colors",
                    isActive ? "text-accent" : "text-navy"
                  )
                }
              >
                Dashboard
              </NavLink>
            )}

            {/* Admin quick links */}
            {!me.loading && isAuthed && role === "admin" && (
              <>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    cn(
                      "font-semibold text-sm tracking-wide hover:text-accent transition-colors",
                      isActive ? "text-accent" : "text-navy"
                    )
                  }
                >
                  Admin
                </NavLink>
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/admin/jobs"
                    className="rounded-full px-3 py-1 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500"
                  >
                    Manage Jobs
                  </NavLink>
                  <NavLink
                    to="/admin/jobs/new"
                    className="rounded-full px-3 py-1 text-xs font-semibold bg-green-600 text-white hover:bg-green-500"
                  >
                    Create Job
                  </NavLink>
                  <NavLink
                    to="/admin/applications"
                    className="rounded-full px-3 py-1 text-xs font-semibold bg-amber-600 text-white hover:bg-amber-500"
                  >
                    Applications
                  </NavLink>
                </div>
              </>
            )}

            {/* Auth buttons */}
            {!me.loading && isAuthed ? (
              <>
                <span
                  className="border-2 rounded-md px-3 py-1 text-xs font-semibold"
                  style={{
                    borderColor: brandNavy,
                    color: brandNavy,
                    maxWidth: 160,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={emailOrName || "User"}
                >
                  {emailOrName || "User"}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="border-2 rounded-md px-3 py-1 text-xs font-semibold hover:bg-navy/5"
                  style={{ borderColor: brandNavy, color: brandNavy }}
                >
                  Logout
                </button>
              </>
            ) : (
              !me.loading && (
                <>
                  <NavLink
                    to="/login"
                    className="border-2 rounded-md px-3 py-1 text-xs font-semibold hover:bg-navy/5"
                    style={{ borderColor: brandNavy, color: brandNavy }}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="border-2 rounded-md px-3 py-1 text-xs font-semibold hover:bg-navy/5"
                    style={{ borderColor: brandNavy, color: brandNavy }}
                  >
                    Register
                  </NavLink>
                </>
              )
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-navy border border-border rounded-md p-2 flex items-center justify-center"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer overlay + menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-opacity duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto bg-black/30"
            : "opacity-0 pointer-events-none bg-transparent"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <nav
          className={cn(
            "absolute left-0 top-0 h-full w-72 bg-card shadow-xl border-r border-border p-5 transform transition-transform duration-300",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-bold">
              <span className="text-navy">edata</span>
              <span className="text-accent">force</span>
            </span>
            <button
              className="p-1 text-navy hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile nav links */}
          <div className="space-y-1">
            {/* Public links only if NOT admin */}
            {!me.loading && (!isAuthed || role !== "admin") &&
              navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "block text-sm font-semibold py-3 border-b border-border/40 hover:text-accent transition-colors",
                    isActive(item.href) ? "text-accent" : "text-navy"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

            {/* Dashboard link (non-admin) */}
            {!me.loading && isAuthed && role !== "admin" && (
              <Link
                to="/dashboard"
                className={cn(
                  "block text-sm font-semibold py-3 border-b border-border/40 hover:text-accent transition-colors",
                  isActive("/dashboard")
                    ? "text-accent"
                    : "text-navy"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {/* Admin links (admin only) */}
            {!me.loading && isAuthed && role === "admin" && (
              <>
                <Link
                  to="/admin"
                  className={cn(
                    "block text-sm font-semibold py-3 border-b border-border/40 hover:text-accent transition-colors",
                    isActive("/admin") ? "text-accent" : "text-navy"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
                <Link
                  to="/admin/jobs"
                  className={cn(
                    "block text-sm font-semibold py-3 border-b border-border/40 hover:text-accent transition-colors",
                    isActive("/admin/jobs")
                      ? "text-accent"
                      : "text-navy"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Manage Jobs
                </Link>
                <Link
                  to="/admin/jobs/new"
                  className={cn(
                    "block text-sm font-semibold py-3 border-b border-border/40 hover:text-accent transition-colors",
                    isActive("/admin/jobs/new")
                      ? "text-accent"
                      : "text-navy"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Job
                </Link>
                <Link
                  to="/admin/applications"
                  className={cn(
                    "block text-sm font-semibold py-3 border-b border-border/40 hover:text-accent transition-colors",
                    isActive("/admin/applications")
                      ? "text-accent"
                      : "text-navy"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View Applications
                </Link>
              </>
            )}
          </div>

          {/* Mobile auth block */}
          <div className="mt-6 space-y-3">
            {!me.loading && isAuthed ? (
              <>
                <div
                  className="w-full border-2 rounded-md px-3 py-2 text-sm font-semibold text-center"
                  style={{ borderColor: brandNavy, color: brandNavy }}
                >
                  {emailOrName || "User"}
                </div>
                <button
                  type="button"
                  className="w-full border-2 rounded-md px-3 py-2 text-sm font-semibold"
                  style={{ borderColor: brandNavy, color: brandNavy }}
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              !me.loading && (
                <>
                  <Link
                    to="/login"
                    className="w-full inline-flex justify-center border-2 rounded-md px-3 py-2 text-sm font-semibold"
                    style={{ borderColor: brandNavy, color: brandNavy }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full inline-flex justify-center border-2 rounded-md px-3 py-2 text-sm font-semibold"
                    style={{ borderColor: brandNavy, color: brandNavy }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
