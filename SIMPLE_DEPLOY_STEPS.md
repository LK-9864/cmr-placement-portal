# 🚀 SUPER SIMPLE DEPLOYMENT - JUST CLICK & FOLLOW

Your code is uploaded to GitHub. Now just follow these exact steps:

---

## **STEP 1: Go to Render.com**
1. Open: https://render.com
2. Click **"Sign Up"** → Use GitHub login (LK-9864)
3. Allow it to connect your GitHub

---

## **STEP 2: Deploy Backend (2 minutes)**

1. Click **"Create +"** (top right)
2. Click **"Web Service"**
3. Select repository: `cmr-placement-portal`
4. **Fill these EXACTLY:**
   - **Name:** `cmr-placement-api`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Click "Free"
5. Click **"Create Web Service"**
6. ⏳ Wait until you see: "Deployed ✓" (takes 2-3 minutes)
7. **Copy the URL** - looks like: `https://cmr-placement-api.onrender.com`
8. Save this URL somewhere!

---

## **STEP 3: Update Frontend Code with Backend URL**

1. Go to GitHub: https://github.com/LK-9864/cmr-placement-portal
2. Click folder: `frontend` → `src` → `StudentDashboard.js`
3. Find line 28 that says: `const API_BASE = 'http://localhost:5000/api';`
4. Click the **pencil icon** (Edit)
5. Change to: `const API_BASE = 'https://cmr-placement-api.onrender.com/api';` (use YOUR backend URL from Step 2)
6. Scroll down → Click **"Commit changes"**
7. Done! ✅

---

## **STEP 4: Deploy Frontend (2 minutes)**

1. Go back to Render dashboard
2. Click **"Create +"** 
3. Click **"Static Site"**
4. Select: `cmr-placement-portal`
5. **Fill these EXACTLY:**
   - **Name:** `cmr-placement-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
   - **Plan:** Click "Free"
6. Click **"Create Static Site"**
7. ⏳ Wait until you see: "Deployed ✓"
8. **Copy the URL** - looks like: `https://cmr-placement-frontend.onrender.com`

---

## **DONE! 🎉**

Your app is now LIVE!

### **Share These URLs:**
- **Main App:** https://cmr-placement-frontend.onrender.com
- **Backend:** https://cmr-placement-api.onrender.com/api/jobs

Teachers can access 24/7!

---

## **Troubleshooting:**

**Q: Blank page on frontend?**
A: Check your backend URL in Step 3 is correct

**Q: "Cannot GET /"?**
A: Wait 5 minutes - Render is still deploying

**Q: Backend returns error?**
A: Make sure backend deployment finished in Step 2

---

**That's it! Just follow these 4 steps and you're done!**
