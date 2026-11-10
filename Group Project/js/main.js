
const products = [
  {
    id: 1,
    name: "Atlete sportive Running Pro",
    brand: "SPORTIVA",
    category: "Running",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
  },
  {
    id: 2,
    name: "Doreza për Fitness",
    brand: "FITZONE",
    category: "Fitness",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=600"
  },
  {
    id: 3,
    name: "Çantë për Hiking",
    brand: "OUTDOOR",
    category: "Hiking",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
  },
  {
    id: 4,
    name: "Top futbolli Pro",
    brand: "SPORTIVA",
    category: "Football",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0cfd?w=600"
  },
  {
    id: 5,
    name: "Pesha për Fitness 5kg",
    brand: "FITZONE",
    category: "Fitness",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600"
  },
  {
    id: 6,
    name: "Këpucë për Hiking",
    brand: "OUTDOOR",
    category: "Hiking",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
  },
  {
    id: 7,
    name: "Bluze sportive",
    brand: "SPORTIVA",
    category: "Running",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
  },
  {
    id: 8,
    name: "Pajisje sportive",
    brand: "FITZONE",
    category: "Fitness",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600"
  }
];

// CART
let cart = JSON.parse(localStorage.getItem("sportivaCart")) || [];

function saveCart() {
  localStorage.setItem("sportivaCart", JSON.stringify(cart));
  updateCart();
}

function renderProducts(list, containerId) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>Nuk u gjet asnjë produkt.</p>";
    return;
  }

  list.forEach(product => {
    container.innerHTML += `
      <article class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <p class="product-brand">${product.brand}</p>
          <h3>${product.name}</h3>
          <p class="product-price">${product.price.toFixed(2)}€</p>
          <button class="add-cart" onclick="addToCart(${product.id})">
            + Shto në shportë
          </button>
        </div>
      </article>
    `;
  });
}

// HOMEPAGE
renderProducts(products.slice(0, 4), "featuredProducts");

// FILTERS
function filterProducts() {
  const category = document.getElementById("categoryFilter");
  const sort = document.getElementById("sortFilter");
  const price = document.getElementById("priceFilter");

  if (!category || !sort || !price) return;

  let filtered = [...products];

  const selectedCategory = category.value;
  const maxPrice = Number(price.value);

  if (selectedCategory !== "All") {
    filtered = filtered.filter(
      p => p.category === selectedCategory
    );
  }

  filtered = filtered.filter(p => p.price <= maxPrice);

  if (sort.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  document.getElementById("priceValue").textContent = maxPrice;
  document.getElementById("resultCount").textContent =
    filtered.length + " produkte";

  renderProducts(filtered, "allProducts");
}

const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const priceFilter = document.getElementById("priceFilter");

if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);
if (sortFilter) sortFilter.addEventListener("change", filterProducts);
if (priceFilter) priceFilter.addEventListener("input", filterProducts);

// URL FILTERS
if (document.getElementById("allProducts")) {
  const params = new URLSearchParams(window.location.search);

  const category = params.get("category");
  const max = params.get("max");

  if (category && categoryFilter) {
    categoryFilter.value = category;
  }

  if (max && priceFilter) {
    priceFilter.value = Math.min(Number(max), 150);
  }

  filterProducts();
}

function resetFilters() {
  categoryFilter.value = "All";
  sortFilter.value = "default";
  priceFilter.value = 150;
  filterProducts();
}

// SEARCH
const globalSearch = document.getElementById("globalSearch");

if (globalSearch) {
  globalSearch.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      const query = this.value.trim();
      window.location.href =
        "products.html?search=" + encodeURIComponent(query);
    }
  });
}

// SEARCH RESULTS
if (document.getElementById("allProducts")) {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");

  if (search) {
    const matching = products.filter(p =>
      (p.name + " " + p.category + " " + p.brand)
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    renderProducts(matching, "allProducts");

    document.getElementById("resultCount").textContent =
      matching.length + " rezultate";
  }
}

// ADD TO CART
function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }

  saveCart();
  alert("Produkti u shtua në shportë!");
}

// REMOVE FROM CART
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

// UPDATE CART
function updateCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const countElement = document.getElementById("cartCount");
  const totalElement = document.getElementById("cartTotal");
  const itemsElement = document.getElementById("cartItems");

  if (countElement) countElement.textContent = count;

  if (totalElement) {
    totalElement.textContent = total.toFixed(2) + "€";
  }

  if (itemsElement) {
    itemsElement.innerHTML = cart.length
      ? cart.map(item => `
          <div class="cart-item">
            <div>
              <strong>${item.name}</strong>
              <p>${item.quantity} x ${item.price.toFixed(2)}€</p>
            </div>
            <button onclick="removeFromCart(${item.id})">
              ✕
            </button>
          </div>
        `).join("")
      : "<p>Shporta është e zbrazët.</p>";
  }
}

// OPEN / CLOSE CART
function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("active");
  document.getElementById("cartOverlay").classList.toggle("active");
}

function checkout() {
  if (cart.length === 0) {
    alert("Shporta është e zbrazët!");
    return;
  }

  alert("Faleminderit! Ky është demonstrim i porosisë.");
}

// CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Ju lutem plotësoni të gjitha fushat!");
      return;
    }

    document.getElementById("formMessage").textContent =
      "Mesazhi u pranua me sukses! Faleminderit " + name + ".";

    document.getElementById("formMessage").style.color = "green";

    contactForm.reset();
  });
}

// INITIALIZE
updateCart();
