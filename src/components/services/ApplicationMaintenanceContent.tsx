import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import appMaintenanceHero from "@/assets/eda-Application-Maintenance.jpg";

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
];

const ApplicationMaintenanceContent = () => {
  const [activeService, setActiveService] = useState(
    "/services/application-maintenance"
  );

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        {/* wider image column: 5fr vs 2fr (same as PermanentPlacementContent) */}
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">
          {/* ================= LEFT: IMAGE + CONTENT ================= */}
          <div className="space-y-8">
            {/* HERO IMAGE – sharp edges, larger, hover movement */}
            <div className="w-full h-[380px] md:h-[500px] lg:h-[560px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={appMaintenanceHero}
                alt="Application maintenance and management"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>

            {/* TEXT CONTENT – same width as image */}
            <div className="space-y-7 text-base md:text-lg text-slate-800 leading-relaxed">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  Application Maintenance &amp; Management: Fast, Secure, and Reliable
                </h2>
                <p>
                  In today’s fast-moving digital world, businesses cannot afford outdated,
                  slow, or insecure applications. eDataForce understands the urgency of
                  modernizing and maintaining IT applications to keep pace with evolving
                  demands. Our Application Maintenance &amp; Management Services provide
                  swift, secure, and seamless support, ensuring your systems not only meet
                  today’s needs but are future-proofed for tomorrow.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Why Choose eDataForce for Application Maintenance &amp; Management?
                </h3>
                <p>
                  Our approach is centered around performance optimization, rapid response,
                  security, and innovation. We don’t just maintain applications—we
                  transform them into powerful, reliable tools that give your organization
                  a competitive edge. Our expert IT consultants have deployed cutting-edge
                  solutions across telecommunications, automotive, healthcare, insurance,
                  finance, retail, airlines, and more.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Quick Response and Ongoing Support
                </h3>
                <p>
                  We understand the critical nature of uptime for your business operations.
                  Our dedicated teams are ready to respond immediately to issues as they
                  arise. We prioritize fast turnaround times, minimizing downtime and
                  ensuring your applications remain operational, secure, and efficient.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Secure and Reliable Application Management
                </h3>
                <p>
                  Security is at the heart of everything we do. From updates and patches to
                  full-scale security audits, we ensure your applications are fortified
                  against evolving threats. With eDataForce, your applications are
                  safeguarded and optimized to handle the challenges of an ever-changing
                  digital environment.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
                  Our Superior Application Management Services Include:
                </h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <span className="font-semibold text-slate-900">
                      Application Modernization:
                    </span>{" "}
                    Transform outdated systems into modern, scalable, and secure
                    applications aligned with the latest technologies.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Application Migration:
                    </span>{" "}
                    Seamless migration to new platforms or cloud environments with minimal
                    disruption to operations.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Re-Engineering Services:
                    </span>{" "}
                    Redesign existing applications for improved functionality, security,
                    and user experience.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Proactive Performance Optimization:
                    </span>{" "}
                    Continuous monitoring, tuning, and upgrades to keep your applications
                    running at peak efficiency.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  End-to-End Support Across Industries
                </h3>
                <p>
                  Our experience spans Telecommunications, Automotive, Healthcare,
                  Insurance, Finance and Banking, Retail, and Airlines. We provide tailored
                  solutions for each sector, ensuring your applications support your
                  business goals without fail.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Streamlined, Cost-Efficient Solutions
                </h3>
                <p>
                  Effective application management can save your organization from
                  unnecessary expenditures and inefficiencies. Our services streamline
                  application processes while maintaining the highest levels of security
                  and performance, giving you a clear competitive edge.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Why eDataForce?
                </h3>
                <p>
                  By choosing eDataForce, you’re partnering with a team that prioritizes
                  speed, security, and reliability. Our proactive, customized approach
                  keeps your applications future-proof, secure, and optimized for your
                  growing business. With eDataForce Application Maintenance &amp;
                  Management Services, you’re not just maintaining applications—you’re
                  ensuring their long-term success and resilience.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: SERVICES + CTA (sizes like PermanentPlacement) ================= */}
          <aside className="flex flex-col items-stretch space-y-8">
            {/* SERVICES LIST CARD – tall vertical rectangle */}
            <div className="w-full bg-[#f4f5fb] shadow-md border border-border min-h-[460px] px-6 pt-6 pb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Our World-Class Services
              </h3>

              <div className="flex flex-col gap-4">
                {services.map((service) => {
                  const isActive = activeService === service.href;

                  const baseClasses =
                    "w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold shadow-sm transition-colors";

                  const activeClasses = "bg-[#f58220] text-white";
                  const inactiveClasses =
                    "bg-white text-[#111827] hover:bg-[#f3f4ff]";

                  return (
                    <Link
                      key={service.href}
                      to={service.href}
                      onClick={() => setActiveService(service.href)}
                      className={`${baseClasses} ${
                        isActive ? activeClasses : inactiveClasses
                      }`}
                    >
                      <span>{service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

              {/* CTA CARD – darker overlay, same height/width pattern */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">
              {/* background image with movement */}
              <img
                src={appMaintenanceHero}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
              {/* dark transparent overlay (same as PermanentPlacement) */}
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

export default ApplicationMaintenanceContent;
