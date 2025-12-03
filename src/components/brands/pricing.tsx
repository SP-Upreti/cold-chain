"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useMemo } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { IBrand, IPopularProduct } from "@/types/IBrand";

interface PricingProps {
  description?: string;
  data: IBrand
}

interface PackageData {
  title: string;
  price: number;
  yearlyDiscount: number;
  features: string[];
}

interface FeatureData {
  title: string;
  shortDesc: string;
  packages: PackageData[];
}

export function Pricing({
  data,
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const switchRef = useRef<HTMLButtonElement>(null);

  // Parse feature data from popularProducts if available
  const parsedFeatures = useMemo(() => {
    const features: Record<string, FeatureData> = {};
    
    if (data.popularProducts && data.popularProducts.length > 0) {
      data.popularProducts.forEach((product) => {
        // Type assertion for products that may have feature property
        const productWithFeature = product as typeof product & { feature?: string; productType?: string };
        
        if (productWithFeature.feature && productWithFeature.productType === 'SAAS') {
          try {
            const featureData = typeof productWithFeature.feature === 'string' 
              ? JSON.parse(productWithFeature.feature) 
              : productWithFeature.feature;
            
            // Use product name or slug as key
            const key = product.slug || (product.name || product.title || '').toLowerCase().replace(/\s+/g, '-');
            if (key) {
              features[key] = featureData;
            }
          } catch (error) {
            console.error('Error parsing feature data:', error);
          }
        }
      });
    }
    
    return features;
  }, [data.popularProducts]);

  const featureKeys = Object.keys(parsedFeatures);
  const hasFeatures = featureKeys.length > 0;

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
          "hsla(0, 100%, 59%, 1.00)",    // red
          "hsla(210, 100%, 64%, 1.00)",  // blue
          "hsla(120, 94%, 62%, 1.00)",  // green
          "hsla(50, 100%, 58%, 1.00)",   // yellow
          "hsla(330, 100%, 67%, 1.00)",  // pink
        ],

        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  // Render pricing card
  const renderPricingCard = (pkg: PackageData, index: number, totalPackages: number) => {
    const isPopular = index === Math.floor(totalPackages / 2); // Middle package is popular
    const monthlyPrice = pkg.price;
    const yearlyPrice = pkg.price * 12 * (1 - pkg.yearlyDiscount / 100);

    return (
      <div
        key={index}
        className={cn(
          "rounded-2xl border-[1px]  p-4 sm:p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative",
          isPopular ? "border-primary border-2" : "border-border",
          "flex flex-col",
          !isPopular && "mt-5 border-zinc-400"
        )}
      >
        {isPopular && (
          <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
            <Star className="text-primary-foreground h-4 w-4 fill-current" />
            <span className="text-primary-foreground ml-1 font-sans font-semibold text-xs sm:text-sm">
              Popular
            </span>
          </div>
        )}
        <div className="flex-1 flex flex-col">
          <p className="text-sm sm:text-base font-semibold text-zinc-800">
            {pkg.title}
          </p>
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-x-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
              <NumberFlow
                value={isMonthly ? monthlyPrice : yearlyPrice / 12}
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
            <span className="text-xs sm:text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
              / month
            </span>
          </div>

          <p className="text-xs leading-5 text-muted-foreground mt-1">
            {isMonthly ? "billed monthly" : `billed annually (save ${pkg.yearlyDiscount}%)`}
          </p>

          <ul className="mt-4 sm:mt-5 gap-2 flex flex-col">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-left">{feature}</span>
              </li>
            ))}
          </ul>

          <hr className="w-full my-3 sm:my-4" />

          <Link
            href="/contact"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "group relative py-2 sm:py-2 w-full gap-2 overflow-hidden text-sm sm:text-lg font-semibold tracking-tighter",
              "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
              isPopular
                ? "bg-primary text-primary-foreground"
                : "bg-background text-primary"
            )}
          >
            Get Started
          </Link>
        </div>
      </div>
    );
  };

  if (!hasFeatures) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 lg:py-20">
      <Tabs defaultValue={featureKeys[0]} className="space-y-8 sm:space-y-12">
        {featureKeys.length > 1 && (
          <TabsList className="mx-auto p-1.5 sm:p-2 h-fit rounded-full flex-wrap gap-2">
            {featureKeys.map((key) => {
              const feature = parsedFeatures[key];
              return (
                <TabsTrigger
                  key={key}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full py-1.5 sm:py-2 px-3 sm:px-6 text-xs sm:text-base lg:text-lg"
                  value={key}
                >
                  {feature.title}
                </TabsTrigger>
              );
            })}
          </TabsList>
        )}
        {featureKeys.map((key) => {
          const feature = parsedFeatures[key];
          return (
            <TabsContent key={key} value={key} className="gap-0">
              <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  {feature.title}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg whitespace-pre-line max-w-3xl mx-auto px-4">
                  {feature.shortDesc || description}
                </p>
              </div>

              <div className="flex  justify-center items-center gap-2 sm:gap-0 mb-2 sm:mb-10">
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
                <span className="ml-0 sm:ml-2 font-semibold text-sm sm:text-base">
                  Annual billing{" "}
                  {feature.packages.some(p => p.yearlyDiscount > 0) && (
                    <span className="text-primary hidden md:block">
                      (Save up to {Math.max(...feature.packages.map(p => p.yearlyDiscount))}%)
                    </span>
                  )}
                </span>
              </div>

              <div className={cn(
                "grid gap-4 sm:gap-6 mx-auto max-w-7xl",
                feature.packages.length === 1 && "grid-cols-1 max-w-md",
                feature.packages.length === 2 && "grid-cols-1 md:grid-cols-2 max-w-4xl",
                feature.packages.length >= 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              )}>
                {feature.packages.map((pkg, index) => 
                  renderPricingCard(pkg, index, feature.packages.length)
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
