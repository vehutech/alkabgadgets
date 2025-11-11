// Sample Products Data

export interface productType {
      id: number;
      name: string;
      category: "iphone" | "android" | "accessories";
      condition: string;
      price: number;
      originalPrice?: number;
      rating: number;
      reviews: number;
      description: string;
      images: string[];
      video: string;
      inStock: boolean,
      featured: boolean,
}

export const products: productType[] = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "iphone",
      condition: "brand-new",
      price: 1199,
      originalPrice: 1299,
      rating: 4.9,
      reviews: 234,
      description: "The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.",
      images: [
        "https://images.unsplash.com/photo-1696446702811-534f8e84d551?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1592286927505-b0c2dcaNaN91?w=500&h=500&fit=crop",
      ],
      video: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      inStock: true,
      featured: true,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      category: "android",
      condition: "brand-new",
      price: 1099,
      rating: 4.8,
      reviews: 189,
      description: "Flagship Android with S Pen, 200MP camera, and stunning AMOLED display.",
      images: [
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&h=500&fit=crop",
      ],
      video: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      inStock: true,
      featured: true,
    },
    {
      id: 3,
      name: "iPhone 14 Pro",
      category: "iphone",
      condition: "uk-used",
      price: 799,
      originalPrice: 999,
      rating: 4.7,
      reviews: 156,
      description: "Premium pre-owned iPhone 14 Pro in excellent condition with warranty.",
      images: [
        "https://images.unsplash.com/photo-1678911820864-e5897e4e0833?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
      ],
      video: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      inStock: true,
      featured: false,
    },
    {
      id: 4,
      name: "AirPods Pro (2nd Gen)",
      category: "accessories",
      condition: "brand-new",
      price: 249,
      rating: 4.9,
      reviews: 412,
      description: "Active noise cancellation, adaptive audio, and personalized spatial audio.",
      images: [
        "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
      ],
      video: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      inStock: true,
      featured: true,
    },
    {
      id: 5,
      name: "Google Pixel 8 Pro",
      category: "android",
      condition: "brand-new",
      price: 899,
      rating: 4.8,
      reviews: 143,
      description: "Google's AI-powered flagship with best-in-class camera and clean Android.",
      images: [
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      ],
      video: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      inStock: true,
      featured: false,
    },
    {
      id: 6,
      name: "MagSafe Charging Station",
      category: "accessories",
      condition: "brand-new",
      price: 129,
      rating: 4.6,
      reviews: 87,
      description: "3-in-1 wireless charging for iPhone, AirPods, and Apple Watch.",
      images: [
        "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
      ],
      video: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      inStock: true,
      featured: false,
    },
    {
      id: 7,
      name: "iPhone 13",
      category: "iphone",
      condition: "nigerian-used",
      price: 599,
      originalPrice: 799,
      rating: 4.5,
      reviews: 203,
      description: "Certified nigerian used iPhone 13 with new battery and warranty.",
      images: [
        "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
      ],
      video: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      inStock: true,
      featured: false,
    },
    {
      id: 8,
      name: "Samsung Galaxy Buds2 Pro",
      category: "accessories",
      condition: "brand-new",
      price: 229,
      rating: 4.7,
      reviews: 176,
      description: "Premium earbuds with intelligent ANC and 360° audio experience.",
      images: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1606220588913-b3aeb9b5f409?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&h=500&fit=crop",
      ],
      video: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      inStock: true,
      featured: false,
    },
  ];