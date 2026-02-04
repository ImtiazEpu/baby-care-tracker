# Baby Care & Vaccine Tracker (Bangladesh EPI Edition)

A production-ready Progressive Web App (PWA) for tracking baby's age, vaccines, milestones, and growth based on the Bangladesh Government EPI (Expanded Programme on Immunization) schedule.

![Version](https://img.shields.io/badge/version-1.4.0-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![Vite](https://img.shields.io/badge/Vite-7-646cff)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

### Core Features
- **Exact Age Calculator**: Shows baby's age in years, months, days, weeks, and total days
- **Bangladesh EPI Vaccine Tracker**: Automatic vaccine schedule based on official BD EPI guidelines
- **Smart Vaccine Status**: Classifies vaccines as Completed, Due, Upcoming, or Overdue
- **Multiple Baby Profiles**: Support for tracking multiple babies
- **Milestone Tracker**: Auto milestones (1 week, 45 days, 3 months, etc.) + custom milestones
- **Growth Tracker**: Track weight, height, and head circumference with interactive SVG charts
- **Medical Records**: Upload and store medical documents (PDF, images) - 5MB total, 500KB per file
- **Progress Tracking**: Visual progress bar showing vaccination completion
- **Shareable Links**: Generate read-only links to share baby's vaccine schedule
- **Dark Mode**: Elegant dark/light mode toggle with glassmorphism design
- **PWA Support**: Install as app on mobile/desktop with offline support
- **Auto Updates**: Get notified when a new version is available

### Cloud Features (v1.4.0+)
- **Cloud Authentication**: Sign in with Google or passwordless email magic link
- **Cloud Storage**: All data syncs securely across your devices via Firestore
- **Privacy Controls**: View privacy notice and delete all your data anytime
- **User-Friendly Errors**: Clean error messages without technical jargon

### Bangladesh EPI Vaccine Schedule

| Age | Vaccines |
|-----|----------|
| At Birth | BCG + OPV 0 |
| 6 weeks (42 days) | Pentavalent 1 + OPV 1 + PCV 1 |
| 10 weeks (70 days) | Pentavalent 2 + OPV 2 + PCV 2 |
| 14 weeks (98 days) | Pentavalent 3 + OPV 3 + PCV 3 |
| 9 months (270 days) | MR (Measles-Rubella) |
| 15 months (450 days) | MR 2 |

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI Framework |
| Vite | 7 | Build Tool |
| Tailwind CSS | 4 | Styling (glassmorphism effects) |
| Firebase | 12 | Authentication & Firestore Database |
| React Router DOM | 7 | Routing |
| Heroicons | 2 | Icons |
| Flatpickr | 4 | Date Picker |
| React Content Loader | 7 | Loading States |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd baby-care-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Google and Email Link providers)
   - Create a Firestore database
   - Add your Firebase config to `src/config/firebase.js`
   - Add your domain to Firebase Console > Authentication > Settings > Authorized domains

