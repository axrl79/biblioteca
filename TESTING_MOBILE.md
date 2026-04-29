# Guía de Testing - Experiencia Móvil Premium

## Cómo Probar la Experiencia Móvil

### 1. Testing en DevTools (Recomendado)

#### Paso a Paso
```
1. Abre tu app en navegador (localhost:3000)
2. Presiona F12 (Windows) o Cmd+Option+I (Mac)
3. Presiona Ctrl+Shift+M para Device Toggle
   (o click en ícono de teléfono si DevTools)
4. Selecciona Device: iPhone 14 Pro (390x844)
5. ¡Comienza a probar!
```

#### Dispositivos Recomendados para Testing
- **iPhone 14 Pro** (390x844) - Base de testing
- **iPhone SE** (375x667) - Pantalla pequeña
- **iPad Pro** (1024x1366) - Tablet grande
- **Pixel 7** (412x915) - Android estándar

---

## 2. Elementos a Probar

### Bottom Navigation Bar
```
✓ Visible en móvil
✓ Oculta en desktop (md:hidden)
✓ 4 tabs: Inicio, Buscar, Favoritos, Ajustes
✓ Indicador activo (punto verde)
✓ Tap feedback (escala 0.95)
✓ Min 48px de altura para tap
```

### Search Modal (Móvil)
```
✓ Abre al tap del icono search
✓ Fullscreen en móvil
✓ Input con autoFocus
✓ Glassmorphism effect
✓ Cierre con X o backdrop
✓ Animación slide-in desde arriba
```

### Search Desktop
```
✓ Visible solo en md+ (md:block)
✓ Input con border verde
✓ Placeholder: "Buscar semestre..."
✓ Animación smooth
```

### SemestreCards
```
✓ 1 columna en móvil
✓ 2 columnas en tablet (sm:)
✓ 3 columnas en desktop (lg:)
✓ Expansión suave sin saltos
✓ Padding: p-4 (móvil), sm:p-6 (desktop)
✓ Icono animado al expandir
```

### FileExplorer Items
```
✓ Botones siempre visibles en móvil
✓ Botones ocultos-hover en desktop
✓ Icono "Ver" en móvil, "Ver" texto en desktop
✓ Spacing: gap-2 (móvil), sm:gap-3 (desktop)
✓ Padding: px-2 (móvil), sm:px-4 (desktop)
```

### FilePreview Modal
```
✓ Fullscreen en móvil (no rounded, inset-0)
✓ Modal centrado en desktop
✓ Header sticky (z-50)
✓ Footer sticky
✓ Buttons: full-width en móvil
✓ Titulo truncado inteligente
✓ Animación slide-down header
```

---

## 3. Testing de Animaciones

### AnimatePresence
```javascript
✓ Cards entran con delay staggered
✓ FileExplorer se expande suavemente
✓ FilePreview aparece/desaparece suave
✓ SearchModal slide-in
```

### Transiciones
```
✓ Duración: 200-300ms en móvil
✓ Duración: 400-600ms en desktop
✓ Ease: easeOut para entrada
✓ Spring: type 'spring' para nav
```

### GPU Acceleration
```css
✓ Transform (translate, scale)
✓ Opacity
✓ NO top, left, width, height
```

---

## 4. Testing de Accesibilidad

### Tap Targets
```javascript
// Verificar en DevTools > Lighthouse > Accessibility
✓ Mínimo 48px x 48px
✓ Elementos clickeables: buttons, links
✓ Spacing entre targets: >8px
```

### Contraste de Colores
```
✓ Texto negro sobre fondo blanco: WCAG AA
✓ Texto blanco sobre verde #297e1d: WCAG AAA
✓ Usar WebAIM Color Contrast Checker
```

### Navegación por Teclado
```
✓ Tab través de botones (Bottom Nav)
✓ Enter para activar
✓ Escape para cerrar modales
✓ Focus visible (outline)
```

