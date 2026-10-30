import type { ReactNode } from "react";
import AnnouncementBar from "@/components/pages/landingPage/AnnouncementBar";
import CartDrawer from "@/components/pages/landingPage/CartDrawer";
import Footer from "@/components/pages/landingPage/Footer";
import Header from "@/components/pages/landingPage/Header";

// Shared storefront chrome: announcement bar, sticky header, the page
// itself, footer and the cart drawer. The CartProvider lives in the root
// layout so cart state survives navigation between routes — never nest a
// second provider here, it would shadow the outer one.
export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
