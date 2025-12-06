import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// Update this to your actual image
import applicationSecurityHero from "@/assets/applicationSecurity.jpg";

const services = [
  { title: "A.I Services & Products", href: "/services/ai-services" },
  { title: "Project Services", href: "/services/project-services" },
  { title: "Staff Augmentation", href: "/services/staff-augmentation" },
  { title: "Permanent Placement Service", href: "/services/permanent-placement" },
  { title: "Software Testing", href: "/services/software-testing" },
  { title: "Professional Consulting", href: "/services/professional-consulting" },
  {
    title: "Application Maintenance & Management",
    href: "/services/application-maintenance",
  },
  { title: "DevOps And Automation Services", href: "/services/devops-automation" },
  { title: "Cloud Security", href: "/services/cloud-security" },
  { title: "Mobile Application Security", href: "/services/mobile-security" },
  { title: "Application Security", href: "/services/application-security" },
  { title: "Network Infrastructure Security", href: "/services/network-security" },
  { title: "Audit & Compliance", href: "/services/audit-compliance" },
  { title: "SOC & Global Threat Management", href: "/services/soc-global-threat" }, // current page
];

const ApplicationSecurityContent = () => {
  const [activeService, setActiveService] = useState("/services/application-security");

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">

          {/* ========== LEFT COLUMN ========== */}
          <div className="space-y-8">

            {/* HERO IMAGE */}
            <div className="w-full h-[360px] md:h-[480px] lg:h-[540px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={applicationSecurityHero}
                alt="Application Security"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
            </div>

            {/* TEXT CONTENT */}
            <div className="space-y-7 text-base md:text-lg leading-relaxed text-slate-800">

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Application Security
              </h2>

              <p>
                Secure software applications are essential in today’s digital-first world.
                Web applications run 24/7 and are used by customers, employees, partners, 
                and suppliers—making them one of the most targeted components in an 
                organization’s infrastructure.
              </p>

              <p>
                While many products claim to protect application-layer data, hackers continue 
                finding ways to exploit vulnerabilities and compromise sensitive information. 
                Strengthening application security requires a secure development lifecycle 
                combined with advanced testing methodologies.
              </p>

              <p>
                Varutra’s application security experts adopt an end-to-end, SDLC-integrated 
                approach to ensuring your applications remain resilient against modern threats.
                Our methodologies cover security controls across all stages of the software 
                lifecycle and support applications built on APIs, thick clients, thin clients, 
                ASP.NET, Java, PHP, Ruby on Rails, and more.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                Application Security Services
              </h3>

              <ul className="list-disc list-inside space-y-2">
                <li>Application Security Testing</li>
                <li>Source Code Review</li>
                <li>Application Security Architecture Review</li>
                <li>Secure Software Development Lifecycle Implementation</li>
              </ul>

              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                Application Security Testing
              </h3>

              <p>
                Our consultants simulate real-world attacker behavior to identify 
                vulnerabilities within your applications. This includes OWASP Top 10 risks, 
                business logic weaknesses, and architecture flaws.
              </p>

              <p>
                Our methodology combines automated scanning with deep manual assessments 
                to uncover hidden vulnerabilities. This includes analysis of:
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>Application architecture and structure</li>
                <li>Risk-prone areas such as authentication, authorization, and session handling</li>
                <li>Business logic and implementation flaws</li>
                <li>Emerging vulnerability classes and zero-day patterns</li>
              </ul>

              <p>
                Upon completion, findings are risk-ranked and compiled into a detailed 
                remediation report, including actionable recommendations and guidance for 
                resolving issues.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                The Varutra Advantage
              </h3>

              <ul className="list-disc list-inside space-y-2">
                <li>
                  Protection of the confidentiality, integrity, and availability of your application data.
                </li>
                <li>
                  Follows industry-leading frameworks including OWASP, WASC, and OSSTMM.
                </li>
                <li>
                  Manual testing by specialists using hacker mindset techniques.
                </li>
                <li>
                  High accuracy with vulnerability correlation and false-positive elimination.
                </li>
                <li>
                  Detailed root-cause analysis and remediation guidance.
                </li>
                <li>
                  Post-assessment walkthrough sessions with your team.
                </li>
              </ul>

              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                What Is Application Security?
              </h3>

              <p>
                Application Security refers to integrating security measures into the 
                design, development, and testing of applications to prevent unauthorized 
                access, data breaches, manipulation, and misuse. It ensures that software 
                remains resilient against threats throughout its lifecycle.
              </p>

            </div>
          </div>

          {/* ========== RIGHT COLUMN – SERVICES + CTA ========== */}
          <aside className="flex flex-col items-stretch space-y-8">

            {/* SERVICES LIST CARD */}
            <div className="w-full bg-[#f4f5fb] border border-border shadow-md min-h-[460px] px-6 pt-6 pb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Our World-Class Services
              </h3>

              <div className="flex flex-col gap-4">
                {services.map((service) => {
                  const isActive = activeService === service.href;

                  return (
                    <Link
                      key={service.href}
                      to={service.href}
                      onClick={() => setActiveService(service.href)}
                      className={`w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold transition-colors shadow-sm
                        ${
                          isActive
                            ? "bg-[#f58220] text-white"
                            : "bg-white text-[#111827] hover:bg-[#f3f4ff]"
                        }
                      `}
                    >
                      {service.title}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">
              <img
                src={applicationSecurityHero}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
              <div className="absolute inset-0 bg-black/75" />

              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-10 space-y-6">
                <p className="text-xs md:text-sm tracking-[0.25em] font-semibold text-white/80 uppercase">
                  Let&apos;s Work Together
                </p>

                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  eDataForce <br /> Consulting LLC
                </h3>

                <Link to="/contact" className="w-full max-w-[220px]">
                  <Button
                    variant="outline"
                    className="w-full gap-2 py-3 border-white text-white hover:bg-white/15"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="flex items-center gap-2 text-xs md:text-sm text-white/90">
                  <Phone className="w-4 h-4" />
                  <span>+1 (972) 989-3398</span>
                </div>
              </div>
            </div>

          </aside>

        </div>
      </section>
    </div>
  );
};

export default ApplicationSecurityContent;
