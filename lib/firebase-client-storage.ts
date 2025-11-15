// lib/firebase-client-storage.ts
"use client";

import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth } from "@/lib/firebase-client";

export async function uploadImageToFirebaseStorage(
  file: File,
  path: string
): Promise<string | null> {
  try {
    // Ensure user is authenticated
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    const storage = getStorage();
    
    // Create a unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${path}/${timestamp}.${fileExtension}`;
    
    // Create a reference to the file location
    const storageRef = ref(storage, fileName);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

export async function deleteImageFromFirebaseStorage(imageUrl: string): Promise<boolean> {
  try {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    const storage = getStorage();
    
    // Create a reference from the URL
    const imageRef = ref(storage, imageUrl);
    
    // Delete the file
    await deleteObject(imageRef);
    
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}