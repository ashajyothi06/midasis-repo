import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import aiMainImage from "@/assets/AI-Services-img.jpg";
import aiImage2 from "@/assets/AI-Services-img2.jpeg";
import aiImage3 from "@/assets/AI-Services-img3.jpg";

const services = [
  { title: "A.I Services & Products", href: "/services/ai-services" },
  { title: "Project Services", href: "/services/project-services" },
  { title: "Staff Augmentation", href: "/services/staff-augmentation" },
  { title: "Permanent Placement Service", href: "/services/permanent-placement" },
  { title: "Software Testing", href: "/services/software-testing" },
  { title: "Professional Consulting", href: "/services/professional-consulting" },
  { title: "Application Maintenance & Management", href: "/services/application-maintenance" },
  { title: "DevOps And Automation Services", href: "/services/devops-automation" },
];

const AiServicesContent = () => {
  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">

        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">

          {/* LEFT COLUMN */}
          <div className="space-y-10">

            {/* HERO IMAGE — sharp edges */}
            <div className="w-full h-[380px] md:h-[500px] lg:h-[560px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={aiMainImage}
                alt="AI Services"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>

            {/* TEXT BLOCK 1 */}
            <div className="space-y-4 text-slate-800 leading-relaxed text-base md:text-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                AI Products & Services at eDataForce Consulting LLC
              </h2>
              <p>
                At eDataForce, we understand that each business is unique, which is why
                our AI services are tailored to meet the specific needs of our clients.
              </p>
            </div>

            {/* IMAGE 2 — SHARP + TALLER */}
            <div className="space-y-6 text-slate-800 leading-relaxed text-base md:text-lg">
              <div className="w-full h-[300px] md:h-[380px] lg:h-[450px] overflow-hidden shadow-xl group cursor-pointer">
                <img
                  src={aiImage2}
                  alt="AI Tailored Solutions"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                AI Tailored to Your Needs
              </h2>

              <p>
                Our approach to AI is flexible and customer-centric. We create custom AI
                systems designed to integrate seamlessly with your business.
              </p>
            </div>

            {/* IMAGE 3 — SHARP + TALLER */}
            <div className="space-y-6 text-slate-800 leading-relaxed text-base md:text-lg">
              <div className="w-full h-[300px] md:h-[380px] lg:h-[450px] overflow-hidden shadow-xl group cursor-pointer">
                <img
                  src={aiImage3}
                  alt="AI Domain Solutions"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                AI Solutions Across Domains
              </h2>

              <ul className="list-disc list-inside space-y-2">
                <li><b>Healthcare:</b> Predictive analytics, care automation.</li>
                <li><b>Finance:</b> Fraud detection, risk scoring.</li>
                <li><b>Retail:</b> Personalization & forecasting.</li>
                <li><b>Logistics:</b> Route optimization.</li>
                <li><b>Manufacturing:</b> Production automation.</li>
              </ul>
            </div>

            {/* FINAL TEXT */}
            <div className="space-y-4 text-slate-800 leading-relaxed text-base md:text-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Customized AI Project Development
              </h2>
              <p>
                We deliver complete AI solutions—from architecture and model building
                to deployment and optimization.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN — SERVICES + CTA */}
          <aside className="flex flex-col items-stretch space-y-8">

            {/* SERVICES LIST */}
            <div className="w-full bg-[#f4f5fb] shadow-md border border-border min-h-[460px] px-6 pt-6 pb-8 rounded-md">
              <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Our World-Class Services
              </h3>

              <div className="flex flex-col gap-4">
                {services.map((service) => {
                  const isActive = service.href === "/services/ai-services";

                  return (
                    <Link
                      key={service.href}
                      to={service.href}
                      className={`w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold shadow-sm transition-colors rounded-md
                        ${isActive ? "bg-[#f58220] text-white" : "bg-white text-[#111827] hover:bg-[#f3f4ff]"}
                      `}
                    >
                      {service.title}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA CARD */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] rounded-lg group">
              <img
                src={aiMainImage}
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
                    className="w-full justify-center gap-2 py-3 text-sm md:text-base font-semibold border-white text-white hover:bg-white/15 hover:text-white"
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

export default AiServicesContent;
