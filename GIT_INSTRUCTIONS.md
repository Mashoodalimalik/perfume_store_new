# How to Push Your Code to GitHub

Since you have made changes to your project, here are the steps to save them and push them to a GitHub repository.

## Prerequisites
1.  **Create a Repository on GitHub**:
    - Go to [GitHub.com](https://github.com) and sign in.
    - Click the "+" icon in the top right and select "New repository".
    - Name your repository (e.g., `perfume-store`).
    - Click "Create repository".

## Steps to Push

Open your terminal in the project folder (`c:\Users\Lenovo T490\.gemini\antigravity\scratch\perfume_store`) and run the following commands:

### 1. Initialize Git (if not already done)
```bash
git init
```

### 2. Add Your Files
This stages all your new and modified files for commit.
```bash
git add .
```

### 3. Commit Your Changes
This saves a snapshot of your code.
```bash
git commit -m "Complete store features: new pages, checkout, unified login, and image fixes"
```

### 4. Link to GitHub
Replace `YOUR_USERNAME` with your actual GitHub username.
```bash
git remote add origin https://github.com/YOUR_USERNAME/perfume-store.git
```
*(If you have already added a remote, you can skip this looking or use `git remote set-url origin <url>` if you need to change it.)*

### 5. Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## Troubleshooting
- **"Permission denied"**: Ensure you are logged in to git. You might need to set up an SSH key or use a Personal Access Token if prompted for a password.
- **"Remote origin already exists"**: Run `git remote remove origin` and then try step 4 again.

---
**Note:** valid `gitignore` file is important to ensure you don't push unnecessary files (like `node_modules`). One has already been created for you.
