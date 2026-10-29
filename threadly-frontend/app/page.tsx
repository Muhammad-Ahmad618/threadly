import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { CartProvider } from "@/components/pages/landingPage/CartContext";
import AnnouncementBar from "@/components/pages/landingPage/AnnouncementBar";
import Header from "@/components/pages/landingPage/Header";
import Hero from "@/components/pages/landingPage/Hero";
import TrustStrip from "@/components/pages/landingPage/TrustStrip";
import Categories from "@/components/pages/landingPage/Categories";
import FeaturedProducts from "@/components/pages/landingPage/FeaturedProducts";
import CartDrawer from "@/components/pages/landingPage/CartDrawer";
import PromoBanner from "@/components/pages/landingPage/PromoBanner";
import BrandStory from "@/components/pages/landingPage/BrandStory";
import Reviews from "@/components/pages/landingPage/Reviews";
import Newsletter from "@/components/pages/landingPage/Newsletter";
import Footer from "@/components/pages/landingPage/Footer";

// Elegant serif display for headings, Poppins for everything else — scoped
// to this page via CSS variables so /before is untouched.
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-landingPage-display",
  display: "swap",
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-landingPage-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Threadly — Effortless everyday clothing",
  description:
    "Relaxed tailoring, natural fabrics and everyday basics for men, women and kids. Free shipping over $75 and easy 30-day returns.",
};

export default function landingPagePage() {
  return (
    <div
      className={`${display.variable} ${body.variable} scroll-smooth bg-[#faf7f2] text-stone-600 antialiased [font-family:var(--font-landingPage-body)]`}
    >
      <CartProvider>
        <AnnouncementBar />
        <Header />
        <main>
          <Hero />
          <TrustStrip />
          <Categories />
          <FeaturedProducts />
          <PromoBanner />
          <BrandStory />
          <Reviews />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
