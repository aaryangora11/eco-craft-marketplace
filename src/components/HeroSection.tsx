import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Heart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sage-green/5 via-background to-warm-brown/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sage-green/10 via-transparent to-warm-brown/10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center space-x-1">
              <Heart className="w-5 h-5 text-warm-brown" />
              <Leaf className="w-5 h-5 text-fresh-green" />
              <Users className="w-5 h-5 text-sage-green" />
            </div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Sustainable • Empowering • Meaningful
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Handcrafted with
            <span className="text-warm-brown"> Purpose</span>,
            Made with <span className="text-fresh-green">Love</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Every product tells a story of resilience, sustainability, and hope. 
            Support marginalized communities while choosing eco-friendly, 
            handmade paper products that make a difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="group" onClick={() => navigate("/products")}>
              Shop Products
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => {
              const impactSection = document.getElementById("impact");
              impactSection?.scrollIntoView({ behavior: "smooth" });
            }}>
              Learn About Our Mission
            </Button>
          </div>

          {/* Impact Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Artisans Supported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-fresh-green mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Products Sold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-warm-brown mb-1">2M+</div>
              <div className="text-sm text-muted-foreground">Papers Recycled</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;