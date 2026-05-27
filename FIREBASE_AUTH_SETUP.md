# Firebase Authentication Setup for Admin Panel

The admin panel now uses **Firebase Authentication** for secure login. No credentials are hardcoded in the source code.

## Setup Instructions

### 1. Enable Email/Password Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `nothingwithoutus-9d791`
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Email/Password**
5. Toggle **Enable** and click **Save**

### 2. Create Admin User

1. In Firebase Console, go to **Authentication** → **Users**
2. Click **Add user**
3. Enter:
   - **Email**: Your admin email (e.g., `admin@nothingwithoutus.org`)
   - **Password**: Your secure admin password
4. Click **Add user**

### 3. Login to Admin Panel

1. Navigate to `/admin` on your website
2. Enter the email and password you created in Firebase
3. Click **Sign In**

## Security Features

✅ **Server-side authentication** - Credentials verified by Firebase, not client-side  
✅ **No hardcoded passwords** - All authentication handled by Firebase Auth  
✅ **Session management** - Automatic token refresh and expiration  
✅ **Secure by default** - Protected against common attacks  
✅ **Error handling** - User-friendly error messages for failed login attempts

## Firebase Security Rules (Optional Enhancement)

To further secure your Firestore data, add these rules to allow only authenticated users to read form submissions:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to recommendations and sponsorships
    match /recommendations/{document} {
      allow create: if true;
      allow read: if request.auth != null; // Only authenticated users can read
    }
    
    match /sponsorships/{document} {
      allow create: if true;
      allow read: if request.auth != null; // Only authenticated users can read
    }
  }
}
```

## How It Works

1. **Authentication State**: The app monitors Firebase auth state using `onAuthStateChanged()`
2. **Protected Route**: Users must be authenticated to view the admin dashboard
3. **Automatic Redirect**: Unauthenticated users see the login form
4. **Secure Logout**: Signing out clears the Firebase session and redirects to home
5. **Data Loading**: Form submissions are only fetched after successful authentication

## Troubleshooting

### "Invalid email or password" error
- Verify the user exists in Firebase Console → Authentication → Users
- Check that Email/Password auth is enabled
- Ensure you're using the correct email and password

### "Too many failed attempts" error
- Wait 15-30 minutes before trying again
- Firebase temporarily blocks users after multiple failed login attempts

### Data not loading after login
- Check Firebase configuration in `.env.local`
- Verify Firestore collections exist (`recommendations`, `sponsorships`)
- Check browser console for detailed error messages

## Environment Variables

Ensure your `.env.local` file contains all Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## Next Steps

Consider these additional enhancements:

- **Password Reset**: Add "Forgot Password" functionality using `sendPasswordResetEmail()`
- **Multiple Admins**: Add role-based access control with custom claims
- **Activity Logging**: Track who accessed the admin panel and when
- **Email Verification**: Require admin users to verify their email
