import { Button } from "@/components/ui/button";

const ContactMapSection = () => {
  return (
    <section className="bg-secondary pt-0 pb-20">
      {/* MAP BLOCK */}
      <div className="w-full">
        <div className="w-full h-[280px] sm:h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.6547892890454!2d-97.09698692426673!3d33.03398417400054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c2a8b0e4f9f9f%3A0x1234567890abcdef!2s1011%20Surrey%20Ln%2C%20Flower%20Mound%2C%20TX%2075022!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="eDataForce Office Location"
          />
        </div>
      </div>

      {/* FORM – slight overlap on the map (about 10%) */}
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 md:-mt-12">
        <div className="w-full max-w-4xl bg-white shadow-2xl px-4 sm:px-6 md:px-10 py-8 md:py-10">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#f58220] mb-2">
              EDATAFORCE CONSULTING LLC
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#15172b]">
              Contact Form
            </h2>
          </div>

          <form className="space-y-6">
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-border bg-white px-4 py-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-[#11153b]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-border bg-white px-4 py-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-[#11153b]"
              />
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-border bg-white px-4 py-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-[#11153b]"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-border bg-white px-4 py-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-[#11153b]"
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                rows={5}
                placeholder="Type Your Message Here"
                className="w-full border border-border bg-white px-4 py-3 text-sm md:text-base outline-none resize-none focus:ring-2 focus:ring-[#11153b]"
              />
            </div>

            {/* Button */}
            <div className="flex justify-center mt-2">
              <Button
                type="submit"
                className="px-10 py-3 bg-[#11153b] hover:bg-[#0b0f30] text-white font-semibold tracking-wide rounded-none"
              >
                Send Message ➜
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
