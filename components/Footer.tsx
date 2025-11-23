import Image from "next/image";
import { PiPhoneCall, PiEnvelopeSimple } from "react-icons/pi";
import { FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2C2C2C] text-white px-6 py-12 md:px-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr] gap-12">
        <div className="space-y-4">
          <div className="flex">
            <Image
              src="/img/moflo.png"
              alt="MoFlo logo"
              width={40}
              height={20}
              className="mr-2"
            />
            <p className="text-4xl">MoFlo</p>
          </div>
          <p className="text-sm text-gray-300">
            AI solutions designed for small and medium-sized businesses.
          </p>

          <div className="pt-4 flex gap-4">
            <div className="flex items-center gap-2 py-2 hover:cursor-pointer group">
              <PiEnvelopeSimple size={18} />
              <span>info@moflo.ai</span>
              <FaArrowRight
                size={16}
                className="transform transition-all duration-300 group-hover:translate-x-1"
              />
            </div>

            {/* Divider */}
            <div className="self-center h-10 w-[4px] bg-[#3d3d3d]"></div>

            <div className="flex items-center gap-2 py-2 hover:cursor-pointer group">
              <PiPhoneCall size={18} />
              <span>(702) 350-1757</span>
              <FaArrowRight
                size={16}
                className="transform transition-all duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <p className="mb-2">Socials:</p>
            <div className="flex items-center gap-4 text-lg">
              <FaLinkedinIn className="cursor-pointer text-blue-600 hover:text-white text-xl" />
              <FaXTwitter className="cursor-pointer text-blue-600 hover:text-white text-xl" />
              <FaInstagram className="cursor-pointer text-blue-600 hover:text-white text-xl" />
              <CiFacebook className="cursor-pointer text-blue-600 hover:text-white text-2xl" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">Quick Links</h2>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>About</li>
            <li>FAQs</li>
            <li>Careers</li>
            <li>Case Studies</li>
            <li>Blogs</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">Solutions</h2>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>MoSocial</li>
            <li>MoMail</li>
            <li>MoLetters</li>
            <li>MoLeads</li>
            <li>MoClicks</li>
            <li>MoBlogs</li>
            <li>MoQuotes</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">Industries</h2>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>Real Estate</li>
            <li>High Tech</li>
            <li>Trades & Services</li>
            <li>Franchises</li>
            <li>Professional Services</li>
            <li>Insurance</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
