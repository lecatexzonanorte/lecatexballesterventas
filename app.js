// ===== FIREBASE INIT =====
const firebaseConfig = {
  apiKey: "AIzaSyDsGfmAF2cKLVWwUwYMXVdV3m5jJbVdGmk",
  authDomain: "lecatexballesterventas.firebaseapp.com",
  projectId: "lecatexballesterventas",
  storageBucket: "lecatexballesterventas.firebasestorage.app",
  messagingSenderId: "375721795523",
  appId: "1:375721795523:web:74fd5a7aa240135c116776",
  measurementId: "G-BZE2LHGGLE"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

// ===== PRODUCT DATA (fallback local) =====
const PRODUCTS_LOCAL = [
  { id:1, name:"Lecatex Plástico Clásico 20L", slug:"lecatex-plastico-clasico-20l", desc:"Revestimiento plástico de alta cobertura para exteriores. Resistente a la intemperie, lavable y de larga duración. Aplicación con rodillo o espátula.", price:45900, comparePrice:52000, unit:"balde 20L", img:"img/lecatex-plastico-20.jpg", cat:"Revestimientos Plásticos", catSlug:"revestimientos-plasticos", featured:true, colors:["Blanco","Beige","Gris claro","Terracota"], sizes:["4L","10L","20L"] },
  { id:2, name:"Lecatex Plástico Clásico 10L", slug:"lecatex-plastico-clasico-10l", desc:"Revestimiento plástico versátil para interiores y exteriores. Excelente cobertura y adherencia. Secado rápido y fácil de aplicar.", price:24900, comparePrice:28000, unit:"balde 10L", img:"img/lecatex-plastico-10.jpg", cat:"Revestimientos Plásticos", catSlug:"revestimientos-plasticos", featured:false, colors:["Blanco","Beige","Gris claro","Terracota"], sizes:["4L","10L","20L"] },
  { id:3, name:"Lecatex Plástico Clásico 4L", slug:"lecatex-plastico-clasico-4l", desc:"Revestimiento plástico en presentación chica ideal para refacciones o detalles. Misma calidad y resistencia en formato práctico.", price:12900, comparePrice:null, unit:"balde 4L", img:"img/lecatex-plastico-4.jpg", cat:"Revestimientos Plásticos", catSlug:"revestimientos-plasticos", featured:false, colors:["Blanco","Beige","Gris claro"], sizes:["4L"] },
  { id:4, name:"Lecatex Rústico Texturado 20L", slug:"lecatex-rustico-texturado-20l", desc:"Revestimiento texturado de efecto rústico para exteriores. Crea una superficie con relieve y profundidad. Resistente a rayos UV.", price:52900, comparePrice:58000, unit:"balde 20L", img:"img/lecatex-rustico-20.jpg", cat:"Revestimientos Texturados", catSlug:"revestimientos-texturados", featured:true, colors:["Blanco","Beige","Terracota","Piedra","Arena"], sizes:["10L","20L"] },
  { id:5, name:"Lecatex Salteado Decorativo 10L", slug:"lecatex-salteado-decorativo-10l", desc:"Revestimiento decorativo de efecto salteado que aporta movimiento y textura a tus paredes. Fácil aplicación con espátula o pincel.", price:31900, comparePrice:null, unit:"balde 10L", img:"img/lecatex-salteado-10.jpg", cat:"Revestimientos Texturados", catSlug:"revestimientos-texturados", featured:false, colors:["Blanco","Crema","Gris","Terracota"], sizes:["4L","10L"] },
  { id:6, name:"Lecatex Gotaleta 20L", slug:"lecatex-gotaleta-20l", desc:"Revestimiento con efecto gotaleta para un acabado sofisticado y duradero. Textura fina que combina elegancia y resistencia.", price:49900, comparePrice:null, unit:"balde 20L", img:"img/lecatex-gotalete-20.jpg", cat:"Revestimientos Texturados", catSlug:"revestimientos-texturados", featured:true, colors:["Blanco","Beige","Gris perla"], sizes:["10L","20L"] },
  { id:7, name:"Lecatex al Agua Premium 20L", slug:"lecatex-agua-premium-20l", desc:"Revestimiento al agua de última generación. Bajo olor, ecológico y de secado rápido. Lavable y resistente al frote.", price:38900, comparePrice:43000, unit:"balde 20L", img:"img/lecatex-agua-20.jpg", cat:"Revestimientos al Agua", catSlug:"revestimientos-al-agua", featured:true, colors:["Blanco","Beige","Gris claro","Rosa pálido","Celeste"], sizes:["4L","10L","20L"] },
  { id:8, name:"Lecatex al Agua Classic 10L", slug:"lecatex-agua-classic-10l", desc:"Revestimiento al agua de excelente rendimiento. Fácil de aplicar y limpiar. Apto para ambientes con niños por su fórmula libre de solventes.", price:21900, comparePrice:null, unit:"balde 10L", img:"img/lecatex-agua-10.jpg", cat:"Revestimientos al Agua", catSlug:"revestimientos-al-agua", featured:false, colors:["Blanco","Beige","Gris claro"], sizes:["4L","10L"] },
  { id:9, name:"Lecatex Enduido Interior 10L", slug:"lecatex-enduido-interior-10l", desc:"Enduido de alta calidad para preparación de superficies interiores. Rellena imperfecciones y deja una base lisa y perfecta.", price:18900, comparePrice:null, unit:"balde 10L", img:"img/lecatex-enduido-10.jpg", cat:"Enduidos y Preparación", catSlug:"enduidos", featured:false, colors:["Blanco"], sizes:["4L","10L","20L"] },
  { id:10, name:"Lecatex Enduido Exterior 20L", slug:"lecatex-enduido-exterior-20l", desc:"Enduido especial para exteriores con resistencia a la humedad. Prepara superficies exteriores para revestimientos de larga duración.", price:34900, comparePrice:null, unit:"balde 20L", img:"img/lecatex-enduido-ext-20.jpg", cat:"Enduidos y Preparación", catSlug:"enduidos", featured:false, colors:["Blanco","Gris"], sizes:["10L","20L"] },
  { id:11, name:"Lecatex Fijador Sellador 10L", slug:"lecatex-fijador-sellador-10l", desc:"Fijador sellador que garantiza la adherencia del revestimiento. Impermeabiliza y uniformiza la absorción de la superficie.", price:15900, comparePrice:null, unit:"balde 10L", img:"img/lecatex-fijador-10.jpg", cat:"Enduidos y Preparación", catSlug:"enduidos", featured:false, colors:["Transparente","Blanco"], sizes:["4L","10L"] },
  { id:12, name:"Lecatex Látex Satinado 20L", slug:"lecatex-latex-satinado-20l", desc:"Pintura látex satinada de alta calidad para interiores. Acabado suave y lavable con excelente cobertura. Bajo olor.", price:35900, comparePrice:40000, unit:"balde 20L", img:"img/lecatex-latex-20.jpg", cat:"Pinturas", catSlug:"pinturas", featured:true, colors:["Blanco","Beige","Gris","Celeste","Rosa","Verde salvia"], sizes:["4L","10L","20L"] },
  { id:13, name:"Lecatex Esmalte Sintético 4L", slug:"lecatex-esmalte-sintetico-4l", desc:"Esmalte sintético de alto brillo para madera y metal. Resistente al exterior y de acabado impecable.", price:18900, comparePrice:null, unit:"lata 4L", img:"img/lecatex-esmalte-4.jpg", cat:"Pinturas", catSlug:"pinturas", featured:false, colors:["Blanco","Negro","Rojo","Verde","Azul","Marrón"], sizes:["1L","4L"] },
  { id:14, name:"Rodillo para Revestimiento 23cm", slug:"rodillo-revestimiento-23cm", desc:"Rodillo profesional de 23cm para aplicación de revestimientos plásticos y texturados. Mango antideslizante.", price:8900, comparePrice:null, unit:"unidad", img:"img/rodillo.jpg", cat:"Accesorios y Herramientas", catSlug:"accesorios", featured:false, colors:[], sizes:[] },
  { id:15, name:"Espátula de Acero 30cm", slug:"espatula-acero-30cm", desc:"Espátula de acero inoxidable de 30cm ideal para aplicación de revestimientos y enduidos. Mango ergonómico.", price:6500, comparePrice:null, unit:"unidad", img:"img/espatula.jpg", cat:"Accesorios y Herramientas", catSlug:"accesorios", featured:false, colors:[], sizes:[] },
  { id:16, name:"Bandeja para Pintura con Rejilla", slug:"bandeja-pintura-rejilla", desc:"Bandeja plástica de alta resistencia con rejilla escurridora incluida. Capacidad de 5L. Fácil de limpiar.", price:4500, comparePrice:null, unit:"unidad", img:"img/bandeja.jpg", cat:"Accesorios y Herramientas", catSlug:"accesorios", featured:false, colors:[], sizes:[] },
];

const CATEGORIES = [
  { name:"Revestimientos Plásticos", slug:"revestimientos-plasticos", img:"img/lecatex-plastico-20.jpg" },
  { name:"Revestimientos Texturados", slug:"revestimientos-texturados", img:"img/lecatex-rustico-20.jpg" },
  { name:"Revestimientos al Agua", slug:"revestimientos-al-agua", img:"img/lecatex-agua-20.jpg" },
  { name:"Enduidos y Preparación", slug:"enduidos", img:"img/lecatex-enduido-10.jpg" },
  { name:"Pinturas", slug:"pinturas", img:"img/lecatex-latex-20.jpg" },
  { name:"Accesorios y Herramientas", slug:"accesorios", img:"img/rodillo.jpg" },
];

const SHIPPING_RULES = [
  { id:"caba", name:"Envío CABA", type:"standard", province:"CABA", cost:3500, freeAbove:50000, days:"3-5 días hábiles" },
  { id:"caba-exp", name:"Envío Express CABA", type:"express", province:"CABA", cost:6500, freeAbove:80000, days:"1-2 días hábiles" },
  { id:"gba", name:"Envío GBA", type:"standard", province:"Buenos Aires", cost:5500, freeAbove:70000, days:"3-5 días hábiles" },
  { id:"interior", name:"Envío Interior", type:"standard", province:null, cost:8500, freeAbove:100000, days:"5-7 días hábiles" },
];

// ===== STATE =====
let PRODUCTS = [...PRODUCTS_LOCAL]; // Start with local, then override from Firestore
let cart = JSON.parse(localStorage.getItem('lecatex_cart') || '[]');
let currentView = 'home';
let currentCategory = null;
let searchQuery = '';
let selectedShipping = null;
let checkoutStep = 1;
let _firestoreReady = false;

// ===== FIREBASE: Load products from Firestore =====
async function loadProductsFromFirestore() {
  try {
    const snapshot = await db.collection('products').orderBy('id').get();
    if (!snapshot.empty) {
      PRODUCTS = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: d.id,
          name: d.name,
          slug: d.slug,
          desc: d.desc,
          price: d.price,
          comparePrice: d.comparePrice || null,
          unit: d.unit,
          img: d.img,
          cat: d.cat,
          catSlug: d.catSlug,
          featured: d.featured || false,
          colors: d.colors || [],
          sizes: d.sizes || []
        };
      });
      console.log(`[Firebase] ${PRODUCTS.length} productos cargados desde Firestore`);
    } else {
      console.log('[Firebase] No hay productos en Firestore, usando datos locales');
      // Seed Firestore with local data on first run
      await seedProducts();
    }
    _firestoreReady = true;
    render(); // Re-render with Firestore data
  } catch (err) {
    console.error('[Firebase] Error cargando productos:', err);
    console.log('[App] Usando datos locales como fallback');
  }
}

