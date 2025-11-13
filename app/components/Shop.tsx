"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Play, Star, ShoppingCart, Heart } from "lucide-react";
import { products } from "@/lib/product-data";
import { productType } from "@/lib/product-data";
import Image from "next/image";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<productType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const categories = [
    { value: "all", label: "All Products" },
    { value: "iphone", label: "iPhones" },
    { value: "android", label: "Android" },
    { value: "accessories", label: "Accessories" },
  ];

  const conditions = [
    { value: "all", label: "All Conditions" },
    { value: "brand-new", label: "Brand New" },
    { value: "uk-used", label: "UK Used" },
    { value: "nigerian-used", label: "Nigerian Used" },
  ];

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesCondition = selectedCondition === "all" || product.condition === selectedCondition;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
    });

    // Sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "featured") {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return filtered;
  }, [searchQuery, selectedCategory, selectedCondition, priceRange, sortBy]);

  const openProductModal = (product: productType) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProduct) {
      const totalMedia = selectedProduct.images.length + 1; // +1 for video
      setCurrentImageIndex((prev) => (prev + 1) % totalMedia);
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      const totalMedia = selectedProduct.images.length + 1;
      setCurrentImageIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
    }
  };

  return (
    <div id="shop" className="min-h-screen bg-linear-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">Top Deals</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Discover premium devices and accessories</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-900 dark:text-white"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-3">Category</label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                          selectedCategory === cat.value
                            ? "bg-blue-500 text-white"
                            : "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-600"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-3">Condition</label>
                  <div className="space-y-2">
                    {conditions.map((cond) => (
                      <button
                        key={cond.value}
                        onClick={() => setSelectedCondition(cond.value)}
                        className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                          selectedCondition === cond.value
                            ? "bg-blue-500 text-white"
                            : "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-600"
                        }`}
                      >
                        {cond.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-neutral-600 dark:text-neutral-400">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => openProductModal(product)}
              className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <Image
                    fill
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.featured && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    Featured
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors">
                  <Heart className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">{product.rating}</span>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">({product.reviews})</span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      ${product.price}
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 line-through">
                        ${product.originalPrice}
                      </div>
                    )}
                  </div>
                  <button className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">No products found</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-5xl w-full my-8 relative">
            {/* Close Button */}
            <button
              onClick={closeProductModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-6 h-6 text-neutral-900 dark:text-white" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-4">
                  {currentImageIndex < selectedProduct.images.length ? (
                    <Image
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={selectedProduct.video}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-10 h-10 text-neutral-900 ml-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-neutral-900 dark:text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-neutral-900 dark:text-white" />
                  </button>
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === idx
                          ? "border-blue-500"
                          : "border-transparent hover:border-neutral-300 dark:hover:border-neutral-600"
                      }`}
                    >
                      <Image src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentImageIndex(selectedProduct.images.length)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors relative ${
                      currentImageIndex === selectedProduct.images.length
                        ? "border-blue-500"
                        : "border-transparent hover:border-neutral-300 dark:hover:border-neutral-600"
                    }`}
                  >
                    <Image src={selectedProduct.video} alt="Video" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-bold text-neutral-900 dark:text-white">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      ({selectedProduct.reviews} reviews)
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                    {selectedProduct.name}
                  </h2>

                  <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                    {selectedProduct.condition.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  </div>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                      ${selectedProduct.price}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-xl text-neutral-500 dark:text-neutral-400 line-through">
                        ${selectedProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  {selectedProduct.originalPrice && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-semibold">
                      Save ${selectedProduct.originalPrice - selectedProduct.price}
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                    <span className="text-neutral-600 dark:text-neutral-400">Availability</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">In Stock</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                    <span className="text-neutral-600 dark:text-neutral-400">Warranty</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">12 Months</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                    <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">Free Delivery</span>
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  <button className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="w-full py-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}