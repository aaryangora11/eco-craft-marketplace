// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { useAuth } from "@/contexts/AuthContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { toast } from "sonner";
// import { Pencil, Trash2, Plus } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image_url: string;
//   artisan_id: string;
//   category_id: string;
//   stock_quantity: number;
//   is_active: boolean;
// }

// interface Artisan {
//   id: string;
//   name: string;
// }

// interface Category {
//   id: string;
//   name: string;
// }

// export default function AdminDashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [artisans, setArtisans] = useState<Artisan[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     image_url: "",
//     artisan_id: "",
//     category_id: "",
//     stock_quantity: "",
//     is_active: true,
//   });

//   useEffect(() => {
//     checkAdminStatus();
//   }, [user]);

//   useEffect(() => {
//     if (isAdmin) {
//       fetchProducts();
//       fetchArtisans();
//       fetchCategories();
//     }
//   }, [isAdmin]);

//   const checkAdminStatus = async () => {
//     console.log("ADMIN CHECK STARTED");
//     if (!user) {
//       navigate("/auth");
//       return;
//     }

//     console.log("AdminDashboard user:", user.id, user.email);

//     const { data, error } = await supabase.rpc("has_role", {
//       _user_id: user.id,
//       _role: "admin",
//     });

//     console.log("has_role result:", { data, error });

//     if (error || !data) {
//       toast.error("Access denied. Admin privileges required.");
//       navigate("/");
//       return;
//     }

//     setIsAdmin(true);
//     setLoading(false);
//   };


//   const fetchProducts = async () => {
//     const { data, error } = await supabase
//       .from("products")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       toast.error("Failed to fetch products");
//       return;
//     }

//     setProducts(data || []);
//   };

//   const fetchArtisans = async () => {
//     const { data, error } = await supabase.from("artisans").select("id, name");

//     if (error) {
//       toast.error("Failed to fetch artisans");
//       return;
//     }

//     setArtisans(data || []);
//   };

//   const fetchCategories = async () => {
//     const { data, error } = await supabase.from("categories").select("id, name");

//     if (error) {
//       toast.error("Failed to fetch categories");
//       return;
//     }

//     setCategories(data || []);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       description: "",
//       price: "",
//       image_url: "",
//       artisan_id: "",
//       category_id: "",
//       stock_quantity: "",
//       is_active: true,
//     });
//     setEditingProduct(null);
//   };

//   const handleAddProduct = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const { error } = await supabase.from("products").insert({
//       name: formData.name,
//       description: formData.description,
//       price: parseFloat(formData.price),
//       image_url: formData.image_url,
//       artisan_id: formData.artisan_id,
//       category_id: formData.category_id,
//       stock_quantity: parseInt(formData.stock_quantity),
//       is_active: formData.is_active,
//     });

//     if (error) {
//       toast.error("Failed to add product");
//       return;
//     }

//     toast.success("Product added successfully");
//     setIsAddDialogOpen(false);
//     resetForm();
//     fetchProducts();
//   };

//   const handleUpdateProduct = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!editingProduct) return;

//     const { error } = await supabase
//       .from("products")
//       .update({
//         name: formData.name,
//         description: formData.description,
//         price: parseFloat(formData.price),
//         image_url: formData.image_url,
//         artisan_id: formData.artisan_id,
//         category_id: formData.category_id,
//         stock_quantity: parseInt(formData.stock_quantity),
//         is_active: formData.is_active,
//       })
//       .eq("id", editingProduct.id);

//     if (error) {
//       toast.error("Failed to update product");
//       return;
//     }

//     toast.success("Product updated successfully");
//     setEditingProduct(null);
//     resetForm();
//     fetchProducts();
//   };

//   const handleDeleteProduct = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     const { error } = await supabase.from("products").delete().eq("id", id);

//     if (error) {
//       toast.error("Failed to delete product");
//       return;
//     }

//     toast.success("Product deleted successfully");
//     fetchProducts();
//   };

