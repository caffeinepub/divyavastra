import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
            Our Story
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            About DivyaVastra
          </h1>
          <div className="gold-line max-w-xs mx-auto" />
        </div>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p className="text-foreground text-base">
            DivyaVastra provides authentic, traditional devotional clothing
            inspired by the spiritual culture of Vrindavan Dham. Every garment
            is crafted with love and devotion for the spiritual community.
          </p>

          <p>
            Our clothing is imported directly from the holy land of Vrindavan,
            ensuring you receive the most authentic and spiritually blessed
            garments. We work with skilled artisans who carry forward
            centuries-old traditions of devotional fabric and craftsmanship.
          </p>

          <p>
            We serve devotees across India, Nepal, and worldwide — offering Gopi
            Dresses for Matajis, Bagalbandi for Prabhujis, and Dhoti Sets for
            all auspicious occasions. Our Complete Devotee Couple Set is perfect
            for festivals, temple visits, and spiritual gatherings.
          </p>

          <div className="border border-border rounded-lg p-5 bg-card">
            <h3 className="font-heading font-semibold text-foreground mb-2">
              Our Promise
            </h3>
            <ul className="space-y-1.5">
              {[
                "Pure cotton fabrics, traditionally crafted",
                "Imported directly from Vrindavan Dham",
                "Limited pieces — each garment is special",
                "Serving devotees worldwide",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">🪷</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            <em className="font-medium text-foreground">
              "Traditional Devotional Clothing from Vrindavan Dham"
            </em>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
