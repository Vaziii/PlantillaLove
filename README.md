# 💖 Plantilla Web Romántica Interactiva para Parejas

¡Bienvenido/a a tu proyecto web para novios! Esta plantilla está diseñada con un estilo moderno (**Glassmorphism, partículas flotantes de corazones en Canvas y efectos 3D**) y cuenta con un menú principal que autodirige a **4 experiencias interactivas**:

---

## 📂 Estructura de Carpetas

```
PlantillaLove/
├── index.html                 ← Página principal: selector de diseños
├── assets/
│   ├── css/styles.css         ← Estilos globales
│   ├── js/script.js           ← Scripts globales (contador, partículas, música)
│   ├── img/                   ← Imágenes locales
│   └── audio/                 ← Tus canciones personalizadas (.mp3)
├── proyectos/                 ← Diseños anteriores (reproductor, galería, cartas, timeline)
│   ├── musica.html
│   ├── galeria.html
│   ├── cartas.html
│   └── timeline.html
└── plantillas/                ← Nuevas plantillas de páginas de amor
    └── carta-de-amor/         ← Diseño Nº1: carta, carrusel, contador, música
        ├── index.html
        ├── style.css
        └── script.js          ← Configuración (fecha, fotos, canción, texto)
```

## 📂 Estructura de las Páginas

1. **[index.html](index.html)**: menú principal con tarjetas de diseños disponibles.
2. **[carta-de-amor](plantillas/carta-de-amor/index.html)** 💌 (Diseño Nº1): sobre que se abre, carta con máquina de escribir, contador de amor, carrusel de fotos y música personalizada.
3. **[musica.html](proyectos/musica.html)** (Nuestras Canciones):
   - Reproductor interactivo estilo **disco de vinilo giratorio**.
   - Barra de reproducción, selector de pistas y dedicatorias románticas por canción.

4. **[galeria.html](proyectos/galeria.html)** (Galería de Fotos):
   - Fotos estilo **Polaroid 3D**: al hacer clic en cualquier foto, gira para revelar una nota romántica y fecha al reverso.
   - Filtros por categoría (Citas, Viajes, Momentos Inolvidables).

5. **[cartas.html](proyectos/cartas.html)** (Cartas & Secretos):
   - Sobres interactivos "Abre esto cuando..." (cuando me extrañes, cuando no puedas dormir, etc.).
   - Mini-juego interactivo de **Raspa y Gana**: tu pareja puede raspar con el dedo o mouse para descubrir un vale romántico sorpresa.

6. **[timeline.html](proyectos/timeline.html)** (Nuestra Historia):
   - Línea de tiempo cronológica con los capítulos más especiales de su relación.

---

## ⚙️ Cómo Personalizarla Fácilmente

### 1. Cambiar la Fecha de Inicio de la Relación:
Abre el archivo `assets/js/script.js` (o el `script.js` dentro de cada plantilla) y edita la línea:
```javascript
startDate: new Date('2023-05-14T00:00:00') // Pon tu fecha en formato AAAA-MM-DD
```

### 2. Cambiar Fotos:
En `proyectos/galeria.html`, `proyectos/timeline.html` o `proyectos/musica.html`, reemplaza las URLs de las imágenes (`src="..."`) por las rutas de tus propias fotos (puedes crear una carpeta `fotos/` y poner `fotos/mi_foto.jpg`).

### 3. Cambiar Canciones y Letras:
En `proyectos/musica.html`, en el script al final del archivo, puedes editar el arreglo `playlist` con los títulos de sus canciones preferidas y sus archivos de audio locales (.mp3).

---

## 🚀 Cómo abrir la web:
Simplemente haz doble clic en `index.html` para abrirla en tu navegador favorito (Chrome, Edge, Safari, Firefox).
