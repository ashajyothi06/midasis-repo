import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// Update image path
import networkSecurityHero from "@/assets/networkSecurity.jpg";

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

const NetworkSecurityContent = () => {
  const [activeService, setActiveService] = useState("/services/network-security");

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">

          {/* LEFT SECTION */}
          <div className="space-y-8">

            {/* HERO IMAGE */}
            <div className="w-full h-[360px] md:h-[480px] lg:h-[540px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={networkSecurityHero}
                alt="Network Infrastructure Security"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
            </div>

            {/* TEXT CONTENT */}
            <div className="space-y-7 leading-relaxed">

              <h2
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Network Infrastructure Security
              </h2>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Our technical expertise goes far beyond traditional vulnerability scanning. 
                We conduct rigorous, real-world assessments to uncover actionable external 
                and internal threats impacting your network infrastructure.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                As technology rapidly evolves, so do threats. Our certified penetration 
                testers deliver deep, comprehensive testing that exceeds standard 
                vulnerability assessment methodologies.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Our process exposes hidden attack vectors, validates exploitability, 
                and documents vulnerabilities with detailed Proof of Concept (PoC) evidence.
              </p>

              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Network Infrastructure Security Services
              </h3>

              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                <li>Network Vulnerability Assessment</li>
                <li>Network Penetration Testing</li>
                <li>Configuration Audit</li>
                <li>Network Architecture Security Review</li>
                <li>Wireless Penetration Testing</li>
              </ul>

              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Network Vulnerability Assessment
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Rapid digital transformation and evolving threat landscapes have introduced 
                significant security challenges. Varutra’s vulnerability assessment services 
                help organizations detect, classify, and prioritize vulnerabilities, while 
                offering ongoing support for timely remediation.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                We perform both internal and external assessments using industry-leading open 
                source and commercial tools, complemented by strong manual validation.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Vulnerabilities are analyzed based on business impact and delivered along with 
                clear, actionable mitigation steps.
              </p>

              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                The Varutra Advantage
              </h3>

              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                <li>
                  Ensures business continuity by identifying network-level risks that impact 
                  availability and operations.
                </li>
                <li>
                  Deep manual validation eliminates false positives and uncovers hidden threats.
                </li>
                <li>
                  Helps organizations prevent network intrusions through timely penetration testing.
                </li>
                <li>
                  Supports compliance requirements such as PCI, HIPAA, ISO 27001, and FISMA.
                </li>
                <li>
                  Configuration audits ensure hardening and secure configuration of all network devices.
                </li>
                <li>
                  Detailed technical reports with recommendations and support during remediation.
                </li>
              </ul>

              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                What Is Network Security?
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Network security is a combination of technologies, processes, and practices 
                designed to safeguard an organization’s network infrastructure. It ensures 
                the reliability, confidentiality, and integrity of systems by preventing 
                unauthorized access, attacks, and misuse.
              </p>
            </div>
          </div>

          {/* SERVICES SIDEBAR + CTA */}
          <aside className="flex flex-col items-stretch space-y-8">

            {/* SERVICES LIST */}
            <div className="w-full bg-[#f4f5fb] border border-border shadow-md min-h-[460px] px-6 pt-6 pb-8">
              <h3
                className="mb-6"
                style={{
                  fontSize: "22px",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Our World-Class Services
              </h3>

              <div className="flex flex-col gap-4">
                {services.map((service) => {
                  const isActive = activeService === service.href;
                  const baseClasses =
                    "w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold transition-colors shadow-sm";
                  const activeClasses = "bg-[#f58220] text-white";
                  const inactiveClasses = "bg-white hover:bg-[#f3f4ff]";
                  const textColor = isActive ? "#FFFFFF" : "#121158";

                  return (
                    <Link
                      key={service.href}
                      to={service.href}
                      onClick={() => setActiveService(service.href)}
                      className={`${baseClasses} ${
                        isActive ? activeClasses : inactiveClasses
                      }`}
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

            {/* CTA */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">
              <img
                src={networkSecurityHero}
                alt="Contact Midasis"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
              <div className="absolute inset-0 bg-black/75" />

              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-10 space-y-6">
                <p className="text-xs md:text-sm tracking-[0.25em] font-semibold text-white/80 uppercase">
                  Let&apos;s Work Together
                </p>

                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  Midasis <br /> Consulting LLC
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

export default NetworkSecurityContent;
