import { useParams, Link } from "react-router-dom";
import TopContactBar from "@/components/TopContactBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";

import aiHeroBg from "@/assets/ai-services-banner.png";

// Existing service content components
import AiServicesContent from "@/components/services/AiServicesContent";
import ProjectServicesContent from "@/components/services/ProjectServicesContent";
import StaffAugmentationContent from "@/components/services/StaffAugmentationContent";
import PermanentPlacementContent from "@/components/services/PermanentPlacementContent";
import SoftwareTestingContent from "@/components/services/SoftwareTestingContent";
import ProfessionalConsultingContent from "@/components/services/ProfessionalConsultingContent";
import ApplicationMaintenanceContent from "@/components/services/ApplicationMaintenanceContent";
import DevOpsAutomationContent from "@/components/services/DevOpsAutomationContent";

// NEW CYBER SECURITY CONTENT COMPONENTS
import CloudSecurityContent from "@/components/services/CyberSecurityContent";
import MobileSecurityContent from "@/components/services/MobileSecurityContent";
import ApplicationSecurityContent from "@/components/services/ApplicationSecurityContent";
import NetworkSecurityContent from "@/components/services/NetworkSecurityContent";
import AuditAndComplianceContent from "@/components/services/AuditAndComplianceContent";
import SocGlobalThreatServicesContent from "@/components/services/SocGlobalThreatContent";

const serviceMeta: Record<string, { title: string; heroTitle: string }> = {
  "ai-services": { title: "AI Services & Products", heroTitle: "AI Services & Products" },
  "project-services": { title: "Project Services", heroTitle: "Project Services" },
  "staff-augmentation": { title: "Staff Augmentation", heroTitle: "Staff Augmentation" },
  "permanent-placement": {
    title: "Permanent Placement Service",
    heroTitle: "Permanent Placement Service",
  },
  "software-testing": { title: "Software Testing", heroTitle: "Software Testing" },
  "professional-consulting": {
    title: "Professional Consulting",
    heroTitle: "Professional Consulting",
  },
  "application-maintenance": {
    title: "Application Maintenance & Management",
    heroTitle: "Application Maintenance & Management",
  },
  "devops-automation": {
    title: "DevOps And Automation Services",
    heroTitle: "DevOps And Automation Services",
  },

  // ✅ CYBERSECURITY META WITH CORRECT SLUGS
  "cloud-security": {
    title: "Cloud Security",
    heroTitle: "Cloud Security Services",
  },
  "mobile-security": {
    title: "Mobile Application Security",
    heroTitle: "Mobile Application Security",
  },
  "application-security": {
    title: "Application Security",
    heroTitle: "Application Security Services",
  },
  "network-security": {
    title: "Network Infrastructure Security",
    heroTitle: "Network Infrastructure Security",
  },
  "audit-compliance": {
    title: "Audit & Compliance",
    heroTitle: "Audit & Compliance Services",
  },
  "soc-global-threat": {
    title: "SOC & Global Threat Management",
    heroTitle: "SOC & Global Threat Management Services",
  },
};

const serviceComponents: Record<string, () => JSX.Element> = {
  "ai-services": AiServicesContent,
  "project-services": ProjectServicesContent,
  "staff-augmentation": StaffAugmentationContent,
  "permanent-placement": PermanentPlacementContent,
  "software-testing": SoftwareTestingContent,
  "professional-consulting": ProfessionalConsultingContent,
  "application-maintenance": ApplicationMaintenanceContent,
  "devops-automation": DevOpsAutomationContent,

  // ✅ CYBERSECURITY COMPONENTS WITH MATCHING KEYS
  "cloud-security": CloudSecurityContent,
  "mobile-security": MobileSecurityContent,
  "application-security": ApplicationSecurityContent,
  "network-security": NetworkSecurityContent,
  "audit-compliance": AuditAndComplianceContent,
  "soc-global-threat": SocGlobalThreatServicesContent,
};

const ServiceDetail = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();

  const slug = serviceSlug && serviceMeta[serviceSlug] ? serviceSlug : "ai-services";
  const meta = serviceMeta[slug];
  const CurrentServiceContent = serviceComponents[slug] || AiServicesContent;

  return (
    <div className="min-h-screen bg-background">
      <TopContactBar />
      <Header />

      {/* HERO SECTION */}
      <section
        className="
          relative bg-cover bg-center bg-no-repeat
          flex items-center justify-center
          min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[400px]
        "
        style={{ backgroundImage: `url(${aiHeroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {meta.heroTitle}
          </h1>

          <div className="flex items-center justify-center gap-2 text-white/70">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white underline">{meta.title}</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="py-20 bg-secondary w-full">
        <CurrentServiceContent />
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
