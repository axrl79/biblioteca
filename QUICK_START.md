# ⚡ Quick Start - Biblioteca Virtual Premium

## En 3 Pasos, Tu App Está Funcionando

### Paso 1️⃣: Agregar Variables de Entorno
```
Ve a Settings (⚙️) → Vars

GOOGLE_SERVICE_ACCOUNT_EMAIL = tu-email@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY = tu-clave-privada-json
DRIVE_FOLDER_ID = id-carpeta-raiz

SEMESTER_1_ID = id-semestre-1
SEMESTER_2_ID = id-semestre-2
... hasta SEMESTER_9_ID
```

### Paso 2️⃣: Probar en DevTools
```
1. Abre app → F12
2. Ctrl+Shift+M (Device Toggle)
3. Selecciona iPhone 14 Pro
4. ¡Prueba todo!
```

### Paso 3️⃣: Desplegar en Vercel
```
1. Click "Publish" (arriba a la derecha)
2. Conecta GitHub (si no está)
3. Vercel despliega automáticamente
4. ¡Comparte el link!
```

---

## 📱 Elementos Clave a Probar

### En Móvil (390px)
```
┌──────────────────┐
│   BIBLIOTECA V.  │ ← Header compacto
├──────────────────┤
│  🔍 Search (tap) │ ← Busca aquí
├──────────────────┤
│   [Card 1]       │
│   [Card 2]       │
│   [Card 3]       │
├──────────────────┤
│ 🏠 🔍 ❤️ ⚙️      │ ← Bottom Nav
└──────────────────┘
```

### En Desktop (1024px+)
```
┌────────────────────────────────────┐
│ 📚 Biblioteca Virtual              │ ← Header completo
├────────────────────────────────────┤
│ [Search Input........................] │
├────────────────────────────────────┤
│ [Card 1] [Card 2] [Card 3]        │
│ [Card 4] [Card 5] [Card 6]        │
│ [Card 7] [Card 8] [Card 9]        │
├────────────────────────────────────┤
│ Footer Info...                     │
└────────────────────────────────────┘
```

---

## 🎮 Cómo Funciona

### Navegar
```
🏠 Inicio     → Muestra todas las cards
🔍 Buscar    → Abre modal de búsqueda
❤️ Favoritos  → Para después (próximamente)
⚙️ Ajustes    → Para configurar (próximamente)
```

### Expandir Semestre
```
Tap en Card → Se expande ↓
             Muestra archivos
             Tap en X → Se contrae ↑
```

### Descargar/Previsualizar Archivo
```
📁 Archivo
 ├─ 👁️  Ver    → Abre modal preview
 └─ ⬇️  Bajar   → Descarga archivo
```

---

## 🎨 Características Visuales

### Colores
```
Verde Profesional (#297e1d)    ← Principal
Naranja Energía (#f97316)      ← Secundario
Rojo Atención (#dc2626)        ← Destructivo
Blancos y Grises               ← Neutralos
```

### Efectos
```
✨ Glassmorphism    → Bottom Nav, Search Modal
🔄 Animaciones      → Entrada, Tap, Expansión
⚡ GPU Acelerado    → Fluido 60fps
💫 Micro-interacciones → Feedback en cada acción
```

---

## 📂 Estructura de Archivos Nuevos

```
/vercel/share/v0-project/
├── components/
│   ├── MobileNav.tsx          ← Bottom Navigation
│   ├── SearchModal.tsx        ← Search Modal
│   ├── BibliotecaLayout.tsx   ← Layout principal
│   ├── SemestreCard.tsx       ← Cards de semestre
│   ├── FileExplorer.tsx       ← Explorador archivos
│   └── FilePreview.tsx        ← Modal preview
├── app/
│   ├── globals.css            ← Estilos base + mobile
│   ├── layout.tsx             ← Viewport + metadata
│   └── page.tsx               ← Página principal
├── lib/
│   └── drive-client.ts        ← Cliente de Drive
├── api/
│   └── drive/
│       ├── list/route.ts      ← API listar
│       ├── download/route.ts  ← API descargar
│       └── preview/route.ts   ← API preview
└── Documentación
    ├── MOBILE_PREMIUM_SUMMARY.md
    ├── MOBILE_EXPERIENCE.md
    ├── TESTING_MOBILE.md
    ├── MEJORAS_MOBILE.md
    ├── BIBLIOTECA_SETUP.md
    └── QUICK_START.md (esto)
```

