import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import devOpsMainImage from "@/assets/DevOps-and-Automation-Services.jpg";
import devOpsContactImage from "@/assets/Application-Maintenance.jpg";

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

const DevOpsAutomationContent = () => {
  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        {/* wider image column: 5fr vs 2fr (aligned with other pages) */}
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">
          {/* ================= LEFT: IMAGE + CONTENT ================= */}
          <div className="space-y-8">
            {/* HERO IMAGE – sharp edges, large, hover movement */}
            <div className="w-full h-[380px] md:h-[500px] lg:h-[560px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={devOpsMainImage}
                alt="DevOps and Automation Services"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>

            {/* TEXT CONTENT */}
            <div className="space-y-7 text-base md:text-lg text-slate-800 leading-relaxed">
              {/* Intro */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  DevOps and Automation Services: Accelerate Your Digital Transformation
                </h2>
                <p>
                  In today’s fast-paced business environment, the ability to develop,
                  test, and deploy software rapidly while maintaining quality is
                  critical. At eDataForce, we offer comprehensive DevOps and Automation
                  Services designed to streamline your development pipeline, reduce
                  downtime, and enhance collaboration across your IT teams. Whether
                  you’re transitioning to cloud-native architecture or looking to
                  optimize existing systems, our DevOps solutions ensure that your
                  business stays agile, competitive, and future-ready.
                </p>
              </div>

              {/* Why choose */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Why Choose eDataForce for DevOps and Automation?
                </h3>
                <p>
                  We understand that efficient operations and quick deployment cycles
                  are key to success in the digital era. Our DevOps services are
                  focused on fostering collaboration between development and
                  operations teams, automating repetitive tasks, and optimizing your
                  infrastructure to enable continuous delivery. With eDataForce, you
                  gain access to expert DevOps consultants who specialize in
                  implementing best practices, creating automated workflows, and
                  delivering measurable improvements to your operations.
                </p>
              </div>

              {/* Key Areas of Expertise */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
                  Key Areas of Expertise
                </h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <span className="font-semibold text-slate-900">
                      Continuous Integration/Continuous Deployment (CI/CD):
                    </span>{" "}
                    Automate your code integration and deployment processes, reducing
                    manual errors and ensuring smooth and fast delivery to production
                    environments.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Infrastructure as Code (IaC):
                    </span>{" "}
                    Implement and manage your infrastructure using code, enabling
                    scalability, consistency, and quicker updates. We help you design,
                    build, and automate infrastructure for cloud environments like AWS,
                    Azure, or Google Cloud.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Automation of Workflows:
                    </span>{" "}
                    Streamline repetitive manual tasks using automation tools like
                    Jenkins, Ansible, or Terraform, ensuring your teams can focus on
                    innovation rather than operational bottlenecks.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Monitoring and Logging Solutions:
                    </span>{" "}
                    Gain full visibility into your system performance with real-time
                    monitoring and logging. Our solutions ensure that your
                    applications and infrastructure are continually optimized, with
                    immediate alerts to any potential issues.
                  </li>
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
                  Benefits of DevOps and Automation
                </h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <span className="font-semibold text-slate-900">
                      Faster Time-to-Market:
                    </span>{" "}
                    Accelerate your development cycles and release updates more
                    frequently and reliably.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Improved Collaboration:
                    </span>{" "}
                    Break down silos between development and operations teams for
                    smoother, more efficient workflows.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Cost Efficiency:
                    </span>{" "}
                    Automate processes to reduce operational overhead and minimize
                    manual errors, cutting both time and costs.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Scalability and Flexibility:
                    </span>{" "}
                    Build scalable, flexible systems that can grow as your business
                    expands, ensuring you remain agile in a competitive landscape.
                  </li>
                </ul>
              </div>

              {/* Tailored solutions */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Tailored Solutions for Every Industry
                </h3>
                <p>
                  Our DevOps experts work with clients across a variety of industries,
                  including finance, healthcare, telecommunications, and retail.
                  Whether you’re building a new infrastructure from the ground up or
                  modernizing existing systems, eDataForce offers customized solutions
                  designed to meet the specific needs of your business.
                </p>
              </div>

              {/* Why eDataForce */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Why eDataForce for DevOps?
                </h3>
                <p>
                  With eDataForce, you get more than just a service provider—you get a
                  trusted partner who is invested in your long-term success. Our DevOps
                  and Automation Services enable your business to operate at peak
                  performance, reduce operational risks, and stay ahead of the
                  competition. We deliver continuous value through optimization,
                  innovation, and collaboration, empowering your business to thrive in
                  today’s fast-evolving digital landscape.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: SERVICES + CTA ================= */}
          <aside className="flex flex-col items-stretch space-y-8">
            {/* SERVICES LIST CARD – same style as other pages */}
            <div className="w-full bg-[#f4f5fb] shadow-md border border-border min-h-[460px] px-6 pt-6 pb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Our World-Class Services
              </h3>

              <div className="flex flex-col gap-4">
                {services.map((service) => {
                  const isActive = service.href === "/services/devops-automation";

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

            {/* CTA CARD – darker overlay, same pattern as other pages */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">
              {/* background image with movement */}
              <img
                src={devOpsContactImage}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
              {/* dark transparent overlay */}
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

export default DevOpsAutomationContent;
