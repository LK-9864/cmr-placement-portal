# CMR Placement Portal - Capstone Project

## 📋 Project Overview
A comprehensive web-based placement portal for CMR College of Engineering & Technology that allows students to view job openings from major companies and submit applications.

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React.js (JavaScript)
- **Styling**: CSS3
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Build Tool**: Create React App (CRA)

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js (JavaScript)
- **CORS**: CORS middleware for cross-origin requests
- **Database**: MongoDB (configured, currently using in-memory storage)
- **Port**: 5000

### **Database**
- **Primary**: MongoDB Atlas (recommended for production)
- **Alternative**: In-memory storage (current development mode)

### **Deployment Platforms** (Recommended)
- AWS (EC2, Lambda, S3)
- Heroku
- Azure App Service
- Vercel (Frontend)

## 📂 Project Structure

```
capstone/
├── backend/
│   ├── server.js          # Express server with API routes
│   ├── package.json       # Backend dependencies
│   └── node_modules/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # Main app component with job listings
│   │   ├── App.css        # Styling
│   │   ├── Login.js       # Student login component
│   │   ├── Login.css      # Login styling
│   │   └── index.js       # React entry point
│   ├── package.json       # Frontend dependencies
│   └── node_modules/
└── README.md
```

## 🎓 Features

### ✅ Implemented
1. **Student Authentication** - Login with CMR college email (8 students)
2. **Job Listings** - 35 positions from 5 major companies (TCS, AWS, Dell, HCL, Accenture)
3. **Application System** - Students can apply for jobs
4. **Application Tracker** - View submitted applications
5. **Responsive Design** - Works on desktop and mobile
6. **User Dashboard** - Shows logged-in student info

### 👥 CMR Students Database
- Aditya (aditya@cmr.edu.in)
- Harish (harish@cmr.edu.in)
- Gobinath (gobinath@cmr.edu.in)
- Chethen (chethen@cmr.edu.in)
- Nithish (nithish@cmr.edu.in)
- Lakshmikanth N (lakshmikanth@cmr.edu.in)
- Narendra (narendra@cmr.edu.in)
- Albi (albi@cmr.edu.in)

### 🏢 Companies & Roles
**35 total job positions** including:
- Software Engineer, Full Stack Developer, Frontend Developer
- Backend Developer, Cloud Engineer, DevOps Engineer
- Data Scientist, Data Analyst, Machine Learning Engineer
- AI/ML Specialist, Blockchain Developer, Big Data Engineer
- Project Manager, Scrum Master, Technical Lead, Solutions Architect
- And many more specialized roles

## 🚀 Deployment Guide

### **Option 1: AWS Deployment**

#### Frontend Deployment (S3 + CloudFront)
1. Build React app:
```bash
npm run build
```
2. Upload `build/` folder to S3 bucket
3. Create CloudFront distribution
4. Point to S3 bucket

#### Backend Deployment (EC2)
1. Launch EC2 instance (Ubuntu)
2. Install Node.js
3. Clone/upload code
4. Install dependencies: `npm install`
5. Start server: `npm start`
6. Use Elastic IP for static IP

#### Database (MongoDB Atlas)
1. Create free cluster at mongodb.com
2. Update connection string in server.js
3. Add IP whitelist for EC2 instance

### **Option 2: Heroku Deployment (Easiest)**

#### Backend to Heroku
```bash
npm install -g heroku
heroku login
heroku create your-app-name
git push heroku main
```

#### Frontend to Vercel
```bash
npm install -g vercel
vercel
```

### **Option 3: Azure Deployment**

1. **Backend**: Azure App Service
   - Create App Service (Node.js runtime)
   - Deploy via Git or ZIP
   - Configure environment variables

2. **Frontend**: Azure Static Web Apps
   - Connect GitHub repo
   - Auto-deployment on push

3. **Database**: Azure Cosmos DB
   - MongoDB API compatible
   - Update connection string

## 📊 API Endpoints

### Backend Routes
- `GET /api/jobs` - Fetch all job listings
- `POST /api/jobs` - Submit a new job application

## 💻 Running Locally

### Backend
```powershell
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### Frontend
```powershell
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

## 📦 Dependencies

### Backend (package.json)
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "cors": "^2.8.5"
}
```

### Frontend (package.json)
```json
{
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "react-scripts": "^5.0.1"
}
```

## 🔐 Security Considerations

1. Validate all user inputs
2. Use HTTPS for production
3. Implement JWT authentication
4. Hash student passwords (future improvement)
5. Rate limiting on API calls
6. Environment variables for sensitive data

## 🎯 Future Enhancements

1. **Database Integration** - MongoDB Atlas for persistent storage
2. **Admin Panel** - For recruiters to manage job postings
3. **Email Notifications** - Application status updates
4. **Resume Upload** - PDF/Document support
5. **Application Status Tracking** - Real-time updates
6. **Interview Scheduling** - Calendar integration
7. **Payment Gateway** - For premium features
8. **Analytics Dashboard** - Placement statistics

## 📝 Environment Variables

Create `.env` file in backend:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

## 📄 License
Educational Project - CMR College of Engineering & Technology

## 👨‍💼 Authors
Capstone Project - Cloud Computing Students
CMR College of Engineering & Technology

---

**For Cloud Deployment:**
- AWS: Best for enterprise-grade scalability
- Heroku: Best for quick deployment
- Azure: Best for Microsoft ecosystem integration
- Vercel: Best for frontend-only deployments
