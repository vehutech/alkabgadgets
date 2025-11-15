import { getCurrentUser } from "@/lib/auth";
// import { getDashboardStats } from "../actions/dashboard";
import DashboardStatsComponent from "@/app/components/admin/DashboardStats";
import { getDashboardStats } from "@/app/actions/dashboard";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const stats = await getDashboardStats();

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, Admin! 👋
        </h1>
        <p className="text-gray-600">
          Here&apos;s an overview of your product inventory
        </p>
      </div>

      {/* Statistics */}
      <DashboardStatsComponent stats={stats} />

      {/* Additional Info Cards */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/products/add"
              className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
            >
              Add New Product
            </a>
            <a
              href="/admin/products"
              className="block w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
            >
              Manage All Products
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cloudinary Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Low Stock Alerts</span>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {stats.lowStockProducts} Items
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}