# Netlify Deployment Guide

## Step-by-Step Instructions

### Step 1: Push Your Code to GitHub

1. **Create a GitHub repository:**
   - Go to [GitHub.com](https://github.com) and sign in
   - Click "New repository"
   - Name it (e.g., "my-business-website")
   - Make it **public** (required for Netlify CMS)
   - Click "Create repository"

2. **Push your code:**
   ```bash
   cd "/Users/mariamizedginidze/Desktop/CMS Integration"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Deploy to Netlify

1. **Go to Netlify:**
   - Visit [netlify.com](https://www.netlify.com)
   - Sign up or log in (you can use GitHub to sign in)

2. **Import your site:**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your repository
   - Click "Deploy site"

3. **Site is live!**
   - Netlify will automatically deploy your site
   - You'll get a URL like: `https://random-name-123.netlify.app`

### Step 3: Enable Netlify Identity

1. **Go to Site Settings:**
   - In your Netlify dashboard, click on your site
   - Go to **Site settings** → **Identity**

2. **Enable Identity:**
   - Click "Enable Identity"
   - Wait a few seconds for it to activate

3. **Configure Registration:**
   - Under "Registration preferences", choose:
     - **Invite only** (recommended for clients)
     - Or **Open** (anyone can register)

4. **Enable Git Gateway:**
   - Scroll down to "Services"
   - Click "Enable Git Gateway"
   - This allows the CMS to save changes to your GitHub repo

### Step 4: Set Up Admin Access

1. **Invite yourself as a user:**
   - In Netlify dashboard, go to **Identity** → **Invite users**
   - Enter your email address
   - Click "Send invite"
   - Check your email and accept the invitation
   - Set a password

2. **Test the admin panel:**
   - Go to: `https://YOUR-SITE.netlify.app/admin`
   - Log in with your email and password
   - You should see the CMS interface!

### Step 5: How Content Updates Work

**For the client (content editor):**

1. **Log in:**
   - Go to `https://YOUR-SITE.netlify.app/admin`
   - Enter email and password

2. **Edit content:**
   - Click on "Home" or "About" in the sidebar
   - Edit any field (title, subtitle, services, etc.)
   - Click "Save" or "Publish"

3. **What happens:**
   - Changes are saved to your GitHub repository
   - Netlify automatically rebuilds and redeploys the site
   - Updates appear on the live site in 1-2 minutes

**For you (developer):**

- All changes are saved as commits in GitHub
- You can see the edit history
- You can revert changes if needed
- The JSON files in `/content/` folder are updated automatically

### Step 6: Invite Your Client

1. **In Netlify dashboard:**
   - Go to **Identity** → **Invite users**
   - Enter your client's email
   - Click "Send invite"

2. **Client receives email:**
   - They click the invitation link
   - Set their password
   - They can now log in at `/admin`

### Important Notes

- **Git Gateway** must be enabled for the CMS to work
- **Identity** must be enabled before Git Gateway
- The site must be connected to a **public GitHub repository**
- Changes take 1-2 minutes to appear after saving

### Troubleshooting

**Can't access /admin?**
- Make sure Identity is enabled
- Make sure you've accepted the invitation email
- Try logging out and back in

**Changes not saving?**
- Check that Git Gateway is enabled
- Verify your GitHub repository is public
- Check Netlify build logs for errors

**Form not working?**
- Netlify Forms work automatically when deployed
- Check the "Forms" tab in Netlify dashboard for submissions


