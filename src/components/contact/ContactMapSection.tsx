const ContactMapSection = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold mb-2">EDATAFORCE CONSULTING LLC</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy">Find Us On The Map</h2>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.6547892890454!2d-97.09698692426673!3d33.03398417400054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c2a8b0e4f9f9f%3A0x1234567890abcdef!2s1011%20Surrey%20Ln%2C%20Flower%20Mound%2C%20TX%2075022!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="eDataForce Office Location"
            className="w-full"
          />
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <h3 className="font-bold text-navy text-lg mb-2">Headquarters</h3>
            <p className="text-muted-foreground">
              1011 Surrey Lane, Bldg. 200<br />
              Flower Mound, TX 75022
            </p>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-navy text-lg mb-2">Business Hours</h3>
            <p className="text-muted-foreground">
              Monday - Friday: 8:00 AM - 5:00 PM<br />
              Saturday & Sunday: Closed
            </p>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-navy text-lg mb-2">Quick Contact</h3>
            <p className="text-muted-foreground">
              Phone: +1 (972) 989-3398<br />
              Email: info@edataforce.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
