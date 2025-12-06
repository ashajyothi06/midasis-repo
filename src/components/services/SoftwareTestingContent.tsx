import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// ⬇️ Update these image paths to your actual assets
import softwareTestingHero from "@/assets/Software-Testing-edataforce.jpg";
import softwareTestingCta from "@/assets/Application-Maintenance.jpg";

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

const SoftwareTestingContent = () => {
  const [activeService, setActiveService] = useState("/services/software-testing");

  return (
    <div className="bg-secondary w-full">
      <section className="w-full py-10 md:py-14">
        {/* 5fr / 2fr layout just like other pages */}
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-4 lg:px-8">
          
          {/* ================= LEFT: IMAGE + CONTENT ================= */}
          <div className="space-y-8">
            {/* HERO IMAGE – sharp edges, large, hover movement */}
            <div className="w-full h-[380px] md:h-[500px] lg:h-[560px] overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={softwareTestingHero}
                alt="Software Testing"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>

            {/* TEXT CONTENT – same width as image, dark text */}
            <div className="space-y-7 leading-relaxed">
              
              {/* Intro */}
              <div>
                <h2
                  style={{
                    fontSize: "24px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    color: "#1B1F2E",
                    marginBottom: "0.75rem",
                  }}
                >
                  Software Testing
                </h2>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    color: "#000000",
                  }}
                >
                  At eDataForce, we believe that testing is more than just a phase—it’s the 
                  foundation of reliable, high-performing software. We do it right, and we test 
                  it right. Our approach to software testing is driven by precision, performance, 
                  and a commitment to excellence.
                </p>
              </div>

              {/* Why Software Testing Matters */}
              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    color: "#1B1F2E",
                    marginBottom: "0.5rem",
                  }}
                >
                  Why Software Testing Matters
                </h3>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    color: "#000000",
                  }}
                >
                  Quality issues can create operational roadblocks, increase costs, and damage 
                  your company’s reputation. Many organizations recognize these issues but 
                  struggle to pinpoint and implement corrective measures. That’s where eDataForce 
                  steps in.
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    color: "#000000",
                  }}
                >
                  We specialize in not only identifying performance bottlenecks but also 
                  implementing effective solutions that enhance the quality, reliability, and 
                  speed to market of your software systems.
                </p>
              </div>

              {/* Expertise in Comprehensive Testing */}
              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    color: "#1B1F2E",
                    marginBottom: "0.5rem",
                  }}
                >
                  Our Expertise in Comprehensive Software Testing
                </h3>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    color: "#000000",
                  }}
                >
                  Our world-class software testing services cover the entire software lifecycle, 
                  from development to deployment and beyond. We provide thorough assessments of 
                  performance, functionality, and usability to give you a clear picture of your 
                  software’s strengths and weaknesses.
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    color: "#000000",
                  }}
                >
                  Our goal is to ensure that your systems are stable, scalable, and capable of 
                  supporting your business’s growth. At eDataForce, we go beyond standard testing 
                  practices to deliver measurable results that enhance quality, reduce risks, and 
                  optimize performance.
                </p>
              </div>

              {/* Key Areas of Focus */}
              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    color: "#1B1F2E",
                    marginBottom: "0.75rem",
                  }}
                >
                  Key Areas of Focus
                </h3>
                <ul
                  className="space-y-3 list-disc list-inside"
                  style={{
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    color: "#000000",
                  }}
                >
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      QA Testing &amp; Bug Management:
                    </span>{" "}
                    Identify and resolve defects efficiently with our robust quality assurance 
                    practices and expert bug-tracking systems.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Performance Tuning:
                    </span>{" "}
                    Optimize your software’s performance to handle real-world workloads, ensuring 
                    it meets the highest standards for speed and reliability.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Risk Identification &amp; Mitigation:
                    </span>{" "}
                    Our team proactively identifies potential risks during testing, ensuring your 
                    software remains secure, scalable, and ready to perform in production.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Weekly Benchmarking:
                    </span>{" "}
                    We provide regular benchmarks that assess your system’s performance, helping 
                    you track improvements and stay ahead of potential issues.
                  </li>
                </ul>
              </div>

              {/* Optimizing quality approach */}
              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    color: "#1B1F2E",
                    marginBottom: "0.5rem",
                  }}
                >
                  Optimizing Your Quality Approach
                </h3>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    color: "#000000",
                  }}
                >
                  Our software testing services are designed to transform your quality assurance
                  processes and help you maintain a competitive edge. With our tailored strategies, 
                  we enable clients to reimagine their testing approach, delivering software that 
                  not only functions flawlessly but also scales effortlessly as your business grows.
                </p>
              </div>

              {/* QA Approach & Capabilities */}
              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    color: "#1B1F2E",
                    marginBottom: "0.75rem",
                  }}
                >
                  Our QA Approach &amp; Capabilities Include
                </h3>
                <ul
                  className="space-y-3 list-disc list-inside"
                  style={{
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    color: "#000000",
                  }}
                >
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Integration Testing:
                    </span>{" "}
                    Ensuring that your software components work seamlessly together to deliver a 
                    smooth, cohesive experience.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Regression Testing:
                    </span>{" "}
                    Verifying that new updates and changes haven’t introduced new defects into 
                    your system.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Unit Testing:
                    </span>{" "}
                    Testing individual components for functionality, ensuring that each element 
                    works as intended.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Usability &amp; Acceptance Testing:
                    </span>{" "}
                    Making sure your software meets user expectations and is ready for deployment.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Strategic Quality Planning:
                    </span>{" "}
                    Crafting a comprehensive quality strategy that aligns with your business 
                    objectives and product goals.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Continuous Testing During Development Phase:
                    </span>{" "}
                    Ongoing testing throughout the development process to catch issues early and 
                    ensure a smooth final product.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Formulation Of Test Plan:
                    </span>{" "}
                    Developing customized test plans that provide a structured approach to 
                    achieving your quality goals.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Test Coverage Analysis:
                    </span>{" "}
                    Analyzing the breadth and depth of your testing to ensure all critical areas 
                    are adequately tested.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Test Automation:
                    </span>{" "}
                    Utilizing advanced test automation tools to speed up the testing process and 
                    ensure consistency across multiple iterations.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Virtual QA Consultant:
                    </span>{" "}
                    Offering remote expertise to guide your QA strategy and optimize your testing 
                    process.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Remote Software Test Lab:
                    </span>{" "}
                    Access to our state-of-the-art test lab for offsite software testing, ensuring 
                    flexibility and scalability.
                  </li>
                  <li>
                    <span className="font-semibold" style={{ color: "#000000" }}>
                      Scalable Software Testing:
                    </span>{" "}
                    Our testing services are designed to scale with your needs, whether you’re 
                    launching a small project or managing a large, enterprise-level system.
                  </li>
                </ul>
              </div>

              {/* Why Choose eDataForce */}
              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    color: "#1B1F2E",
                    marginBottom: "0.5rem",
                  }}
                >
                  Why Choose eDataForce for Software Testing?
                </h3>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    color: "#000000",
                  }}
                >
                  When you partner with eDataForce, you’re choosing a team committed to delivering 
                  measurable improvements to your software’s quality and performance. Our holistic 
                  approach to software testing ensures that every aspect of your system is tested 
                  for reliability, security, and scalability. With eDataForce, you can trust that 
                  your software will not only meet today’s needs but will also be prepared to 
                  handle the challenges of tomorrow.
                </p>
              </div>
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

            {/* CTA CARD – dark overlay, same size pattern */}
            <div className="relative w-full shadow-xl overflow-hidden min-h-[420px] group">
              {/* background image with movement */}
              <img
                src={softwareTestingCta}
                alt="Contact eDataForce"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
              {/* dark overlay */}
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

export default SoftwareTestingContent;
