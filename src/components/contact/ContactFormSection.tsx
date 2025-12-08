import { MapPin, Mail, Phone, Clock } from "lucide-react";

const ContactFormSection = () => {
  return (
    <section className="py-16 bg-[#f6f4ff]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-navy mb-2">
            Midasis Consulting LLC
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            Contact Information
          </h2>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Office Location */}
          <div className="bg-white shadow-md rounded-none px-8 py-10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-navy flex items-center justify-center">
              <MapPin className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy mb-2">
                Office Location
              </h3>
              <p className="text-sm text-navy leading-relaxed">
                1011 Surrey Lane, Bldg. 200
                <br />
                FLOWER MOUND, TX 75022
              </p>
            </div>
          </div>

          {/* Email Us */}
          <div className="bg-white shadow-md rounded-none px-8 py-10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-navy flex items-center justify-center">
              <Mail className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy mb-2">
                Email Us
              </h3>
              <p className="text-sm text-navy leading-relaxed">
                <a
                  href="mailto:info@midasis.com"
                  className="hover:text-[#f58220] transition-colors"
                >
                  info@midasis.com
                </a>
              </p>
            </div>
          </div>

          {/* Phone No */}
          <div className="bg-white shadow-md rounded-none px-8 py-10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-navy flex items-center justify-center">
              <Phone className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy mb-2">
                Phone No
              </h3>
              <p className="text-sm text-navy leading-relaxed">
                Sales &amp; Support:
                <br />
                <a
                  href="tel:+19729893398"
                  className="hover:text-[#f58220] transition-colors"
                >
                  +1 (972) 989-3398
                </a>
              </p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-white shadow-md rounded-none px-8 py-10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-navy flex items-center justify-center">
              <Clock className="w-6 h-6 text-navy" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy mb-2">
                Office Hours
              </h3>
              <p className="text-sm text-navy leading-relaxed">
                Monday to Friday:
                <br />
                08:00 AM - 05:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
