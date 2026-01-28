# 🎓 HireSense - Matching Potential with Possibility

## Overview

HireSense is a **multi-role placement management system** designed for colleges to streamline their recruitment process. It connects students with employers through an intelligent platform that supports job discovery, applications, assessments, interviews, and analytics.

### Key Features

✨ **Multi-Role Support**
- **Students**: Browse jobs, apply, take assessments, track interviews
- **Recruiters**: Post jobs, review applications, create tests, manage hiring
- **Admins (TPO)**: Oversee all placements, set policies, generate reports

📊 **Comprehensive Functionality**
- Job Management & Application Tracking
- Online Assessments & Tests
- Interview Scheduling
- Analytics & Reporting
- Eligibility Checking
- Resume Management

---

## System Architecture

### Technology Stack

**Frontend**
- React.js 19.2.3 with React Hooks
- Modern CSS3 with gradients and responsive design
- Fetch API for backend communication
- Create React App development environment

**Backend**
- Node.js with Express.js
- REST API architecture
- CORS enabled for cross-origin requests
- MongoDB ready (currently using in-memory storage)

**Deployment**
- Frontend: Vercel / Netlify
- Backend: Heroku / AWS / Azure
- Database: MongoDB Atlas

---

## Running HireSense Locally

### Prerequisites
- Node.js v16+ and npm
- 2 terminal windows (one for backend, one for frontend)

### Setup Steps

#### 1. Backend Setup
```bash
cd backend
npm install
node server.js
```
Backend runs on: **http://localhost:5000**

#### 2. Frontend Setup (in new terminal)
```bash
cd frontend
npm install
npm start
```
Frontend runs on: **http://localhost:3000**

### Demo Credentials

**Students (8 available)**
- rahul@cmr.edu.in
- priya@cmr.edu.in
- amit@cmr.edu.in
- sneha@cmr.edu.in
- rajesh@cmr.edu.in
- narendra@cmr.edu.in
- albi@cmr.edu.in
- kavya@cmr.edu.in

**Recruiters (5 available)**
- arun@tcs.com (TCS)
- sarah@aws.com (AWS)
- michael@dell.com (Dell)
- priya@hcl.com (HCL)
- rohan@accenture.com (Accenture)

**Admins (2 available)**
- tpo1@cmr.edu.in (TPO Officer 1)
- tpo2@cmr.edu.in (TPO Officer 2)

---

## Component Structure

### Frontend Components

```
frontend/src/
├── App.js                      # Main router component
├── App.css                     # Global styles
├── AuthPage.js                 # Multi-role authentication
├── AuthPage.css                # Auth styling
├── StudentDashboard.js         # Student portal
├── StudentDashboard.css
├── RecruiterDashboard.js       # Company HR portal
├── RecruiterDashboard.css
├── AdminDashboard.js           # TPO admin portal
├── AdminDashboard.css
├── index.js                    # React root
└── public/
    ├── index.html              # HTML entry point
    └── favicon.ico
```

### Backend Structure

```
backend/
├── server.js                   # Express server with API routes
├── package.json                # Dependencies
├── Procfile                    # Heroku deployment config
├── .env.example                # Environment variables template
└── .gitignore
```

---

## Feature Details

### 1. Authentication System

**Role-Based Login**
- 3 user types: Student, Recruiter, Admin
- Email verification for each role
- Quick-access buttons for demo accounts
- Secure session management (ready for JWT upgrade)

### 2. Student Dashboard

**Available Features**
- 📋 **Jobs**: Browse 35+ job listings from 5 companies
- 📝 **Applications**: Track all submitted applications
- 🧪 **Assessments**: Available tests related to applied jobs
- 📅 **Interviews**: Scheduled interview information
- 👤 **Profile**: Personal details, CGPA, application statistics

**Quick Actions**
- Apply to jobs with form validation
- View application status (Pending, Shortlisted, Selected, Rejected)
- Take online assessments
- Receive interview notifications

### 3. Recruiter Dashboard

**Available Features**
- 📋 **Jobs**: Create and manage job postings
- 👥 **Applicants**: Review and shortlist candidates
- 🧪 **Tests**: Create assessments for positions
- 📊 **Analytics**: Track recruitment metrics

**Management Tools**
- Post new jobs with detailed requirements
- Update applicant status (New → Shortlisted → Interview → Selected)
- Create custom assessments
- View conversion rates and hiring metrics

### 4. Admin Dashboard

**Available Features**
- 📊 **Overview**: Key metrics and placement statistics
- 👨‍🎓 **Students**: View all students and placement status
- 🏢 **Companies**: Manage company information
- 📋 **Policies**: Set placement eligibility rules
- 📈 **Reports**: Generate and export placement reports

