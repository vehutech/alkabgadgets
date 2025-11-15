"use server";

import { db, serializeDoc } from "@/lib/firebase-admin";
import { DashboardStats, ProductType } from "@/lib/types";

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const snapshot = await db.collection("products").get();

    const products = snapshot.docs
      .map((doc) => serializeDoc<ProductType>(doc)!)
      .filter(Boolean);

    const stats: DashboardStats = {
      totalProducts: products.length,
      totalIphones: products.filter((p) => p.category === "iphone").length,
      totalAndroids: products.filter((p) => p.category === "android").length,
      totalAccessories: products.filter((p) => p.category === "accessory").length,
      totalStock: products.reduce((sum, p) => sum + (p.stock || 0), 0),
      lowStockProducts: products.filter((p) => (p.stock || 0) < 5).length,
    };

    return stats;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalProducts: 0,
      totalIphones: 0,
      totalAndroids: 0,
      totalAccessories: 0,
      totalStock: 0,
      lowStockProducts: 0,
    };
  }
}