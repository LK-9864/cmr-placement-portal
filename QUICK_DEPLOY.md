# 🚀 QUICK DEPLOYMENT - CMR Placement Portal

## Deploy in 5 Minutes to Get Public URL (Free & Always Running)

---

## **Quick Setup (Copy & Paste)**

### **1. Create GitHub Repository**
1. Go to https://github.com/new
2. Create repo: `cmr-placement-portal`
3. Copy these commands:

```powershell
cd "c:\Users\Lakshmikanth N\OneDrive\Desktop\New folder\capstone"
git init
git add .
git commit -m "CMR Placement Portal"
git remote add origin https://github.com/YOUR_USERNAME/cmr-placement-portal.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### **2. Deploy on Render.com (FREE)**

1. Go to https://render.com and sign up (free)
2. Connect your GitHub account

#### **Deploy Backend:**
1. Click **"New +"** → **"Web Service"**
2. Select your GitHub repo
3. Fill:
   - Name: `cmr-api`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build: `npm install`
   - Start: `node server.js`
   - Plan: **Free**
4. Click Create → Wait 2-3 min

**Copy Backend URL** (looks like: `https://cmr-api.onrender.com`)

---

#### **Deploy Frontend:**
1. Click **"New +"** → **"Static Site"**
2. Select your GitHub repo
3. Fill:
   - Name: `cmr-portal`
   - Root Directory: `frontend`
   - Build: `npm install && npm run build`
   - Publish: `build`
   - Plan: **Free**
4. Click Create → Wait 2-3 min

**Copy Frontend URL** (looks like: `https://cmr-portal.onrender.com`)

---

### **3. Update API URL**

Edit `frontend/src/App.js`:
```javascript
// Line 20 - Change:
const API_BASE = 'http://localhost:5000/api';

// To:
const API_BASE = 'https://cmr-api.onrender.com/api';
```

Edit `frontend/src/Login.js` if needed (same change).

---

### **4. Push Changes**

```powershell
cd "c:\Users\Lakshmikanth N\OneDrive\Desktop\New folder\capstone"
git add .
git commit -m "Update API URL for production"
git push origin main
```

Render auto-deploys! Wait 2 min.

---

## **✅ DONE! Your App is Live**

Share these URLs with your teachers:

- **Frontend (Main App):** https://cmr-portal.onrender.com
- **Backend API:** https://cmr-api.onrender.com/api/jobs

---

## **Features:**
✅ Runs 24/7  
✅ Always free  
✅ Auto-deploys from GitHub  
✅ HTTPS/SSL included  
✅ Teachers can access anytime  

---

## **Alternative Platforms** (if Render is down):

**Railway.app** - https://railway.app
**Vercel** (frontend only) - https://vercel.com

---

## **Troubleshooting:**

| Problem | Solution |
|---------|----------|
| "API not found" | Check API URL in App.js matches your backend URL |
| "Blank page" | Check browser console (F12) for errors |
| Deployment failed | Check build logs in Render dashboard |
| Changes not showing | Did you `git push`? Render deploys 1 min after push |

---

Done! Teachers can now access your placement portal anytime! 🎉
