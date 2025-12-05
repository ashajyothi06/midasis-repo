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
  // Responsive: 1 slide on mobile, 2 on desktop
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

  // Ensure page stays valid when resizing device
  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [totalPages, page]);

  // AUTO-SCROLL LOOP
  useEffect(() => {
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 3000); // Slide moves every 3 sec

    return () => clearInterval(interval);
  }, [totalPages]);

  return (
    <section className="py-20 bg-[#f5f4ff]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] text-[#f58220] font-semibold mb-3">
            EDATAFORCE CONSULTING LLC
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#15172b]">
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
                      {/* Title + stars */}
                      <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="text-3xl text-[#15172b] leading-none">“</span>
                        <h3 className="text-xl md:text-2xl font-bold text-[#15172b]">
                          {testimonial.title}
                        </h3>
                        <span className="text-3xl text-[#15172b] leading-none">„</span>

                        <div className="flex gap-1 ml-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-[#f6b23c] text-[#f6b23c]"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Text */}
                      <p className="mb-8 text-[15px] leading-relaxed text-[#4a4c63]">
                        {testimonial.text}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-4xl text-[#11185a]">
                          <span>‟</span>
                          <span>‟</span>
                        </div>
                        <div>
                          <p className="font-bold text-[#15172b] text-lg">
                            {testimonial.author}
                          </p>
                          <p className="text-sm text-[#7a7c9e]">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 NO DOTS, NO BUTTONS — CLEAN AUTO SCROLLING */}
      </div>
    </section>
  );
};

export default TestimonialsSection;
