# Lecatex - Tienda Online de Revestimientos

Tienda e-commerce para la venta de revestimientos Lecatex y todos sus productos. Desarrollada como sitio web estático con carrito de compras, pasarela de pago y cálculo de envío.

## Descripcion

Lecatex Tienda es una plataforma de venta online que permite a los clientes explorar, seleccionar y comprar productos Lecatex de forma simple y rapida. Incluye catalogo de productos, carrito de compras persistente, checkout con multiples metodos de pago y calculo de envio segun provincia.

## Funcionalidades

### Catalogo de Productos
- 16 productos organizados en 6 categorias
- Revestimientos Plasticos (3 productos)
- Revestimientos Texturados (3 productos)
- Revestimientos al Agua (2 productos)
- Enduidos y Preparacion (3 productos)
- Pinturas (2 productos)
- Accesorios y Herramientas (3 productos)
- Vista de productos destacados en la pagina principal
- Filtros por categoria con pills interactivos
- Busqueda de productos por nombre, descripcion o categoria
- Modal de detalle de producto con seleccion de color y presentacion

### Carrito de Compras
- Carrito persistente guardado en localStorage
- Agregar productos con seleccion de color, tamaño y cantidad
- Modificar cantidades (+/-) desde el carrito
- Eliminar productos individuales
- Calculo automatico de subtotales
- Drawer lateral que se desliza desde la derecha

### Envio
- Calculo de envio por provincia
- Envio estandar a CABA ($3.500, gratis desde $50.000)
- Envio express a CABA ($6.500, gratis desde $80.000)
- Envio estandar a GBA ($5.500, gratis desde $70.000)
- Envio al Interior ($8.500, gratis desde $100.000)
- Opcion de retiro en deposito (sin cargo)
- Indicador de monto faltante para envio gratis

### Checkout
- Proceso de compra en 3 pasos: Envio, Pago y Resumen
- Formulario de datos de envio con validacion
- Metodo de pago: MercadoPago (tarjeta, transferencia o efectivo)
- Metodo de pago: Tarjeta de Credito/Debito (Visa, Mastercard, Amex)
- Formulario de datos de tarjeta con encriptacion SSL
- Resumen del pedido antes de confirmar
- Numero de pedido generado automaticamente
- Confirmacion visual de pedido exitoso

### Interfaz
- Diseno responsivo (desktop, tablet, mobile)
- Header sticky con navegacion, buscador y carrito
- Menu hamburguesa para mobile
- Hero banner con imagen de fondo
- Barra de beneficios (envio, garantia, asesoramiento)
- Seccion de categorias con tarjetas visuales
- Seccion informativa de envio, promociones, pago y asesoramiento
- Boton flotante de WhatsApp para consulta directa
- Footer con navegacion, categorias y contacto

## Estructura del Proyecto

```
lecatexballesterventas/
├── index.html          # Estructura HTML principal
├── app.js              # Logica de la aplicacion (productos, carrito, checkout)
├── styles.css          # Estilos CSS completos
├── img/                # Imagenes de productos y branding
│   ├── lecatex-logo.png
│   ├── hero-bg.jpg
│   ├── lecatex-plastico-4.jpg
│   ├── lecatex-plastico-10.jpg
│   ├── lecatex-plastico-20.jpg
│   ├── lecatex-rustico-20.jpg
│   ├── lecatex-salteado-10.jpg
│   ├── lecatex-gotalete-20.jpg
│   ├── lecatex-agua-10.jpg
│   ├── lecatex-agua-20.jpg
│   ├── lecatex-enduido-10.jpg
│   ├── lecatex-enduido-ext-20.jpg
│   ├── lecatex-fijador-10.jpg
│   ├── lecatex-latex-20.jpg
│   ├── lecatex-esmalte-4.jpg
│   ├── rodillo.jpg
│   ├── espatula.jpg
│   └── bandeja.jpg
├── public/             # Carpeta de recursos publicos (duplicado para hosting)
│   ├── products/       # Imagenes de productos
│   ├── hero-bg.jpg
│   └── lecatex-logo.png
├── firebase.json       # Configuracion de Firebase Hosting
├── Caddyfile           # Configuracion de servidor Caddy
└── README.md           # Este archivo
```

## Tecnologias

- **HTML5** - Estructura semantica del sitio
- **CSS3** - Estilos con variables CSS, Grid, Flexbox, animaciones y responsive design
- **JavaScript (ES6+)** - Logica de aplicacion, manejo de estado, localStorage
- **Google Fonts** - Tipografia Inter
- **Firebase Hosting** - Hosting del sitio estatico (configurado)
- **GitHub** - Repositorio de codigo y versiones

