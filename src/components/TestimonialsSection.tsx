import { useState, useMemo, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    title: "Reliable Staffing",
    text: "Working with eDataForce transformed our approach to staffing. They took the time to understand our needs and delivered exceptional candidates.",
    author: "Chris Bricker",
    role: "CEO & Founder",
  },
  {
    title: "Top Talent",
    text: "eDataForce stands out in staffing and placements with their commitment to quality and personalized service. They provided us with highly skilled professionals who exceeded our expectations.",
    author: "Pawan Sharma",
    role: "Senior Manager",
  },
  {
    title: "Seamless Collaboration",
    text: "The eDataForce team integrated seamlessly with our processes and consistently provided talent that matched both our technical and cultural needs.",
    author: "Amanda Lee",
    role: "Director of Operations",
  },
  {
    title: "Fast & Efficient",
    text: "Their speed and efficiency in closing critical roles helped us stay on track with our project timelines without compromising on quality.",
    author: "Rahul Verma",
    role: "HR Business Partner",
  },
];

const TestimonialsSection = () => {
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth >= 1024) setPageSize(2);
      else setPageSize(1);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < testimonials.length; i += pageSize) {
      chunks.push(testimonials.slice(i, i + pageSize));
    }
    return chunks;
  }, [pageSize]);

  const [page, setPage] = useState(0);
  const totalPages = pages.length;

  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [totalPages, page]);

  useEffect(() => {
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalPages]);

  return (
    <section className="py-20 bg-[#f5f4ff]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Headings */}
        <div className="text-center mb-12">
          <p
            className="font-semibold mb-3"
            style={{
              fontSize: "18px",
              color: "#FF6000",
              fontFamily: "Roboto, sans-serif",
              letterSpacing: "0.25em",
            }}
          >
            EDATAFORCE CONSULTING LLC
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
            {pages.map((items, idx) => (
              <div key={idx} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {items.map((testimonial, index) => (
                    <div
                      key={index}
                      className="bg-white p-10 shadow-md rounded-none"
                    >
                      {/* Title + Stars */}
                      <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="text-3xl text-[#1B1F2E] leading-none">“</span>

                        <h3
                          style={{
                            fontSize: "20px",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "600",
                            color: "#1B1F2E",
                          }}
                        >
                          {testimonial.title}
                        </h3>

                        <span className="text-3xl text-[#1B1F2E] leading-none">„</span>

                        <div className="flex gap-1 ml-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-[#f6b23c] text-[#f6b23c]"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Body Text */}
                      <p
                        className="mb-8 leading-relaxed"
                        style={{
                          fontSize: "16px",
                          fontFamily: "Roboto, sans-serif",
                          color: "#000000",
                        }}
                      >
                        {testimonial.text}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-4xl text-[#11185a]">
                          <span>‟</span>
                          <span>‟</span>
                        </div>

                        <div>
                          <p
                            style={{
                              fontSize: "18px",
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: "600",
                              color: "#1B1F2E",
                            }}
                          >
                            {testimonial.author}
                          </p>

                          <p className="text-sm text-[#7a7c9e]">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-scroll only — no buttons */}
      </div>
    </section>
  );
};

export default TestimonialsSection;
