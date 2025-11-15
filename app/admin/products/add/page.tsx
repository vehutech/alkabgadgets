import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/app/components/admin/ProductForm";

export default function AddProductPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Product
        </h1>
        <p className="text-gray-600">
          Fill in the details below to add a new product to your inventory
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}