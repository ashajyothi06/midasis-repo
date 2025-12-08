import { useState, useEffect, useMemo, useRef } from "react";
import { Star } from "lucide-react";
import testimonialChris from "@/assets/testimonial-chris.jpg";
import testimonialPawan from "@/assets/testimonial-pawan.jpg";

const testimonials = [
  {
    quote: "Trusted Partner",
    text: "Their seamless process, attention to detail, and quick turnaround time have significantly improved our hiring efficiency. We couldn’t be happier with the results eDataForce provided.",
    author: "Jose T. McMichael",
    title: "Head Of Marketing",
    image: testimonialChris,
  },
  {
    quote: "Exceptional Service",
    text: "eDataForce has been an invaluable partner in meeting our staffing needs. We highly recommend eDataForce for strategic staffing solutions.",
    author: "Jane Smith",
    title: "Head Of Products",
    image: testimonialPawan,
  },
  {
    quote: "Seamless Collaboration",
    text: "The eDataForce team integrated smoothly with our internal processes, delivering high-impact results.",
    author: "Amanda Lee",
    title: "Director Of Operations",
    image: testimonialChris,
  },
  {
    quote: "Strategic Partnership",
    text: "eDataForce helps us plan ahead and ensures we always have access to the right talent.",
    author: "Rahul Verma",
    title: "HR Business Partner",
    image: testimonialPawan,
  },
];

const AboutTestimonialsSection = () => {
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    const update = () =>
      setPageSize(window.innerWidth >= 1024 ? 2 : 1);

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pages = useMemo(() => {
    const output = [];
    for (let i = 0; i < testimonials.length; i += pageSize) {
      output.push(testimonials.slice(i, i + pageSize));
    }
    return output;
  }, [pageSize]);

  const [page, setPage] = useState(0);
  const totalPages = pages.length;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, [totalPages]);

  return (
    <section
      className="py-20 bg-[#f5f4ff]"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <p
            style={{
              fontSize: "18px",
              fontFamily: "Roboto, sans-serif",
              color: "#FF6000",
              letterSpacing: "0.25em",
              fontWeight: "700",
            }}
          >
            MIDASIS CONSULTING LLC
          </p>

          <h2
            style={{
              fontSize: "26px",
              fontFamily: "Poppins, sans-serif",
              color: "#121158",
              fontWeight: "700",
            }}
          >
            What Our Clients Say About Us
          </h2>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((group, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <div
                  className={`grid gap-10 ${pageSize === 2 ? "lg:grid-cols-2" : "grid-cols-1"}`}
                >
                  {group.map((t, index) => (
                    <article
                      key={index}
                      className="bg-white rounded-xl shadow-md border border-[#ece9ff] px-8 py-10"
                    >
                      {/* TOP BLOCK */}
                      <div className="flex items-center gap-6 mb-6">
                        <img
                          src={t.image}
                          alt={t.author}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
                        />

                        <div>
                          {/* Quote Title */}
                          <h3
                            style={{
                              fontSize: "20px",
                              fontFamily: "Poppins, sans-serif",
                              color: "#121158",
                              fontWeight: "600",
                            }}
                            className="mb-1"
                          >
                            “ {t.quote} ”
                          </h3>

                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-[#f6b400] fill-[#f6b400]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* MAIN TEXT */}
                      <p
                        style={{
                          fontSize: "18px",
                          fontFamily: "Roboto, sans-serif",
                          color: "#000000",
                        }}
                        className="leading-relaxed mb-8"
                      >
                        {t.text}
                      </p>

                      {/* AUTHOR */}
                      <div className="flex items-center gap-4">
                        <span className="text-4xl text-[#121158]">”</span>
                        <div>
                          <p
                            style={{
                              fontSize: "18px",
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: "600",
                              color: "#1B1F2E",
                            }}
                          >
                            {t.author}
                          </p>
                          <p
                            style={{
                              fontSize: "16px",
                              fontFamily: "Roboto, sans-serif",
                              color: "#000000",
                            }}
                          >
                            {t.title}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutTestimonialsSection;
