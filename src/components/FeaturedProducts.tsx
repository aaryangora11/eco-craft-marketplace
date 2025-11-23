import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Handmade Journal",
    price: "₹1,999",
    artisan: "Maria, War Widow",
    rating: 4.9,
    description: "Beautiful recycled paper journal with hand-stitched binding",
    impact: "Empowers Women"
  },
  {
    id: 2,
    name: "Greeting Card Set",
    price: "₹1,299",
    artisan: "Alex, Ex-Military",
    rating: 4.8,
    description: "Set of 8 artistic cards made from recycled materials",
    impact: "Veteran Support"
  },
  {
    id: 3,
    name: "Decorative Box",
    price: "₹2,699",
    artisan: "Community Workshop",
    rating: 4.9,
    description: "Elegant storage box crafted with care and attention",
    impact: "Community Building"
  },
  {
    id: 4,
    name: "Paper Flowers Bundle",
    price: "₹1,599",
    artisan: "Sarah's Workshop",
    rating: 5.0,
    description: "Colorful paper flowers that last forever",
    impact: "Skills Development"
  }
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Featured Collection
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Products That Make a
            <span className="text-warm-brown"> Difference</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each purchase directly supports artisans in their journey toward independence 
            and self-empowerment while promoting environmental sustainability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden bg-secondary/20 h-48 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Badge 
                  variant="secondary" 
                  className="absolute bottom-3 left-3 bg-background/90 text-foreground"
                >
                  {product.impact}
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  by {product.artisan}
                </p>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <Button variant="hero" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => navigate("/products")}>
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;