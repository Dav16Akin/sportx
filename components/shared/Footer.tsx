import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

// Chnage this with your own data
const defaultNavigationLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/gadgets", label: "Gadgets" },
];

const defaultSocialLinks = [
  {
    href: "https://x.com/loludavid1",
    icon: <Twitter size={24} />,
    hoverColor: "text-gray-600",
  },
  {
    href: "https://www.linkedin.com/in/david-akin-40393123b/",
    icon: <Linkedin size={24} />,
    hoverColor: "text-gray-600",
  },
  {
    href: "https://github.com/Dav16Akin",
    icon: <Github size={24} />,
    hoverColor: "text-gray-600",
  },
];

const Footer = ({
  navigationLinks = defaultNavigationLinks,
  socialLinks = defaultSocialLinks,
}) => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link href="/" className=" hover:text-gray-600">
              <h1>
                SPORT<span className="text-red-700 text-3xl">X</span>
              </h1>
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center space-x-6 text-sm">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-gray-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Social Icons */}
          <div className="flex flex-wrap justify-center space-x-4 ">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:${social.hoverColor || "text-"}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 mt-5">
          <div className="mt-5 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} SPORTX. All rights reserved.
              Design modelled after SPARTAX
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
