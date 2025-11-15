"use server";

import { getCurrentUser } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";
import { redirect } from "next/navigation";
import { writeFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import path from "path";
import { randomUUID } from "crypto";
import { CloudinaryUploadResponse } from "@/lib/types";

/**
 * Upload images to Cloudinary
 * Returns array of upload results with URLs and public IDs
 */
export async function uploadImagesToCloudinary(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const files = formData.getAll("files") as File[];

  if (!files || files.length === 0) {
    return { error: "No files selected", uploads: [] };
  }

  try {
    const uploads = await Promise.all(
      files.map(async (file) => {
        if (!file || file.size === 0) {
          return { error: `File ${file.name} is empty` };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const tempFilePath = path.join(tmpdir(), `${randomUUID()}-${file.name}`);

        // Write to temp file
        await writeFile(tempFilePath, buffer);

        try {
          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(tempFilePath, {
            folder: "products",
            resource_type: "auto", // Supports images and videos
          });

          // Clean up temp file
          await unlink(tempFilePath);

          return {
            url: result.secure_url,
            publicId: result.public_id,
          } as CloudinaryUploadResponse;
        } catch (error) {
          console.error(`Upload failed for ${file.name}:`, error);
          
          // Clean up temp file even on error
          try {
            await unlink(tempFilePath);
          } catch {}

          return { error: `Cloudinary upload failed for ${file.name}` };
        }
      })
    );

    return { uploads };
  } catch (error) {
    console.error("Error in uploadImagesToCloudinary:", error);
    return { error: "Failed to upload images", uploads: [] };
  }
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImageFromCloudinary(
  publicId: string
): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
}

/**
 * Upload single image and return URL
 */
export async function uploadSingleImage(file: File): Promise<string | null> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  if (!file || file.size === 0) {
    return null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const tempFilePath = path.join(tmpdir(), `${randomUUID()}-${file.name}`);

  try {
    await writeFile(tempFilePath, buffer);

    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "products",
      resource_type: "auto",
    });

    await unlink(tempFilePath);

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading single image:", error);
    
    try {
      await unlink(tempFilePath);
    } catch {}

    return null;
  }
}