# 3D Logo Setup Instructions

## 📁 Var ska filen ligga?

Din `Pynn_Logo_3d.glb` fil ska ligga direkt i `/public` mappen:

```
pynn/
  └── public/
      ├── Pynn_Logo_3d.glb  ← Här ska filen ligga!
      └── img/
          ├── logo-pynn.svg
          └── logo-pynn.png
```

## ✅ Så här gör du:

1. **Hitta din `Pynn_Logo_3d.glb` fil** (den ligger troligen i projektets rot-mapp)

2. **Kopiera filen till `/public` mappen:**
   - Kopiera `Pynn_Logo_3d.glb`
   - Klistra in den direkt i `/public` mappen
   - Filen ska heta exakt: `Pynn_Logo_3d.glb`

3. **Starta om dev-servern:**
   ```bash
   # Stoppa servern (Ctrl+C)
   npm run dev
   ```

4. **Ladda om sidan** (Ctrl+Shift+R för att rensa cache)

## 🎮 Vad händer när filen finns?

- ✅ 3D-loggan visas med musföljning
- ✅ Loggan roterar mjukt efter musens position
- ✅ Svävande animation upp och ner
- ✅ Auto-rotation när musen är stilla

## 🔄 Om filen saknas:

- Den vanliga SVG-loggan visas automatiskt som fallback
- Inga fel visas i konsolen
- Allt fungerar normalt

## 📝 Filnamn är viktigt!

Filen måste heta exakt: `Pynn_Logo_3d.glb` (stor/liten bokstav spelar roll på vissa system)
