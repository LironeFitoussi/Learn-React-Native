# Firebase Authentication Setup

This guide will help you set up Firebase Authentication for your React Native app.

## Prerequisites

1. A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
2. Expo CLI installed

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

## Step 3: Get Configuration

1. In Firebase Console, go to "Project Settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web" (</>) 
4. Register your app with a nickname
5. Copy the configuration values

## Step 4: Set Environment Variables

Create a `.env` file in your Auth-App directory with the following content:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_web_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important:** Replace the placeholder values with your actual Firebase configuration values.

## Step 5: Restart Development Server

After creating the `.env` file:

1. Stop your Expo development server (Ctrl+C)
2. Run `npm start` again
3. The environment variables will now be loaded

## Step 6: Test Authentication

1. Try to create a new user account
2. Check the console logs for any errors
3. Verify that the user appears in Firebase Console > Authentication > Users

## Troubleshooting

### "Firebase API key not configured" Error
- Make sure your `.env` file is in the correct location
- Verify the environment variable names start with `EXPO_PUBLIC_`
- Restart your development server after creating the `.env` file

### 400 Bad Request Error
- Check that your Firebase project has Authentication enabled
- Verify that Email/Password sign-in method is enabled
- Ensure your API key is correct

### Environment Variables Not Loading
- Make sure you're using Expo SDK 49+ for automatic environment variable loading
- Try using `expo-constants` if you're on an older version

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Firebase API keys are safe to expose in client-side code for web apps
- For production, consider using additional security measures

## Next Steps

After successful authentication setup, you can:
1. Add user profile management
2. Implement password reset functionality
3. Add social authentication (Google, Facebook, etc.)
4. Set up user data storage in Firestore
