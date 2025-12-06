import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import mobileHero from "@/assets/mobileSecurity.png"; // ⬅️ update this path if needed

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

const MobileSecurityContent = () => {
  const [activeService, setActiveService] = useState("/services/mobile-security");

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">
          {/* ============== LEFT: IMAGE + CONTENT ============== */}
          <div className="space-y-8">
            {/* HERO IMAGE */}
            <div className="w-full h-[360px] md:h-[480px] lg:h-[540px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={mobileHero}
                alt="Mobile Application Security"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
            </div>

            {/* TEXT CONTENT */}
            <div className="space-y-7 leading-relaxed">
              <h2
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Mobile Application Security
              </h2>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                The rapid rise of smartphones and tablets in the enterprise has created a
                powerful but complex mobile ecosystem. Along with flexibility and
                productivity, mobile technologies introduce unique privacy, security, and
                compliance risks that must be managed systematically—from application
                development to deployment and ongoing use.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Varutra leverages deep technical, operational, and consulting expertise to
                assess the security posture of mobile applications and the devices they run
                on. Our goal is to protect the sensitive information that mobile
                applications store, process, and transmit.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                We combine multiple service offerings—Penetration Testing, Secure Code
                Review, Application Architecture Review, and Vulnerability Patching—to
                defend mobile apps against modern cyberattacks.
              </p>

              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Your Extended Mobile Security Team
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Our Mobile Application Security Services operate as an extension of your
                in-house security team. We act as your strategic partner, ensuring your
                mobile applications remain resilient, compliant, and secure throughout
                their lifecycle.
              </p>

              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Mobile Application Penetration Testing
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Our mobile application penetration testing and security assessments are
                designed to identify vulnerabilities that can be exploited on mobile
                devices. We examine both the application and its associated web services
                and APIs to provide an end-to-end view of risk.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                We perform both{" "}
                <span className="font-semibold">Black Box</span> and{" "}
                <span className="font-semibold">Gray Box</span> assessments, where our
                testers simulate both authenticated and unauthenticated users. This
                threat-driven approach helps uncover contextual vulnerabilities specific to
                your application, architecture, and business logic.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Our methodology is aligned with{" "}
                <span className="font-semibold">
                  OWASP Mobile Application Security Verification Standard (MASVS)
                </span>{" "}
                and{" "}
                <span className="font-semibold">OWASP Mobile Top 10</span> security
                guidelines, ensuring globally recognized best practices.
              </p>

              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Multi-Platform Coverage
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                We provide Mobile Application Security Services across major platforms and
                technologies, including:
              </p>

              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>Android and iOS</li>
                <li>Native applications</li>
                <li>Hybrid applications</li>
                <li>Mobile Web applications</li>
                <li>Mobile Device Management (MDM) apps</li>
              </ul>

              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                The Varutra Advantage
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Our approach combines proven assessment techniques, in-house tools
                (including patent-filed frameworks such as MASTS), and mobile-focused
                procedures to deliver deep, actionable insights.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                We assess critical areas such as:
              </p>

              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>
                  Application permissions and over-privileged access to device
                  functionality
                </li>
                <li>
                  Residual data in local storage and caches (passwords, usernames, device
                  IDs, and other sensitive data)
                </li>
                <li>Native code execution and potential abuse paths</li>
                <li>Resilience to stolen or lost device scenarios</li>
                <li>Behavior and data remnants after application uninstall</li>
                <li>Session hijacking risks and insecure session handling</li>
                <li>
                  Insufficient authorization between mobile clients, backend systems, and
                  databases
                </li>
                <li>
                  Readiness against the latest mobile risks and evolving threat landscape
                </li>
                <li>
                  Support in implementing and hardening BYOD (Bring Your Own Device)
                  policies
                </li>
                <li>
                  Overall improvement in assurance and confidence in your mobile security
                  posture
                </li>
              </ul>

              <p
                className="italic"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Varutra’s mobile application security research and tooling (including
                MASTS) have been recognized in industry references such as the Gartner
                Market Guide for Mobile Application Security Testing.
              </p>

              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                What Is Mobile Security?
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Mobile Security refers to protecting smartphones, tablets, and other
                mobile devices—and the applications and data they handle—against
                cybersecurity threats. As organizations increasingly rely on mobile
                devices for business operations, mobile security has become a critical
                pillar of enterprise security strategy.
              </p>

              <p
                className="font-semibold"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Get deep analysis to uncover your mobile application security gaps—before
                the threat actors do.
              </p>
            </div>
          </div>

          {/* ============== RIGHT: SERVICES LIST + CTA ============== */}
          <aside className="flex flex-col items-stretch space-y-8">
            {/* SERVICES LIST */}
            <div className="w-full bg-[#f4f5fb] shadow-md border border-border min-h-[460px] px-6 pt-6 pb-8">
              <h3
                className="mb-6"
                style={{
                  fontSize: "22px",
                  fontFamily: "Poppins, sans-serif",
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
                    "w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold shadow-sm transition-colors";
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
                        fontFamily: "Roboto, sans-serif",
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
                src={mobileHero}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
              <div className="absolute inset-0 bg-black/75" />

              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-10 space-y-6">
                <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white/80">
                  Let&apos;s Work Together
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  eDataForce
                  <br />
                  Consulting LLC
                </h3>

                <Link to="/contact" className="w-full max-w-[220px]">
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 py-3 text-sm md:text-base font-semibold
                               border-white text-white bg-transparent
                               hover:bg-white/15 hover:text-white hover:border-white"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-white/90">
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

export default MobileSecurityContent;
