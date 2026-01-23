# 🌐 DEPLOY YOUR APP IN 10 MINUTES - NO GIT NEEDED

## **Option 1: Deploy WITHOUT Git (Easiest)**

### **Step 1: Sign Up on Render.com**
1. Go to https://render.com
2. Click **"Sign Up"** → Sign up with GitHub/Google/Email
3. (If email, create free GitHub account first at https://github.com/signup)

---

### **Step 2: Upload Files to GitHub via Web**

#### **Create GitHub Repository:**
1. Go to https://github.com/new
2. Enter repository name: `cmr-placement-portal`
3. Click **Create repository**

#### **Upload Your Code (Via GitHub Web Interface):**
1. On GitHub repo page, click **"Add file"** → **"Upload files"**
2. Drag & drop your `capstone` folder contents OR click to select files

**Upload these folders/files:**
```
📁 backend/
   ├── server.js
   ├── package.json
   └── Procfile

📁 frontend/
   ├── src/
   ├── public/
   └── package.json

📄 render.yaml
📄 QUICK_DEPLOY.md
```

3. Click **"Commit changes"** at the bottom

---

### **Step 3: Deploy Backend on Render**

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Select **"Build and deploy from a Git repository"**
4. Connect GitHub if needed, select your repo
5. Fill the form:
   - **Name:** `cmr-api`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

6. Click **"Create Web Service"**
7. ⏳ Wait 2-3 minutes for deployment
8. When done, copy your URL (looks like: `https://cmr-api.onrender.com`)

---

### **Step 4: Deploy Frontend on Render**

1. Click **"New +"** → **"Static Site"**
2. Select your GitHub repo again
3. Fill the form:
   - **Name:** `cmr-portal`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
   - **Plan:** Free

4. Click **"Create Static Site"**
5. ⏳ Wait 2-3 minutes
6. Copy your URL (looks like: `https://cmr-portal.onrender.com`)

---

### **Step 5: Update Frontend to Use Live Backend**

1. Go to your GitHub repo
2. Navigate to: `frontend/src/App.js`
3. Click the **Edit** ✏️ button
4. Find line ~20 with: `const API_BASE = 'http://localhost:5000/api';`
5. Change to: `const API_BASE = 'https://cmr-api.onrender.com/api';` (use YOUR backend URL)
6. Click **"Commit changes"**

7. Do the same for `frontend/src/Login.js` if it also has API_BASE

---

### **Step 6: Trigger Redeployment**

1. Go to Render dashboard
2. Click your **`cmr-portal`** frontend service
3. You should see it automatically redeploying (it auto-deploys on commit)
4. ⏳ Wait 2-3 minutes

---

## **✅ YOU'RE DONE! 🎉**

Your app is now LIVE at:

### **Share These URLs with Teachers:**

📱 **Frontend (Main App):** https://cmr-portal.onrender.com
⚙️ **Backend API:** https://cmr-api.onrender.com/api/jobs

Teachers can access 24/7 from any device!

---

## **What's Running:**

✅ **Runs 24/7** - No need to keep your computer on  
✅ **Free Forever** - No credit card needed  
✅ **Auto-updates** - Changes push automatically  
✅ **HTTPS/SSL** - Secure connection included  
✅ **Accessible Globally** - Teachers from anywhere can access  

---

## **Troubleshooting:**

| Issue | Fix |
|-------|-----|
| Blank page | Check API URL is correct in App.js |
| "Cannot GET /" | Use correct Render URLs |
| App not updated | Did you commit to GitHub? Render auto-deploys 1 min after commit |
| Backend not responding | Check backend service status in Render dashboard |

---

## **If You Need to Update Code Later:**

1. Edit files on GitHub (click ✏️ on any file)
2. Commit changes
3. Render auto-deploys in ~1-2 minutes
4. Your live app updates automatically

---

## **Next Steps (Optional):**

- Add Assessment/Quiz feature ✍️
- Add database (MongoDB) 📊
- Add email notifications 📧
- Custom domain name 🌐

Follow these 6 steps and your app will be live!