// ===== FIREBASE: Seed products to Firestore (first run) =====
async function seedProducts() {
  try {
    const batch = db.batch();
    PRODUCTS_LOCAL.forEach(p => {
      const ref = db.collection('products').doc(String(p.id));
      batch.set(ref, p);
    });
    await batch.commit();
    console.log(`[Firebase] ${PRODUCTS_LOCAL.length} productos guardados en Firestore`);
  } catch (err) {
    console.error('[Firebase] Error guardando productos iniciales:', err);
  }
}

// ===== FIREBASE: Save order to Firestore =====
async function saveOrderToFirestore(orderData) {
  try {
    const docRef = await db.collection('orders').add({
      ...orderData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'pendiente'
    });
    console.log('[Firebase] Pedido guardado con ID:', docRef.id);
    return docRef.id;
  } catch (err) {
    console.error('[Firebase] Error guardando pedido:', err);
    return null;
  }
}

// ===== FORMAT =====
function fmt(n) {
  return new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',minimumFractionDigits:0,maximumFractionDigits:0}).format(n);
}

function saveCart() {
  localStorage.setItem('lecatex_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((s,i) => s+i.qty, 0);
  document.getElementById('cartCount').textContent = count;
}

function getSubtotal() { return cart.reduce((s,i) => s + i.price * i.qty, 0); }

// ===== NAVIGATION =====
function navigate(view, catSlug) {
  currentView = view;
  currentCategory = catSlug || null;
  searchQuery = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('searchBar').style.display = 'none';
  render();
  window.scrollTo({top:0, behavior:'smooth'});
  // Update nav active
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-view="${view}"]`);
  if (activeLink) activeLink.classList.add('active');
}

function toggleSearch() {
  const bar = document.getElementById('searchBar');
  bar.style.display = bar.style.display === 'none' ? 'block' : 'none';
  if (bar.style.display === 'block') document.getElementById('searchInput').focus();
}

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
}

function handleSearch(q) {
  searchQuery = q;
  if (currentView !== 'products') { currentView = 'products'; currentCategory = null; }
  render();
}

// ===== RENDER =====
function render() {
  const main = document.getElementById('mainContent');
  switch(currentView) {
    case 'home': main.innerHTML = renderHome(); break;
    case 'products': main.innerHTML = renderProducts(); break;
    default: main.innerHTML = renderHome();
  }
}

function renderHome() {
  const featured = PRODUCTS.filter(p => p.featured);
  return `
    ${renderHero()}
    ${renderBenefits()}
    <div class="section">
      <div class="section-header">
        <div><h2>Productos Destacados</h2><p>Los más elegidos por profesionales</p></div>
        <button class="btn btn-outline btn-sm" onclick="navigate('products')">Ver todos →</button>
      </div>
      <div class="product-grid">${featured.map(renderProductCard).join('')}</div>
    </div>
    <div class="section-alt">
      <div class="section">
        <div style="text-align:center;margin-bottom:28px">
          <h2>Nuestras Categorías</h2>
          <p style="color:var(--muted);margin-top:4px">Todo lo que necesitás para tu próximo proyecto</p>
        </div>
        <div class="cat-grid">${CATEGORIES.map(c => renderCatCard(c)).join('')}</div>
      </div>
    </div>
    <div class="section">
      <div class="ship-grid">
        <div class="ship-card"><div class="ship-icon"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div><h4>Envío Gratis</h4><p>En compras mayores a $50.000 en CABA</p></div>
        <div class="ship-card"><div class="ship-icon"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg></div><h4>Promociones</h4><p>Descuentos especiales por cantidad</p></div>
        <div class="ship-card"><div class="ship-icon"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div><h4>MercadoPago</h4><p>Pagá con tarjeta, transferencia o efectivo</p></div>
        <div class="ship-card"><div class="ship-icon"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><h4>Asesoramiento</h4><p>Consultanos por WhatsApp o teléfono</p></div>
      </div>
    </div>
  `;
}

function renderHero() {
  return `
    <div class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <span class="hero-badge">CALIDAD ARGENTINA</span>
        <h1>Revestimientos <span>Lecatex</span></h1>
        <div class="hero-sub">Calidad que se ve</div>
        <p class="hero-desc">Más de 20 años acompañando a profesionales del sector construcción con revestimientos plásticos, texturados y al agua de primera calidad.</p>
        <div class="hero-btns">
          <button class="btn btn-primary btn-lg" onclick="navigate('products')">Ver Productos →</button>
          <button class="btn-outline-white" onclick="navigate('products')">Explorar Categorías</button>
        </div>
      </div>
    </div>
  `;
}

function renderBenefits() {
  return `
    <div class="benefits">
      <div class="benefit"><div class="benefit-icon"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div><div><h4>Envío a todo el país</h4><p>Gratis en compras +$50.000</p></div></div>
      <div class="benefit"><div class="benefit-icon"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div><h4>Garantía de calidad</h4><p>Productos certificados</p></div></div>
      <div class="benefit"><div class="benefit-icon"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div><h4>Asesoramiento profesional</h4><p>Lun-Vie 8:00-18:00</p></div></div>
    </div>
  `;
}

function renderProductCard(p) {
  const disc = p.comparePrice ? Math.round(((p.comparePrice-p.price)/p.comparePrice)*100) : 0;
  let badge = '';
  if (disc > 0) badge = `<span class="product-badge">-${disc}%</span>`;
  else if (p.featured) badge = `<span class="product-badge featured">Destacado</span>`;
  return `
    <div class="product-card">
      <div class="product-img" onclick="openProduct(${p.id})">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${badge}
      </div>
      <div class="product-info">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name" onclick="openProduct(${p.id})">${p.name}</div>
        <div>
          <span class="product-price">${fmt(p.price)}</span>
          ${p.comparePrice ? `<span class="product-price-old">${fmt(p.comparePrice)}</span>` : ''}
        </div>
        <div class="product-bottom">
          <span class="product-unit">x ${p.unit}</span>
          <button class="product-add" onclick="quickAdd(${p.id})">🛒 Agregar</button>
        </div>
      </div>
    </div>
  `;
}

function renderCatCard(c) {
  const count = PRODUCTS.filter(p => p.catSlug === c.slug).length;
  return `
    <div class="cat-card" onclick="navigate('products','${c.slug}')">
      <div class="cat-img">
        <img src="${c.img}" alt="${c.name}" loading="lazy">
        <div class="cat-name">${c.name}</div>
      </div>
      <div class="cat-info">
        <span class="cat-count">${count} productos</span>
        <span class="cat-arrow">→</span>
      </div>
    </div>
  `;
}

function renderProducts() {
  let prods = [...PRODUCTS];
  if (currentCategory) prods = prods.filter(p => p.catSlug === currentCategory);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    prods = prods.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
  }
  return `
    <div class="section">
      <div class="section-header">
        <div><h2>Productos</h2><p>${prods.length} producto${prods.length!==1?'s':''} encontrado${prods.length!==1?'s':''}</p></div>
      </div>
      <div class="cat-pills">
        <button class="cat-pill ${!currentCategory?'active':''}" onclick="currentCategory=null;render()">Todos</button>
        ${CATEGORIES.map(c => `<button class="cat-pill ${currentCategory===c.slug?'active':''}" onclick="currentCategory='${c.slug}';render()">${c.name}</button>`).join('')}
      </div>
      ${prods.length === 0 ? '<div style="text-align:center;padding:48px"><p style="font-size:18px;color:var(--muted)">No se encontraron productos</p><button class="btn btn-outline" style="margin-top:12px" onclick="currentCategory=null;searchQuery=\'\';render()">Ver todos</button></div>' :
      `<div class="product-grid">${prods.map(renderProductCard).join('')}</div>`}
    </div>
  `;
}

// ===== PRODUCT MODAL =====
function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const disc = p.comparePrice ? Math.round(((p.comparePrice-p.price)/p.comparePrice)*100) : 0;
  const defaultColor = p.colors[0] || '';
  const defaultSize = p.sizes[0] || '';
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-img">
      <img src="${p.img}" alt="${p.name}">
      ${disc > 0 ? `<span class="modal-badge">-${disc}% OFF</span>` : ''}
      <button class="modal-close-x" onclick="closeProductModal()">✕</button>
    </div>
    <div class="modal-details">
      <div class="modal-cat">${p.cat}</div>
      <div class="modal-name">${p.name}</div>
      <div class="modal-desc">${p.desc}</div>
      <div>
        <span class="modal-price">${fmt(p.price)}</span>
        ${p.comparePrice ? `<span class="modal-price-old">${fmt(p.comparePrice)}</span>` : ''}
      </div>
      <div class="modal-unit">Precio por ${p.unit} · Stock disponible</div>
      <hr class="modal-divider">
      ${p.colors.length ? `
        <div class="modal-label">Color: <span id="modalColorLabel">${defaultColor}</span></div>
        <div class="color-pills">${p.colors.map((c,i) => `<button class="color-pill ${i===0?'active':''}" onclick="selectPill(this,'color-pills','modalColorLabel','${c}')">${c}</button>`).join('')}</div>
      ` : ''}
      ${p.sizes.length ? `
        <div class="modal-label">Presentación: <span id="modalSizeLabel">${defaultSize}</span></div>
        <div class="size-pills">${p.sizes.map((s,i) => `<button class="size-pill ${i===0?'active':''}" onclick="selectPill(this,'size-pills','modalSizeLabel','${s}')">${s}</button>`).join('')}</div>
      ` : ''}
      <div class="modal-label">Cantidad</div>
      <div class="modal-qty">
        <button class="qty-btn" onclick="modalQty(-1)">−</button>
        <span id="modalQtyVal">1</span>
        <button class="qty-btn" onclick="modalQty(1)">+</button>
        <span class="modal-subtotal" id="modalSubtotal">${fmt(p.price)}</span>
      </div>
      <button class="btn btn-primary btn-lg btn-block" id="modalAddBtn" onclick="addFromModal(${p.id})">🛒 Agregar al carrito</button>
    </div>
  `;
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectPill(btn, containerId, labelId, value) {
  btn.parentElement.querySelectorAll('.color-pill,.size-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(labelId).textContent = value;
}

let _modalQty = 1;
function modalQty(d) {
  _modalQty = Math.max(1, Math.min(99, _modalQty + d));
  document.getElementById('modalQtyVal').textContent = _modalQty;
  // Update subtotal
  const priceText = document.querySelector('.modal-price').textContent;
  const price = parseFloat(priceText.replace(/[^0-9]/g, ''));
  document.getElementById('modalSubtotal').textContent = fmt(price * _modalQty);
}

function addFromModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const color = document.getElementById('modalColorLabel')?.textContent || '';
  const size = document.getElementById('modalSizeLabel')?.textContent || '';
  addToCart(p, _modalQty, color, size);
  _modalQty = 1;
  const btn = document.getElementById('modalAddBtn');
  btn.textContent = '✓ ¡Agregado!';
  btn.style.background = '#16a34a';
  setTimeout(() => { btn.innerHTML = '🛒 Agregar al carrito'; btn.style.background = ''; }, 1500);
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
  _modalQty = 1;
}

function closeModal(e) {
  if (e.target === document.getElementById('productModal')) closeProductModal();
}

// ===== CART =====
function addToCart(product, qty, color, size) {
  const key = `${product.id}-${color}-${size}`;
  const existing = cart.find(i => i.key === key);
  if (existing) { existing.qty += qty; }
  else { cart.push({ key, id:product.id, name:product.name, price:product.price, img:product.img, qty, color, size, unit:product.unit }); }
  saveCart();
  openCart();
}

function quickAdd(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  addToCart(p, 1, p.colors[0]||'', p.sizes[0]||'');
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  renderCart();
}

function updateQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(key); return; }
  saveCart();
  renderCart();
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (cart.length === 0) {
    body.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p style="font-size:16px;font-weight:600;margin-bottom:4px">Tu carrito está vacío</p><p style="font-size:13px">Agregá productos para empezar</p></div>';
    footer.style.display = 'none';
    document.getElementById('cartItemsLabel').textContent = '';
    return;
  }
  document.getElementById('cartItemsLabel').textContent = `${cart.length} item${cart.length>1?'s':''}`;
  body.innerHTML = cart.map(i => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${i.img}" alt="${i.name}"></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.name}</div>
        ${i.color || i.size ? `<div class="cart-item-variant">${[i.color,i.size].filter(Boolean).join(' · ')}</div>` : ''}
        <div class="cart-item-price">${fmt(i.price * i.qty)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty('${i.key}',-1)">−</button>
          <span class="cart-item-qty">${i.qty}</span>
          <button class="qty-btn" onclick="updateQty('${i.key}',1)">+</button>
          <button class="cart-item-remove" onclick="removeFromCart('${i.key}')">🗑️</button>
        </div>
      </div>
    </div>
  `).join('');
  footer.style.display = 'block';
  updateCartTotals();
}

function calcShipping() {
  const prov = document.getElementById('cartProvince').value;
  if (!prov) { selectedShipping = null; document.getElementById('shippingOptions').innerHTML = ''; updateCartTotals(); return; }
  const sub = getSubtotal();
  const rules = SHIPPING_RULES.filter(r => r.province === prov || (r.province === null && !SHIPPING_RULES.some(x => x.province === prov && x.type === r.type)));
  const options = [...rules, {id:'pickup', name:'Retiro en depósito', type:'pickup', cost:0, freeAbove:null, days:'Disponible en 24hs', province:'_'}];
  let html = options.map(o => {
    const isFree = o.freeAbove && sub >= o.freeAbove;
    const cost = isFree ? 0 : o.cost;
    return `<div class="ship-option ${selectedShipping?.id===o.id?'selected':''}" onclick="selectShip('${o.id}',${cost})">
      <span>${o.name} <small style="color:var(--muted)">(${o.days})</small></span>
      <span class="${isFree?'free':''}">${isFree?'GRATIS':fmt(cost)}</span>
    </div>`;
  }).join('');
  // Free shipping hint
  const minFree = rules.reduce((min,r) => r.freeAbove && (!min || r.freeAbove < min) ? r.freeAbove : min, 0);
  if (minFree && sub < minFree) {
    html += `<div class="ship-free-hint">Envío gratis desde ${fmt(minFree)} (faltan ${fmt(minFree - sub)})</div>`;
  }
  document.getElementById('shippingOptions').innerHTML = html;
  if (!selectedShipping && options.length) { selectedShipping = {id:options[0].id, cost: options[0].freeAbove && sub >= options[0].freeAbove ? 0 : options[0].cost}; }
  updateCartTotals();
}

function selectShip(id, cost) {
  selectedShipping = {id, cost};
  document.querySelectorAll('.ship-option').forEach(el => el.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  updateCartTotals();
}

function updateCartTotals() {
  const sub = getSubtotal();
  const ship = selectedShipping?.cost || 0;
  document.getElementById('cartSubtotal').textContent = fmt(sub);
  document.getElementById('cartShippingCost').textContent = selectedShipping ? (ship > 0 ? fmt(ship) : 'Gratis') : '--';
  document.getElementById('cartTotal').textContent = fmt(sub + ship);
}

// ===== CHECKOUT =====
function goCheckout() {
  if (cart.length === 0) return;
  closeCart();
  checkoutStep = 1;
  renderCheckout();
  document.getElementById('checkoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderCheckout() {
  const sub = getSubtotal();
  const ship = selectedShipping?.cost || 0;
  const total = sub + ship;
  const steps = ['Envío','Pago','Resumen'];
  let html = `
    <div class="checkout-steps">
      ${steps.map((s,i) => `
        <div class="checkout-step ${checkoutStep > i+1 ? 'done' : ''} ${checkoutStep === i+1 ? 'active' : ''}">
          <div class="checkout-step-num">${checkoutStep > i+1 ? '✓' : i+1}</div>
          <div class="checkout-step-label">${s}</div>
        </div>
        ${i < 2 ? `<div class="checkout-line ${checkoutStep > i+1 ? 'done' : ''}"></div>` : ''}
      `).join('')}
    </div>
  `;
  if (checkoutStep === 1) {
    html += `
      <h3 style="font-size:18px;font-weight:600;margin-bottom:16px">Datos de Envío</h3>
      <div class="form-row"><div class="form-group"><label>Nombre completo *</label><input id="ckName" placeholder="Tu nombre"></div><div class="form-group"><label>Email *</label><input id="ckEmail" type="email" placeholder="tu@email.com"></div></div>
      <div class="form-row"><div class="form-group"><label>Teléfono *</label><input id="ckPhone" placeholder="(011) 1234-5678"></div><div class="form-group"><label>Código Postal *</label><input id="ckZip" placeholder="C1000"></div></div>
      <div class="form-group"><label>Dirección *</label><input id="ckAddr" placeholder="Calle y número"></div>
      <div class="form-row"><div class="form-group"><label>Ciudad *</label><input id="ckCity" placeholder="Ciudad"></div><div class="form-group"><label>Provincia *</label><select id="ckProv"><option value="">Seleccionar</option>${['CABA','Buenos Aires','Córdoba','Santa Fe','Mendoza','Tucumán','Entre Ríos','Salta','Misiones','Chaco','Corrientes','Neuquén','Río Negro','San Juan','San Luis','Catamarca','La Rioja','La Pampa','Formosa','Jujuy','Chubut','Santiago del Estero','Santa Cruz','Tierra del Fuego'].map(p=>`<option>${p}</option>`).join('')}</select></div></div>
      <div style="display:flex;justify-content:flex-end;margin-top:16px"><button class="btn btn-primary" onclick="checkoutNext()">Continuar →</button></div>
    `;
  } else if (checkoutStep === 2) {
    html += `
      <h3 style="font-size:18px;font-weight:600;margin-bottom:16px">Método de Pago</h3>
      <div id="paymentMethods">
        <div class="payment-option selected" onclick="selectPayment('mp',this)">
          <input type="radio" name="pay" value="mp" checked>
          <div class="payment-info"><div class="payment-title">MercadoPago</div><div class="payment-desc">Tarjeta, transferencia o efectivo</div></div>
          <span class="payment-logo mp-logo">MP</span>
        </div>
        <div class="payment-option" onclick="selectPayment('cc',this)">
          <input type="radio" name="pay" value="cc">
          <div class="payment-info"><div class="payment-title">Tarjeta de Crédito/Débito</div><div class="payment-desc">Visa, Mastercard, Amex</div></div>
          <span class="payment-logo cc-logo">💳</span>
        </div>
      </div>
      <div id="ccForm" style="display:none">
        <div class="card-form">
          <div class="form-group"><label>Nombre en la tarjeta</label><input id="ccName" placeholder="JUAN PEREZ"></div>
          <div class="form-group"><label>Número de tarjeta</label><input id="ccNum" placeholder="4500 0000 0000 0000" maxlength="19"></div>
          <div class="form-row"><div class="form-group"><label>Vencimiento</label><input id="ccExp" placeholder="MM/AA" maxlength="5"></div><div class="form-group"><label>CVV</label><input id="ccCvv" placeholder="123" maxlength="4" type="password"></div></div>
          <p style="font-size:11px;color:var(--muted)">🔒 Tus datos están protegidos con encriptación SSL</p>
        </div>
      </div>
      <div class="checkout-btns">
        <button class="btn btn-outline" onclick="checkoutStep=1;renderCheckout()">← Volver</button>
        <button class="btn btn-primary" onclick="checkoutNext()">Continuar →</button>
      </div>
    `;
  } else if (checkoutStep === 3) {
    const name = document.getElementById('ckName')?.value || '';
    const email = document.getElementById('ckEmail')?.value || '';
    const phone = document.getElementById('ckPhone')?.value || '';
    const addr = document.getElementById('ckAddr')?.value || '';
    const city = document.getElementById('ckCity')?.value || '';
    const prov = document.getElementById('ckProv')?.value || '';
    const payMethod = document.querySelector('input[name=pay]:checked')?.value || 'mp';
    html += `
      <h3 style="font-size:18px;font-weight:600;margin-bottom:16px">Resumen del Pedido</h3>
      <div class="checkout-summary">
        <p class="label">Datos de envío</p>
        <p>${name}</p>
        <p>${addr}, ${city}, ${prov}</p>
        <p>${email} · ${phone}</p>
        <p style="margin-top:4px">Envío: ${selectedShipping?.id === 'pickup' ? 'Retiro en depósito' : 'Envío a domicilio'}</p>
      </div>
      <div class="checkout-summary">
        <p class="label">Método de pago</p>
        <p>${payMethod === 'mp' ? 'MercadoPago' : 'Tarjeta de Crédito/Débito'}</p>
      </div>
      <div class="checkout-summary">
        <p class="label">Productos (${cart.length})</p>
        ${cart.map(i => `<p>${i.name} x${i.qty} — ${fmt(i.price*i.qty)}</p>`).join('')}
      </div>
      <div style="margin:12px 0">
        <div class="cart-row"><span>Subtotal</span><span>${fmt(sub)}</span></div>
        <div class="cart-row"><span>Envío</span><span>${ship > 0 ? fmt(ship) : 'Gratis'}</span></div>
        <div class="cart-row cart-total"><span>Total</span><span style="color:var(--orange)">${fmt(total)}</span></div>
      </div>
      <div class="checkout-btns">
        <button class="btn btn-outline" onclick="checkoutStep=2;renderCheckout()">← Volver</button>
        <button class="btn btn-primary btn-lg" onclick="confirmOrder()">🔒 Confirmar Pedido</button>
      </div>
    `;
  }
  document.getElementById('checkoutContent').innerHTML = html;
}

let _payMethod = 'mp';
function selectPayment(method, el) {
  _payMethod = method;
  document.querySelectorAll('.payment-option').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('input').checked = true;
  document.getElementById('ccForm').style.display = method === 'cc' ? 'block' : 'none';
}

function checkoutNext() {
  if (checkoutStep === 1) {
    const name = document.getElementById('ckName')?.value;
    const email = document.getElementById('ckEmail')?.value;
    const phone = document.getElementById('ckPhone')?.value;
    const addr = document.getElementById('ckAddr')?.value;
    const city = document.getElementById('ckCity')?.value;
    const prov = document.getElementById('ckProv')?.value;
    if (!name || !email || !phone || !addr || !city || !prov) { alert('Por favor completá todos los campos obligatorios'); return; }
  }
  if (checkoutStep === 2 && _payMethod === 'cc') {
    const num = document.getElementById('ccNum')?.value;
    const exp = document.getElementById('ccExp')?.value;
    const cvv = document.getElementById('ccCvv')?.value;
    const name = document.getElementById('ccName')?.value;
    if (!num || !exp || !cvv || !name) { alert('Por favor completá los datos de la tarjeta'); return; }
  }
  checkoutStep++;
  renderCheckout();
}

async function confirmOrder() {
  const orderNum = 'LCX-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2,6).toUpperCase();
  const total = getSubtotal() + (selectedShipping?.cost || 0);

  // Build order data for Firestore
  const orderData = {
    orderNumber: orderNum,
    customer: {
      name: document.getElementById('ckName')?.value || '',
      email: document.getElementById('ckEmail')?.value || '',
      phone: document.getElementById('ckPhone')?.value || '',
      address: document.getElementById('ckAddr')?.value || '',
      city: document.getElementById('ckCity')?.value || '',
      province: document.getElementById('ckProv')?.value || '',
      zip: document.getElementById('ckZip')?.value || ''
    },
    items: cart.map(i => ({
      id: i.id,
      name: i.name,
      price: i.price,
      qty: i.qty,
      color: i.color,
      size: i.size,
      unit: i.unit,
      subtotal: i.price * i.qty
    })),
    shipping: {
      method: selectedShipping?.id || 'pickup',
      cost: selectedShipping?.cost || 0
    },
    payment: {
      method: _payMethod
    },
    subtotal: getSubtotal(),
    shippingCost: selectedShipping?.cost || 0,
    total: total
  };

  // Save order to Firebase Firestore
  const firebaseId = await saveOrderToFirestore(orderData);

  // Clear cart
  cart = [];
  saveCart();
  selectedShipping = null;

  // Show confirmation
  document.getElementById('checkoutContent').innerHTML = `
    <div style="text-align:center;padding:24px 0">
      <div class="success-icon">✅</div>
      <h2 style="font-size:24px;font-weight:700;margin-bottom:8px">¡Pedido Confirmado!</h2>
      <p style="color:var(--muted);margin-bottom:24px">Tu pedido ha sido procesado exitosamente. Recibirás un email con los detalles.</p>
      <div class="checkout-summary" style="text-align:left">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="label">Pedido</span><span style="font-family:monospace;background:var(--warm-bg);padding:4px 10px;border-radius:6px;font-size:13px">${orderNum}</span></div>
        ${firebaseId ? `<div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="label">ID Firebase</span><span style="font-family:monospace;background:var(--warm-bg);padding:4px 10px;border-radius:6px;font-size:11px">${firebaseId}</span></div>` : ''}
        <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:700;margin-top:8px"><span>Total</span><span style="color:var(--orange)">${fmt(total)}</span></div>
      </div>
      <button class="btn btn-primary btn-lg" style="margin-top:20px" onclick="closeCheckout();navigate('home')">Volver al inicio</button>
      <p style="font-size:12px;color:var(--muted);margin-top:12px">Podés seguir tu pedido con el número <strong>${orderNum}</strong></p>
    </div>
  `;
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeCheckoutModal(e) {
  if (e.target === document.getElementById('checkoutModal')) closeCheckout();
}

// ===== INIT =====
updateCartCount();
render();
// Load products from Firebase Firestore (async, re-renders when ready)
loadProductsFromFirestore();