4. Deploy Firestore security rules:
```bash
firebase deploy --only firestore:rules
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
baby-care-tracker/
├── public/
│   ├── _redirects          # Netlify SPA routing configuration
│   ├── sw.js               # Service worker for PWA
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   │   ├── AuthPage.jsx
│   │   │   ├── EmailOtpForm.jsx
│   │   │   └── EmailVerifyPage.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── DatePicker.jsx
│   │   ├── Modal.jsx
│   │   ├── LoadingCard.jsx
│   │   ├── VaccineCard.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── MilestoneTracker.jsx
│   │   ├── GrowthTracker.jsx
│   │   ├── GrowthChart.jsx     # Custom SVG chart
│   │   ├── ThemeToggle.jsx
│   │   ├── PrivacyNotice.jsx   # Privacy & data deletion
│   │   ├── UpdateNotification.jsx
│   │   └── Footer.jsx
│   ├── config/            # Configuration files
│   │   ├── firebase.js    # Firebase configuration
│   │   └── vaccines.js    # BD EPI vaccine schedule
│   ├── context/           # React Context
│   │   ├── AuthContext.jsx    # Authentication state
│   │   ├── BabyContext.jsx    # Baby data state
│   │   └── ThemeContext.jsx   # Theme state
│   ├── services/          # Firebase services
│   │   └── babyService.js     # Firestore CRUD operations
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── AddEditBaby.jsx
│   │   ├── Dashboard.jsx
│   │   └── SharedView.jsx
│   ├── utils/             # Utility functions
│   │   ├── ageCalculator.js
│   │   ├── errorMessages.js   # User-friendly error mapping
│   │   ├── storage.js
│   │   ├── validation.js
│   │   └── vaccineEngine.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── serviceWorkerRegistration.js
├── firestore.rules        # Firestore security rules
├── firestore.indexes.json # Firestore indexes
├── firebase.json          # Firebase configuration
├── index.html
├── netlify.toml           # Netlify configuration
├── package.json
└── README.md
```

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [Netlify](https://www.netlify.com/) and sign in

3. Click "Add new site" → "Import an existing project"

4. Connect your repository

5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize your site:
```bash
netlify init
```

4. Deploy:
```bash
netlify deploy --prod
```

### Environment Variables

Firebase configuration is stored in `src/config/firebase.js`. For production, you may want to use environment variables:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Usage

### Adding a Baby

1. Click "Add Your First Baby" or "Add Another Baby"
2. Enter baby's name and date of birth
3. Optionally add gender and photo URL
4. Click "Add Baby"

### Viewing Vaccine Schedule

1. Click on a baby card from the home page
2. View the dashboard with vaccine status
3. Mark vaccines as "Done" or "Undo" completed vaccines
4. Vaccines are automatically classified as:
   - ✅ **Completed**: User marked as done
   - ⏳ **Due**: Within 7 days or overdue
   - 🔵 **Upcoming**: Future vaccines
   - ⚠️ **Overdue**: Past due date

### Adding Milestones

1. Go to the Milestones tab
2. View auto milestones (achieved based on age)
3. Click "Add Custom" to add custom milestones
4. Enter title, description, and date

### Tracking Growth

1. Go to the Growth tab
2. Click "Add Record"
3. Enter weight, height, and/or head circumference
4. View the growth chart

### Sharing Vaccine Schedule

1. Click the "Share" button on the dashboard
2. Copy the generated link
3. Share with family/doctors for read-only view

## Medical Disclaimer

This app follows the Bangladesh EPI schedule. Always consult with a qualified healthcare professional for medical advice and vaccination guidance.

## Data Privacy

- All data is stored securely in the cloud linked to your account
- Only you can access your data through your authenticated account
- Data syncs across all your devices when signed in
- You can delete all your data at any time from the app (Privacy Notice > Delete All My Data)
- We do not share, sell, or use your data for advertising

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Changelog

### v1.4.0
- Added cloud authentication (Google Sign-In & Email Magic Link)
- Added cloud data storage with Firebase Firestore
- Added medical records subcollection architecture (5MB total, 500KB per file)
- Added custom interactive SVG growth chart (reduced bundle size)
- Added loading indicators for vaccines, milestones, and growth actions
- Added privacy notice with "Delete All My Data" option
- Added user-friendly error messages (hides technical details)
- Improved email sign-in UX with resend countdown timer
- Improved form handling with disable while saving
- Removed recharts dependency for lighter bundle

### v1.3.0
- Added PWA update notification - users get notified when a new version is available
- Added medical records upload and view functionality (PDF, JPG, PNG)
- Improved UI with consistent glassmorphism border styling
- Fixed service worker caching issues with browser extensions
- Fixed tab focus outline for smoother transitions
- Improved image viewing with blob URL conversion

### v1.2.0
- Added medical records support in baby management
- Improved responsiveness and styling across components
- Added Open Graph image and meta tags
- Added initial loader animation

### v1.1.0
- Added milestone tracker with auto and custom milestones
- Added growth tracker with charts
- Added shareable links feature

### v1.0.0
- Initial release with vaccine tracking
- Bangladesh EPI schedule implementation
- Multiple baby profiles support
- Dark mode support

## License

This project is open source and available for personal and educational use.

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Copyright © 2026 - Developed by [MatrixLab](https://matrixlab.it.com)**

Built with ❤️ for parents in Bangladesh
