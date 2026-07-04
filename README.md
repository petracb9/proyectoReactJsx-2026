
# 🍹 TropicGlass — E-commerce de Vasos Personalizados Premium

Breve descripción del proyecto: Aplicación web interactiva desarrollada en React que simula una tienda en línea moderna para la venta de cristalería y vasos exclusivos, ofreciendo una experiencia fluida e intuitiva al usuario.
El proyecto TropicGlas se desarrolla con la librería de ReactJSX y la herramienta Vite como el motor que prepara, empaqueta y actualiza la API desde el código JSX hasta el CSS configurándose para varios navegadores.

## 🎯 Objetivos del Proyecto
* **Implementar un CRUD completo de sesión:** Permitir la gestión total de productos dentro de un carrito de compras.
* **Optimización Responsive Total:** Garantizar una visualización adaptada desde dispositivos móviles pequeños hasta pantallas de escritorio.
* **Modularidad:** Estructurar el código en componentes reutilizables y escalables mediante Context API.

---

## 🛠️ Requerimientos Técnicos Implementados
1. **Gestión de Carrito sin Duplicados:** Al agregar un producto existente, se incrementa la cantidad de forma automática sin duplicar la tarjeta visual.
2. **Controles Interactivos de Cantidad:** Incorporación de botones contextuales (`+` y `−`) tipo píldora dentro del carrito. El botón muta dinámicamente a papelera (`🗑️`) al llegar a la unidad mínima (1) para mejorar la UX.
3. **Persistencia y Flujo:** Control dinámico de totales, subtotales y cantidades totales reflejadas en el Navbar en tiempo real.
4. **Gestión de Autenticación de Administrador de Usuario:** Sistema de autenticación con registro, inicio de sesión y autorización mediante AuthContext.


---

## 📁 Estructura del Proyecto

La arquitectura del proyecto está organizada de manera modular basándose en rutas funcionales y componentes especializados para conectar con los requerimientos esenciales:

<details>
<summary>📂 Haz clic aquí para desplegar el árbol de archivos</summary>

```proyectoReactJsx
public/
└── images/
    |        

src/
├── components/
|   |__ data/
|   |  └── productos.jso     # Base de datos simulada
│   ├── Layout/              # Componentes de estructura global
│   │   ├── Header.jsx / .css
│   │   ├── Navbar.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   └── Layout.jsx / .css
│   │
│   └── catalog/             # Gestión de visualización de productos
│       ├── ItemListContainer.jsx / .css
│       ├── ItemList.jsx / .css
│       └── Item.jsx / .css
│
├── context/                 # Estado global de la aplicación (CRUD)
│   └── AuthContext.jsx
│   └── CartContext.jsx
│
├── pages/                   # Vistas principales de la aplicación
│   ├── Carrito.jsx
│   ├── Categorias.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Perfil.jsx
│   ├── ProductoDetalle.jsx
│   └── Productos.jsx
│
├── App.jsx                  # Enrutador principal
├── main.jsx
└── index.css

##