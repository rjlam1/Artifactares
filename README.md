# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




# 🏺 Historical Artifacts Tracker (Client Side)

A full-stack web application for tracking, showcasing, and managing historical artifacts like the Rosetta Stone, Antikythera Mechanism, and more. Built with React, Firebase, and Tailwind CSS.

## 🚀 Live Site

🔗 [Visit Live Site](https://historical-artifacts.web.app)

---

## 🎯 Project Purpose

This application allows users to:

- Explore historical artifacts with full details
- Like and bookmark their favorite ones
- Add, update, and delete their own contributed artifacts
- Track liked and owned artifacts
- Search artifacts by name

---

## ✨ Key Features

### 🏠 Home Page
- Hero slider with historical themes
- Featured Artifacts (Top 6 by Like Count)
- See All button to browse full collection
- Two extra meaningful sections
- Framer Motion animation implemented

### 🔐 Authentication
- Email/password and Google login
- Form validation (strong password rules)
- Protected routes for Add, My Artifacts, Liked Artifacts, and Details page
- User photo + dropdown on navbar when logged in

### 📋 All Artifacts Page
- Search artifacts by name
- All artifacts displayed in cards
- View Detail button to go to full page

### ➕ Add Artifact (Private)
- Full form with validation and default user info
- Artifact Type dropdown (Tools, Weapons, Writings, etc.)
- Success message on submission (toast/alert)

### ❤️ Liked Artifacts Page (Private)
- Shows all artifacts the user has liked
- Like button with toggle logic (Like/Dislike)
- Stored and synced with database

### 🛠 My Artifacts Page (Private)
- Show only logged-in user's submitted artifacts
- Update/Delete options with confirmation
- Update form has pre-filled data

### 🧾 Artifact Details Page (Private)
- Shows full artifact data
- Like button with live update in database

### 🧭 Other Features
- Dynamic Page Title for each route
- Custom 404 Not Found Page
- Loading Spinner using `flowbite-react`
- Toast/Sweet Alert for all operations
- Fully responsive (Mobile, Tablet, Desktop)
- Beautiful, accessible, recruiter-friendly UI

---

## 🛠 Technologies Used

### Frontend
- React.js
- React Router DOM
- Firebase Authentication
- Tailwind CSS
- DaisyUI / Flowbite (UI libraries)
- Framer Motion
- React Toastify / SweetAlert2
- Axios

### Other Tools
- JWT for secure route access
- Vite (for faster builds and dev)

---

## 🗂 Folder Structure (Client)

