import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  { title: "SOC & Global Threat Management", href: "/services/soc-global-threat" },
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
            <div className="space-y-7 leading-relaxed">

              {/* MAIN HEADING */}
              <h2
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  color: "#1B1F2E",
                  fontWeight: "700",
                }}
              >
                Application Security
              </h2>

              {/* BODY TEXT */}
              <p style={{ fontSize: "18px", fontFamily: "Roboto", color: "#000000" }}>
                Secure software applications are essential in today’s digital-first world.
                Web applications run 24/7 and are used by customers, employees, partners,
                and suppliers—making them one of the most targeted components in an
                organization’s infrastructure.
              </p>

              <p style={{ fontSize: "18px", fontFamily: "Roboto", color: "#000000" }}>
                While many products claim to protect application-layer data, hackers continue
                finding ways to exploit vulnerabilities and compromise sensitive information.
                Strengthening application security requires a secure development lifecycle
                combined with advanced testing methodologies.
              </p>

              <p style={{ fontSize: "18px", fontFamily: "Roboto", color: "#000000" }}>
                Varutra’s application security experts adopt an end-to-end, SDLC-integrated
                approach to ensuring your applications remain resilient against modern threats.
                Our methodologies cover security controls across all stages of the software
                lifecycle and support applications built on APIs, thick clients, thin clients,
                ASP.NET, Java, PHP, Ruby on Rails, and more.
              </p>

              {/* SUBHEADING */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  color: "#1B1F2E",
                  fontWeight: "700",
                }}
              >
                Application Security Services
              </h3>

              <ul className="list-disc list-inside space-y-2"
                style={{ fontSize: "18px", fontFamily: "Roboto", color: "#000000" }}
              >
                <li>Application Security Testing</li>
                <li>Source Code Review</li>
                <li>Application Security Architecture Review</li>
                <li>Secure Software Development Lifecycle Implementation</li>
              </ul>

              {/* SUBHEADING */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  color: "#1B1F2E",
                  fontWeight: "700",
                }}
              >
                Application Security Testing
              </h3>

              <p style={{ fontSize: "18px", fontFamily: "Roboto", color: "#000000" }}>
                Our consultants simulate real-world attacker behavior to identify vulnerabilities
                within your applications. This includes OWASP Top 10 risks, business logic
                weaknesses, and architecture flaws.
              </p>

              <p style={{ fontSize: "18px", fontFamily: "Roboto", color: "#000000" }}>
                Our methodology combines automated scanning with deep manual assessments
                to uncover hidden vulnerabilities. This includes analysis of:
              </p>

              <ul className="list-disc list-inside space-y-2"
                style={{ fontSize: "18px", color: "#000000", fontFamily: "Roboto" }}
              >
                <li>Application architecture and structure</li>
                <li>Authentication, authorization, and session handling flaws</li>
                <li>Business logic and implementation weaknesses</li>
                <li>Emerging vulnerabilities and zero-day patterns</li>
              </ul>

              <p style={{ fontSize: "18px", fontFamily: "Roboto", color: "#000000" }}>
                Upon completion, findings are risk-ranked and compiled into a detailed remediation
                report with guidance for resolving issues.
              </p>

              {/* SUBHEADING */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  color: "#1B1F2E",
                  fontWeight: "700",
                }}
              >
                The Varutra Advantage
              </h3>

              <ul
                className="list-disc list-inside space-y-2"
                style={{ fontSize: "18px", fontFamily: "Roboto", color: "#000000" }}
              >
                <li>Protects confidentiality, integrity, and availability of application data.</li>
                <li>Uses OWASP, WASC, and OSSTMM security frameworks.</li>
                <li>Manual testing by highly experienced specialists.</li>
                <li>False-positive elimination and vulnerability correlation.</li>
                <li>Root cause analysis and actionable remediation steps.</li>
                <li>Post-assessment knowledge-sharing sessions.</li>
              </ul>

              {/* SUBHEADING */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  color: "#1B1F2E",
                  fontWeight: "700",
                }}
              >
                What Is Application Security?
              </h3>

              <p style={{ fontSize: "18px", fontFamily: "Roboto", color: "#000000" }}>
                Application Security refers to the practice of integrating defensive measures
                into the design, development, and testing of applications to prevent
                unauthorized access, data breaches, manipulation, and misuse. It ensures
                long-term resilience against evolving cyber threats.
              </p>

            </div>
          </div>

          {/* ========== RIGHT SIDEBAR ========== */}
          <aside className="flex flex-col items-stretch space-y-8">

            {/* SERVICES LIST CARD */}
            <div className="w-full bg-[#f4f5fb] border border-border shadow-md min-h-[460px] px-6 pt-6 pb-8">

              <h3
                style={{
                  fontSize: "22px",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
                className="mb-6"
              >
                Our World-Class Services
              </h3>

              <div className="flex flex-col gap-4">
                {services.map((service) => {
                  const isActive = activeService === service.href;
                  const textColor = isActive ? "#FFFFFF" : "#121158";

                  return (
                    <Link
                      key={service.href}
                      to={service.href}
                      onClick={() => setActiveService(service.href)}
                      className={`w-full flex items-center justify-between px-6 py-4 shadow-sm font-semibold transition-colors
                        ${
                          isActive
                            ? "bg-[#f58220] text-white"
                            : "bg-white hover:bg-[#f3f4ff]"
                        }
                      `}
                      style={{
                        fontSize: "18px",
                        fontFamily: "Roboto",
                      }}
                    >
                      <span style={{ color: textColor }}>{service.title}</span>
                      <ArrowRight className="w-4 h-4" style={{ color: textColor }} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA CARD */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">
              <img
                src={applicationSecurityHero}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/75" />

              <div className="relative z-10 flex flex-col items-center text-center text-white px-6 py-10 space-y-6">
                <p className="text-xs md:text-sm tracking-[0.25em] font-semibold text-white/80 uppercase">
                  Let&apos;s Work Together
                </p>

                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  eDataForce <br/> Consulting LLC
                </h3>

                <Link to="/contact" className="w-full max-w-[220px]">
                  <Button
                    variant="outline"
                    className="w-full gap-2 py-3 border-white text-white hover:bg_white/15"
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
