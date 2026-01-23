# Render.com Deployment Guide - CMR Placement Portal

## 🚀 Deploy to Render.com (Free & Always Running)

Render.com provides free hosting that runs 24/7 - perfect for your placement portal.

### **Prerequisites:**
1. GitHub account (free)
2. Render.com account (free) - https://render.com
3. Git installed on your computer

---

## **STEP 1: Push Your Project to GitHub**

### A. Create a GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named `cmr-placement-portal`
3. Do NOT initialize with README (we'll push existing code)

### B. Push Your Code

```powershell
cd "c:\Users\Lakshmikanth N\OneDrive\Desktop\New folder\capstone"

# Initialize git if not already done
git init
git add .
git commit -m "CMR Placement Portal - Initial commit"

# Add remote (replace YOUR_USERNAME and repo name)
git remote add origin https://github.com/YOUR_USERNAME/cmr-placement-portal.git
git branch -M main
git push -u origin main
```

---

## **STEP 2: Deploy Backend to Render**

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Select **"Connect a repository"** and choose your GitHub repo
4. Fill in the form:
   - **Name**: `cmr-placement-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

5. Click **"Create Web Service"**
6. Wait for deployment (2-3 minutes)
7. Copy your backend URL (will look like: `https://cmr-placement-api.onrender.com`)

---

## **STEP 3: Deploy Frontend to Render**

1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Select your GitHub repository
3. Fill in the form:
   - **Name**: `cmr-placement-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Plan**: Free

4. Click **"Create Static Site"**
5. Wait for deployment
6. Copy your frontend URL (will look like: `https://cmr-placement-frontend.onrender.com`)

---

## **STEP 4: Update Frontend Environment Variables**

Update your frontend to use the deployed backend URL:

Edit `frontend/src/App.js` and `frontend/src/Login.js`:

```javascript
// Change from:
const API_BASE = 'http://localhost:5000/api';

// To:
const API_BASE = 'https://cmr-placement-api.onrender.com/api';
```

Then push changes:

```powershell
git add .
git commit -m "Update API URL for production"
git push origin main
```

Render will automatically redeploy!

---

## **STEP 5: Update Backend CORS Settings**

Edit `backend/server.js` to allow your frontend URL:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: ['https://cmr-placement-frontend.onrender.com', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
```

Push the changes:

```powershell
git add .
git commit -m "Update CORS for production"
git push origin main
```

---

## **STEP 6: Share Public URLs**

Now your teachers can access the app anytime at:

- **Frontend**: https://cmr-placement-frontend.onrender.com
- **Backend API**: https://cmr-placement-api.onrender.com/api/jobs

---

## **How Render.com Free Plan Works:**

✅ **Runs 24/7** (always online)
✅ **Automatic deploys** from GitHub
✅ **Free SSL/HTTPS** certificate
✅ **No credit card needed**
⚠️ **Limitations**: Spins down after 15 min inactivity (takes ~30 sec to wake up)

---

## **To Keep Services Always Running (Paid):**

If you want services to never sleep, upgrade to paid plans (starts at $7/month):
1. Go to Service Settings → Plan
2. Select "Standard" or higher

---

## **Troubleshooting:**

### Backend won't connect?
- Check CORS settings in `backend/server.js`
- Verify backend URL in Render dashboard

### Frontend showing blank page?
- Check browser console (F12) for errors
- Ensure build command was: `npm install && npm run build`

### Changes not deploying?
- Push to GitHub: `git push origin main`
- Render auto-deploys on push

---

## **Alternative: Free Alternatives to Render**

If Render doesn't work, try:

1. **Railway.app** (https://railway.app)
   - Similar to Render
   - Free tier with $5/month credits

2. **Heroku** (https://www.heroku.com)
   - Paid now, but might have free options
   - Check current plans

3. **Vercel** (https://vercel.com)
   - Best for frontend only
   - Free tier available

---

## **Summary:**

1. ✅ Push code to GitHub
2. ✅ Deploy backend on Render
3. ✅ Deploy frontend on Render
4. ✅ Update API URLs
5. ✅ Share public URLs with teachers

**Your app is now live and accessible 24/7!**

---

## **Need Help?**

- Render docs: https://render.com/docs
- GitHub issues: Create an issue in your repo
- Support: Render.com support page
