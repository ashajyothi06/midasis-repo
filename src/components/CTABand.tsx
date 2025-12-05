import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTABand = () => {
  return (
    <section id="contact" className="bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-accent-foreground/80 text-lg">Have Any Questions?</p>
            <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground">
              We are here to grow your business!
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button variant="navy" size="lg" className="rounded-full">
              Get In Touch <ArrowRight className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-accent-foreground/70 text-sm">Hotline</p>
                <p className="text-accent-foreground font-bold">+1 (972) 989-3398</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
