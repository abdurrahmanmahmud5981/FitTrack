
import { Typography } from '@material-tailwind/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from "../../assets/logo.svg"
const navigationLinks = [
  { title: "Company", links: ["About Us", "Team", "Careers", "Contact"] },
  { title: "Products", links: ["Services", "Pricing", "Features", "Solutions"] },
  { title: "Resources", links: ["Blog", "Documentation", "FAQs", "Support"] }
];

const socialLinks = [
  { icon: <FaFacebook className="w-5 h-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <FaInstagram className="w-5 h-5" />, href: "#", label: "Instagram" },
  { icon: <FaLinkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="mx-auto max-w-[1580px] px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-3 text-xl font-bold text-orange-500"><img src={logo} alt="footer logo " className='w-8' /> FitTrack</h2>
            <p className="text-sm text-gray-400">
              Empowering your fitness journey with expert guidance and support.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {navigationLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            {/* Copyright */}
            <Typography className="text-sm text-gray-400">
              &copy; {currentYear} FitTrack. All rights reserved.
            </Typography>

            {/* Legal Links */}
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"]?.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;