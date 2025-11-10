# Ceratwit

**Ceratwit** es una app web desarrollada por [Pablo Riveiro](https://github.com/pablo-riveiro-uy) como homenaje a Gustavo Cerati, en el marco del evento **#CeratiAquiYAhora**, combinando arte, tecnología y comunidad.

---
## 📖 Descripción general

El proyecto permite que los fans de Cerati puedan dejar mensajes en tiempo real, los cuales son moderados y luego proyectados en pantalla durante el evento.

Está compuesto por **tres vistas principales**:
1. **Formulario público (Home):** los usuarios escriben su mensaje y nombre, limitado a 140 caracteres.
2. **Panel de moderación (Admin):** se visualizan los mensajes recibidos y se pueden marcar como visibles/no visibles.
3. **Slider de proyección:** muestra los mensajes aprobados en pantalla completa para el evento.

---
## ⚙️ Stack tecnológico

- **React + Vite**
- **React Hook Form**
- **React Router**
- **Firebase Firestore**
- **CSS puro + diseño responsivo**

---
## 🚀 Instalación y ejecución

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/pablo-riveiro-uy/ceratwit.git
   cd ceratwit
   ```
2. Instalá las dependencias:
   ```bash
   npm install
   ```
3. Iniciá el entorno local:
   ```bash
   npm run dev
   ```

---
## 🧠 Flujo de funcionamiento

```plaintext
Formulario -> Firestore -> Panel de moderación -> Slider de proyección
```

1. El formulario registra nombre y mensaje.
2. Los datos se guardan en la colección `mensajes` de Firestore.
3. El administrador filtra qué mensajes se mostrarán.
4. El slider muestra los mensajes visibles en una interfaz fullscreen para proyección.

---
## 🛡️ Buenas prácticas aplicadas

- Validación y límite de caracteres (140 máx).
- Sanitización básica (`trim`, `replace`, `slice`).
- Diseño accesible (teclas Tab, focus ring, contraste).
- Responsividad visual y centrado en UX.
- Overlay uniforme para garantizar legibilidad sobre fondo multimedia.

---
## 🧩 Próximas mejoras sugeridas

- Reglas de seguridad en Firestore (validación de longitud, frecuencia y contenido).
- Integración de un rate limit para evitar spam.
- Logs de moderación (quién aprueba y cuándo).
- Documentación del slider y vista de administración.

---
## ❤️ Créditos

Proyecto creado por **Pablo Riveiro**  
Diseño y mejoras de accesibilidad/documentación: colaboración de la comunidad.  
Inspirado en la música y legado de **Gustavo Cerati**.
