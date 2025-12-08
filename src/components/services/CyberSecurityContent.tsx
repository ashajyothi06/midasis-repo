import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import cyberHero from "@/assets/cybersecurity-concept-illustration.jpg";

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

const CyberSecurityContent = () => {
  const [activeService, setActiveService] = useState("/services/cloud-security");

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">
          
          {/* ================= LEFT SECTION ================= */}
          <div className="space-y-8">
            {/* HERO IMAGE */}
            <div className="w-full h-[360px] md:h-[480px] lg:h-[540px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={cyberHero}
                alt="Cloud Security Services"
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
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Cloud Security Services – Protecting Your Business Where It Truly Lives
              </h2>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Cloud computing enables businesses to leverage remotely accessible computing power, storage, networking, 
                and software services. As organizations increasingly adopt SaaS, PaaS, and IaaS platforms across public, 
                private, hybrid, and community cloud environments, strong cloud security becomes essential.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Our Cloud Security Assessment Services help organizations reduce risk exposure, protect critical data assets,
                and minimize the impact of security threats. We offer fully customizable solutions tailored to your cloud
                architecture and deployment model.
              </p>

              {/* Cloud Security Services Overview */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Comprehensive Cloud Security Solutions
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Varutra provides Cloud Vulnerability Assessments, Cloud Penetration Testing, and a unique 
                Cloud Security Audit that identifies weaknesses in your cloud infrastructure, evaluates internal 
                controls, and assesses overall system effectiveness.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Using a blend of automated tools and expert manual testing, our consultants identify issues in:
              </p>

              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                <li>Authentication &amp; Authorization</li>
                <li>Server Virtualization &amp; Patch Management</li>
                <li>Intrusion Detection &amp; Protection</li>
                <li>Connection &amp; Data Transmission Security</li>
                <li>Access Rights &amp; Segregation of Duties</li>
                <li>Incident Response &amp; Change Management</li>
                <li>Misconfigurations &amp; Availability Risk</li>
              </ul>

              {/* Cloud Security Audit */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                Cloud Security Configuration Audit
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Leading cloud providers like AWS, Azure, and Google Cloud offer thousands of configuration options. 
                We analyze your cloud setup to identify weak points and monitor your security posture with proactive alerts 
                and detailed compliance reporting.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Common misconfigurations include:
              </p>

              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                <li>Publicly exposed servers</li>
                <li>Unencrypted storage buckets &amp; databases</li>
                <li>Lack of least-privilege IAM policies</li>
                <li>Weak or missing MFA enforcement</li>
                <li>Misconfigured backups &amp; restore procedures</li>
                <li>Privilege escalation &amp; data exposure risks</li>
              </ul>

              {/* Benefits */}
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

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Cloud environments face the same risks as traditional systems—plus additional complexities. 
                Our services provide a deep understanding of your cloud estate, helping you answer vital questions:
              </p>

              <ul
                className="list-disc list-inside space-y-2"
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                <li>What services are running in your cloud environment?</li>
                <li>Which systems and data are publicly accessible?</li>
                <li>How effective are existing cloud security controls?</li>
              </ul>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                The result is enhanced technical assurance, a complete view of your cloud attack surface,
                and detailed recommendations to secure your configuration.
              </p>

              {/* What is Cloud Security? */}
              <h3
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  color: "#1B1F2E",
                }}
              >
                What Is Cloud Security?
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Cloud Security is a collection of tools, practices, and technologies designed to protect cloud infrastructure, 
                applications, and data from both internal and external threats. As companies accelerate digital transformation, 
                cloud security becomes critical for ensuring business continuity, data protection, and regulatory compliance.
              </p>
            </div>
          </div>

          {/* ================= RIGHT SIDE LIST + CTA ================= */}
          <aside className="flex flex-col items-stretch space-y-8">
            
            {/* SERVICES LIST */}
            <div className="w-full bg-[#f4f5fb] shadow-md border border-border min-h-[460px] px-6 pt-6 pb-8">
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
                  const textColor = isActive ? "#FFFFFF" : "#121158";

                  return (
                    <Link
                      key={service.href}
                      to={service.href}
                      onClick={() => setActiveService(service.href)}
                      className={`w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold shadow-sm transition-colors
                        ${isActive ? "bg-[#f58220] text-white" : "bg-white hover:bg-[#f3f4ff]"}`}
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
                src={cyberHero}
                alt="Contact Midasis"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70" />

              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-10 space-y-6">
                <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white/80">
                  Let’s Work Together
                </p>

                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  Midasis
                  <br />
                  Consulting LLC
                </h3>

                <Link to="/contact" className="w-full max-w-[220px]">
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 py-3 text-sm md:text-base font-semibold border-white text-white bg-transparent hover:bg:white/15"
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

export default CyberSecurityContent;
