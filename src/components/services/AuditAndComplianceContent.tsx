import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import auditHero from "@/assets/compliance.jpg"; // hero image

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
  { title: "Audit & Compliance", href: "/services/audit-compliance" }, // ACTIVE PAGE
  { title: "SOC & Global Threat Management", href: "/services/soc-global-threat" },
];

const AuditAndComplianceContent = () => {
  const [activeService, setActiveService] = useState("/services/audit-compliance");

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">

          {/* LEFT SECTION */}
          <div className="space-y-8">

            {/* HERO IMAGE */}
            <div className="w-full h-[360px] md:h-[480px] lg:h-[540px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={auditHero}
                alt="Audit & Compliance"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
            </div>

            {/* TEXT CONTENT */}
            <div className="space-y-7 text-base md:text-lg text-slate-800 leading-relaxed">
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Audit & Compliance Services
              </h2>

              <p>
                Our Audit and Compliance services are highly customizable and structured to
                support evolving business needs. Led by certified experts, our team delivers
                precise execution, governance insights, and actionable recommendations to
                strengthen organizational security and compliance maturity.
              </p>

              <p>
                We understand client pain points across multiple sectors and bring deep
                domain expertise to enhance assurance, reduce operational risks, and improve
                long-term security posture.
              </p>

              {/* SECTION — Key Offerings */}
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                Key Service Offerings
              </h3>

              {/* Information Systems Audit */}
              <h4 className="text-lg md:text-xl font-semibold text-slate-900">
                Information Systems Audit
              </h4>
              <p>
                Our IS Audit assesses the end-to-end IT environment including automated
                systems, non-automated processes, and their interfaces. We evaluate the
                effectiveness of controls to ensure asset protection, data integrity,
                operational reliability, and alignment with business goals.
              </p>

              {/* Third Party Risk */}
              <h4 className="text-lg md:text-xl font-semibold text-slate-900">
                Third Party Risk Management (TPRM)
              </h4>
              <p>
                We help organizations evaluate and reduce risks arising from vendors,
                partners, service providers, and other third-party entities.
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>Risk models, issue tracking & reporting</li>
                <li>Third-party profiling & risk scoring</li>
                <li>Onsite and remote assessments</li>
                <li>Governance across cyber, operational & financial risks</li>
              </ul>

              {/* ISO 27001 */}
              <h4 className="text-lg md:text-xl font-semibold text-slate-900">
                ISO 27001 Implementation & Sustenance
              </h4>

              <ul className="list-disc list-inside space-y-2">
                <li>ISMS Gap Analysis & Audits</li>
                <li>Risk Assessment Workshops</li>
                <li>Internal Audit Execution</li>
                <li>Full ISMS Advisory & Implementation</li>
                <li>Training & Awareness (1–3 Days)</li>
                <li>Complete Documentation Toolkit</li>
              </ul>

              {/* vCISO */}
              <h4 className="text-lg md:text-xl font-semibold text-slate-900">
                Virtual CISO (vCISO) as a Service
              </h4>

              <p>
                Our vCISO services help organizations establish long-term, scalable security
                programs and maintain compliance with evolving cyber risks.
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>Tailored enterprise security strategy</li>
                <li>Cyber risk mitigation planning</li>
                <li>Optimization of resources and processes</li>
                <li>Continuous improvement of security maturity</li>
              </ul>

              {/* SOC Reports */}
              <h4 className="text-lg md:text-xl font-semibold text-slate-900">
                Service Organization Controls (SOC 1, SOC 2, SOC 3, Cyber)
              </h4>

              <p>We help organizations:</p>

              <ul className="list-disc list-inside space-y-2">
                <li>Meet regulatory and client audit requirements</li>
                <li>Strengthen internal governance</li>
                <li>Gain competitive advantage</li>
                <li>Reduce risks & identify inefficiencies</li>
              </ul>

              {/* Threat Assessment */}
              <h4 className="text-lg md:text-xl font-semibold text-slate-900">
                Threat Assessment & Risk Analysis
              </h4>

              <ul className="list-disc list-inside space-y-2">
                <li>Security Program Design & Evaluation</li>
                <li>Corporate Security Risk Assessments</li>
                <li>Emergency Risk Management</li>
                <li>Specialized consultancy for BFSI, Healthcare, Govt.</li>
              </ul>

              {/* Process */}
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                Our Audit Process
              </h3>

              <ul className="list-disc list-inside space-y-2">
                <li>Create enterprise-level security benchmarks</li>
                <li>Execute internal & vendor audits</li>
                <li>Identify strengths, weaknesses & remediation roadmap</li>
                <li>Prioritize exposures based on impact</li>
                <li>Deliver business-focused remediation steps</li>
                <li>Coordinate with external auditors end-to-end</li>
              </ul>

              {/* Why Choose Us */}
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                Why Choose Us?
              </h3>

              <p>
                Our certified team delivers consistent, high-quality audit and compliance
                services, enabling organizations to focus on business growth while we ensure
                governance, assurance, and regulatory readiness.
              </p>

              {/* What is Cyber Audit */}
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                What Is a Cybersecurity Audit?
              </h3>

              <p>
                A cybersecurity audit provides a complete evaluation of an organization’s IT
                landscape to uncover vulnerabilities, misconfigurations, and threats. It
                ensures systems are resilient, compliant, and prepared against cyberattacks.
              </p>

            </div>
          </div>

          {/* RIGHT SIDEBAR + CTA */}
          <aside className="flex flex-col items-stretch space-y-8">

            {/* SERVICES LIST */}
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
                      className={`w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold transition-colors shadow-sm ${
                        isActive
                          ? "bg-[#f58220] text-white"
                          : "bg-white text-[#111827] hover:bg-[#f3f4ff]"
                      }`}
                    >
                      {service.title}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA CARD */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">
              <img
                src={auditHero}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
              <div className="absolute inset-0 bg-black/75" />

              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-10 space-y-6">
                <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-white/80">
                  Let&apos;s Work Together
                </p>

                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  eDataForce <br /> Consulting LLC
                </h3>

                <Link to="/contact" className="w-full max-w-[220px]">
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 py-3 border-white text-white hover:bg-white/20"
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

export default AuditAndComplianceContent;