//   const openEditDialog = (product: Product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       description: product.description,
//       price: product.price.toString(),
//       image_url: product.image_url,
//       artisan_id: product.artisan_id,
//       category_id: product.category_id,
//       stock_quantity: product.stock_quantity.toString(),
//       is_active: product.is_active,
//     });
//   };

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-1 container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Admin Dashboard - Product Management</h1>
//           <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//             <DialogTrigger asChild>
//               <Button onClick={() => resetForm()}>
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add Product
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle>Add New Product</DialogTitle>
//                 <DialogDescription>Fill in the details to add a new product</DialogDescription>
//               </DialogHeader>
//               <form onSubmit={handleAddProduct} className="space-y-4">
//                 <div>
//                   <Label htmlFor="name">Product Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="price">Price</Label>
//                   <Input
//                     id="price"
//                     name="price"
//                     type="number"
//                     step="0.01"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="image_url">Image URL</Label>
//                   <Input
//                     id="image_url"
//                     name="image_url"
//                     value={formData.image_url}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="artisan_id">Artisan</Label>
//                   <Select
//                     value={formData.artisan_id}
//                     onValueChange={(value) => handleSelectChange("artisan_id", value)}
//                     required
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select artisan" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {artisans.map((artisan) => (
//                         <SelectItem key={artisan.id} value={artisan.id}>
//                           {artisan.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label htmlFor="category_id">Category</Label>
//                   <Select
//                     value={formData.category_id}
//                     onValueChange={(value) => handleSelectChange("category_id", value)}
//                     required
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.map((category) => (
//                         <SelectItem key={category.id} value={category.id}>
//                           {category.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label htmlFor="stock_quantity">Stock Quantity</Label>
//                   <Input
//                     id="stock_quantity"
//                     name="stock_quantity"
//                     type="number"
//                     value={formData.stock_quantity}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <Button type="submit" className="w-full">
//                   Add Product
//                 </Button>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>All Products</CardTitle>
//             <CardDescription>Manage your product inventory</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Image</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Price</TableHead>
//                   <TableHead>Stock</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {products.map((product) => (
//                   <TableRow key={product.id}>
//                     <TableCell>
//                       <img
//                         src={product.image_url}
//                         alt={product.name}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     </TableCell>
//                     <TableCell>{product.name}</TableCell>
//                     <TableCell>₹{product.price}</TableCell>
//                     <TableCell>{product.stock_quantity}</TableCell>
//                     <TableCell>
//                       <span
//                         className={`px-2 py-1 rounded text-xs ${
//                           product.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {product.is_active ? "Active" : "Inactive"}
//                       </span>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex gap-2">
//                         <Dialog
//                           open={editingProduct?.id === product.id}
//                           onOpenChange={(open) => !open && setEditingProduct(null)}
//                         >
//                           <DialogTrigger asChild>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => openEditDialog(product)}
//                             >
//                               <Pencil className="h-4 w-4" />
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//                             <DialogHeader>
//                               <DialogTitle>Edit Product</DialogTitle>
//                               <DialogDescription>Update product details</DialogDescription>
//                             </DialogHeader>
//                             <form onSubmit={handleUpdateProduct} className="space-y-4">
//                               <div>
//                                 <Label htmlFor="edit-name">Product Name</Label>
//                                 <Input
//                                   id="edit-name"
//                                   name="name"
//                                   value={formData.name}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-description">Description</Label>
//                                 <Textarea
//                                   id="edit-description"
//                                   name="description"
//                                   value={formData.description}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-price">Price</Label>
//                                 <Input
//                                   id="edit-price"
//                                   name="price"
//                                   type="number"
//                                   step="0.01"
//                                   value={formData.price}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-image_url">Image URL</Label>
//                                 <Input
//                                   id="edit-image_url"
//                                   name="image_url"
//                                   value={formData.image_url}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-artisan_id">Artisan</Label>
//                                 <Select
//                                   value={formData.artisan_id}
//                                   onValueChange={(value) => handleSelectChange("artisan_id", value)}
//                                   required
//                                 >
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="Select artisan" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     {artisans.map((artisan) => (
//                                       <SelectItem key={artisan.id} value={artisan.id}>
//                                         {artisan.name}
//                                       </SelectItem>
//                                     ))}
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-category_id">Category</Label>
//                                 <Select
//                                   value={formData.category_id}
//                                   onValueChange={(value) => handleSelectChange("category_id", value)}
//                                   required
//                                 >
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="Select category" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     {categories.map((category) => (
//                                       <SelectItem key={category.id} value={category.id}>
//                                         {category.name}
//                                       </SelectItem>
//                                     ))}
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                               <div>
//                                 <Label htmlFor="edit-stock_quantity">Stock Quantity</Label>
//                                 <Input
//                                   id="edit-stock_quantity"
//                                   name="stock_quantity"
//                                   type="number"
//                                   value={formData.stock_quantity}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                               </div>
//                               <Button type="submit" className="w-full">
//                                 Update Product
//                               </Button>
//                             </form>
//                           </DialogContent>
//                         </Dialog>
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => handleDeleteProduct(product.id)}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </main>
//       <Footer />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  artisan_id: string;
  category_id: string;
  stock_quantity: number;
  is_active: boolean;
}

interface Artisan {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    artisan_id: "",
    category_id: "",
    stock_quantity: "",
    is_active: true,
  });

  // Wait for auth to finish, then check admin
  useEffect(() => {
    console.log("ADMIN CHECK STARTED");

    if (authLoading) {
      // still restoring session, do nothing yet
      return;
    }

    if (!user) {
      console.log("No user after auth → redirect to /auth");
      navigate("/auth");
      return;
    }

    checkAdminStatus(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading]);

  // Once confirmed admin, load data
  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchArtisans();
      fetchCategories();
    }
  }, [isAdmin]);

  const checkAdminStatus = async (currentUser: { id: string }) => {
    console.log("AdminDashboard user:", currentUser.id);

    const { data, error } = await supabase.rpc("has_role", {
      _user_id: currentUser.id,
      _role: "admin",
    });

    console.log("has_role result:", { data, error });

    if (error || !data) {
      toast.error("Access denied. Admin privileges required.");
      setLoading(false);
      navigate("/");
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch products");
      return;
    }

    setProducts(data || []);
  };

  const fetchArtisans = async () => {
    const { data, error } = await supabase
      .from("artisans")
      .select("id, name");

    if (error) {
      toast.error("Failed to fetch artisans");
      return;
    }

    setArtisans(data || []);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name");

    if (error) {
      toast.error("Failed to fetch categories");
      return;
    }

    setCategories(data || []);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image_url: "",
      artisan_id: "",
      category_id: "",
      stock_quantity: "",
      is_active: true,
    });
    setEditingProduct(null);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("products").insert({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image_url: formData.image_url,
      artisan_id: formData.artisan_id,
      category_id: formData.category_id,
      stock_quantity: parseInt(formData.stock_quantity),
      is_active: formData.is_active,
    });

    if (error) {
      toast.error("Failed to add product");
      return;
    }

    toast.success("Product added successfully");
    setIsAddDialogOpen(false);
    resetForm();
    fetchProducts();
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProduct) return;

    const { error } = await supabase
      .from("products")
      .update({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: formData.image_url,
        artisan_id: formData.artisan_id,
        category_id: formData.category_id,
        stock_quantity: parseInt(formData.stock_quantity),
        is_active: formData.is_active,
      })
      .eq("id", editingProduct.id);

    if (error) {
      toast.error("Failed to update product");
      return;
    }

    toast.success("Product updated successfully");
    setEditingProduct(null);
    resetForm();
    fetchProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete product");
      return;
    }

    toast.success("Product deleted successfully");
    fetchProducts();
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      artisan_id: product.artisan_id,
      category_id: product.category_id,
      stock_quantity: product.stock_quantity.toString(),
      is_active: product.is_active,
    });
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    // This is just a safety fallback; normally you'd already be redirected.
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Admin Dashboard - Product Management
          </h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new product
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="artisan_id">Artisan</Label>
                  <Select
                    value={formData.artisan_id}
                    onValueChange={(value) =>
                      handleSelectChange("artisan_id", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select artisan" />
                    </SelectTrigger>
                    <SelectContent>
                      {artisans.map((artisan) => (
                        <SelectItem key={artisan.id} value={artisan.id}>
                          {artisan.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category_id">Category</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) =>
                      handleSelectChange("category_id", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input
                    id="stock_quantity"
                    name="stock_quantity"
                    type="number"
                    value={formData.stock_quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add Product
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Products</CardTitle>
            <CardDescription>Manage your product inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.stock_quantity}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          product.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog
                          open={editingProduct?.id === product.id}
                          onOpenChange={(open) =>
                            !open && setEditingProduct(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditDialog(product)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>
                                Update product details
                              </DialogDescription>
                            </DialogHeader>
                            <form
                              onSubmit={handleUpdateProduct}
                              className="space-y-4"
                            >
                              <div>
                                <Label htmlFor="edit-name">Product Name</Label>
                                <Input
                                  id="edit-name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-description">
                                  Description
                                </Label>
                                <Textarea
                                  id="edit-description"
                                  name="description"
                                  value={formData.description}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-price">Price</Label>
                                <Input
                                  id="edit-price"
                                  name="price"
                                  type="number"
                                  step="0.01"
                                  value={formData.price}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-image_url">
                                  Image URL
                                </Label>
                                <Input
                                  id="edit-image_url"
                                  name="image_url"
                                  value={formData.image_url}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-artisan_id">Artisan</Label>
                                <Select
                                  value={formData.artisan_id}
                                  onValueChange={(value) =>
                                    handleSelectChange("artisan_id", value)
                                  }
                                  required
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select artisan" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {artisans.map((artisan) => (
                                      <SelectItem
                                        key={artisan.id}
                                        value={artisan.id}
                                      >
                                        {artisan.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="edit-category_id">
                                  Category
                                </Label>
                                <Select
                                  value={formData.category_id}
                                  onValueChange={(value) =>
                                    handleSelectChange("category_id", value)
                                  }
                                  required
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories.map((category) => (
                                      <SelectItem
                                        key={category.id}
                                        value={category.id}
                                      >
                                        {category.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="edit-stock_quantity">
                                  Stock Quantity
                                </Label>
                                <Input
                                  id="edit-stock_quantity"
                                  name="stock_quantity"
                                  type="number"
                                  value={formData.stock_quantity}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <Button type="submit" className="w-full">
                                Update Product
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
