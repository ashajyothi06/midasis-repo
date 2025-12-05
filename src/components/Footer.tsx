import { MapPin, Mail, Phone, Calendar } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";

import ctaBg from "@/assets/about-team-2.jpg";
import news1 from "@/assets/blog2.png";
import news2 from "@/assets/blog1.png";

const siteLinks = [
  "A.I. Services",
  "Professional Consulting",
  "Project Services",
  "Staff Augmentation",
  "Software Testing",
  "Application Maintenance",
];

const recentNews = [
  {
    date: "September 22, 2024",
    title: "Business Strategy: Unlocking Growth..",
    image: news1,
  },
  {
    date: "August 25, 2024",
    title: "Navigating the Job Market...",
    image: news2,
  },
];

const Footer = () => {
  return (
    // 🔹 Footer background is dark to avoid white strip at bottom
    <footer className="relative bg-[#101522] text-white pt-16 overflow-hidden">
      {/* 🔹 White strip behind the top so CTA top half is on white */}
      <div className="absolute inset-x-0 top-0 h-40 bg-white" />

      {/* ==================== CTA CARD (CENTERED, IN FLOW) ==================== */}
      <div className="relative flex justify-center z-20">
        <div className="relative w-[94%] md:w-[88%] lg:w-[80%] bg-[#f58220] overflow-hidden shadow-xl">
          {/* background image, blended to look transparent */}
          <img
            src={ctaBg}
            alt="We are here to grow your business"
            className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-multiply"
          />
          {/* content */}
          <div className="relative px-6 md:px-12 py-8 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
            {/* text */}
            <div className="text-left">
              <p className="text-sm font-semibold mb-3">Have Any Questions?</p>
              <h2 className="text-2xl md:text-4xl font-extrabold leading-snug">
                We are here to grow <br /> your business!
              </h2>
            </div>

            {/* button + hotline */}
            <div className="flex flex-col sm:flex-row items-center gap-5 md:gap-8">
              <button className="bg-[#11151f] text-white px-6 py-3 rounded-md font-semibold text-sm md:text-base flex items-center gap-2 w-full sm:w-auto justify-center">
                Get In Touch
                <span className="text-lg">➝</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#11151f] shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-sm text-black">
                  <p className="text-xs">Hotline</p>
                  <p className="font-semibold">+1 (972) 989-3398</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== DARK FOOTER (PULLED UP BEHIND CTA) ==================== */}
      {/* ⬇️ This stays the same – it’s what makes the CTA half overlap the footer */}
      <div className="relative mt-[-60px] md:mt-[-70px] bg-[#101522] text-white pt-24">
        {/* left dark curved shape */}
        <div className="pointer-events-none absolute -bottom-32 -left-40 w-[360px] h-[260px] rounded-[60%] bg-[#050814] opacity-70" />

        {/* right wavy pattern ONLY (green blob removed) */}
        <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[260px]">
          <div
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 20% 20%, transparent 0, transparent 6px, rgba(255,255,255,0.08) 7px, rgba(255,255,255,0.08) 8px)",
              backgroundSize: "180px 180px",
            }}
          />
        </div>

        {/* LOGO + NAV STRIP */}
        <div className="max-w-6xl mx-auto px-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-3xl font-extrabold">
            <span className="text-[#1c2b81] drop-shadow-[0_0_3px_rgba(0,0,0,0.7)]">
              edata
            </span>
            <span className="text-[#f58220] drop-shadow-[0_0_3px_rgba(0,0,0,0.7)]">
              force
            </span>
          </div>

          <nav className="flex flex-wrap gap-6 text-xs md:text-sm font-semibold tracking-wide justify-center">
            <a href="#about" className="hover:text-[#f58220]">
              ABOUT
            </a>
            <a href="#services" className="hover:text-[#f58220]">
              SERVICES
            </a>
            <a href="#career" className="hover:text-[#f58220]">
              CAREER
            </a>
            <a href="#contact" className="hover:text-[#f58220]">
              CONTACT
            </a>
          </nav>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="relative max-w-6xl mx-auto px-8 pt-8 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-5">About</h3>
            <p className="text-white/70 text-sm mb-6 max-w-xs">
              At eDataForce, We Provide the next generation of A.I Services &amp;
              Solutions!
            </p>
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#f58220] mt-1" />
                <span>
                  1011 Surrey Lane, Bldg. 200
                  <br />
                  FLOWER MOUND, TX 75022
                </span>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-[#f58220]" />
                <span>info@edataforce.com</span>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-[#f58220]" />
                <span>+1 (972) 989-3398</span>
              </div>
            </div>
          </div>

          {/* Site Links */}
          <div>
            <h3 className="text-xl font-bold mb-5">Site Links</h3>
            <ul className="space-y-3">
              {siteLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/70 hover:text-[#f58220]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent News */}
          <div>
            <h3 className="text-xl font-bold mb-5">Recent News</h3>
            <div className="space-y-5">
              {recentNews.map((news, idx) => (
                <div key={idx} className="flex gap-3">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-16 h-16 rounded object-cover flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-xs text-white/55 mb-1">
                      <Calendar className="w-3 h-3" />
                      {news.date}
                    </div>
                    <p className="text-sm text-white hover:text-[#f58220] cursor-pointer">
                      {news.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-5">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-transparent border border-white/30 flex items-center justify-center hover:bg-[#f58220] hover:border-transparent transition-colors"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-transparent border border-white/30 flex items-center justify-center hover:bg-[#f58220] hover:border-transparent transition-colors"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-transparent border border-white/30 flex items-center justify-center hover:bg-[#f58220] hover:border-transparent transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT (inside dark area so no white strip under footer) */}
        <div className="border-t border-[#161b2a] py-4">
          <p className="text-center text-sm text-white/60">
            © 2024 eDataForce Consulting LLC. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
