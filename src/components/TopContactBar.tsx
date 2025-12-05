import { Mail, Phone, Clock } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";

const TopContactBar = () => {
  return (
    <div className="w-full bg-[#001743] text-white text-xs">
      <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col sm:flex-row items-center sm:justify-between gap-2">

        {/* LEFT SIDE (HIDDEN ON MOBILE) */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="mailto:info@edataforce.com"
            className="flex items-center gap-2 hover:text-[#ff6a00] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#ff6a00]" />
            <span>info@edataforce.com</span>
          </a>

          <span className="text-white/80">•</span>

          <a
            href="tel:+19729893398"
            className="flex items-center gap-2 hover:text-[#ff6a00] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#ff6a00]" />
            <span>+1 (972) 989-3398</span>
          </a>

          <span className="text-white/80">•</span>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#ff6a00]" />
            <span>Monday to Friday - 08 AM to 05 PM</span>
          </div>
        </div>

        {/* RIGHT SIDE SOCIAL ICONS (CENTER ON MOBILE, NO CIRCLES ANYWHERE) */}
        <div className="flex items-center gap-4 justify-center w-full sm:w-auto">
          <a href="#" aria-label="LinkedIn" className="hover:text-[#ff6a00] transition-colors">
            <FaLinkedinIn className="w-5 h-5" />
          </a>

          <a href="#" aria-label="Facebook" className="hover:text-[#ff6a00] transition-colors">
            <FaFacebookF className="w-5 h-5" />
          </a>

          <a href="#" aria-label="Instagram" className="hover:text-[#ff6a00] transition-colors">
            <FaInstagram className="w-5 h-5" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopContactBar;
