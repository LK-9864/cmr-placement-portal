# Deployment Guide - CMR Placement Portal

## 📊 Languages Used

### **Programming Languages**
1. **JavaScript** - Frontend and Backend
   - React.js for UI
   - Node.js for Server

2. **HTML5** - Markup
3. **CSS3** - Styling

### **Total Tech Stack**
- Frontend: JavaScript (React)
- Backend: JavaScript (Node.js + Express)
- Database: MongoDB/NoSQL
- Deployment: Cloud (AWS/Azure/Heroku)

---

## ☁️ Cloud Deployment Options

### **1. AWS Deployment (Recommended for Production)**

#### **Components:**
- **Frontend**: Amazon S3 + CloudFront CDN
- **Backend**: EC2 Instance or Elastic Beanstalk
- **Database**: MongoDB Atlas or AWS DocumentDB
- **DNS**: Route 53

#### **Step-by-Step AWS Deployment:**

##### A. Deploy Backend to EC2

```bash
# 1. Launch EC2 Instance
- Choose: Ubuntu 20.04 LTS
- Instance Type: t2.micro (free tier eligible)
- Security Group: Allow ports 80, 443, 5000

# 2. SSH into instance
ssh -i your-key.pem ec2-user@your-ec2-ip

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Clone your project
git clone your-repo-url
cd capstone/backend

# 5. Install dependencies
npm install

# 6. Set environment variables
echo "MONGODB_URI=your-mongodb-url" > .env
echo "PORT=5000" >> .env

# 7. Start server
npm start

# 8. Use PM2 for persistent running
npm install -g pm2
pm2 start server.js --name "placement-api"
pm2 startup
pm2 save
```

##### B. Deploy Frontend to S3 + CloudFront

```bash
# 1. Build React app
cd frontend
npm run build

# 2. Create S3 bucket
aws s3 mb s3://cmr-placement-portal --region us-east-1

# 3. Upload build files
aws s3 sync build/ s3://cmr-placement-portal --delete

# 4. Make S3 bucket public (Bucket Policy)
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cmr-placement-portal/*"
    }
  ]
}

# 5. Create CloudFront distribution
- Origin: S3 bucket
- Default Root Object: index.html
- Viewer Protocol: Redirect HTTP to HTTPS

# 6. Update frontend API URL
- Change API_BASE to your EC2 IP or domain
```

##### C. Setup MongoDB Atlas

```bash
# 1. Sign up at mongodb.com/cloud
# 2. Create free cluster
# 3. Add network access: Allow EC2 IP
# 4. Get connection string
# 5. Update in backend .env file
```

---

### **2. Heroku Deployment (Easiest)**

#### **Deploy Backend to Heroku:**

```bash
# 1. Install Heroku CLI
npm install -g heroku

# 2. Login
heroku login

# 3. Create app
heroku create cmr-placement-api

# 4. Add MongoDB
heroku addons:create mongolab:sandbox

# 5. Set environment variables
heroku config:set MONGODB_URI=your-mongo-uri
heroku config:set NODE_ENV=production

# 6. Deploy
git push heroku main

# 7. View logs
heroku logs --tail
```

#### **Deploy Frontend to Vercel:**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
cd frontend
vercel --prod

# 3. Update API URL to Heroku app URL
# In Login.js and App.js:
# API_BASE = 'https://cmr-placement-api.herokuapp.com/api'
```

---

### **3. Azure Deployment**

#### **Backend to Azure App Service:**

```bash
# 1. Create Resource Group
az group create --name cmr-placement-rg --location eastus

# 2. Create App Service Plan
az appservice plan create --name cmr-placement-plan --resource-group cmr-placement-rg --sku B1 --is-linux

# 3. Create Web App
az webapp create --resource-group cmr-placement-rg --plan cmr-placement-plan --name cmr-placement-api --runtime "NODE|18"

# 4. Deploy code
az webapp deployment source config-zip --resource-group cmr-placement-rg --name cmr-placement-api --src path/to/backend.zip

# 5. Configure environment variables
az webapp config appsettings set --resource-group cmr-placement-rg --name cmr-placement-api --settings MONGODB_URI=your-uri
```

#### **Frontend to Azure Static Web Apps:**

```bash
# 1. Connect GitHub repo
# 2. Configure build:
#    - Build app location: frontend
#    - Output location: build

# 3. Auto-deploys on push
```

---

### **4. Docker + Any Cloud**

#### **Containerize Application:**

```dockerfile
# Dockerfile for Backend
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
EXPOSE 5000
CMD ["node", "server.js"]
```

```dockerfile
# Dockerfile for Frontend
FROM node:18-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and push to Docker Hub
docker build -t yourusername/placement-api:1.0 -f Dockerfile.backend .
docker push yourusername/placement-api:1.0

# Deploy on AWS ECS, Google Cloud Run, or DigitalOcean
```

---

## 📈 Cost Estimation

| Platform | Backend | Frontend | Database | Monthly Cost |
|----------|---------|----------|----------|--------------|
| **AWS** | EC2 t2.micro | S3 + CloudFront | MongoDB Atlas | $10-30 |
| **Heroku** | Hobby Tier | Vercel Free | MongoDB Atlas | $0-50 |
| **Azure** | App Service B1 | Static Web Apps | Cosmos DB | $15-40 |
| **DigitalOcean** | Droplet | App Platform | Managed DB | $5-15 |

---

## 🔧 Post-Deployment Checklist

- [ ] SSL/HTTPS enabled
- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] CORS settings updated
- [ ] API endpoints tested
- [ ] Frontend API URL updated
- [ ] Email notifications working
- [ ] Database backups scheduled
- [ ] Monitoring & logging setup
- [ ] Auto-scaling configured

---

## 📱 Monitoring & Maintenance

### **AWS CloudWatch**
```bash
# Monitor EC2 instance
aws cloudwatch get-metric-statistics --namespace AWS/EC2 \
  --metric-name CPUUtilization --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-02T00:00:00Z --period 3600 \
  --statistics Average --dimensions Name=InstanceId,Value=i-xxxxx
```

### **Heroku Monitoring**
```bash
# View dyno usage
heroku ps

# View logs
heroku logs --tail

# Check metrics
heroku metrics
```

---

## 🚀 Final Deployment Checklist

```
✅ Code pushed to Git
✅ Environment variables set
✅ Database configured
✅ SSL certificate installed
✅ API endpoints tested
✅ Frontend build optimized
✅ Database backups enabled
✅ Monitoring configured
✅ Documentation updated
✅ Team trained on deployment
```

---

## 📞 Support & Resources

- **AWS Documentation**: https://docs.aws.amazon.com
- **Heroku Docs**: https://devcenter.heroku.com
- **Azure Docs**: https://docs.microsoft.com/azure
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **React Deployment**: https://create-react-app.dev/deployment

---

## 🎓 For Your Professor

**Project Highlights:**
- Modern tech stack (JavaScript for both frontend & backend)
- Scalable architecture
- Cloud-ready deployment
- Professional UI/UX
- Real-world use case
- 35 job positions with company integration
- Student authentication system
- Application tracking system