---

## 🔧 Troubleshooting Rápido

### Problema: "Falta DRIVE_FOLDER_ID"
```
✓ Abre Settings → Vars
✓ Agrega DRIVE_FOLDER_ID
✓ ID está en URL: drive.google.com/drive/folders/[ID]
```

### Problema: "Falta SEMESTER_X_ID"
```
✓ Agrega SEMESTER_1_ID hasta SEMESTER_9_ID
✓ O déjalos vacíos (se omitirán)
```

### Problema: Cards no cargan
```
✓ Verifica conexión a Drive
✓ Verifica que Service Account tiene acceso
✓ Comprueba console (F12) para errores
```

### Problema: Animaciones laggy
```
✓ Abre DevTools → Performance
✓ Graba 5s durante scroll
✓ Debería estar a 60fps (línea verde)
```

---

## 📖 Documentación Completa

Si necesitas más detalles:

| Documento | Para Qué |
|-----------|----------|
| `MOBILE_PREMIUM_SUMMARY.md` | Overview ejecutivo |
| `MOBILE_EXPERIENCE.md` | Detalles técnicos |
| `TESTING_MOBILE.md` | Cómo probar |
| `MEJORAS_MOBILE.md` | Todas las mejoras |
| `BIBLIOTECA_SETUP.md` | Setup Google Drive |

---

## 🚀 Comandos Útiles

```bash
# Desarrollo local
pnpm dev

# Build para producción
pnpm build

# Compilar solamente (sin run)
pnpm build

# Linter
pnpm lint
```

---

## 📱 Testing en Tiempo Real

### DevTools (Recomendado)
```
1. Abre app: http://localhost:3000
2. F12 (abre DevTools)
3. Ctrl+Shift+M (Device Toggle)
4. Selecciona iPhone 14 Pro
5. Prueba todo!
```

### En Teléfono Real
```
1. Despliega en Vercel (Publish)
2. Abre URL en tu teléfono
3. Agrega a pantalla de inicio (opcional)
4. ¡Disfruta!
```

---

## ✨ Características Que Tiene

```
✅ 9 Semestres (Semestre 1-9)
✅ Acceso a Google Drive
✅ Bottom Navigation Bar
✅ Search Modal
✅ Previsualizaciones (PDF, imágenes, docs)
✅ Descargas directas
✅ Responsive (móvil → desktop)
✅ Animaciones fluidas
✅ 48px tap targets
✅ WCAG AA accessibility
```

---

## 🎯 Próximo Paso

1. **Agrega los IDs de semestres** en Variables
2. **Prueba en DevTools** con device mobile
3. **Desplega en Vercel** con Publish
4. **Comparte con estudiantes!**

---

## 💡 Tips Extras

```javascript
// Los archivos se cargan bajo demanda
// (no todo de una vez)

// Las animaciones están optimizadas
// para 60fps en móvil

// Respeta prefers-reduced-motion
// (para usuarios con sensibilidad)

// Safe area insets para notches
// (funciona con iPhone 14 Pro Max, etc)

// Glassmorphism es trend 2024
// (cuidado no abusar 😄)
```

---

## 📞 Si Algo No Funciona

### Checklist
- [ ] ¿Están todos los IDs en Variables?
- [ ] ¿Service Account tiene acceso a Drive?
- [ ] ¿Probaste en DevTools con device móvil?
- [ ] ¿Verificaste la consola (F12) para errores?
- [ ] ¿Recargaste la página? (Ctrl+Shift+R)

### Si Aún No Funciona
```
1. Lee BIBLIOTECA_SETUP.md
2. Revisa MOBILE_EXPERIENCE.md
3. Consulta TESTING_MOBILE.md
```

---

**¡Tu biblioteca virtual está lista! 🎉**

Ahora tienes una app mobile premium que tus estudiantes de Ingeniería Civil van a amar.

¡Que disfruten! 🚀📚
