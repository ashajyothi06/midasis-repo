import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import projectHero from "@/assets/Project-Services-edf.jpg";
import ctaImage from "@/assets/Application-Maintenance.jpg";

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

const ProjectServicesContent = () => {
  const [activeService, setActiveService] = useState("/services/project-services");

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        {/* SAME LAYOUT: 5fr / 2fr */}
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">
          
          {/* ================= LEFT SIDE ================= */}
          <div className="space-y-8">

            {/* HERO IMAGE – identical to maintenance page */}
            <div className="w-full h-[380px] md:h-[500px] lg:h-[560px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={projectHero}
                alt="Project Services"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>

            {/* CONTENT SECTION (black text like maintenance page) */}
            <div className="space-y-7 text-base md:text-lg text-[#111111] leading-relaxed">

              <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a]">
                Project Services
              </h2>
              <p>
                In today’s rapidly changing IT landscape, the need for agility, precision,
                and speed has never been greater. At eDataForce, we offer a wide range of
                project services designed to meet your business’s unique challenges and
                ensure success. Our services blend industry-leading technology with our
                extensive experience to help your business navigate complexity and achieve
                measurable results.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mt-6">
                Our Core Project Services
              </h3>
              <ul className="space-y-4 list-disc list-inside">
                <li><strong>IT Staffing & Augmentation:</strong> We provide expert talent to scale your projects without delays.</li>
                <li><strong>End-to-End Project Management:</strong> We manage full project lifecycles for on-time, high-quality delivery.</li>
                <li><strong>Custom Software Development:</strong> Tailored development from architecture to deployment.</li>
                <li><strong>Business Process Optimization:</strong> Streamlining workflows to reduce cost & improve efficiency.</li>
                <li><strong>Cloud Solutions & Migration:</strong> AWS / Azure / GCP migrations with zero disruption.</li>
                <li><strong>AI & Data Analytics Solutions:</strong> AI-driven insights for better decision-making.</li>
                <li><strong>Application Maintenance & Support:</strong> Keeping your apps updated, secure, and optimized.</li>
                <li><strong>Cybersecurity Solutions:</strong> Protecting your organization from cyber threats.</li>
                <li><strong>Digital Transformation Services:</strong> Helping companies modernize and compete in a digital-first world.</li>
              </ul>

              <h3 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">
                Why Partner With eDataForce?
              </h3>
              <p>
                At eDataForce, we don’t just offer services—we build partnerships. Whether
                you’re looking to scale, innovate, or transform, we provide the tools,
                talent, and technology to help you succeed.
              </p>
            </div>
          </div>

          {/* ================= RIGHT SIDE: SERVICES + CTA ================= */}
          <aside className="flex flex-col items-stretch space-y-8">

            {/* SERVICES LIST – same formatting as maintenance page */}
            <div className="w-full bg-[#f4f5fb] shadow-md border border-border min-h-[460px] px-6 pt-6 pb-8">
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
                      className={`w-full flex items-center justify-between px-6 py-4 
                      text-sm md:text-base font-semibold shadow-sm transition 
                      ${isActive ? "bg-[#f58220] text-white" : "bg-white text-[#111827] hover:bg-[#f3f4ff]"}
                    `}
                    >
                      <span>{service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA CARD – EXACT same style as maintenance page */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">

              <img
                src={ctaImage}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />

              {/* Dark overlay same (black/75) */}
              <div className="absolute inset-0 bg-black/75" />

              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-10 space-y-6">
                <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white/80">
                  Let’s Work Together
                </p>

                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  eDataForce <br /> Consulting LLC
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
                  +1 (972) 989-3398
                </div>
              </div>

            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ProjectServicesContent;
