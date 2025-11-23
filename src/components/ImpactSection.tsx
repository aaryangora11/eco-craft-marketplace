import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Heart, Users, Recycle, Award, TreePine } from "lucide-react";

const impactStats = [
  {
    icon: Users,
    title: "Lives Empowered",
    value: "500+",
    description: "Artisans supported across communities",
    color: "text-warm-brown"
  },
  {
    icon: Recycle,
    title: "Paper Recycled", 
    value: "2M+",
    description: "Sheets of waste paper given new life",
    color: "text-fresh-green"
  },
  {
    icon: Heart,
    title: "Products Sold",
    value: "10K+",
    description: "Handmade items bringing joy worldwide",
    color: "text-sage-green"
  },
  {
    icon: Award,
    title: "Skills Developed",
    value: "200+",
    description: "New craftspeople trained and certified",
    color: "text-primary"
  },
  {
    icon: TreePine,
    title: "Trees Saved",
    value: "150+",
    description: "Through our recycling initiatives",
    color: "text-fresh-green"
  },
  {
    icon: Leaf,
    title: "Carbon Reduced",
    value: "50T+",
    description: "CO2 emissions prevented annually",
    color: "text-sage-green"
  }
];

const ImpactSection = () => {
  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-sage-green/10 via-background to-warm-brown/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Our Impact
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Measuring What
            <span className="text-warm-brown"> Matters</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every purchase creates ripple effects of positive change. 
            Here's how our community is transforming lives and protecting our planet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-background to-secondary rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stat.title}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <Card className="bg-gradient-to-r from-primary/5 to-warm-brown/5 border-0 shadow-xl">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              "Every product purchased creates a cycle of empowerment, 
              sustainability, and hope."
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe in the power of conscious commerce to transform communities. 
              By choosing our products, you're not just buying beautiful handmade items – 
              you're investing in human potential, environmental restoration, and a more inclusive economy.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ImpactSection;