import Link from "next/link";
import { Plus } from "lucide-react";
import ProductList from "@/app/components/admin/ProductList";
import { getAllProducts } from "@/app/actions/products";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Products
          </h1>
          <p className="text-gray-600">
            View, edit, and delete your product inventory
          </p>
        </div>
        <Link
          href="/admin/products/add"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Product List */}
      <ProductList initialProducts={products} />
    </div>
  );
}