# React + Vite

El proyecto TropicGlas se desarrolla con la librería de ReactJSX y la herramienta Vite como el motor que prepara, empaqueta y actualiza la API desde el código JSX hasta el CSS configurándose para varios navegadores. 

## Estructura
La estructura se organiza de acuerdo a las rutas para su conexión con los tres requerimientos del proyecto como sigue: (por mejorar la ruta)


```txt
proyecto-reactjsx-2026
  └──public/
  │   └── images/
  └── src
    └── componentes (mejorar)
   └── main.jsx
      └── BrowserRouter
    └── App.jsx
        └── Layout.jsx
            ├── Header.jsx
            │   └── Navbar.jsx
            ├── Routes
            │   ├── Home.jsx
            │   ├── Productos.jsx
            │   │   └── ItemListContainer.jsx
            │   │       └── ItemList.jsx
            │   │           └── Item.jsx
            │   ├── ProductoDetalle.jsx
            │   └── Carrito.jsx
            └── Footer.jsx
   ```

```txt
public/
└── data/
    └── productos.json

src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── Layout.jsx
│   │   └── Layout.css
│   │
│   └── catalog/
│       ├── ItemListContainer.jsx
│       ├── ItemListContainer.css
│       ├── ItemList.jsx
│       ├── ItemList.css
│       ├── Item.jsx
│       └── Item.css
├── data/
│   ├── productos.json/
├── pages/
│   ├── Carrito.jsx/
│   ├── Categorias.jsx/
│   ├── Home.jsx/
│   ├── ProductoDetalle.jsx/
│   ├── Productos.jsx/
│
├── App.jsx
├── main.jsx
└── index.css
```

# Continuidad con los dos requerimientos...