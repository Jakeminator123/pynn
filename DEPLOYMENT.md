# Steg för att pusha till GitHub och deploya på Render

## 1. Initiera Git och pusha till GitHub

```bash
# Initiera Git repository
git init

# Lägg till alla filer
git add .

# Skapa första commit
git commit -m "Initial commit: Pynn website"

# Lägg till remote repository
git remote add origin https://github.com/Jakeminator123/pynn.git

# Pusha till GitHub (main branch)
git branch -M main
git push -u origin main
```

## 2. Deploya på Render

1. Gå till [Render Dashboard](https://dashboard.render.com/)
2. Klicka på "New +" → "Web Service"
3. Välj "Connect GitHub repository"
4. Välj ditt repository: `Jakeminator123/pynn`
5. Render kommer automatiskt att detektera `render.yaml` filen
6. Alternativt, konfigurera manuellt:
   - **Name**: pynn-website
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter (eller Free för test)
7. Klicka på "Create Web Service"

## 3. Environment Variables (om behövs)

Om du behöver environment variables:
- Gå till din service på Render
- Klicka på "Environment"
- Lägg till:
  - `NODE_ENV=production`

## 4. Efter deployment

Render kommer automatiskt att:
- Bygga projektet när du pushar till main branch
- Deploya nya versioner automatiskt
- Ge dig en URL (t.ex. `pynn-website.onrender.com`)

## 5. Custom Domain (valfritt)

För att använda din egen domän:
1. Gå till din service på Render
2. Klicka på "Settings" → "Custom Domains"
3. Lägg till din domän och följ instruktionerna för DNS

