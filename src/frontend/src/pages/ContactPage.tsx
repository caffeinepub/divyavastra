import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-4">🪷</div>
        <h1 className="font-heading text-3xl font-semibold mb-3">Contact Us</h1>
        <div className="gold-line max-w-xs mx-auto mb-6" />
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          For orders, inquiries, and product details — reach us directly on
          Instagram. We respond promptly to all messages.
        </p>

        <a
          href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="bg-gold text-primary-foreground hover:bg-gold/90 gap-2 px-8"
          >
            <Instagram size={18} />
            Message on Instagram
          </Button>
        </a>

        <p className="mt-4 text-xs text-muted-foreground">@divyavastra_</p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="border border-border rounded-lg p-5 bg-card">
            <h3 className="font-heading font-semibold text-sm mb-2">Orders</h3>
            <p className="text-xs text-muted-foreground">
              Place orders through our website or DM us on Instagram with your
              requirements.
            </p>
          </div>
          <div className="border border-border rounded-lg p-5 bg-card">
            <h3 className="font-heading font-semibold text-sm mb-2">
              Shipping
            </h3>
            <p className="text-xs text-muted-foreground">
              We ship across India, Nepal, and internationally. Contact us for
              shipping rates to your location.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
