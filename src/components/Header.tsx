import { useState } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services", hasDropdown: true },
  { label: "CONTACT", href: "/contact" },
];

// =============================
// UPDATED — Added 6 new services
// =============================
const serviceDropdownItems = [
  { label: "AI Services & Products", href: "/services/ai-services" },
  { label: "Project Services", href: "/services/project-services" },
  { label: "Staff Augmentation", href: "/services/staff-augmentation" },
  { label: "Permanent Placement Service", href: "/services/permanent-placement" },
  { label: "Software Testing", href: "/services/software-testing" },
  { label: "Professional Consulting", href: "/services/professional-consulting" },
  { label: "Application Maintenance & Management", href: "/services/application-maintenance" },
  { label: "DevOps And Automation Services", href: "/services/devops-automation" },

  // ----------------------------
  // 🚀 Added new Cyber Security Services
  // ----------------------------
  { label: "Cloud Security", href: "/services/cloud-security" },
  { label: "Mobile Security", href: "/services/mobile-security" },
  { label: "Application Security", href: "/services/application-security" },
  { label: "Network Security", href: "/services/network-security" },
  { label: "Audit & Compliance", href: "/services/audit-and-compliance" },
  { label: "SOC & Global Threat Management", href: "/services/soc-global-threat-management" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href === "/services") return location.pathname.startsWith("/services");
    return location.pathname === href || location.pathname.startsWith(href);
  };

  return (
    <header className="bg-card w-full py-4 px-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Brand */}
        <Link to="/" className="flex items-center">
          <span className="text-3xl font-bold">
            <span className="text-navy">edata</span>
            <span className="text-accent">force</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.hasDropdown ? (
                <>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1 font-semibold text-sm tracking-wide transition-colors hover:text-accent",
                      isActive(item.href) ? "text-accent" : "text-navy"
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

                  {/* Desktop dropdown */}
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
                    isActive(item.href) ? "text-accent" : "text-navy"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <Search className="w-5 h-5 text-navy hover:text-accent cursor-pointer" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-navy border border-border rounded-md p-2 flex items-center justify-center"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto bg-black/30" : "opacity-0 pointer-events-none bg-transparent"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        {/* Drawer */}
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
            {navItems.map((item) => (
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
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
