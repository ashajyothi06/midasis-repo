import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// ⬇️ Replace these paths with your actual images
import permanentPlacementHero from "@/assets/edataforce-project-services.jpg";
import placementCtaImage from "@/assets/Application-Maintenance.jpg";

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

const PermanentPlacementContent = () => {
  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        {/* wider image column: 5fr vs 2fr */}
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">
          {/* ================= LEFT: IMAGE + CONTENT ================= */}
          <div className="space-y-8">
            {/* HERO IMAGE – sharp edges, large, hover movement */}
            <div className="w-full h-[380px] md:h-[500px] lg:h-[560px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={permanentPlacementHero}
                alt="Permanent placement service"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>

            {/* TEXT CONTENT */}
            <div className="space-y-7 text-base md:text-lg text-slate-800 leading-relaxed">
              {/* Intro */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  Permanent Placement Service
                </h2>
                <p>
                  In today’s competitive business environment, finding, attracting, and
                  retaining top talent is more critical than ever. But as businesses focus
                  on achieving their strategic goals, dedicating time and resources to
                  recruitment can be a significant challenge. That’s where eDataForce
                  comes in. Our Permanent Placement Services are designed to take the
                  complexity out of the hiring process, allowing you to concentrate on
                  what matters most—running and growing your business.
                </p>
              </div>

              {/* How we help */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  How We Help You Find the Right Fit
                </h3>
                <p>
                  From resume screening to the final interview stage, we manage every step
                  of the recruitment process, ensuring that only the best candidates who
                  meet your specific requirements make it through. We use advanced
                  recruitment tools, combined with our deep industry insights, to assess
                  and present ideal candidates who align with both your job requirements
                  and company culture. Our process is thorough, transparent, and
                  customized to meet your unique hiring needs.
                </p>
              </div>

              {/* What makes us different */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
                  What Makes eDataForce Different?
                </h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <span className="font-semibold text-slate-900">
                      Targeted Recruitment:
                    </span>{" "}
                    We don’t just fill roles—we ensure every candidate we place is the
                    perfect fit for your company culture and long-term goals.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Deep Industry Expertise:
                    </span>{" "}
                    With specialized knowledge in industries such as IT, finance,
                    healthcare, and more, we understand your challenges and deliver
                    high-quality placements tailored to your sector.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Comprehensive Screening Process:
                    </span>{" "}
                    Every candidate undergoes a rigorous screening process, including
                    background checks, skills assessments, and cultural fit evaluations,
                    ensuring that only top-tier talent reaches your interview stage.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Customized Solutions:
                    </span>{" "}
                    We understand that no two businesses are the same, which is why our
                    recruitment solutions are tailored to your specific needs, whether
                    you’re hiring for niche roles or building a strong, long-term team.
                  </li>
                </ul>
              </div>

              {/* Long-term success */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Long-Term Success
                </h3>
                <p>
                  At eDataForce, our focus goes beyond simply filling vacancies. We place
                  candidates who are committed to growing within your organization and
                  contributing to your long-term success. By understanding your business
                  objectives and culture, we ensure that the talent you hire today becomes
                  a key asset for your future growth and leadership.
                </p>
              </div>

              {/* Post-hire support */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Post-Hire Support
                </h3>
                <p>
                  Our partnership doesn’t end when we place a candidate. We offer
                  post-hire support to ensure a smooth transition for both your new hire
                  and your organization. Through regular check-ins and feedback, we help
                  ensure that both the company and the candidate are satisfied,
                  contributing to long-term retention and success.
                </p>
              </div>

              {/* Speed & efficiency */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Speed and Efficiency
                </h3>
                <p>
                  We understand the impact of hiring delays on business operations.
                  That’s why our placement process is designed to be fast and efficient
                  without sacrificing quality. With access to a large database of
                  pre-qualified candidates, we can quickly connect you with the talent you
                  need, helping you avoid the costs and risks of prolonged vacancies.
                </p>
              </div>

              {/* Nationwide reach */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Nationwide Reach with Local Expertise
                </h3>
                <p>
                  No matter where your business is located, eDataForce has the reach and
                  resources to source the best candidates. Our extensive network of
                  qualified professionals spans across industries and geographies,
                  allowing us to quickly find the right match for your permanent
                  placement needs, no matter the project location.
                </p>
              </div>

              {/* Why choose eDataForce */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Why Choose eDataForce for Permanent Placement?
                </h3>
                <p>
                  At eDataForce, we’re more than just a recruitment provider—we’re your
                  partner in building a workforce that drives long-term success. Our
                  commitment to delivering high-quality, reliable candidates, combined
                  with our industry expertise and focus on long-term retention, makes us
                  the ideal choice for your permanent placement needs. We take the time
                  to understand your unique challenges and goals, delivering talent
                  solutions that set you apart from the competition.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Contact Us for Professional Placement Solutions
                </h3>
                <p>
                  Ready to find your next great hire? Contact our Sales Team at{" "}
                  <span className="font-semibold">972-782-2529</span> for comprehensive,
                  professional placement services. Our team is standing by to discuss
                  your hiring needs and deliver tailored recruitment solutions that drive
                  success.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: SERVICES + CTA ================= */}
          <aside className="flex flex-col items-stretch space-y-8">
            {/* SERVICES LIST CARD – tall vertical rectangle */}
            <div className="w-full bg-[#f4f5fb] shadow-md border border-border min-h-[460px] px-6 pt-6 pb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Our World-Class Services
              </h3>

              <div className="flex flex-col gap-4">
                {services.map((service) => {
                  const isActive = service.href === "/services/permanent-placement";

                  const baseClasses =
                    "w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold shadow-sm transition-colors";

                  const activeClasses = "bg-[#f58220] text-white";
                  const inactiveClasses =
                    "bg-white text-[#111827] hover:bg-[#f3f4ff]";

                  return (
                    <Link
                      key={service.href}
                      to={service.href}
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

            {/* CTA CARD – darker transparent overlay */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">
              {/* background image with slight movement */}
              <img
                src={placementCtaImage}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
              {/* DARK transparent overlay */}
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

export default PermanentPlacementContent;
