# 🚀 HireSense Quick Start Guide

## 5-Minute Setup

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Start Backend Server
```bash
node server.js
```
✅ You should see: "Server running on port 5000"

### Step 3: Install Frontend Dependencies (new terminal)
```bash
cd frontend
npm install
```

### Step 4: Start Frontend
```bash
npm start
```
✅ Browser opens automatically to http://localhost:3000

---

## Test the App

### Option A: Student Login
1. Click **"Student"** button
2. Type any student email: `rahul@cmr.edu.in`
3. Click suggested email or type manually
4. Click **"Login"**

**You can now:**
- Browse 35+ jobs from TCS, AWS, Dell, HCL, Accenture
- Click "Apply Now" on any job
- Fill in details and submit
- View your applications
- Check scheduled assessments
- View interviews

### Option B: Recruiter Login
1. Click **"Recruiter"** button
2. Type: `arun@tcs.com`
3. Click **"Login"**

**You can now:**
- View 3 job postings
- Post new jobs with "Post New Job" button
- Review 5 applicants for TCS roles
- Update applicant status (New → Shortlisted → Selected)
- Create assessments
- View recruitment analytics

### Option C: Admin Login
1. Click **"Admin"** button  
2. Type: `tpo1@cmr.edu.in`
3. Click **"Login"**

**You can now:**
- View overall placement statistics
- Manage 125 students in the system
- Monitor 5 active companies
- Set placement policies
- Generate reports
- Export data

---

## Demo Accounts

### All Student Emails
```
rahul@cmr.edu.in
priya@cmr.edu.in
amit@cmr.edu.in
sneha@cmr.edu.in
rajesh@cmr.edu.in
narendra@cmr.edu.in
albi@cmr.edu.in
kavya@cmr.edu.in
```

### All Recruiter Emails
```
arun@tcs.com
sarah@aws.com
michael@dell.com
priya@hcl.com
rohan@accenture.com
```

### Admin Emails
```
tpo1@cmr.edu.in
tpo2@cmr.edu.in
```

---

## Key Features to Try

### For Students
1. **Browse Jobs**: See all 35+ positions
2. **Apply**: Submit application with phone number
3. **Track Status**: See application status changes
4. **View Assessments**: See available tests
5. **Check Interviews**: See scheduled interviews

### For Recruiters
1. **Post Job**: Click "+ Post New Job" and fill form
2. **View Applicants**: Click "View Applicants" on any job
3. **Shortlist**: Change status from "New" → "Shortlisted"
4. **Create Test**: Click "Create Test" for a position
5. **Analytics**: View conversion metrics

### For Admins
1. **Dashboard**: See placement overview
2. **Student List**: Review all students and placement status
3. **Company List**: Monitor all recruiting companies
4. **Set Policies**: Add eligibility rules
5. **Export Reports**: Download data as PDF/Excel

---

## Architecture

```
Multi-Role System
├── Students (8 demo users)
│   ├── View Jobs
│   ├── Apply & Track
│   ├── Take Assessments
│   └── Interview Schedule
├── Recruiters (5 companies)
│   ├── Post & Manage Jobs
│   ├── Review Applicants
│   ├── Create Tests
│   └── View Analytics
└── Admins (2 TPO officers)
    ├── Overall Statistics
    ├── Student Management
    ├── Company Management
    ├── Policy Setting
    └── Report Generation
```

---

## File Structure

```
HireSense/
├── backend/
│   ├── server.js          # API server
│   ├── package.json       # Dependencies
│   └── Procfile           # Deployment config
├── frontend/
│   ├── src/
│   │   ├── App.js                    # Main router
│   │   ├── AuthPage.js               # Login
│   │   ├── StudentDashboard.js       # Student portal
│   │   ├── RecruiterDashboard.js     # HR portal
│   │   ├── AdminDashboard.js         # Admin portal
│   │   ├── *.css                     # Styling
│   │   └── index.js                  # React root
│   ├── public/
│   │   └── index.html                # HTML entry
│   └── package.json                  # Dependencies
├── HIRESENSE_README.md               # Full documentation
└── HIRESENSE_QUICKSTART.md           # This file
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Kill process: `lsof -ti:5000 \| xargs kill -9` |
| "Cannot find module" | Run `npm install` in that directory |
| Blank white page | Check console (F12) for errors, clear cache |
| API calls failing | Make sure backend is running on port 5000 |
| Password doesn't matter | No password required in demo mode (email only) |

---

## Next Steps

1. ✅ Run locally and test all features
2. 📝 Modify data in the dashboards (add jobs, update applicants)
3. 🎨 Customize styling in `*.css` files
4. 📦 Deploy to Heroku/Vercel when ready
5. 🗄️ Connect MongoDB for persistent storage
6. 🔐 Add authentication with JWT tokens

---

## Need Help?

- Check the full [HIRESENSE_README.md](HIRESENSE_README.md) for detailed docs
- Review component files for code structure
- Check browser console (F12) for error messages

**Happy testing! 🎉**
