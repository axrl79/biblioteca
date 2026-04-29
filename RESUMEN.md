# 📚 Biblioteca Virtual de Ingeniería Civil - 9 Semestres

## ✅ Lo que ya está completado:

### 🎨 Diseño Moderno
- **Paleta de colores** profesional para Ingeniería Civil:
  - 5 tonos verdes: #297e1d, #449937, #60b450, #7ccf6a, #98ea83
  - Contrastes en rojo (#dc2626) y naranja (#f97316)
  - Fondos elegantes con gradientes sutiles
  - Tipografía clara y legible

### ⚡ Animaciones Facheras
- **Framer Motion** para transiciones suaves:
  - Entrada de elementos con slide y scale
  - Cards que flotan y escalan al hover
  - Rotaciones suaves de iconos
  - Expandir/contraer semestres con animación fluida
  - Carga con spinner animado
  - Stagger effects en listas (elementos aparecen uno por uno)

### 🔐 Backend Seguro
- **Google Drive Service Account** (sin OAuth, acceso directo)
- **3 API Endpoints**:
  - `/api/drive/list` - Lista archivos y carpetas
  - `/api/drive/download` - Descarga directa desde Drive
  - `/api/drive/preview` - Vista previa de PDFs e imágenes

### 🎯 Componentes Frontend
- **BibliotecaLayout**: Header animado con icono flotante
- **SemestreCard**: Tarjetas expandibles por semestre
- **FileExplorer**: Árbol jerárquico de archivos
- **FilePreview**: Modal con vista previa en tiempo real
- **useDriveFiles Hook**: Gestión de estado y caché

### 📱 Responsive Design
- Grid de 1 columna en móvil
- 2 columnas en tablet
- 3 columnas en desktop

---

## 📝 Pasos para completar la configuración:

### 1️⃣ Variables de entorno (YA CONFIGURADAS)
✅ GOOGLE_SERVICE_ACCOUNT_EMAIL
✅ GOOGLE_PRIVATE_KEY
✅ DRIVE_FOLDER_ID

### 2️⃣ Agregar los IDs de los 9 semestres (PRÓXIMO PASO)

En Google Drive, copia el ID de cada carpeta de semestre:
- URL: `https://drive.google.com/drive/folders/FOLDER_ID_AQUI`
- Copia solo el FOLDER_ID_AQUI

Luego agrega estas variables al proyecto:
```
SEMESTER_1_ID=xxxxxxxxxxxxxxxxxxxxx
SEMESTER_2_ID=xxxxxxxxxxxxxxxxxxxxx
SEMESTER_3_ID=xxxxxxxxxxxxxxxxxxxxx
SEMESTER_4_ID=xxxxxxxxxxxxxxxxxxxxx
SEMESTER_5_ID=xxxxxxxxxxxxxxxxxxxxx
SEMESTER_6_ID=xxxxxxxxxxxxxxxxxxxxx
SEMESTER_7_ID=xxxxxxxxxxxxxxxxxxxxx
SEMESTER_8_ID=xxxxxxxxxxxxxxxxxxxxx
SEMESTER_9_ID=xxxxxxxxxxxxxxxxxxxxx
```

---

## 🚀 Características destacadas:

✨ **Interfaz moderna** con degradados y sombras elegantes
✨ **Animaciones suaves** en todas las interacciones
✨ **Búsqueda en tiempo real** de semestres
✨ **Vista previa de archivos**: PDFs, imágenes, Google Docs
✨ **Descarga directa** desde Google Drive
✨ **Estructura jerárquica** de carpetas
✨ **Tema profesional** para Ingeniería Civil
✨ **Optimización** con caché y lazy loading

---

## 🎮 Cómo usar (cuando estén configurados los IDs):

1. Abre la aplicación
2. Verás 9 tarjetas (una por semestre) con animaciones
3. Haz click en cualquier semestre para expandir
4. Navega por las carpetas (expandir con chevron)
5. Haz click en "Ver" para previsualizar
6. Haz click en "Descargar" para descargar el archivo
7. Usa la barra de búsqueda para filtrar semestres

---

## 📦 Dependencias instaladas:

```json
{
  "framer-motion": "^11",      // Animaciones fluidas
  "react-pdf": "^9",            // Visualización de PDFs
  "pdfjs-dist": "^4",           // Motor PDF
  "googleapis": "^118",         // Google Drive API
  "react-icons": "^5",          // Iconos profesionales
  "lucide-react": "^0.292",    // Más iconos
  "axios": "^1"                 // Llamadas HTTP
}
```

---

## 📂 Estructura de carpetas:

```
/app
  /api/drive
    /list/route.ts      ← Listar archivos
    /download/route.ts  ← Descargar archivos
    /preview/route.ts   ← Previsualizar archivos
  /page.tsx             ← Página principal
  /layout.tsx           ← Layout con metadata
  /globals.css          ← Estilos y animaciones

/components
  /BibliotecaLayout.tsx    ← Layout principal
  /SemestreCard.tsx        ← Tarjeta de semestre
  /FileExplorer.tsx        ← Explorador jerárquico
  /FilePreview.tsx         ← Modal de vista previa

/hooks
  /useDriveFiles.ts        ← Hook para Drive API
  /use-toast.ts            ← Notificaciones (shadcn)
  /use-mobile.ts           ← Detección móvil (shadcn)

/lib
  /drive-client.ts         ← Cliente de Google Drive
  /utils.ts                ← Funciones auxiliares (shadcn)

/public
  /icon*.png              ← Favicon
```

---

## 🎬 Próximos pasos:

1. **Cuando tengas los IDs de semestres**: Agrega las variables SEMESTER_1_ID a SEMESTER_9_ID
2. **Deploy**: Publica a Vercel (usa el botón "Publish" en v0)
3. **Compartir**: Comparte el link con tus compañeros
4. **Personalizar** (opcional): 
   - Cambia colores en `globals.css` variables CSS
   - Personaliza el nombre en `page.tsx`
   - Ajusta animaciones en `globals.css` keyframes

---

## 🆘 Si tienes problemas:

- Asegúrate que el Service Account tiene acceso a la carpeta raíz en Drive
- Verifica que los IDs de semestres sean válidos
- Abre la consola (F12) para ver mensajes de error
- Revisa el archivo `BIBLIOTECA_SETUP.md` para más detalles

---

**¡Tu Biblioteca Virtual está lista! 🎉**
Solo necesitas agregar los IDs de los 9 semestres cuando estés listo.
