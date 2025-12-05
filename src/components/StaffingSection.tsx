import { useState } from "react";
import { CheckSquare, List } from "lucide-react";
import { cn } from "@/lib/utils";
import teamMeeting from "@/assets/edataforce-hmabt-1a.jpg";
import teamOutside from "@/assets/edataforce-hmabt-2a.jpg";

const tabs = [
  {
    id: "tailored",
    icon: CheckSquare,
    label: "Tailored Talent Acquisition for Success",
    content: `eDataForce delivers tailored staffing solutions that align with your unique business needs, ensuring that you have the right talent to drive success. Our customized talent acquisition strategies go beyond traditional recruitment by deeply understanding your company's culture, goals, and specific role requirements. Leveraging advanced AI-driven recruitment tools, we source top-tier professionals who fit seamlessly into your organization. Our rigorous screening process guarantees high-quality candidates who are not just technically proficient but also a great cultural match. Whether you need contract, full-time, or project-based hires, eDataForce provides flexible staffing solutions designed to optimize your workforce, save time, and enhance productivity. Trust us to elevate your team with the best talent in the market.`,
    image: teamMeeting,
    imagePosition: "left",
  },
  {
    id: "seamless",
    icon: List,
    label: "Seamless Placements for Flexible Staffing",
    content: `At eDataForce, we specialize in seamless placements that offer flexibility and efficiency for your staffing needs. Our expert recruitment team connects you with highly skilled professionals for contract, contract-to-hire, and direct placement roles, ensuring a smooth integration into your team. We understand that business demands can change rapidly, and our adaptable staffing solutions are designed to scale with you. By leveraging our extensive talent network and strategic placement approach, we help you enhance operational efficiency and meet project goals. eDataForce focuses on providing personalized support and a streamlined hiring process, reducing your time-to-fill and ensuring the best fit for your organization. Let us be your trusted partner in building a high-performing workforce.`,
    image: teamOutside,
    imagePosition: "right",
  },
];

const StaffingSection = () => {
  const [activeTab, setActiveTab] = useState("tailored");
  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">

        {/* Section Headings */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">EDATAFORCE CONSULTING LLC</p>

          {/* Force 2-line layout on mobile */}
          <h2 className="font-bold text-navy text-[1.9rem] sm:text-4xl leading-tight">
            Expert Staffing Solutions <br className="sm:hidden" />
            and Strategic Talent Placements
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-6 py-3 font-bold transition-all border-b-2",
                activeTab === tab.id
                  ? "text-navy border-navy"
                  : "text-[#333] border-transparent hover:text-navy"
              )}
            >
              {/* Larger, thicker icons */}
              <tab.icon className="w-10 h-10 stroke-[2.5]" />
              <span className="text-sm sm:text-base font-bold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Section */}
        {activeContent && (
          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
              activeContent.imagePosition === "right" && "lg:grid-flow-dense"
            )}
          >
            {/* Image */}
            <div
              className={cn(
                activeContent.imagePosition === "right" && "lg:col-start-2"
              )}
            >
              <img
                src={activeContent.image}
                alt={activeContent.label}
                className="w-full object-cover shadow-xl" // sharp edges — no rounding
              />
            </div>

            {/* Text */}
            <div
              className={cn(
                activeContent.imagePosition === "right" && "lg:col-start-1"
              )}
            >
              <p className="text-[#000] leading-relaxed text-lg sm:text-xl">
                {activeContent.content}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default StaffingSection;
