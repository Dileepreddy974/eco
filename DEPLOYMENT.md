# 🚀 Deployment Guide - Friendly Eco

## Vercel Deployment Instructions

### Prerequisites
- GitHub account with repository access
- Vercel account (sign up at https://vercel.com)

---

## 📋 Step-by-Step Deployment

### 1️⃣ **Prepare Your Repository**

Your project is already set up with:
- ✅ `vercel.json` configuration file
- ✅ Build scripts in `package.json`
- ✅ Production-ready code structure

### 2️⃣ **Deploy to Vercel**

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Find and select your repository: `Dileepreddy974/eco`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Create React App (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `build` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Environment Variables** (Optional)
   - Click "Environment Variables" if you have any
   - Add any `.env` variables needed

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Root**
   ```bash
   cd C:\Users\dilee\OneDrive\Desktop\eco
   vercel
   ```

4. **Follow Prompts**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **friendly-eco** (or your choice)
   - Directory? **./** (press Enter)
   - Override settings? **N**

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

---

## 🌐 Custom Domain Setup

### Add Custom Domain to Vercel

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add Domain"

2. **Add Your Domain**
   - Enter your domain name (e.g., `friendly-eco.com`)
   - Click "Add"

3. **Configure DNS**
   
   **For Root Domain (friendly-eco.com):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel's IP)

   **For www Subdomain (www.friendly-eco.com):**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

4. **Verify Domain**
   - Wait for DNS propagation (5 minutes - 48 hours)
   - Vercel will auto-verify and provision SSL

---

## 📁 Project Structure for Deployment

```
eco/
├── build/                  # Production build (auto-generated)
├── backend/               # Backend API
│   └── server.js         # Express server
├── public/               # Static assets
├── src/                  # React source code
├── vercel.json          # Vercel configuration
├── package.json         # Dependencies and scripts
└── .gitignore           # Git ignore rules
```

---

## ⚙️ Vercel Configuration Explained

**vercel.json** handles:
- ✅ Frontend build (React app)
- ✅ Backend API routes (`/api/*`)
- ✅ File uploads (`/uploads/*`)
- ✅ Automatic routing

---

## 🔧 Environment Variables

If you need environment variables in production:

1. **In Vercel Dashboard**
   - Project Settings → Environment Variables
   
2. **Add Variables**
   ```
   REACT_APP_API_URL=https://your-domain.vercel.app
   NODE_ENV=production
   ```

3. **Redeploy**
   - Changes require redeployment
   - Use "Redeploy" button in Vercel dashboard

---

## 🎯 Deployment Checklist

- [x] Code pushed to GitHub
- [x] `vercel.json` configured
- [x] Build scripts added to `package.json`
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Deployment successful
- [ ] Custom domain configured (optional)
- [ ] SSL certificate auto-provisioned
- [ ] DNS configured and propagated

---

## 🔄 Continuous Deployment

**Automatic Deployments:**
- Every `git push` to `main` branch triggers deployment
- Preview deployments for pull requests
- Rollback available in Vercel dashboard

**To Update Your Live Site:**
```bash
git add .
git commit -m "Your update message"
git push origin main
```
Vercel will automatically redeploy! ✨

---

## 🌍 Your Deployment URLs

After deployment, you'll have:

**Production URL:**
```
https://friendly-eco.vercel.app
```

**Custom Domain (after setup):**
```
https://your-domain.com
```

**API Endpoints:**
```
https://friendly-eco.vercel.app/api/health
https://friendly-eco.vercel.app/api/tasks/upload
```

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### API Routes Not Working
- Check `vercel.json` routing configuration
- Verify backend/server.js exports correctly

### Custom Domain Issues
- Verify DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Check domain status in Vercel dashboard

### Port Configuration
- Vercel auto-assigns ports in production
- No need to specify PORT in production

---

## 📚 Useful Vercel Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [deployment-url]

# Link local project to Vercel
vercel link
```

---

## 🎉 Success Indicators

✅ Build completes without errors
✅ Site loads at Vercel URL
✅ All routes work correctly
✅ API endpoints respond
✅ Custom domain resolves (if configured)
✅ SSL certificate active
✅ Automatic deployments working

---

## 📞 Support

**Vercel Documentation:**
- https://vercel.com/docs

**Vercel Support:**
- https://vercel.com/support

**Project Repository:**
- https://github.com/Dileepreddy974/eco

---

**Deploy with confidence! 🚀**

*Last updated: 2025-01-30*
