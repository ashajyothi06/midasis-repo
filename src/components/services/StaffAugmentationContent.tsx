import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import staffHero from "@/assets/Staff-Augmentation.jpg"; // change path to your image
import staffCtaImage from "@/assets/Application-Maintenance.jpg"; // CTA background image

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

const StaffAugmentationContent = () => {
  const [activeService, setActiveService] = useState("/services/staff-augmentation");

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">

        {/* Same 5fr/2fr layout as all your other updated pages */}
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 
                        lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">

          {/* ================= LEFT COLUMN ================= */}
          <div className="space-y-8">

            {/* LARGE HERO IMAGE */}
            <div className="w-full h-[380px] md:h-[500px] lg:h-[560px] 
                            overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={staffHero}
                alt="Staff Augmentation"
                className="w-full h-full object-cover transform transition-transform duration-500 
                           group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>

            {/* ================= CONTENT AREA (Dark Text) ================= */}
            <div className="space-y-8 text-base md:text-lg text-[#111111] leading-relaxed">

              {/* INTRO */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-3">
                  Staff Augmentation
                </h2>
                <p>
                  In today’s constantly evolving IT landscape, having the right talent on your
                  team can make all the difference in executing critical projects successfully.
                  At eDataForce, we understand that the key to success isn’t just operational 
                  excellence—it’s about having expert guidance and specialized skills to navigate 
                  complex business initiatives.
                </p>
                <p className="mt-2">
                  Our staff augmentation services are designed to provide your organization with 
                  the right talent to meet the demands of your most challenging projects, from 
                  short-term needs to long-term goals.
                </p>
              </div>

              {/* WHY EDATAFORCE */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0a0a0a] mb-2">
                  Why Choose eDataForce for Staff Augmentation?
                </h3>
                <p>
                  What sets successful organizations apart isn’t just their ability to execute 
                  projects, but the expert advice and strategic insights that drive them forward. 
                  At eDataForce, we don’t just offer staffing solutions—we offer a partnership.
                </p>
                <p className="mt-2">
                  With eDataForce, you get more than just a resource—you get a trusted advisor 
                  who understands your business, your challenges, and your goals.
                </p>
              </div>

              {/* TAILORED TALENT SOLUTIONS */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0a0a0a] mb-2">
                  Tailored Talent Solutions
                </h3>
                <p>
                  Resource needs can fluctuate, and we understand how critical it is for IT 
                  organizations to have reliable, flexible access to the best talent. Our staff 
                  augmentation services give you peace of mind by thoroughly vetting and placing 
                  top-tier consultants who are ready to hit the ground running.
                </p>
              </div>

              {/* SERVICES LIST */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#0a0a0a] mb-3">
                  Our Comprehensive Staff Augmentation Services Cover:
                </h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">Web Development:</span>{" "}
                    Front-end and back-end developers for scalable, secure applications.
                  </li>
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">Network Administrators:</span>{" "}
                    Experts who ensure secure, resilient network infrastructure.
                  </li>
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">UNIX Administrators:</span>{" "}
                    Professionals maintaining UNIX environments with high availability.
                  </li>
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">
                      Security Administration:
                    </span>{" "}
                    Specialists who implement and manage proactive cybersecurity measures.
                  </li>
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">
                      Project Management (PMI-certified):
                    </span>{" "}
                    Leaders who keep projects on time, on budget, and high quality.
                  </li>
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">
                      Database Management & Administration:
                    </span>{" "}
                    Experts who ensure efficient and secure data ecosystems.
                  </li>
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">
                      Data Mining, Warehousing & BI:
                    </span>{" "}
                    Professionals who convert data into business-transforming insights.
                  </li>
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">
                      Cloud Solutions:
                    </span>{" "}
                    Engineers skilled in AWS, Azure, and Google Cloud migrations & management.
                  </li>
                  <li>
                    <span className="font-semibold text-[#0a0a0a]">
                      AI & Machine Learning:
                    </span>{" "}
                    Specialists implementing intelligent automation and predictive models.
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* ================= RIGHT COLUMN (SERVICES + CTA) ================= */}
          <aside className="flex flex-col items-stretch space-y-8">

            {/* SERVICES LIST BOX */}
            <div className="w-full bg-[#f4f5fb] shadow-md border border-border 
                            min-h-[460px] px-6 pt-6 pb-8">
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
                                  text-sm md:text-base font-semibold shadow-sm transition-colors
                                  ${
                                    isActive
                                      ? "bg-[#f58220] text-white"
                                      : "bg-white text-[#111827] hover:bg-[#f3f4ff]"
                                  }`}
                    >
                      <span>{service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA CARD */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">
              <img
                src={staffCtaImage}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform 
                           duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
              <div className="absolute inset-0 bg-black/75" />

              <div className="relative z-10 flex flex-col items-center justify-center 
                              text-center text-white px-6 py-10 space-y-6">
                <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white/85">
                  Let&apos;s Work Together
                </p>

                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  eDataForce <br /> Consulting LLC
                </h3>

                <Link to="/contact" className="w-full max-w-[220px]">
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 py-3 text-sm md:text-base 
                               font-semibold border-white text-white bg-transparent 
                               hover:bg-white/15 hover:text-white"
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

export default StaffAugmentationContent;
