"use client"
import React from "react";
import Image from "next/image";
import TransitionLink from "./transition-link";
import { Icon } from "@iconify/react";

import { useBrandStore } from "@/store/useBrandStore";
import Link from "next/link";

const Footer = () => {
  const { brands, fetchBrands } = useBrandStore();

  React.useEffect(() => {
    if (brands.length === 0) {
      fetchBrands();
    }
  }, [brands.length, fetchBrands]);

  return (
    <div className="relative pt-20 bg-[#9FE574] text-[#1A4D2E]">
      {/* Top Section with Logo */}
      <div className="max-w-7xl mx-auto px-4 xl:px-0 mb-12">
        <h2 className="text-4xl italic font-serif font-montserrat font-semibold text-[#1A4D2E]">CCR</h2>
      </div>

      <hr className="border-[#1A4D2E]/40" />

      <footer className="w-full max-w-7xl xl:px-0 mx-auto  px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side - Links (7 cols) */}
          <div className="lg:col-span-7 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brands */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-[#1A4D2E]">Our Brands</h4>
              <ul className="space-y-3 text-sm">
                {brands?.map((brand) => (
                  <li key={brand.id}>
                    <TransitionLink href={`/brand/${brand.slug}`} className="hover:text-primary transition-colors">
                      {brand.name}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-[#1A4D2E]">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <TransitionLink href="/cookies-policy" className="hover:text-primary transition-colors">
                    Cookies Policy
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/terms-and-conditions" className="hover:text-primary transition-colors">
                    Terms & Conditions
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/privacy-policy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink href="/faq" className="hover:text-primary transition-colors">
                    FAQs
                  </TransitionLink>
                </li>
              </ul>
            </div>

            {/* Contact / About */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-[#1A4D2E]">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <h5 className="font-semibold mb-1">Head Office</h5>
                  <p className="opacity-80 leading-relaxed">4f, Mahavir plaza, Hospital chowk Biratnagar, Nepal</p>
                </li>
                <li>
                  <h5 className="font-semibold mb-1">Corporate Office</h5>
                  <p className="opacity-80 leading-relaxed">2F, Bishal Nagar Marg, Hadigaun, kathmandu -5 Bagmati Pradesh, Nepal</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Vertical Divider (Desktop only) */}
          <div className="hidden lg:block lg:col-span-1 flex justify-center">
            <div className="w-[0.5px] h-full bg-[#1A4D2E]/40"></div>
          </div>

          {/* Right Side - Newsletter & Socials (4 cols) */}
          <div className="lg:col-span-4 py-14 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif text-[#1A4D2E] mb-4">Join our mailing list</h3>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Stay in touch and receive occasional news and updates on programs and initiatives, partner success stories, certification tips, and more!
              </p>
              <button className="bg-[#0A2F1F] text-white px-8 py-3 rounded-full text-sm font-bold tracking-wider hover:bg-[#1A4D2E] transition-colors uppercase">
                Sign Up
              </button>
            </div>

            <div className="mt-12">
              <h4 className="text-xs font-bold tracking-wider uppercase mb-4 text-[#1A4D2E]">Follow Us</h4>
              <div className="flex gap-4">
                <TransitionLink href="https://www.facebook.com" target="_blank" className="bg-[#0A2F1F] text-white p-2 rounded-full hover:bg-[#1A4D2E] transition-colors">
                  <Icon icon="ri:facebook-fill" className="size-5" />
                </TransitionLink>
                <TransitionLink href="https://www.instagram.com" target="_blank" className="bg-[#0A2F1F] text-white p-2 rounded-full hover:bg-[#1A4D2E] transition-colors">
                  <Icon icon="mdi:instagram" className="size-5" />
                </TransitionLink>
                <TransitionLink href="https://www.twitter.com" target="_blank" className="bg-[#0A2F1F] text-white p-2 rounded-full hover:bg-[#1A4D2E] transition-colors">
                  <Icon icon="mdi:twitter" className="size-5" />
                </TransitionLink>
                <TransitionLink href="https://www.linkedin.com" target="_blank" className="bg-[#0A2F1F] text-white p-2 rounded-full hover:bg-[#1A4D2E] transition-colors">
                  <Icon icon="mdi:linkedin" className="size-5" />
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className=" pt-8 pb-12 text-[#1A4D2E]">
        <div className="max-w-7xl mx-auto flex gap-10 px-4 xl:px-0">
          <p className="text-sm  ">
            © {new Date().getFullYear()} Plaza Sales Pvt. Ltd.
          </p>
          <p className="text-sm ">
            Designed and developed by Webx Nepal
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
