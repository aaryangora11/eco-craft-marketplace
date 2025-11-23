import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quote, ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stories = [
  {
    id: 1,
    name: "Maria Rodriguez",
    role: "War Widow & Artisan",
    quote: "Creating these paper products has given me hope and a way to support my family with dignity. Every notebook I make carries my story of resilience.",
    products: "Journals & Notebooks",
    yearsActive: "3 years",
    impact: "Supported 2 children through education"
  },
  {
    id: 2,
    name: "James Mitchell",
    role: "Ex-Military Veteran",
    quote: "This craft has become my therapy. Working with my hands helps me find peace, and knowing my work helps others gives me purpose.",
    products: "Decorative Items",
    yearsActive: "2 years", 
    impact: "Built confidence and financial independence"
  },
  {
    id: 3,
    name: "Community Workshop",
    role: "Inclusive Learning Space",
    quote: "Our workshop brings together individuals with different abilities, creating beautiful art while building friendships and skills.",
    products: "Collaborative Pieces",
    yearsActive: "5 years",
    impact: "Empowered 50+ individuals with disabilities"
  }
];

const ArtisanStories = () => {
  const navigate = useNavigate();

  return (
    <section id="stories" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Our Heroes
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Stories of
            <span className="text-warm-brown"> Resilience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Behind every product is a person with a story of strength, creativity, 
            and determination. Meet the artisans who craft beauty from recycled materials.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Card key={story.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative bg-secondary/20 h-64 flex items-center justify-center">
                <User className="w-24 h-24 text-muted-foreground/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold mb-1 text-foreground">{story.name}</h3>
                  <p className="text-sm text-muted-foreground">{story.role}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-warm-brown mb-4" />
                
                <blockquote className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{story.quote}"
                </blockquote>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Specializes in:</span>
                    <span className="text-sm text-muted-foreground">{story.products}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Active since:</span>
                    <span className="text-sm text-muted-foreground">{story.yearsActive}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-fresh-green">{story.impact}</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full group" onClick={() => navigate("/products")}>
                  View Products
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" onClick={() => navigate("/products")}>
            Read More Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArtisanStories;