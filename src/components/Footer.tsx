import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Stay Connected to Our Mission
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Get updates on new artisan stories, product launches, and the impact 
              your purchases are making in communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-warm-brown to-fresh-green rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">GreenHands</h3>
                <p className="text-sm text-primary-foreground/80">Empowering Communities</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Creating positive social and environmental impact through 
              handcrafted products made from recycled materials.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/products" className="hover:text-primary-foreground transition-colors">All Products</Link></li>
              <li><Link to="/products" className="hover:text-primary-foreground transition-colors">Journals & Notebooks</Link></li>
              <li><Link to="/products" className="hover:text-primary-foreground transition-colors">Greeting Cards</Link></li>
              <li><Link to="/products" className="hover:text-primary-foreground transition-colors">Decorative Items</Link></li>
              <li><Link to="/products" className="hover:text-primary-foreground transition-colors">Gift Sets</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <button 
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                      document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="hover:text-primary-foreground transition-colors"
                >
                  Our Mission
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                      document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="hover:text-primary-foreground transition-colors"
                >
                  Artisan Stories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                      document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="hover:text-primary-foreground transition-colors"
                >
                  Impact Report
                </button>
              </li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Sustainability</Link></li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@greenhands.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Community Street<br />Impact City, IC 12345</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/80">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span>© 2024 GreenHands. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <Leaf className="w-4 h-4 text-fresh-green" />
                <span>Carbon Neutral Certified</span>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;