## Datos de Productos

| # | Producto | Categoria | Precio | Presentacion |
|---|----------|-----------|--------|--------------|
| 1 | Lecatex Plastico Clasico 20L | Revestimientos Plasticos | $45.900 | balde 20L |
| 2 | Lecatex Plastico Clasico 10L | Revestimientos Plasticos | $24.900 | balde 10L |
| 3 | Lecatex Plastico Clasico 4L | Revestimientos Plasticos | $12.900 | balde 4L |
| 4 | Lecatex Rustico Texturado 20L | Revestimientos Texturados | $52.900 | balde 20L |
| 5 | Lecatex Salteado Decorativo 10L | Revestimientos Texturados | $31.900 | balde 10L |
| 6 | Lecatex Gotaleta 20L | Revestimientos Texturados | $49.900 | balde 20L |
| 7 | Lecatex al Agua Premium 20L | Revestimientos al Agua | $38.900 | balde 20L |
| 8 | Lecatex al Agua Classic 10L | Revestimientos al Agua | $21.900 | balde 10L |
| 9 | Lecatex Enduido Interior 10L | Enduidos y Preparacion | $18.900 | balde 10L |
| 10 | Lecatex Enduido Exterior 20L | Enduidos y Preparacion | $34.900 | balde 20L |
| 11 | Lecatex Fijador Sellador 10L | Enduidos y Preparacion | $15.900 | balde 10L |
| 12 | Lecatex Latex Satinado 20L | Pinturas | $35.900 | balde 20L |
| 13 | Lecatex Esmalte Sintetico 4L | Pinturas | $18.900 | lata 4L |
| 14 | Rodillo para Revestimiento 23cm | Accesorios y Herramientas | $8.900 | unidad |
| 15 | Espatula de Acero 30cm | Accesorios y Herramientas | $6.500 | unidad |
| 16 | Bandeja para Pintura con Rejilla | Accesorios y Herramientas | $4.500 | unidad |

## Tabla de Envio

| Zona | Tipo | Costo | Envio Gratis Desde | Plazo |
|------|------|-------|--------------------|-------|
| CABA | Estandar | $3.500 | $50.000 | 3-5 dias habiles |
| CABA | Express | $6.500 | $80.000 | 1-2 dias habiles |
| GBA | Estandar | $5.500 | $70.000 | 3-5 dias habiles |
| Interior | Estandar | $8.500 | $100.000 | 5-7 dias habiles |
| Todos | Retiro en deposito | Gratis | - | 24hs |

## Como Usar

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/lecatexzonanorte/lecatexballesterventas.git
   ```

2. Abrir `index.html` en un navegador web

No se necesita servidor ni instalacion de dependencias. El sitio funciona como aplicacion estatica.

## Despliegue con Firebase

1. Instalar Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Iniciar sesion en Firebase:
   ```bash
   firebase login
   ```

3. Inicializar el proyecto (si es necesario):
   ```bash
   firebase init
   ```

4. Desplegar:
   ```bash
   firebase deploy
   ```

El archivo `firebase.json` ya esta configurado para servir los archivos estaticos.

## Paleta de Colores

| Color | Codigo | Uso |
|-------|--------|-----|
| Naranja principal | #E8712B | Botones, precios, acentos |
| Naranja oscuro | #C45A1A | Hover de botones |
| Naranja claro | #F5A66B | Textos destacados |
| Terracota | #C4603B | Acentos secundarios |
| Ambar | #D4920A | Badges de destacado |
| Gris calido | #8B7D6B | Textos secundarios |
| Fondo calido | #F5F0EB | Secciones alternas |
| Oscuro | #2D2520 | Footer, textos principales |

## Caracteristicas Tecnicas

- **Sin dependencias**: No requiere Node.js, npm ni ningun framework
- **localStorage**: El carrito se guarda localmente y persiste entre sesiones
- **SPA-like**: Navegacion sin recarga usando renderizado dinamico con JavaScript
- **Responsive**: Adaptado para desktop, tablet y mobile con media queries
- **Accesible**: Formularios con labels, inputs con placeholders descriptivos
- **Performance**: Imagenes con lazy loading, CSS optimizado sin frameworks pesados

## Contacto

- Direccion: Av. Industrial 1234, CABA
- Telefono: (011) 4567-8900
- Email: info@lecatex.com.ar
- Horario: Lun-Vie 8:00-18:00
- WhatsApp: Boton flotante en el sitio

## Licencia

Todos los derechos reservados. Lecatex 2026.
