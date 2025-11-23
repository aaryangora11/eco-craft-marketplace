import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ImageIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (items.length === 0 && !orderPlaced) {
    return <Navigate to="/products" replace />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const formData = new FormData(e.currentTarget);
      const shippingAddress = `${formData.get('address')}, ${formData.get('city')}, ${formData.get('country')}`;

      // Create Razorpay order
      const { data: razorpayOrder, error: razorpayError } = await supabase.functions.invoke(
        'create-razorpay-order',
        {
          body: {
            amount: totalPrice,
            currency: 'INR',
            receipt: `order_${Date.now()}`
          }
        }
      );

      if (razorpayError) throw razorpayError;

      // Initialize Razorpay checkout
      const razorpayKeyId = 'rzp_test_RihfVY5Pk6AljW';
      const options = {
        key: razorpayKeyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'GreenHands',
        description: 'Handmade Paper Products',
        order_id: razorpayOrder.id,
        handler: async function (response: any) {
          try {
            // Create order in database after successful payment
            const { data: order, error: orderError } = await supabase
              .from('orders')
              .insert({
                user_id: user.id,
                total_amount: totalPrice,
                status: 'processing',
                shipping_address: shippingAddress
              })
              .select()
              .single();

            if (orderError) throw orderError;

            // Create order items
            const orderItems = items.map(item => ({
              order_id: order.id,
              product_id: item.product_id,
              quantity: item.quantity,
              unit_price: item.products.price
            }));

            const { error: itemsError } = await supabase
              .from('order_items')
              .insert(orderItems);

            if (itemsError) throw itemsError;

            // Clear cart
            await clearCart();

            setOrderPlaced(true);
            toast({
              title: "Payment Successful!",
              description: "Thank you for your purchase. You will receive a confirmation email shortly."
            });
          } catch (error) {
            console.error('Error saving order:', error);
            toast({
              title: "Order Creation Failed",
              description: "Payment successful but order creation failed. Please contact support.",
              variant: "destructive"
            });
          }
        },
        prefill: {
          name: `${formData.get('firstName')} ${formData.get('lastName')}`,
          email: formData.get('email'),
        },
        theme: {
          color: '#7C9885'
        }
      };

      // @ts-ignore - Razorpay is loaded via script
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response: any) {
        toast({
          title: "Payment Failed",
          description: response.error.description || "Please try again.",
          variant: "destructive"
        });
      });

      razorpay.open();

    } catch (error) {
      console.error('Error initiating payment:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Order Confirmed!</h1>
              <p className="text-lg text-muted-foreground">
                Thank you for supporting our artisan community. Your order will be processed within 1-2 business days.
              </p>
            </div>
            <div className="space-y-4">
              <Button variant="hero" onClick={() => window.location.href = '/products'}>
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/profile'}>
                View Order History
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your delivery address</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={user.email} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" placeholder="Street address" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" name="country" required />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment Method</h3>
                    <div className="p-4 border rounded-lg bg-primary/10">
                      <p className="text-sm font-medium mb-2">Razorpay Payment Gateway</p>
                      <p className="text-xs text-muted-foreground">
                        Secure payment processing via Razorpay. We accept all major credit/debit cards, UPI, and net banking.
                      </p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Place Order - ₹${totalPrice.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-secondary/20 rounded flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.products.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × ₹{item.products.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(item.quantity * item.products.price).toFixed(2)}</p>
                  </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="bg-sage-green/10 p-4 rounded-lg">
                  <p className="text-sm text-sage-green font-medium">
                    🌱 Your purchase supports artisan communities and environmental sustainability
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;