**Management Capabilities**
- Set minimum CGPA requirements
- Define interview rounds
- Export data (PDF, Excel, CSV)
- Monitor overall placement progress

---

## Database Schema

### Students Collection
```javascript
{
  id: Number,
  name: String,
  email: String,           // cmr.edu.in domain
  rollNumber: String,
  cgpa: Number,
  branch: String,
  placement_status: String, // "Placed" / "Awaiting"
  company: String,
  applications: [ObjectId],
  assessments_taken: [ObjectId]
}
```

### Jobs Collection
```javascript
{
  id: Number,
  title: String,
  company: String,
  description: String,
  requirements: String,
  salary: String,
  location: String,
  postedDate: Date,
  applicants_count: Number,
  status: String          // "Active" / "Closed"
}
```

### Applications Collection
```javascript
{
  id: Number,
  student_id: ObjectId,
  job_id: ObjectId,
  status: String,         // "New" / "Shortlisted" / "Interview" / "Selected" / "Rejected"
  appliedDate: Date,
  resume: URL,
  cover_letter: String
}
```

### Assessments Collection
```javascript
{
  id: Number,
  title: String,
  company: String,
  duration: Number,       // in minutes
  total_questions: Number,
  passing_score: Number,  // percentage
  questions: [ObjectId]
}
```

---

## API Endpoints

### Available Routes

**Jobs**
- `GET /api/jobs` - Fetch all job listings
- `POST /api/jobs` - Create new job posting (Recruiter only)

**Applications**
- `GET /api/applications` - Fetch student applications
- `POST /api/applications` - Submit job application
- `PUT /api/applications/:id` - Update application status

**Assessments**
- `GET /api/assessments` - Fetch available tests
- `POST /api/assessments` - Create new assessment

**Students**
- `GET /api/students` - Get all students (Admin only)
- `GET /api/students/:id` - Get student profile

**Companies**
- `GET /api/companies` - Get all company details
- `POST /api/companies` - Add new company

**Analytics**
- `GET /api/analytics/overview` - Placement statistics
- `GET /api/analytics/reports` - Generate reports

---

## Deployment Guide

### Deploy to Heroku (Backend)

1. **Create Heroku account** at heroku.com
2. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

3. **Create app**:
   ```bash
   heroku create your-app-name
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set DB_URL=your_mongodb_url
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

Backend URL: `https://your-app-name.herokuapp.com`

### Deploy to Vercel (Frontend)

1. **Create Vercel account** at vercel.com
2. **Connect your GitHub repository**
3. **Set environment variable**:
   ```
   REACT_APP_API_URL=https://your-backend.herokuapp.com
   ```
4. **Deploy** - Automatic on push to main

Frontend URL: `https://your-project.vercel.app`

---

## File Descriptions

### Key Files

| File | Purpose |
|------|---------|
| `App.js` | Main routing component that switches between auth and role-specific dashboards |
| `AuthPage.js` | Multi-role login interface with email dropdowns and quick access buttons |
| `StudentDashboard.js` | Complete student portal with jobs, applications, assessments, interviews |
| `RecruiterDashboard.js` | HR portal for job posting, applicant management, test creation |
| `AdminDashboard.js` | Placement officer dashboard with analytics and policy management |
| `server.js` | Express API server with job listings and routes |
| `package.json` | Dependencies for both frontend and backend |

---

## Future Enhancements

🔮 **Planned Features**

Phase 2:
- ✅ Resume upload system (Cloudinary integration)
- ✅ Email notifications (SendGrid)
- ✅ Advanced eligibility checking
- ✅ Real-time notifications

Phase 3:
- ✅ AI-powered job recommendations
- ✅ Mock interview system with AI feedback
- ✅ Chat system between recruiters and students
- ✅ Interview feedback and scoring

Phase 4:
- ✅ Mobile app (React Native)
- ✅ Video interview integration
- ✅ Advanced analytics and reporting
- ✅ Integration with college ERP systems

---

## Troubleshooting

### Backend issues
- **Port 5000 already in use**: Kill the process or use different port
- **npm install fails**: Clear npm cache: `npm cache clean --force`
- **CORS errors**: Check backend CORS configuration

### Frontend issues
- **Blank page**: Check browser console for errors
- **API calls failing**: Verify backend is running and accessible
- **Styling issues**: Clear browser cache (Ctrl+Shift+Delete)

---

## Support & Contact

📧 **For queries**: contact@hiresense.com
📱 **WhatsApp**: +91-XXXX-XXXX-XX
🌐 **Website**: www.hiresense.com

---

## License

This project is proprietary and owned by CMR Engineering College.

---

**Version**: 2.0.0 (HireSense Multi-Role System)  
**Last Updated**: February 2025  
**Status**: 🟢 Production Ready
