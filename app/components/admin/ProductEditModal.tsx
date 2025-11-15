"use client";

import { ProductType } from "@/lib/types";
import { X } from "lucide-react";
import ProductForm from "./ProductForm";

interface Props {
  product: ProductType;
  onClose: () => void;
}

export default function ProductEditModal({ product, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <ProductForm existingProduct={product} mode="edit" />
        </div>
      </div>
    </div>
  );
}