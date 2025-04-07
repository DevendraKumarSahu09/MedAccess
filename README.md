# MedAccess

MedAccess is a comprehensive healthcare management platform that bridges the gap between hospitals, doctors, pharmacies, and patients. By providing a centralized system for healthcare service management, MedAccess aims to improve accessibility, efficiency, and coordination of medical services.

## 🏥 Features

### For Hospitals
- **Dashboard Management**: Manage hospital statistics, blood inventory, and resources
- **Doctor Management**: Add and manage hospital doctors with specializations
- **Profile Management**: Update hospital details and specializations
- **Blood Bank Management**: Track and manage blood inventory
- **Bed Management**: Monitor and update bed availability
- **Non-Medical Staff**: Manage administrative and support staff

### For Patients
- **Hospital Directory**: Browse and filter hospitals based on location and specialization
- **Doctor Directory**: View qualified doctors by specialization
- **Appointment Booking**: Schedule appointments with doctors
- **Pharmacy Access**: View medication availability at hospital pharmacies

### For Doctors
- **Profile Management**: Create and update professional profiles
- **Patient Management**: Track patient interactions and medical history
- **Appointment Scheduling**: View and manage upcoming appointments

### For Pharmacies
- **Medication Management**: Add, update, and track medication inventory
- **Prescription Tracking**: Process and fulfill patient prescriptions

## 💻 Technologies Used

### Frontend
- React.js with Vite
- React Router for navigation
- CSS for styling
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Cloudinary for image storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- NPM or Yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/DevendraKumarSahu09/MedAccess.git
cd MedAccess
```

2. Install dependencies for the backend
```bash
cd backend
npm install
```

3. Install dependencies for the frontend
```bash
cd ../client
npm install
```

4. Set up environment variables
   - Create `.env` file in the backend folder with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
   
   - Create `.env` file in the client folder:
   ```
   VITE_API_URL=http://localhost:5000
   ```

5. Start the backend server
```bash
cd backend
npm start
```

6. Start the frontend development server
```bash
cd client
npm run dev
```

7. Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

1. Register as a hospital, doctor, or patient
2. Log in using your credentials
3. Navigate through the dashboard based on your user type
4. Explore the features available for your role

## 🔄 Deployment

The application can be deployed using:
- Frontend: Vercel, Netlify, or any other static site hosting
- Backend: Heroku, DigitalOcean, AWS, or any Node.js hosting service
- Database: MongoDB Atlas

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For any inquiries or support, please reach out to the development team at [devendrasahu3837@gmail.com].
