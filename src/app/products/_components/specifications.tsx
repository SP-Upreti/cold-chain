"use client";
import React, { useState, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPackage {
  title: string;
  price: number;
  yearlyDiscount: number;
  features: string[];
}

interface PricingData {
  title: string;
  shortDesc: string;
  packages: PricingPackage[];
}

export default function Specifications({ 
  speficication, 
  productType 
}: { 
  speficication: string;
  productType?: string;
}) {
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  if (!speficication) {
    return null;
  }

  // Check if product is SERVICE or SAAS and try to parse pricing data
  const isServiceOrSaas = productType === "SERVICE" || productType === "SAAS";
  let pricingData: PricingData | null = null;

  if (isServiceOrSaas) {
    try {
      pricingData = JSON.parse(speficication);
    } catch (error) {
      console.error("Failed to parse pricing data:", error);
    }
  }

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsla(0, 100%, 59%, 1.00)",
          "hsla(210, 100%, 64%, 1.00)",
          "hsla(120, 94%, 62%, 1.00)",
          "hsla(50, 100%, 58%, 1.00)",
          "hsla(330, 100%, 67%, 1.00)",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  // If it's a SERVICE/SAAS with valid pricing data, show pricing table
  if (isServiceOrSaas && pricingData && pricingData.packages) {
    return (
      <section className="py-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight">
            {pricingData.title}
          </h2>
          <p className="text-muted-foreground text-lg whitespace-pre-line max-w-3xl mx-auto">
            {pricingData.shortDesc}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <label className="relative inline-flex items-center cursor-pointer">
            <Label>
              <Switch
                ref={switchRef}
                checked={!isMonthly}
                onCheckedChange={handleToggle}
                className="relative"
              />
            </Label>
          </label>
          <span className="ml-2 font-semibold">
            Annual billing{" "}
            <span className="text-primary">
              (Save up to {Math.max(...pricingData.packages.map(p => p.yearlyDiscount))}%)
            </span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
          {pricingData.packages.map((pkg, index) => {
            const monthlyPrice = pkg.price;
            const yearlyPrice = monthlyPrice * 12 * (1 - pkg.yearlyDiscount / 100);
            const displayPrice = isMonthly ? monthlyPrice : yearlyPrice / 12;
            const isPopular = index === 1;

            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 1 }}
                whileInView={
                  isDesktop
                    ? {
                        y: isPopular ? -20 : 0,
                        opacity: 1,
                        x: index === 2 ? -30 : index === 0 ? 30 : 0,
                        scale: index === 0 || index === 2 ? 0.94 : 1.0,
                      }
                    : {}
                }
                viewport={{ once: true }}
                transition={{
                  duration: 1.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                  delay: 0.4,
                  opacity: { duration: 0.5 },
                }}
                className={cn(
                  `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
                  isPopular ? "border-primary border-2" : "border-border",
                  "flex flex-col",
                  !isPopular && "mt-5 border-zinc-400",
                  index === 0 || index === 2
                    ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                    : "z-10",
                  index === 0 && "origin-right",
                  index === 2 && "origin-left"
                )}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                    <Star className="text-primary-foreground h-4 w-4 fill-current" />
                    <span className="text-primary-foreground ml-1 font-sans font-semibold">
                      Popular
                    </span>
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    {pkg.title}
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-x-2">
                    <span className="text-5xl text-primary font-bold tracking-tight">
                      <NumberFlow
                        value={displayPrice}
                        format={{
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }}
                        transformTiming={{
                          duration: 500,
                          easing: "ease-out",
                        }}
                        willChange
                        className="font-variant-numeric: tabular-nums"
                      />
                    </span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                      / month
                    </span>
                  </div>

                  <p className="text-xs leading-5 text-muted-foreground">
                    {isMonthly ? "billed monthly" : "billed annually"}
                  </p>

                  {!isMonthly && pkg.yearlyDiscount > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Save {pkg.yearlyDiscount}% with yearly billing
                    </p>
                  )}

                  <ul className="mt-5 gap-2 flex flex-col justify-center items-center text-center">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <hr className="w-full my-4" />

                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "group relative py-6 w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                      "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                      isPopular
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-primary"
                    )}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  }

  // Default: show regular specifications
  return (
    <section className="">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100">
        Product Specifications
      </h2>

      <div 
        className="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline !px-0 !mx-0" 
        dangerouslySetInnerHTML={{ __html: speficication || "" }}
      />
    </section>
  );
}
