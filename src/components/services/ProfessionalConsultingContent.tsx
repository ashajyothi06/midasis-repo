import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import professionalConsultingHero from "@/assets/edf-professional-consulting.jpg";
import consultingCtaImage from "@/assets/Application-Maintenance.jpg";

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

const ProfessionalConsultingContent = () => {
  const [activeService, setActiveService] = useState("/services/professional-consulting");

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">

        <div className="max-w-6xl xl:max-w-7xl mx-auto 
          grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">

          {/* ================= LEFT COLUMN ================= */}
          <div className="space-y-8">

            {/* HERO IMAGE */}
            <div className="w-full h-[380px] md:h-[500px] lg:h-[560px]
              overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={professionalConsultingHero}
                alt="Professional consulting"
                className="w-full h-full object-cover transform 
                  transition-transform duration-500 group-hover:scale-110 
                  group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>

            {/* ================= CONTENT ================= */}
            <div className="space-y-7 text-base md:text-lg leading-relaxed text-[#111111]">

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-3">
                  Professional Consulting: Your Strategic Partner for Unparalleled Success
                </h2>
                <p>
                  At eDataForce, we are more than just consultants—we are your strategic
                  partners in navigating the complexities of today’s technology landscape.
                  With a proven track record of delivering high-impact consulting projects,
                  we bring unmatched expertise, innovative strategies, and a relentless
                  commitment to driving your business forward.
                </p>
              </div>

              {/* Why eDataForce */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0a0a0a] mb-2">
                  Why eDataForce is the Consulting Partner You Need
                </h3>
                <p>
                  We provide deep, subject-matter-driven consulting strategies that address
                  your immediate needs while positioning you for long-term success. Our
                  experts work hand-in-hand with your teams to turn vision into reality.
                </p>
              </div>

              {/* Core principles */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0a0a0a] mb-3">
                  Our Consulting Approach: Built on Three Core Principles
                </h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">Precision:</span>{" "}
                    Complete 360° analysis of your technology and business processes.
                  </li>
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">Flexibility:</span>{" "}
                    Every recommendation is tailored to your goals and industry.
                  </li>
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">Productivity:</span>{" "}
                    Solutions that improve performance, reduce costs, and deliver measurable results.
                  </li>
                </ul>
              </div>

              {/* Horizons */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0a0a0a] mb-2">
                  Expanding Your Horizons with Expert Consulting
                </h3>
                <p>
                  We provide the insights, tools, and execution strategies needed for IT
                  modernization, infrastructure optimization, and long-term digital growth.
                </p>
              </div>

              {/* Services list */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0a0a0a] mb-3">
                  Our Comprehensive Consulting Services
                </h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li><strong className="text-[#0a0a0a]">AI Services:</strong> Automation, intelligence & insights.</li>
                  <li><strong className="text-[#0a0a0a]">Cloud Solutions:</strong> AWS, Azure, Google Cloud migration & optimization.</li>
                  <li><strong className="text-[#0a0a0a]">Database Management:</strong> Secure, structured, performance-driven systems.</li>
                  <li><strong className="text-[#0a0a0a]">Data Warehouse & BI:</strong> Analytics, dashboards, smarter decisions.</li>
                  <li><strong className="text-[#0a0a0a]">Web Development:</strong> Scalable modern web architecture.</li>
                  <li><strong className="text-[#0a0a0a]">Business Analysts:</strong> Domain-specific consulting expertise.</li>
                  <li><strong className="text-[#0a0a0a]">Project Management:</strong> PMI-certified experts ensuring delivery success.</li>
                  <li><strong className="text-[#0a0a0a]">UNIX & Network Admin:</strong> High-availability enterprise systems.</li>
                  <li><strong className="text-[#0a0a0a]">Security Admin:</strong> Threat protection & security frameworks.</li>
                  <li><strong className="text-[#0a0a0a]">ERP Resources:</strong> Optimizing your enterprise systems.</li>
                </ul>
              </div>

              {/* Why eDataForce */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0a0a0a] mb-2">
                  Why eDataForce is “The One”
                </h3>
                <p>
                  Clients choose us because we don’t just deliver solutions—we deliver
                  transformation. Long-term value, measurable growth, and a competitive
                  edge are at the heart of every engagement.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0a0a0a] mb-2">
                  Ready to Elevate Your Business?
                </h3>
                <p>
                  Speak with our consulting experts today. Call{" "}
                  <strong className="text-[#0a0a0a]">972-782-2529</strong> to begin your transformation journey.
                </p>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <aside className="flex flex-col items-stretch space-y-8">

            {/* SERVICES LIST */}
            <div className="w-full bg-[#f4f5fb] shadow-md border border-border min-h-[460px] px-6 pt-6 pb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-6">
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
                      className={`w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold shadow-sm transition-colors
                        ${isActive ? "bg-[#f58220] text-white" : "bg-white text-[#0a0a0a] hover:bg-[#f3f4ff]"}`}
                    >
                      <span>{service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">
              <img
                src={consultingCtaImage}
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
                    border-white text-white bg-transparent hover:bg-white/15 hover:border-white"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-white">
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

export default ProfessionalConsultingContent;
