# MedAccess - Healthcare Information System

## System Overview

MedAccess is a comprehensive healthcare platform designed to connect patients with healthcare services, hospitals, doctors, and critical resources like blood banks and hospital beds. The platform includes functionality for both patients seeking healthcare resources and for healthcare institutions (hospitals) to manage their services.

## Architecture

### Backend (Node.js + Express + MongoDB)
- RESTful API structure with controllers, models, and routes
- Authentication via JWT (JSON Web Tokens)
- MongoDB database with Mongoose ORM
- File uploads with Multer and Cloudinary integration

### Frontend (React)
- React with React Router for navigation
- Component-based architecture
- Responsive design
- Dashboard for hospital administrators

## Core Features

1. **User Management**
   - User authentication (login/signup)
   - Different user types (Doctors, Hospitals)
   - Profile management

2. **Hospital Management**
   - Hospital registration and profiles
   - Dashboard for hospital administrators
   - Doctor management within hospitals

3. **Doctor Management**
   - Doctor profiles and registration
   - Specialty and qualification tracking
   - Association with hospitals

4. **Blood Bank**
   - Blood inventory by blood type
   - Availability search
   - Inventory management

5. **Hospital Beds**
   - Bed availability tracking
   - Different bed types (ICU, General, etc.)
   - Bed status updates

6. **Pharmacy Management**
   - Medicine inventory
   - Stock management
   - Expiration tracking

7. **Non-Medical Staff Management**
   - Staff information management
   - Department assignment
   - Contact details

## Issues Resolved

### API Integration Issues
1. **Missing API Client Files**
   - Created the necessary API client files in `client/src/api/`
   - Implemented `pharmacyApi.js` and `nonMedicalStaffApi.js` with proper functions
   - Added error handling and response processing

2. **Component Errors**
   - Fixed error in `NonMedicalStaffForm.jsx` by completing the try-catch block
   - Added missing props in `NonMedicalStaffItem.jsx`
   - Updated API function calls across components

3. **Route Consistency**
   - Ensured route paths in the frontend match the backend endpoints
   - Updated authentication header handling

### Dashboard Improvements
1. **Enhanced Dashboard**
   - Added Pharmacy and Non-Medical Staff sections to Quick Access
   - Improved sidebar navigation with appropriate icons
   - Added loading and error states to components

2. **Data Handling**
   - Improved error handling across components
   - Added loading indicators for better user experience
   - Implemented consistent error messaging

3. **UI Enhancements**
   - Added component-specific CSS files
   - Created consistent styling across dashboard sections
   - Improved visual feedback for user actions

## Project Structure

```
MedAccess/
├── backend/
│   ├── controllers/    # Business logic
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── middleware/     # Authentication and validation
│   ├── uploads/        # File storage
│   └── server.js       # Main server file
│
└── client/
    ├── src/
    │   ├── api/                # API integration
    │   ├── components/         # Reusable UI components
    │   ├── DashPages/          # Dashboard pages
    │   ├── layouts/            # Page layouts
    │   ├── pages/              # Main application pages
    │   ├── DoctorProfilePages/ # Doctor profile pages
    │   ├── App.jsx             # Main application component
    │   └── main.jsx            # Application entry point
    └── public/                 # Static assets
```

## Running the Application

### Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`

### Frontend
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Authentication Flow

1. User registers via `/api/auth/hospital/register` or `/api/auth/doctor/register`
2. User logs in via `/api/auth/login` and receives a JWT token
3. Token is stored in localStorage and included in subsequent API requests
4. Protected routes check for valid token via `authMiddleware`

## Future Improvements

1. **Patient Management**
   - Appointment scheduling
   - Medical records
   - Patient portal

2. **Reporting**
   - Usage analytics
   - Resource utilization
   - Availability trends

3. **Mobile Responsiveness**
   - Improved mobile layouts
   - Progressive Web App (PWA) capabilities

4. **Real-time Updates**
   - WebSocket integration for live updates
   - Notification system

5. **Advanced Search**
   - Geolocation-based search
   - Filtering by multiple criteria
   - Advanced sorting options 