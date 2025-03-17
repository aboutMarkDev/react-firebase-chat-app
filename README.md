# ChitChat! A Real-Time Chat Application built with React + Firebase

This is a real-time application built using **React** and **Firebase (Firestore onsnapshots)** to enable instant updates. It allows users to see data changes in real-time without needing to refresh the page.

## 🚀 Features

⭐ Real-time message updates with Firebase Firestore snapshots  
⭐ Clean, modern, and fully responsive UI built with React + Tailwind CSS  
⭐ Fun and engaging chat experience with built-in emojis using `react-emoji-picker`  
⭐ Smooth UI animations powered by Framer Motion  
⭐ Secure user authentication with Firebase Authentication  
⭐ Efficient state management using Zustand  
⭐ **One-on-one private messaging with user invitations** 

## 🛠️ Tech Stack

- **Frontend**: React, Zustand, Framer Motion, Shadcn for CSS/Styled Components
- **Backend**: Firebase Firestore (NoSQL Database)
- **Authentication**: Firebase Auth
- **Hosting**: Vercel

## ❕ How It Works (Walkthrough)  

1. **Sign Up** – Create an account by providing a username, email, and password in the sign-up form. If successful, you will be automatically logged in.  
2. **Sign In** – If you already have an account, log in using your credentials.  
3. **View Online Users** – After logging in, you'll see the list of online users in the **Chats** section.  
4. **Start a Conversation** – Click on a user to open their profile, then select **"Create Conversation"** to start a real-time chat.  
5. **Chat & Have Fun** – Enjoy real-time messaging with built-in emoji support for a more expressive chat experience! 🎉  

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/aboutMarkDev/react-firebase-chat-app.git
cd your-repo-name
```

### 2️⃣ Install Dependencies
```sh
npm install
#or
yarn install
```

### 3️⃣ Setup Firebase
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Copy your Firebase config from the Firebase Console and update `.env` file
```.env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

### 4️⃣ Run the application locally
```sh
npm start
```
## Contributors
- aboutMarkDev
