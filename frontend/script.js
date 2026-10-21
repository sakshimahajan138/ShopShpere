const API_URL = 'http://localhost:5000/api';

let allProducts = [];
let displayedProducts = [];
let cart = JSON.parse(localStorage.getItem('shopsphereCart')) || [];

// 🔥 FALLBACK DATA (Backend band asel tar pn products disel)
const fallbackProducts = [
  { _id: '1', name: 'Wireless Headphones', price: 1999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', category: 'Electronics', rating: 4.5 },
  { _id: '2', name: 'Smart Watch', price: 2499, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', category: 'Electronics', rating: 4.3 },
  { _id: '3', name: 'Gaming Mouse', price: 1299, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', category: 'Electronics', rating: 4.7 },
  { _id: '4', name: 'Running Shoes', price: 1799, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 'Fashion', rating: 4.6 },
  { _id: '5', name: 'Denim Jacket', price: 2999, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400', category: 'Fashion', rating: 4.4 },
  { _id: '6', name: 'Summer Floral Dress', price: 1499, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', category: 'Fashion', rating: 4.8 },
  { _id: '7', name: 'Cotton T-Shirt', price: 599, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', category: 'Fashion', rating: 4.2 },
  { _id: '8', name: 'Luxury Perfume', price: 3499, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', category: 'Beauty', rating: 4.9 },
  { _id: '9', name: 'Matte Lipstick Set', price: 899, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', category: 'Beauty', rating: 4.5 },
  { _id: '10', name: 'Skincare Kit', price: 1299, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400', category: 'Beauty', rating: 4.7 },
  { _id: '11', name: 'Scented Candles', price: 499, image: 'https://images.unsplash.com/photo-1602874801006-e26e46ef3b5e?w=400', category: 'Home Decor', rating: 4.6 },
  { _id: '12', name: 'Modern Table Lamp', price: 1899, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', category: 'Home Decor', rating: 4.4 },
  { _id: '13', name: 'Ceramic Vase', price: 799, image: 'https://images.unsplash.com/photo-1581783342308-f792ca4ac094?w=400', category: 'Home Decor', rating: 4.3 },
  { _id: '14', name: 'Throw Pillow Cover', price: 399, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', category: 'Home Decor', rating: 4.1 },
  { _id: '15', name: 'Backpack', price: 999, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'Accessories', rating: 4.2 },
  { _id: '16', name: 'Sunglasses', price: 799, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400', category: 'Accessories', rating: 4.4 }
];

async function loadProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    allProducts = await res.json();
    if (allProducts.length === 0) allProducts = fallbackProducts;
  } catch (err) {
    console.warn('Backend offline, using fallback data:', err);
    allProducts = fallbackProducts;
  }
  displayedProducts = allProducts;
  renderProducts(displayedProducts);
}

function renderProducts(products) {
  const container = document.getElementById('products');
  if (products.length === 0) {
    container.innerHTML = '<p style="text-align:center;grid-column:1/-1;padding:40px;color:#999;">No products found 🔍</p>';
    return;
  }
  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400x400?text=Product'" />
      <div class="product-info">
        <span class="category-tag">${p.category || 'General'}</span>
        <h3>${p.name}</h3>
        <p class="rating">⭐ ${p.rating || 4.0}</p>
        <p class="price">₹${p.price}</p>
        <button class="add-btn" onclick="addToCart('${p._id}')">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// 🔥 CATEGORY FILTER
function filterCategory(category, btn) {
  // Remove active class from all
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  if (category === 'All') {
    displayedProducts = allProducts;
  } else {
    displayedProducts = allProducts.filter(p => p.category === category);
  }
  renderProducts(displayedProducts);
}

function addToCart(id) {
  const product = allProducts.find(p => p._id === id);
  if (!product) return;
  const existing = cart.find(item => item._id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item._id !== id);
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i._id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id);
    else { saveCart(); updateCartUI(); }
  }
}

function saveCart() {
  localStorage.setItem('shopsphereCart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cartCount').textContent = count;

  const container = document.getElementById('cartItems');
  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#999;margin-top:40px;">Your cart is empty 🛒</p>';
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <div class="qty-controls">
            <button onclick="changeQty('${item._id}', -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty('${item._id}', 1)">+</button>
          </div>
          <span class="remove-btn" onclick="removeFromCart('${item._id}')">Remove</span>
        </div>
      </div>
    `).join('');
  }

  const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  document.getElementById('cartTotal').textContent = total;
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
}

async function placeOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty! Add some products first.');
    return;
  }
  const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  const orderData = {
    customerName: 'Guest Customer',
    items: cart.map(i => ({
      productId: i._id,
      name: i.name,
      price: i.price,
      quantity: i.qty
    })),
    totalAmount: total
  };

  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    const data = await res.json();
    if (data.success) showOrderPopup(data.orderId);
    else showOrderPopup('LOCAL-' + Date.now());
  } catch (err) {
    showOrderPopup('OFFLINE-' + Date.now());
  }
}

function showOrderPopup(orderId) {
  document.getElementById('orderPopup').classList.remove('hidden');
  document.getElementById('orderIdText').textContent = `Order ID: ${orderId}`;
  cart = [];
  saveCart();
  updateCartUI();
  toggleCart();
}

function closePopup() {
  document.getElementById('orderPopup').classList.add('hidden');
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = displayedProducts.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

loadProducts();
updateCartUI();