import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import socHero from "@/assets/SOC-global.png"; // <-- update path/name if needed

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

const SocGlobalThreatContent = () => {
  const [activeService, setActiveService] = useState("/services/soc-global-threat");

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">
          {/* ================= LEFT: IMAGE + CONTENT ================= */}
          <div className="space-y-8">
            {/* HERO IMAGE – sharp edges, hover movement */}
            <div className="w-full h-[360px] md:h-[480px] lg:h-[540px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={socHero}
                alt="SOC and Global Threat Management"
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
                SOC &amp; Global Threat Management Services
              </h2>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Cyber security is complex and constantly evolving. At eDataForce, we enable
                organizations to stay ahead of attackers through a comprehensive{" "}
                <strong>SOC-as-a-Service</strong> model under our SOC &amp; Global Threat
                Management offerings. Our real-time monitoring protects critical devices and
                the data they transmit or store, while continuously improving your security
                posture.
              </p>

              {/* SOC as a Service */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                SOC as a Service
              </h3>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Our SOC-as-a-Service delivers 24x7x365 security monitoring with flexible,
                highly customizable packages and both onsite and offsite models. We focus on
                early detection, rapid response, and minimizing business impact.
              </p>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Key Benefits
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>24x7x365 real-time security alert monitoring</li>
                <li>Highly customizable engagement and pricing models</li>
                <li>Onsite as well as offsite SOC options</li>
                <li>Improved overall security posture</li>
                <li>Cost-effective managed security operations</li>
              </ul>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                SOC-as-a-Service Features
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>24x7x365 monitoring across the corporate network</li>
                <li>Intelligent security threat monitoring and analysis</li>
                <li>Managed IDS/IPS and firewall administration</li>
                <li>Periodic SIEM fine-tuning and optimization</li>
                <li>Real-time ticketing via VMSD and customer ticketing portals</li>
                <li>Managed antivirus and DLP monitoring and administration</li>
                <li>Dedicated Technical Account Manager (TAM)</li>
                <li>Access to cyber threat advisories and security updates</li>
                <li>Support for regulatory and compliance requirements</li>
              </ul>

              {/* Threat Intelligence & Dark Web Scanning */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Threat Intelligence &amp; Dark Web Scanning
              </h3>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Traditional perimeter security is no longer enough in the age of zero-day
                exploits and sophisticated ransomware. Our Threat Intelligence service
                continuously monitors both internal environments and the external threat
                landscape to detect and mitigate targeted attacks before they cause damage.
              </p>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Benefits
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>Monitor, detect and respond to insider and external threats</li>
                <li>Clear visibility into risks targeting sensitive data</li>
                <li>Leverage both open-source and commercial threat intelligence feeds</li>
                <li>
                  Continuous monitoring of the threat landscape beyond your perimeter
                </li>
              </ul>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Threat Intelligence &amp; Analytics Features
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>Darknet and deep web cyber threat surveillance</li>
                <li>Malware and IOC-based threat hunting</li>
                <li>Threat correlation against SIEM use cases</li>
                <li>Strategic threat hunting to prevent cyber espionage</li>
                <li>Proactive detection and incident reporting</li>
                <li>Cyber attack and e-crime intelligence</li>
                <li>Insider threat surveillance on deep web sources</li>
                <li>Use of commercial and OSINT data lakes</li>
                <li>Digital brand protection and brand monitoring</li>
              </ul>

              {/* Digital Forensics & Incident Response */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Digital Forensics &amp; Security Incident Response
              </h3>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Even with strong preventive controls, incidents can and do occur. Our
                Digital Forensics and Incident Response services help customers quickly
                contain, investigate, and recover from cyber attacks while limiting
                long-term impact.
              </p>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Benefits
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>
                  Supports organizational crisis management and cyber response programs
                </li>
                <li>
                  Business-focused incident response aligned with security strategy
                </li>
                <li>
                  Short- and long-term support throughout the incident lifecycle
                </li>
              </ul>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Key Features
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>Endpoint forensics and protection services</li>
                <li>Web defacement and breach analysis</li>
                <li>Data breach and leakage investigation</li>
                <li>Incident prioritization and remediation assistance</li>
                <li>Surface web and darknet scanning for data leaks</li>
                <li>
                  Support for setting up CSIRT (Computer Security Incident Response Team)
                </li>
                <li>Round-the-clock incident response center</li>
                <li>On-demand incident investigation</li>
                <li>Cybercrime and cyber awareness training</li>
              </ul>

              {/* Security Advisory Services */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Security Advisory Services
              </h3>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Our Security Advisory Services help enterprises stay ahead of newly disclosed
                vulnerabilities and threats. We map relevant advisories to your technology
                stack and provide clear guidance to reduce risk before attackers can exploit
                weaknesses.
              </p>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Benefits
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>Advisories mapped to customer-specific technologies</li>
                <li>Real-time risk assessment and patching strategies</li>
                <li>Actionable, real-world recommendations to mitigate threats quickly</li>
              </ul>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Advisory Features
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>OSINT and commercial data sources for threat alerts</li>
                <li>Real-time access to cyber threat dashboards</li>
                <li>Tailored recommendations to strengthen cybersecurity controls</li>
                <li>Business–technology mapping and vendor-neutral consulting</li>
                <li>Identification of high-risk areas with low remediation effort</li>
                <li>Cyber defense blueprint design and implementation</li>
                <li>Threat prioritization and risk-based remediation planning</li>
                <li>Insights into threat actors, tactics, and attack patterns</li>
                <li>Acts as an extension of the customer&apos;s IT/security team</li>
              </ul>

              {/* Vulnerability & Threat Management */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Vulnerability &amp; Threat Management
              </h3>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Organizations often struggle to track and remediate large volumes of
                vulnerabilities. Our Vulnerability &amp; Threat Management services cover
                the entire lifecycle—from asset discovery and assessment to remediation and
                reporting.
              </p>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Benefits
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>
                  Can integrate with client-owned scanners or be fully managed by eDataForce
                </li>
                <li>24x7 support to address emerging vulnerabilities</li>
                <li>
                  Alignment with Threat Intelligence and Security Advisory services for
                  stronger defense
                </li>
                <li>Reduced administrative overhead and improved risk visibility</li>
              </ul>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Key Features
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>Asset discovery, prioritization, and risk evaluation</li>
                <li>Proactive mitigation of residual vulnerabilities</li>
                <li>Effective scanning across internal and external assets</li>
                <li>Actionable reports and dashboards for immediate response</li>
                <li>Automation-enabled protection and program optimization</li>
              </ul>

              {/* Security Assessments */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Security Assessments
              </h3>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                Our tailored security assessment programs cover the full threat landscape,
                from penetration testing to security awareness training. We help organizations
                build a cyber-resilient profile and continuously improve their security posture.
              </p>

              <h4
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Assessment Activities
              </h4>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>Network vulnerability assessment &amp; penetration testing</li>
                <li>Web and mobile application security assessments</li>
                <li>Cloud security configuration and architecture review</li>
                <li>Internal and external security assessments</li>
                <li>Real-time security assessment dashboards</li>
                <li>Red teaming and social engineering simulations</li>
                <li>Reassessment to confirm vulnerability closure</li>
                <li>Breach and cyber attack simulation exercises</li>
                <li>Detailed technical reports with remediation guidance</li>
              </ul>

              {/* USP / Why Choose */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Varutra SOC &amp; Global Threat Management – Our USP
              </h3>
              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                <li>Customer-first approach with complete visibility across assets</li>
                <li>Robust security posture through real-time monitoring and response</li>
                <li>Proven threat mitigation practices based on industry best standards</li>
                <li>Real-time SOC dashboards for open and closed alerts</li>
                <li>Proactive alert validation and rapid remediation</li>
                <li>Flexible monitoring models (24x7, 9x6, etc.)</li>
                <li>Actionable deliverables with trends and posture improvements</li>
                <li>Continuous security advisory integration</li>
                <li>Flexible offsite/onsite consulting models</li>
              </ul>

              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                What Is a Managed SOC?
              </h3>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto, sans-serif",
                  color: "#000000",
                }}
              >
                A Managed SOC is a threat monitoring and response platform that detects
                malicious or suspicious activity across endpoints, networks, and cloud
                environments. By leveraging our managed SOC, organizations gain continuous
                protection, reduced risk exposure, and improved business continuity.
              </p>
            </div>
          </div>

          {/* ================= RIGHT: SERVICES + CTA ================= */}
          <aside className="flex flex-col items-stretch space-y-8">
            {/* SERVICES LIST CARD */}
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
                src={socHero}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
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

export default SocGlobalThreatContent;
