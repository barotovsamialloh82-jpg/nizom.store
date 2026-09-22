// ===== Product Data =====
const products = [
    {
        id: 1,
        name: "Смартфон Galaxy Pro X",
        price: 4590,
        oldPrice: 5290,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
        badge: "Тахфиф"
    },
    {
        id: 2,
        name: "Гӯшмонакҳои бесим AirSound",
        price: 890,
        oldPrice: 1190,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        badge: "Популяр"
    },
    {
        id: 3,
        name: "Соати ҳушманд FitLife 5",
        price: 1290,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        badge: null
    },
    {
        id: 4,
        name: "Куртаи классикии мардона",
        price: 450,
        oldPrice: 590,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
        badge: "Тахфиф"
    },
    {
        id: 5,
        name: "Китоби «Роҳи муваффақият»",
        price: 120,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
        badge: null
    },
    {
        id: 6,
        name: "Лампаи LED муосир",
        price: 340,
        oldPrice: 420,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
        badge: "Нав"
    },
    {
        id: 7,
        name: "Кроссовкаҳои SportMax",
        price: 780,
        oldPrice: 950,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        badge: "Тахфиф"
    },
    {
        id: 8,
        name: "Кӯрпаи пахтагии премиум",
        price: 560,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500&q=80",
        badge: null
    }
];

// ===== Cart State =====
let cart = JSON.parse(localStorage.getItem('nizomCart')) || [];

// ===== Render Products =====
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">
                    <span class="price-current">${product.price.toLocaleString()} TJS</span>
                    ${product.oldPrice ? `<span class="price-old">${product.oldPrice.toLocaleString()} TJS</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Ба сабад илова кунед
                </button>
            </div>
        </div>
    `).join('');
}

// ===== Cart Functions =====
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    openCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('nizomCart', JSON.stringify(cart));
}

function updateCartUI() {
    const countEl = document.getElementById('cartCount');
    const itemsEl = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');

    if (!countEl) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = totalItems;

    if (cart.length === 0) {
        itemsEl.innerHTML = '<p class="empty-cart">Сабад холӣ аст</p>';
        totalEl.textContent = '0 TJS';
        return;
    }

    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toLocaleString()} TJS × ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalEl.textContent = total.toLocaleString() + ' TJS';
}

function openCart() {
    document.getElementById('cartSidebar')?.classList.add('open');
    document.getElementById('overlay')?.classList.add('show');
}

function closeCart() {
    document.getElementById('cartSidebar')?.classList.remove('open');
    document.getElementById('overlay')?.classList.remove('show');
}

// ===== Auth Form =====
function initAuthForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirmPassword').value;

        if (password !== confirm) {
            alert('Рамзҳо мувофиқат намекунанд!');
            return;
        }

        // Simulate success
        form.style.display = 'none';
        document.querySelector('.auth-footer').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
    });
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    initAuthForm();

    // Cart open/close
    document.getElementById('cartBtn')?.addEventListener('click', openCart);
    document.getElementById('closeCart')?.addEventListener('click', closeCart);
    document.getElementById('overlay')?.addEventListener('click', closeCart);
});
