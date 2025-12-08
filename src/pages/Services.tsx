import { useState } from "react";
import TopContactBar from "@/components/TopContactBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Existing service images
import serviceAi from "@/assets/AI-Services-img.jpg";
import serviceProject from "@/assets/Project-Services.jpg";
import serviceStaffing from "@/assets/eda-Application-Maintenance.jpg";
import servicePlacement from "@/assets/service-placement.jpg";
import serviceTesting from "@/assets/service-testing.jpg";
import serviceConsulting from "@/assets/edf-professional-consulting.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import serviceDevops from "@/assets/DevOps-and-Automation-Services.jpg";

// Existing icons
import aiIcon from "@/assets/Ai-Services-Icon.png";
import projectIcon from "@/assets/Project-Services-Icon.png";
import staffIcon from "@/assets/Staff-Augmentation-Icon.png";
import placementIcon from "@/assets/permanent-placement-icon.png";
import testingIcon from "@/assets/software-testing-icon.png";
import consultingIcon from "@/assets/professional-consulting-icon.png";
import maintenanceIcon from "@/assets/application-maintanance-icon.png";
import devopsIcon from "@/assets/devops-automation.png";

// Cyber Security Image Imports
import cloudSecurityImg from "@/assets/cybersecurity-concept-illustration.jpg";
import mobileSecurityImg from "@/assets/mobileSecurity.png";
import applicationSecurityImg from "@/assets/applicationSecurity.jpg";
import networkSecurityImg from "@/assets/networkSecurity.jpg";
import auditComplianceImg from "@/assets/compliance.jpg";
import socThreatImg from "@/assets/SOC-global.png";

// Cyber Security Icons
import cloudIcon from "@/assets/Ai-Services-Icon.png";
import mobileIcon from "@/assets/software-testing-icon.png";
import appSecIcon from "@/assets/Project-Services-Icon.png";
import networkIcon from "@/assets/professional-consulting-icon.png";
import auditIcon from "@/assets/Staff-Augmentation-Icon.png";
import socIcon from "@/assets/permanent-placement-icon.png";

import servicesHeroBg from "@/assets/servicesall.jpg";

type ServiceCard = {
  title: string;
  image: string;
  logo: string;
  href: string;
};

const allServices: ServiceCard[] = [
  { title: "A.I. Services", image: serviceAi, logo: aiIcon, href: "/services/ai-services" },
  { title: "Project Services", image: serviceProject, logo: projectIcon, href: "/services/project-services" },
  { title: "Staff Augmentation", image: serviceStaffing, logo: staffIcon, href: "/services/staff-augmentation" },
  { title: "Permanent Placement Service", image: servicePlacement, logo: placementIcon, href: "/services/permanent-placement" },
  { title: "Software Testing", image: serviceTesting, logo: testingIcon, href: "/services/software-testing" },
  { title: "Professional Consulting", image: serviceConsulting, logo: consultingIcon, href: "/services/professional-consulting" },
  { title: "Application Maintenance & Management", image: serviceMaintenance, logo: maintenanceIcon, href: "/services/application-maintenance" },
  { title: "DevOps and Automation Services", image: serviceDevops, logo: devopsIcon, href: "/services/devops-automation" },

  // Cyber Security
  {
    title: "Cloud Security",
    image: cloudSecurityImg,
    logo: cloudIcon,
    href: "/services/cloud-security",
  },
  {
    title: "Mobile Application Security",
    image: mobileSecurityImg,
    logo: mobileIcon,
    href: "/services/mobile-security",
  },
  {
    title: "Application Security",
    image: applicationSecurityImg,
    logo: appSecIcon,
    href: "/services/application-security",
  },
  {
    title: "Network Infrastructure Security",
    image: networkSecurityImg,
    logo: networkIcon,
    href: "/services/network-security",
  },
  {
    title: "Audit & Compliance",
    image: auditComplianceImg,
    logo: auditIcon,
    href: "/services/audit-and-compliance",
  },
  {
    title: "SOC & Global Threat Management",
    image: socThreatImg,
    logo: socIcon,
    href: "/services/soc-global-threat-management",
  },
];

const Services = () => {
  const [showAll, setShowAll] = useState(false);

  // Show all or hide the last two
  const visibleServices = showAll ? allServices : allServices.slice(0, allServices.length - 2);

  return (
    <div className="min-h-screen bg-background">
      <TopContactBar />
      <Header />

      {/* HERO SECTION */}
      <section
        className="relative py-24 md:py-28 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${servicesHeroBg})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Services</h1>

          <div className="flex items-center justify-center gap-2 text-white/80">
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent">Services</span>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <main className="py-20 bg-secondary">
        <section id="services" className="w-full">
          <div className="w-full px-3 sm:px-4 lg:px-8 xl:px-12">
            {/* Heading */}
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#f58220]">
                MIDASIS CONSULTING LLC
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-[#15172b]">
                Our World-Class Services
              </h2>
            </div>

            {/* SERVICE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {visibleServices.map((service) => (
                <div
                  key={service.title}
                  className="
                    group relative block mx-auto w-[95%] sm:w-full
                    overflow-hidden shadow-xl
                    transition-all duration-500
                    hover:-translate-y-3 hover:shadow-2xl
                  "
                >
                  <div className="relative h-[400px] sm:h-[430px] md:h-[460px] w-full">
                    {/* Background image */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="
                        absolute inset-0 h-full w-full object-cover
                        transition-transform duration-500 group-hover:scale-110
                      "
                    />

                    {/* Gradient overlay */}
                    <div
                      className="
                        absolute inset-0 bg-gradient-to-t
                        from-black/90 via-black/60 to-transparent
                      "
                    />

                    {/* Icon + Title */}
                    <div className="absolute bottom-20 left-5 flex items-center gap-4">
                      <div
                        className="
                          h-20 w-20 bg-[#11153b] shadow-lg
                          flex items-center justify-center
                          transition-transform duration-500
                          group-hover:-translate-y-1 group-hover:translate-x-1
                        "
                      >
                        <img src={service.logo} className="h-10 w-10 object-contain" />
                      </div>

                      <h3 className="text-2xl font-semibold text-white group-hover:text-[#f58220]">
                        {service.title}
                      </h3>
                    </div>

                    {/* Read More – ONLY this is clickable */}
                    <div
                      className="
                        absolute bottom-6 left-5 opacity-0 translate-y-2
                        transition-all duration-300
                        group-hover:opacity-100 group-hover:translate-y-0
                      "
                    >
                      <Link to={service.href}>
                        <span className="flex items-center gap-2 text-lg font-semibold text-[#f58220]">
                          <span className="group-hover:underline">Read More</span>
                          <ArrowRight className="h-5 w-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA BUTTON – toggles last two services */}
            <div className="mt-12 text-center">
              <Button
                variant="orange"
                size="lg"
                className="px-10 py-5 font-semibold tracking-wide"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? "Show Less" : "All Our Services"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
