"use client";

import { ProductType } from "@/lib/types";
import { Edit, Trash2, Star, Package } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/app/actions/products";

interface Props {
  product: ProductType;
  onEdit: (product: ProductType) => void;
}

export default function ProductCard({ product, onEdit }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteProduct(product.id);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to delete product");
      setIsDeleting(false);
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      iphone: "bg-purple-100 text-purple-700",
      android: "bg-green-100 text-green-700",
      accessory: "bg-yellow-100 text-yellow-700",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getConditionBadge = (condition: string) => {
    const colors = {
      new: "bg-blue-100 text-blue-700",
      used: "bg-orange-100 text-orange-700",
      refurbished: "bg-teal-100 text-teal-700",
    };
    return colors[condition as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package size={48} className="text-gray-400" />
          </div>
        )}
        
        {/* Stock badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              product.stock < 5
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            Stock: {product.stock}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Badges */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span
            className={`px-2 py-1 rounded text-xs font-medium capitalize ${getCategoryBadge(
              product.category
            )}`}
          >
            {product.category}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium capitalize ${getConditionBadge(
              product.condition
            )}`}
          >
            {product.condition}
          </span>
          {product.featured && (
            <span className="px-2 py-1 rounded text-xs font-medium bg-pink-100 text-pink-700">
              Featured
            </span>
          )}
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            <Trash2 size={16} />
            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}