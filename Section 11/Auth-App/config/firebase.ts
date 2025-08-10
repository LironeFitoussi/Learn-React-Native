// Firebase Configuration
// This file contains Firebase configuration constants

export const FIREBASE_CONFIG = {
  // Your Firebase project configuration
  // Replace these values with your actual Firebase project settings
  
  // Web API Key (from Firebase Console > Project Settings > General > Web API Key)
  API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  
  // Auth Domain (from Firebase Console > Project Settings > General > Authorized domains)
  AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  
  // Project ID (from Firebase Console > Project Settings > General > Project ID)
  PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  
  // Storage Bucket (from Firebase Console > Project Settings > General > Storage bucket)
  STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  
  // Messaging Sender ID (from Firebase Console > Project Settings > General > Sender ID)
  MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  
  // App ID (from Firebase Console > Project Settings > General > App ID)
  APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Check if required Firebase configuration is available
export function validateFirebaseConfig() {
  const requiredKeys = ['API_KEY', 'AUTH_DOMAIN', 'PROJECT_ID'];
  const missingKeys = requiredKeys.filter(key => !FIREBASE_CONFIG[key as keyof typeof FIREBASE_CONFIG]);
  
  if (missingKeys.length > 0) {
    console.error('Missing Firebase configuration keys:', missingKeys);
    console.error('Please set the following environment variables:');
    missingKeys.forEach(key => {
      console.error(`  EXPO_PUBLIC_FIREBASE_${key}`);
    });
    return false;
  }
  
  return true;
}
