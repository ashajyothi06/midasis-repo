import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// --- your images same as before ---
import serviceAi from "@/assets/AI-Services-img.jpg";
import serviceProject from "@/assets/Project-Services.jpg";
import serviceStaffing from "@/assets/Staff-Augmentation.jpg";
import servicePlacement from "@/assets/service-project.jpg";
import serviceTesting from "@/assets/Software-Testing.jpg";
import serviceConsulting from "@/assets/service-consulting.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import serviceDevops from "@/assets/DevOps-and-Automation-Services.jpg";
import cloudSecurityImg from "@/assets/cybersecurity-concept-illustration.jpg";
import mobileSecurityImg from "@/assets/mobileSecurity.png";
import applicationSecurityImg from "@/assets/applicationSecurity.jpg";
import networkSecurityImg from "@/assets/networkSecurity.jpg";
import auditComplianceImg from "@/assets/compliance.jpg";
import socThreatImg from "@/assets/SOC-global.png";

// icons
import aiIcon from "@/assets/Ai-Services-Icon.png";
import projectIcon from "@/assets/Project-Services-Icon.png";
import staffIcon from "@/assets/Staff-Augmentation-Icon.png";
import placementIcon from "@/assets/permanent-placement-icon.png";
import testingIcon from "@/assets/software-testing-icon.png";
import consultingIcon from "@/assets/professional-consulting-icon.png";
import maintenanceIcon from "@/assets/application-maintanance-icon.png";
import devopsIcon from "@/assets/devops-automation.png";
import cloudIcon from "@/assets/Ai-Services-Icon.png";
import mobileIcon from "@/assets/professional-consulting-icon.png";
import appSecIcon from "@/assets/Project-Services-Icon.png";
import networkIcon from "@/assets/Staff-Augmentation-Icon.png";
import auditIcon from "@/assets/professional-consulting-icon.png";
import socIcon from "@/assets/software-testing-icon.png";

type ServiceCard = {
  title: string;
  image: string;
  logo: string;
  href: string;
};

// ALL SERVICES LIST
const allServices: ServiceCard[] = [
  // First 12 (always visible)
  { title: "A.I. Services", image: serviceAi, logo: aiIcon, href: "/services/ai-services" },
  { title: "Project Services", image: serviceProject, logo: projectIcon, href: "/services/project-services" },
  { title: "Staff Augmentation", image: serviceStaffing, logo: staffIcon, href: "/services/staff-augmentation" },
  { title: "Permanent Placement Service", image: servicePlacement, logo: placementIcon, href: "/services/permanent-placement" },
  { title: "Software Testing", image: serviceTesting, logo: testingIcon, href: "/services/software-testing" },
  { title: "Professional Consulting", image: serviceConsulting, logo: consultingIcon, href: "/services/professional-consulting" },
  { title: "Application Maintenance & Management", image: serviceMaintenance, logo: maintenanceIcon, href: "/services/application-maintenance" },
  { title: "DevOps and Automation Services", image: serviceDevops, logo: devopsIcon, href: "/services/devops-automation" },
  { title: "Cloud Security", image: cloudSecurityImg, logo: cloudIcon, href: "/services/cloud-security" },
  { title: "Mobile Application Security", image: mobileSecurityImg, logo: mobileIcon, href: "/services/mobile-security" },
  { title: "Application Security", image: applicationSecurityImg, logo: appSecIcon, href: "/services/application-security" },
  { title: "Network Infrastructure Security", image: networkSecurityImg, logo: networkIcon, href: "/services/network-security" },

  // Last 2 (should show only when button clicked)
  { title: "Audit & Compliance", image: auditComplianceImg, logo: auditIcon, href: "/services/audit-compliance" },
  { title: "SOC & Global Threat Management", image: socThreatImg, logo: socIcon, href: "/services/soc-global-threat" },
];

const ServicesSection = () => {
  const [showAll, setShowAll] = useState(false);

  // Show first 12 OR all 14
  const visibleServices = showAll ? allServices : allServices.slice(0, 12);

  return (
    <>
      <section id="services" className="py-20 bg-[#f5f4ff] w-full">
        <div className="w-full px-2 sm:px-4 lg:px-8">

          {/* Heading */}
          <div className="mb-12 text-center">
            <p className="main-heading mb-3">EDATAFORCE CONSULTING LLC</p>
            <h2 className="title-heading font-extrabold tracking-wide">
              Our World-Class Services
            </h2>
          </div>

          {/* SERVICE CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleServices.map((service) => (
              <div
                key={service.title}
                className="group relative block mx-auto w-[96%] sm:w-full overflow-hidden shadow-xl transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="relative h-[420px] sm:h-[440px] md:h-[460px]">
                  
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#11153b]/95 via-[#11153b]/60 to-transparent" />

                  <div className="absolute bottom-20 left-5 flex items-center gap-4">
                    <div className="h-20 w-20 bg-[#11153b] flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                      <img src={service.logo} alt="" className="h-10 w-10 object-contain" />
                    </div>

                    <h3 className="service-title group-hover:text-[#f58220]">
                      {service.title}
                    </h3>
                  </div>

                  {/* READ MORE ONLY LINK */}
                  <div className="absolute bottom-6 left-5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <Link to={service.href}>
                      <span className="flex items-center gap-2 text-lg font-semibold text-[#f58220]">
                        <span className="group-hover:underline">Read More</span>
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* BUTTON: Toggle extra services */}
          <div className="mt-12 text-center">
            <Button
              variant="orange"
              size="lg"
              className="px-10 py-5 font-semibold tracking-wide"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "All Our Services"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

        </div>
      </section>
    </>
  );
};

export default ServicesSection;
