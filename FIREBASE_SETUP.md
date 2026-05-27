# Firebase Setup Instructions

This project uses Firebase Firestore to store form submissions from the Recommendation and Sponsorship forms.

## 🔐 Security Note

Firebase credentials are stored in environment variables (`.env.local`) and are **not** committed to git. Your `.env.local` file has been created with placeholder values - replace them with your actual Firebase credentials.

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project named "nothingwithoutus"
3. Follow the setup wizard

### 2. Enable Firestore Database

1. In your Firebase project, go to **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (you'll configure rules later)
4. Select a Firestore location (choose one closest to your users)

### 3. Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon) → **General**
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`) to register a web app
4. Register your app with a nickname (e.g., "Nothing Without Us Web")
5. Copy the `firebaseConfig` object

### 4. Update Firebase Configuration

Open `.env.local` in your project root and replace the placeholder values with your actual Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=nothingwithoutus.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nothingwithoutus
VITE_FIREBASE_STORAGE_BUCKET=nothingwithoutus.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
VITE_FIREBASE_APP_ID=your_actual_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
```

**Important**: 
- Never commit `.env.local` to git (it's already in `.gitignore`)
- The `.env.example` file shows what variables are needed (safe to commit)
- Restart your dev server after changing environment variables

### 5. Set Up Firestore Security Rules

1. Go to **Firestore Database** → **Rules**
2. Add the following rules to allow form submissions:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read and write to recommendations collection
    match /recommendations/{document=**} {
      allow read: if request.auth != null; // Only authenticated users can read
      allow write: if true; // Anyone can submit (public form)
    }
    
    // Allow read and write to sponsorships collection
    match /sponsorships/{document=**} {
      allow read: if request.auth != null; // Only authenticated users can read
      allow write: if true; // Anyone can submit (public form)
    }
  }
}
```

3. Click **Publish**

> **Note**: These rules allow anyone to submit forms (write) but only authenticated users to read submissions. Adjust based on your security needs.

### 6. Create Firestore Collections

The collections will be created automatically when the first form is submitted, but you can create them manually:

1. Go to **Firestore Database** → **Data**
2. Click **Start collection**
3. Create two collections:
   - `recommendations` - stores recommendation form submissions
   - `sponsorships` - stores sponsorship inquiry submissions

### 7. Firestore Document Structure

#### Recommendations Collection

Each document contains:
```javascript
{
  nomineeName: string,
  nomineeEmail: string (optional),
  relationship: string,
  category: string,
  story: string,
  yourName: string,
  yourEmail: string,
  organization: string (optional),
  consent: boolean,
  submittedAt: timestamp,
  status: string // "pending", "reviewed", "contacted", "published"
}
```

#### Sponsorships Collection

Each document contains:
```javascript
{
  organizationName: string,
  contactName: string,
  email: string,
  phone: string,
  sponsorshipLevel: string,
  interests: array of strings,
  message: string,
  submittedAt: timestamp,
  status: string // "new", "contacted", "in_discussion", "closed"
}
```

## Testing the Integration

1. Run your development server:
```bash
npm run dev
```

2. Navigate to the Recommendation page (`/recommend`) or open the Sponsor form
3. Fill out and submit the form
4. Check your Firebase Console → Firestore Database to see the submission

## Viewing Submissions

To view form submissions:

1. Go to Firebase Console → **Firestore Database** → **Data**
2. Browse the `recommendations` or `sponsorships` collections
3. Click on any document to view its details

You can also build an admin panel to manage submissions or use Firebase's built-in features.

## Troubleshooting

- **"Permission denied" errors**: Check your Firestore security rules
- **"Firebase not initialized" errors**: Verify your configuration in `src/lib/firebase.ts`
- **Forms not submitting**: Check browser console for errors and ensure Firebase is properly configured

## Next Steps

Consider adding:
- Email notifications when forms are submitted (using Firebase Cloud Functions)
- Admin authentication to view/manage submissions
- Data validation on the backend using Cloud Functions
- Analytics tracking for form submissions
