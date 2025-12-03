import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import Preloader from "@/components/shared/preloader";
import PageTransition, { TransitionProvider } from "@/components/shared/page-transition";
import { ThemeProvider } from "@/providers/theme-provider";
import ColorProvider from "@/providers/color-provider";
import RecaptchaProvider from "@/providers/recaptcha-provider";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/ckeditor.css"
import { getSiteSeoMetadata } from "@/services/seoMetadataService";
import NewsletterDialog from "@/components/dialog/newsletter-dialog";

export async function generateMetadata(): Promise<Metadata> {
  // try {
  //   const response = await getSiteSeoMetadata();

  //   if (response.status === 200 && response.seoMetadata && response.seoMetadata.length > 0) {
  //     const seo = response.seoMetadata[0];

  //     return {
  //       title: seo.title || "Plaza Sales || Enhancing your ecommerce experience",
  //       description: seo.description || "Discover Plaza Sales, your trusted partner in ecommerce solutions.",
  //       keywords: seo.keywords || ["ecommerce", "sales", "online store", "business"],
  //       authors: [{ name: "Webx Nepal", url: "https://webxnepal.com" }],
  //       openGraph: {
  //         title: seo.openGraph?.title || seo.title,
  //         description: seo.openGraph?.description || seo.description,
  //         type: "website",
  //         url: seo.openGraph?.url || seo.canonicalUrl,
  //         siteName: seo.openGraph?.siteName || "Plaza Sales",
  //         locale: seo.openGraph?.locale || "en_US",
  //       },
  //       twitter: {
  //         card: "summary_large_image",
  //         title: seo.twitter?.title || seo.title,
  //         description: seo.twitter?.description || seo.description,
  //       },
  //       robots: {
  //         index: seo.robots?.index ?? true,
  //         follow: seo.robots?.follow ?? true,
  //       },
  //       alternates: {
  //         canonical: seo.canonicalUrl,
  //         languages: seo.alternates?.languages || {},
  //       },
  //       other: seo.extraMeta ? Object.entries(seo.extraMeta).reduce((acc, [key, value]) => {
  //         if (typeof value === 'string' || typeof value === 'number') {
  //           acc[key] = value;
  //         }
  //         return acc;
  //       }, {} as Record<string, string | number>) : {},
  //     };
  //   }
  // } catch (error) {
  //   console.error("Failed to fetch site SEO metadata:", error);
  // }

  return {
    title: "Cold Chain || All Home Solutions",
    description: "Discover Cold Chain, your trusted partner in ecommerce solutions. We specialize in boosting your online sales through innovative strategies and cutting-edge technology.",
    keywords: ["Cold Chain", "All Home Solutions", "online store", "business"],
    authors: [{ name: "Webx Nepal", url: "https://webxnepal.com" }],
  };
}

async function getJsonLd() {
  try {
    const response = await getSiteSeoMetadata();
    if (response.status === 200 && response.seoMetadata && response.seoMetadata.length > 0) {
      return response.seoMetadata[0].jsonLd;
    }
  } catch (error) {
    console.error("Failed to fetch JSON-LD:", error);
  }
  return null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = await getJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </head>
      <body className={` antialiased max-w-[2000px]  mx-auto `} >
        <TransitionProvider>
          <RecaptchaProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              {/* <Preloader /> */}
              <Navbar />
              <PageTransition>
                {children}
                <Footer />
              </PageTransition>
            </ThemeProvider>
          </RecaptchaProvider>
          <WhatsAppButton />
          <Toaster />
        </TransitionProvider>
        <div id="portal-root" />
      </body>
    </html>
  );
}