---

## 5. Testing de Orientación

### Portrait
```
✓ 390px width
✓ Cards ajustadas
✓ Bottom nav accesible
✓ Todos los elementos visibles
```

### Landscape
```
✓ Cards en 2-3 columnas
✓ Bottom nav ajustado
✓ Altura reducida (cuidado con modales)
✓ Scroll horizontal si es necesario
```

#### En DevTools
```
Cmd/Ctrl + Shift + M → Icono rotar → Landscape
```

---

## 6. Testing de Performance

### Lighthouse (DevTools)
```
1. Abre DevTools
2. Tab "Lighthouse"
3. Selecciona "Mobile"
4. Click "Analyze page load"
5. Objetivo: 90+ en Performance
```

### Métricas Clave
```
✓ FCP (First Contentful Paint): <2s
✓ LCP (Largest Contentful Paint): <2.5s
✓ CLS (Cumulative Layout Shift): <0.1
✓ FID (First Input Delay): <100ms
```

---

## 7. Testing de Red

### Throttling (Conexión Lenta)
```
1. DevTools > Network
2. Seleccionar throttle: "Fast 3G" o "Slow 3G"
3. Recargar página
4. Verificar que cargue correctamente
5. Animaciones deben ser fluidas
```

---

## 8. Checklist de Testing Completo

### Móvil (390x844)
- [ ] Bottom nav visible y funcional
- [ ] Cards 1 columna
- [ ] Botones siempre visibles
- [ ] Search modal fullscreen
- [ ] FilePreview fullscreen
- [ ] Animaciones suaves (60fps)
- [ ] Tap feedback en botones
- [ ] No hay overflow horizontal
- [ ] Headers/footers sticky
- [ ] Padding adecuado

### Tablet (768x1024)
- [ ] Bottom nav presente
- [ ] Cards 2 columnas
- [ ] Search en header
- [ ] Spacing intermedio
- [ ] Modales centrados
- [ ] Landscape mode ok

### Desktop (1024px+)
- [ ] Bottom nav oculta
- [ ] Cards 3 columnas
- [ ] Search en header
- [ ] Hover effects funcionan
- [ ] Footer visible
- [ ] Padding desktop
- [ ] Scroll suave

---

## 9. Debugging Común

### Problema: Cards desalineadas
```
Solución: Verificar grid template columns
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
```

### Problema: Botones pequeños
```
Solución: Verificar min-h-10 min-w-10
Asegurar tamaño mínimo 48px
```

### Problema: Animaciones laggy
```
Solución: Verificar GPU acceleration
Usar transform, opacity (sí)
Evitar top, left, width (no)
```

### Problema: Modal ocupa pantalla completa
```
Solución: Verificar DialogContent className
md:inset-auto md:fixed necesario
```

---

## 10. Tools Útiles

### Browser DevTools
- Responsive Design Mode
- Lighthouse
- Network throttling
- Console for errors

### Online Tools
- [Responsively App](https://responsively.app/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [WebAIM Color Contrast](https://webaim.org/resources/contrastchecker/)
- [Can I Use](https://caniuse.com/)

---

## 11. Reporte de Issues

Si encuentras problemas, verifica:

```markdown
### Bug Report
- Dispositivo: (iPhone 14, Android Pixel, etc)
- Navegador: (Chrome, Safari, etc)
- Tamaño: 390px, 768px, 1024px+
- Problema: (descripción clara)
- Steps to reproduce:
  1. ...
  2. ...
- Esperado: ...
- Actual: ...
```

---

## 12. Notas Finales

✓ Esta app fue diseñada **Mobile-First**
✓ Las optimizaciones son **progresivas**
✓ Funciona sin JavaScript (fallbacks)
✓ Respeta preferencias de usuario
✓ Listo para PWA si se requiere

**¡Disfruta testear la experiencia móvil premium de tu Biblioteca Virtual!** 🚀
