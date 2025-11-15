"use server";

import { getCurrentUser } from "@/lib/auth";
import { db, serializeDoc } from "@/lib/firebase-admin";
import { ProductType } from "@/lib/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Get all products
 */
export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const snapshot = await db
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => serializeDoc<ProductType>(doc)!).filter(Boolean);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  category: "iphone" | "android" | "accessory"
): Promise<ProductType[]> {
  try {
    const snapshot = await db
      .collection("products")
      .where("category", "==", category)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => serializeDoc<ProductType>(doc)!).filter(Boolean);
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    return [];
  }
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string): Promise<ProductType | null> {
  try {
    const docSnap = await db.collection("products").doc(id).get();
    return serializeDoc<ProductType>(docSnap);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/**
 * Create new product
 */
export async function createProduct(
  product: Omit<ProductType, "id" | "createdAt" | "updatedAt">
): Promise<{ success: boolean; id?: string; error?: string }> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  try {
    const now = new Date();

    const productData = {
      ...product,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await db.collection("products").add(productData);

    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

/**
 * Update product
 */
export async function updateProduct(
  id: string,
  product: Partial<Omit<ProductType, "id" | "createdAt">>
): Promise<{ success: boolean; error?: string }> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  try {
    await db
      .collection("products")
      .doc(id)
      .update({
        ...product,
        updatedAt: new Date(),
      });

    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

/**
 * Delete product
 */
export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  try {
    await db.collection("products").doc(id).delete();

    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

/**
 * Search products by name
 */
export async function searchProducts(query: string): Promise<ProductType[]> {
  try {
    const snapshot = await db.collection("products").get();

    const products = snapshot.docs
      .map((doc) => serializeDoc<ProductType>(doc)!)
      .filter(Boolean);

    // Filter by name (case-insensitive)
    const searchTerm = query.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}