// import { Button } from "@/components/ui/button";
// import { Heart, ShoppingCart, User, Menu, LogOut } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { useCart } from "@/contexts/CartContext";
// import { useState } from "react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// const Header = () => {
//   const { user, signOut } = useAuth();
//   const { totalItems } = useCart();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSignOut = async () => {
//     await signOut();
//     navigate("/");
//   };

//   return (
//     <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-sage-green to-fresh-green rounded-lg flex items-center justify-center">
//               <Heart className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-foreground">GreenHands</h1>
//               <p className="text-xs text-muted-foreground">Empowering Communities</p>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <Link to="/" className="text-foreground hover:text-primary transition-colors">
//               Home
//             </Link>
//             <Link to="/products" className="text-foreground hover:text-primary transition-colors">
//               Products
//             </Link>
//             <a href="/#stories" className="text-foreground hover:text-primary transition-colors">
//               Stories
//             </a>
//             <a href="/#impact" className="text-foreground hover:text-primary transition-colors">
//               Our Impact
//             </a>
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             {user ? (
//               <>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={() => navigate("/checkout")}
//                   className="relative"
//                 >
//                   <ShoppingCart className="w-4 h-4 mr-2" />
//                   Cart
//                   {totalItems > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-sage-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       {totalItems}
//                     </span>
//                   )}
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={handleSignOut}>
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Sign Out
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
//                   <User className="w-4 h-4 mr-2" />
//                   Sign In
//                 </Button>
//                 <Button variant="hero" size="sm" onClick={() => navigate("/products")}>
//                   <ShoppingCart className="w-4 h-4 mr-2" />
//                   Shop Now
//                 </Button>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu */}
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild className="md:hidden">
//               <Button variant="ghost" size="icon">
//                 <Menu className="w-6 h-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//               <nav className="flex flex-col space-y-4 mt-8">
//                 <Link 
//                   to="/" 
//                   className="text-lg text-foreground hover:text-primary transition-colors"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Home
//                 </Link>
//                 <Link 
//                   to="/products" 
//                   className="text-lg text-foreground hover:text-primary transition-colors"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Products
//                 </Link>
//                 {user ? (
//                   <>
//                     <Link 
//                       to="/checkout" 
//                       className="text-lg text-foreground hover:text-primary transition-colors relative inline-flex"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       Cart
//                       {totalItems > 0 && (
//                         <span className="ml-2 bg-sage-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                           {totalItems}
//                         </span>
//                       )}
//                     </Link>
//                     <Button 
//                       variant="outline" 
//                       onClick={() => {
//                         handleSignOut();
//                         setIsOpen(false);
//                       }}
//                       className="justify-start"
//                     >
//                       <LogOut className="w-4 h-4 mr-2" />
//                       Sign Out
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button 
//                       variant="outline" 
//                       onClick={() => {
//                         navigate("/auth");
//                         setIsOpen(false);
//                       }}
//                       className="justify-start"
//                     >
//                       <User className="w-4 h-4 mr-2" />
//                       Sign In
//                     </Button>
//                     <Button 
//                       variant="hero" 
//                       onClick={() => {
//                         navigate("/products");
//                         setIsOpen(false);
//                       }}
//                       className="justify-start"
//                     >
//                       <ShoppingCart className="w-4 h-4 mr-2" />
//                       Shop Now
//                     </Button>
//                   </>
//                 )}
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Check if current user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });

      if (!error && data) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sage-green to-fresh-green rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">GreenHands</h1>
              <p className="text-xs text-muted-foreground">
                Empowering Communities
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-foreground hover:text-primary transition-colors"
            >
              Products
            </Link>
            <a
              href="/#stories"
              className="text-foreground hover:text-primary transition-colors"
            >
              Stories
            </a>
            <a
              href="/#impact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Our Impact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/admin")}
                  >
                    Admin Portal
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/checkout")}
                  className="relative"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-sage-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/auth")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => navigate("/products")}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Shop Now
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link
                  to="/"
                  className="text-lg text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-lg text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>

                {user ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="text-lg text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Admin Portal
                      </Link>
                    )}

                    <Link
                      to="/checkout"
                      className="text-lg text-foreground hover:text-primary transition-colors relative inline-flex"
                      onClick={() => setIsOpen(false)}
                    >
                      Cart
                      {totalItems > 0 && (
                        <span className="ml-2 bg-sage-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate("/auth");
                        setIsOpen(false);
                      }}
                      className="justify-start"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button
                      variant="hero"
                      onClick={() => {
                        navigate("/products");
                        setIsOpen(false);
                      }}
                      className="justify-start"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Shop Now
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
