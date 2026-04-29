# Biblioteca Virtual - Guía de Configuración

## ¿Qué es esta aplicación?

Una biblioteca virtual moderna y animada para estudiantes de Ingeniería Civil que permite acceder a documentos organizados en 9 semestres, sincronizados directamente desde Google Drive.

## Características

✨ **Diseño Moderno**: Interfaz elegante con animaciones suaves de Framer Motion
🎨 **Paleta de Colores de Ingeniería**: Verdes y naranjas para máximo contraste
📁 **Explorador de Archivos Jerárquico**: Navega carpetas y archivos fácilmente
👁️ **Vista Previa**: Visualiza PDFs e imágenes directamente en la app
⬇️ **Descargas Directas**: Descarga archivos de Google Drive con un clic
🔄 **Sincronización en Vivo**: Los cambios en Drive aparecen automáticamente

## Configuración Completada

✅ Dependencias instaladas (framer-motion, googleapis, react-pdf)
✅ Variables de entorno de Google Drive configuradas
✅ API endpoints creados (list, download, preview)
✅ Componentes con animaciones profesionales
✅ Paleta de colores verde/naranja implementada

## Lo que Falta: IDs de los Semestres

Ahora necesitas agregar los **IDs de las carpetas de Google Drive** para cada semestre.

### Cómo Obtener los IDs de Google Drive

1. **Abre Google Drive** en tu navegador
2. **Abre una carpeta de semestre** (ej: "Semestre 1")
3. **Mira la URL en la barra de direcciones**
   - Verás algo como: `https://drive.google.com/drive/folders/FOLDER_ID_AQUI`
4. **Copia el ID** (la parte larga después de `/folders/`)

### Agregar los IDs en Vercel

1. Ve a la **sección "Settings"** (engranaje en la esquina superior derecha)
2. Click en **"Vars"**
3. **Agrega las siguientes variables de entorno**:

```
SEMESTER_1_ID=     [ID de la carpeta del Semestre 1]
SEMESTER_2_ID=     [ID de la carpeta del Semestre 2]
SEMESTER_3_ID=     [ID de la carpeta del Semestre 3]
SEMESTER_4_ID=     [ID de la carpeta del Semestre 4]
SEMESTER_5_ID=     [ID de la carpeta del Semestre 5]
SEMESTER_6_ID=     [ID de la carpeta del Semestre 6]
SEMESTER_7_ID=     [ID de la carpeta del Semestre 7]
SEMESTER_8_ID=     [ID de la carpeta del Semestre 8]
SEMESTER_9_ID=     [ID de la carpeta del Semestre 9]
```

4. **Haz clic en "Save"**

### Ejemplo de un ID

Si tu URL es: `https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j`

Entonces el ID que debes copiar es: `1a2b3c4d5e6f7g8h9i0j`

## Estructura de Carpetas Esperada

```
Carpeta Raíz
├── Semestre 1
│   ├── documento1.pdf
│   ├── documento2.docx
│   └── Subcarpeta de temas
├── Semestre 2
│   ├── archivo.pdf
│   └── ...
├── Semestre 3
│   └── ...
... hasta Semestre 9
```

## Características de la Interfaz

### 📚 Header Animado
- Ícono de libro que rota continuamente
- Texto con gradiente verde-naranja
- Barra pegajosa (sticky) para acceso rápido

### 🎯 Grid de Semestres
- Cards que se animan al cargar
- Colores verdes progresivos (5 tonos)
- Hover effects con elevación

### 📂 Explorador de Archivos
- Expansión/contracción con animación suave
- Ícono que rota al expandir
- Acciones (Ver/Descargar) que aparecen al pasar el mouse

### 👁️ Vista Previa Modal
- Animación de entrada elegante
- Soporta PDFs, imágenes y documentos de Google
- Botones interactivos con animaciones

### 🎨 Animaciones Implementadas

- **Slide In**: Los elementos aparecen deslizándose
- **Scale In**: Las tarjetas crecen suavemente
- **Rotate**: Íconos que rotan en acciones
- **Stagger**: Los hijos aparecen en cascada
- **Float**: Efecto flotante en elementos destacados
- **Glow**: Efecto de brillo en bordes

## Troubleshooting

### ❌ "DRIVE_FOLDER_ID is not set"
→ Revisa que hayas agregado todas las variables en Settings > Vars

### ❌ "Los archivos no aparecen"
→ Verifica que los IDs de semestres sean correctos
→ Asegúrate que tu Service Account tenga acceso a las carpetas

### ❌ "Las animaciones se ven lentas"
→ Es normal en desarrollo. La build de producción es más rápida

### ❌ "No puedo previsualizar PDFs"
→ Algunos PDFs con restricciones no se pueden previsualizar
→ Siempre puedes descargarlos con el botón "Descargar"

## Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Correr servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Iniciar servidor de producción
pnpm start
```

## Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Framework**: Next.js 16 con App Router
- **Estilos**: Tailwind CSS v4 + custom animations
- **Animaciones**: Framer Motion
- **Integración Drive**: googleapis + Service Account
- **Componentes UI**: shadcn/ui
- **Iconos**: React Icons

## Colores Utilizados

```css
--color-green-1: #297e1d  /* Verde oscuro (botones primarios) */
--color-green-2: #449937  /* Verde medio */
--color-green-3: #60b450  /* Verde claro */
--color-green-4: #7ccf6a  /* Verde muy claro */
--color-green-5: #98ea83  /* Verde pálido */

--color-orange: #f97316   /* Naranja (acentos, descargas) */
--color-red: #dc2626      /* Rojo (errores) */
--color-black: #000000    /* Negro (texto) */
```

## Notas Finales

- ✅ La app está lista para producción
- ✅ Todas las animaciones usan Framer Motion para máximo rendimiento
- ✅ El diseño es responsivo (funciona en móvil y desktop)
- ✅ Los estilos siguen las guías de Ingeniería Civil
- 🚀 Una vez agregues los IDs, ¡estará completamente funcional!

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para ver cualquier error de conexión.
