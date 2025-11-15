// Product type definition
export type ProductType = {
  id: string; // Firebase auto-generated ID
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: "iphone" | "android" | "accessory";
  condition: "new" | "used" | "refurbished";
  rating: number;
  reviews: number;
  featured: boolean;
  images: string[]; // Cloudinary URLs
  video?: string; // Cloudinary video URL
  stock: number; // Quantity in stock
  createdAt: string;
  updatedAt: string;
};

// Dashboard stats type
export type DashboardStats = {
  totalProducts: number;
  totalIphones: number;
  totalAndroids: number;
  totalAccessories: number;
  totalStock: number;
  lowStockProducts: number; // Products with stock < 5
};

// Cloudinary upload response
export type CloudinaryUploadResponse = {
  url: string;
  publicId: string;
};

// User type for authentication
export type User = {
  uid: string;
  email: string;
  displayName?: string;
  role: "admin" | "user";
};