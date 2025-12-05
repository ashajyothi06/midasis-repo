import { useParams, Link } from "react-router-dom";
import TopContactBar from "@/components/TopContactBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";

import aiHeroBg from "@/assets/ai-services-banner.png";

// Import service content components
import AiServicesContent from "@/components/services/AiServicesContent";
import ProjectServicesContent from "@/components/services/ProjectServicesContent";
import StaffAugmentationContent from "@/components/services/StaffAugmentationContent";
import PermanentPlacementContent from "@/components/services/PermanentPlacementContent";
import SoftwareTestingContent from "@/components/services/SoftwareTestingContent";
import ProfessionalConsultingContent from "@/components/services/ProfessionalConsultingContent";
import ApplicationMaintenanceContent from "@/components/services/ApplicationMaintenanceContent";
import DevOpsAutomationContent from "@/components/services/DevOpsAutomationContent";

const serviceMeta: Record<string, { title: string; heroTitle: string }> = {
  "ai-services": { title: "AI Services & Products", heroTitle: "AI Services & Products" },
  "project-services": { title: "Project Services", heroTitle: "Project Services" },
  "staff-augmentation": { title: "Staff Augmentation", heroTitle: "Staff Augmentation" },
  "permanent-placement": { title: "Permanent Placement Service", heroTitle: "Permanent Placement Service" },
  "software-testing": { title: "Software Testing", heroTitle: "Software Testing" },
  "professional-consulting": { title: "Professional Consulting", heroTitle: "Professional Consulting" },
  "application-maintenance": {
    title: "Application Maintenance & Management",
    heroTitle: "Application Maintenance & Management",
  },
  "devops-automation": {
    title: "DevOps And Automation Services",
    heroTitle: "DevOps And Automation Services",
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

      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      {/* HERO SECTION WITH SMALLER HEIGHT */}
<section
  className="
    relative 
    bg-cover bg-center bg-no-repeat 
    flex items-center justify-center
    min-h-[260px] 
    sm:min-h-[300px] 
    md:min-h-[340px] 
    lg:min-h-[400px]
  "
  style={{ backgroundImage: `url(${aiHeroBg})` }}
>
  {/* overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* content */}
  <div className="container mx-auto px-4 relative z-10 text-center">
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
      {meta.heroTitle}
    </h1>

    <div className="flex items-center justify-center gap-2 text-white/70 text-sm md:text-base">
      <Link to="/" className="hover:text-accent transition-colors">
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />

      {/* 👉 Service name is now white, not orange */}
      <span className="text-white underline">{meta.title}</span>
    </div>
  </div>
</section>


      {/* MAIN CONTENT – FULL WIDTH, NO CENTRAL RESTRICTION */}
      <main className="py-20 bg-secondary w-full">
        {/* no container / max-w here: each service component controls its own layout */}
        <CurrentServiceContent />
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
