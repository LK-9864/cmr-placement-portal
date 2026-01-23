# Heroku Deployment Guide - CMR Placement Portal

## 🚀 Complete Heroku Deployment Steps

### **Prerequisites:**
1. Heroku account (free) - https://www.heroku.com
2. Git installed
3. Heroku CLI installed

---

## **STEP 1: Install Heroku CLI**

### Windows:
```powershell
# Download from: https://devcenter.heroku.com/articles/heroku-cli
# Or use Chocolatey:
choco install heroku-cli

# Verify installation:
heroku --version
```

---

## **STEP 2: Login to Heroku**

```powershell
heroku login
# This will open browser for authentication
```

---

## **STEP 3: Deploy Backend**

### **A. Initialize Git Repository** (if not already done)
```powershell
cd c:\Users\Lakshmikanth N\OneDrive\Desktop\New folder\capstone
git init
git add .
git commit -m "Initial commit"
```

### **B. Create Heroku App for Backend**
```powershell
cd backend
heroku create cmr-placement-api
# This creates an app with a random name or use:
# heroku create your-custom-name-api
```

### **C. Add MongoDB Database**
```powershell
# Option 1: Use MongoDB Atlas (Recommended)
heroku config:set MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/placementapp?retryWrites=true&w=majority

# Option 2: Use Heroku MongoDB Add-on
heroku addons:create mongolab:sandbox
```

### **D. Deploy Backend**
```powershell
git push heroku main
# If branch is 'master':
# git push heroku master
```

### **E. View Backend Logs**
```powershell
heroku logs --tail
# Press Ctrl+C to exit
```

### **F. Get Backend URL**
```powershell
heroku info -a cmr-placement-api
# Look for Web URL - copy this for frontend configuration
# Example: https://cmr-placement-api.herokuapp.com
```

---

## **STEP 4: Configure MongoDB Atlas**

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create a free cluster
4. Create a database user
5. Whitelist Heroku IPs (Allow all 0.0.0.0/0)
6. Get connection string: mongodb+srv://username:password@cluster.mongodb.net/placementapp
7. Add to Heroku:
```powershell
heroku config:set MONGODB_URI="your-connection-string" -a cmr-placement-api
```

---

## **STEP 5: Deploy Frontend to Vercel (Better than Heroku for React)**

### **A. Install Vercel CLI**
```powershell
npm install -g vercel
```

### **B. Deploy Frontend**
```powershell
cd ..\frontend
vercel --prod
# Follow the prompts
```

### **C. Update API URL**
After getting Vercel URL and Heroku backend URL, update frontend:

In `src/App.js`:
```javascript
const API_BASE = 'https://cmr-placement-api.herokuapp.com/api';
```

In `src/Login.js`:
```javascript
// Already configured in Login.js
```

---

## **ALTERNATIVE: Deploy Both Frontend + Backend on Heroku**

### **A. Create a Single Heroku App**

```powershell
cd ..
heroku create cmr-placement-portal

# Set environment variables
heroku config:set MONGODB_URI="your-mongo-uri"
heroku config:set NODE_ENV=production
```

### **B. Modify Backend to Serve Frontend**

In `backend/server.js`, add:
```javascript
const express = require('express');
const path = require('path');
const app = express();

// ... existing code ...

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// For all non-API routes, serve index.html (React routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// ... existing code ...
```

### **C. Update package.json**

In `backend/package.json`, add build script:
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "cd ../frontend && npm run build"
  }
}
```

### **D. Create .gitignore**

```
node_modules/
.env
.DS_Store
frontend/build/
```

### **E. Deploy**

```powershell
git add .
git commit -m "Heroku deployment setup"
git push heroku main
```

---

## **STEP 6: Keep App Always Running**

### **Option 1: Upgrade to Paid Dyno** (Recommended)
```powershell
heroku ps:type web=standard-1x -a cmr-placement-api
# Cost: $7/month per dyno (always running)
```

### **Option 2: Use Heroku Scheduler (Free but checks every 10 min)**
```powershell
heroku addons:create scheduler:standard

# Add job:
# 1. Go to Heroku Dashboard
# 2. Click Heroku Scheduler
# 3. Create job: "curl https://cmr-placement-api.herokuapp.com/api/jobs"
# 4. Set frequency to 10 minutes (keeps app warm)
```

### **Option 3: Use Free Tier (App sleeps after 30 min inactivity)**
```powershell
# No cost but app will sleep
# Wake up when accessed (5-10 second delay)
```

---

## **STEP 7: Verify Deployment**

```powershell
# Check backend API
heroku open -a cmr-placement-api
# Navigate to /api/jobs endpoint
# Should see JSON with job listings

# Check frontend
# Visit Vercel URL or Heroku frontend URL
# Should see login page
```

---

## **STEP 8: Configure CORS for Heroku**

Update `backend/server.js`:
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://your-vercel-url.vercel.app', 'https://cmr-placement-portal.herokuapp.com'],
  credentials: true
}));
```

---

## **STEP 9: View Logs & Debug**

```powershell
# View real-time logs
heroku logs --tail -a cmr-placement-api

# View logs from specific time
heroku logs -a cmr-placement-api --num 100

# View config variables
heroku config -a cmr-placement-api
```

---

## **STEP 10: Update & Redeploy**

```powershell
# Make changes to code
# Then:
git add .
git commit -m "Update message"
git push heroku main
# Heroku auto-deploys!
```

---

## **Final URLs**

After deployment, you'll have:

- **Backend API**: `https://cmr-placement-api.herokuapp.com`
- **Frontend**: `https://your-app.vercel.app` or `https://cmr-placement-portal.herokuapp.com`

**Login URL**: `https://your-app.vercel.app`

---

## **Free Tier Limitations**

| Feature | Free | Paid |
|---------|------|------|
| Dyno Hours | 1000/month | Unlimited |
| Sleep Status | Yes (after 30 min) | No |
| Cost | Free | $7+/month |
| Uptime | ~99.99% | 99.99% |

**Recommendation**: Use free tier for development, upgrade to paid for production.

---

## **Troubleshooting**

### **App not starting:**
```powershell
heroku logs -a cmr-placement-api --tail
# Check for errors
```

### **CORS errors:**
Update CORS in backend/server.js with frontend URL

### **MongoDB connection failed:**
1. Check MONGODB_URI in Heroku config
2. Check MongoDB Atlas whitelist
3. Add 0.0.0.0/0 to allow all IPs

### **Frontend can't reach backend:**
1. Update API_BASE in frontend to Heroku backend URL
2. Make sure CORS is configured
3. Check both servers are running

---

## **Commands Reference**

```powershell
# List apps
heroku apps

# View app info
heroku info -a app-name

# View config vars
heroku config -a app-name

# Set config var
heroku config:set KEY=value -a app-name

# View logs
heroku logs --tail -a app-name

# Restart app
heroku restart -a app-name

# Delete app
heroku apps:destroy -a app-name

# Scale dyno
heroku ps:type web=standard-1x -a app-name

# Check dyno hours
heroku ps -a app-name
```

---

## **Your Deployed App:**

Once deployed, the app will be accessible 24/7 at:
- **https://cmr-placement-api.herokuapp.com** (Backend)
- **https://your-vercel-url.vercel.app** (Frontend)

Share these URLs with your professor and college!

---

## **Auto-Deploy from GitHub** (Optional)

1. Push code to GitHub
2. Connect GitHub to Heroku
3. Enable auto-deploy on every push
4. Your app updates automatically!

---

**Your CMR Placement Portal is now in the cloud! 🚀**
