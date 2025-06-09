// Cart toggle/display actions
const toggleCartBtn = document.getElementById("toggle-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartSection = document.getElementById("cart-section");
const placeOrderBtn = document.getElementsByClassName("btn-purchase")[0];

toggleCartBtn.addEventListener("click", () => {
  cartSection.classList.remove("hidden");
});
closeCartBtn.addEventListener("click", () => {
  cartSection.classList.add("hidden");
  toggleCartBtn.textContent = "View Cart";
});

// Cart event delegation: add & remove
const productList = document.getElementById("product-list");
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    addToCartClicked(event);
  }
});
const cartItemsContainer = document.querySelector(".cart-items");
cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) removeCartItem(event);
});
cartItemsContainer.addEventListener("change", (event) => {
  if (event.target.classList.contains("cart-gty")) quantityChanged(event);
});
placeOrderBtn.addEventListener("click", placeOrderClicked);

// Save / load cart
function saveCart() {
  const items = [];
  document.querySelectorAll(".cart-row").forEach((row) => {
    items.push({
      title: row.querySelector(".cart-title").innerText,
      price: row.querySelector(".cart-price").innerText,
      image: row.querySelector("img").src,
      quantity: row.querySelector(".cart-gty").value,
    });
  });
  localStorage.setItem("cartItems", JSON.stringify(items));
}
function loadCart() {
  JSON.parse(localStorage.getItem("cartItems") || "[]").forEach((item) =>
    addItemToCart(item.title, item.price, item.image, item.quantity)
  );
  updateTotal();
}
window.addEventListener("DOMContentLoaded", loadCart);

// Cart operations
function addToCartClicked(e) {
  const shopItem = e.target.closest(".shop-item");
  const title = shopItem.querySelector(".title").innerText;
  const price = shopItem.querySelector(".price").innerText;
  const img = shopItem.querySelector("img").src;
  addItemToCart(title, price, img);
  updateTotal();
  showAddToCartMessage(e.target);
}
function addItemToCart(title, price, image, qty = 1) {
  if (
    [...cartItemsContainer.querySelectorAll(".cart-title")].some(
      (el) => el.innerText === title
    )
  ) {
    alert("Item already added to cart");
    return;
  }
  const row = document.createElement("div");
  row.className = "cart-row flex items-center border-b py-4";

  row.innerHTML = `
    <div class="cart-item w-1/2 flex items-center gap-3">
      <img src="${image}" alt="${title}" class="w-16 h-16 object-cover rounded-md" />
      <span class="cart-title font-semibold">${title}</span>
    </div>
    <span class="cart-price w-1/4 text-green-700 font-semibold">${price}</span>
    <div class="cart-quantity w-1/4">
      <input class="cart-gty w-16 border border-gray-300 rounded text-center" type="number" value="${qty}" min="1" />
      <button class="remove-btn ml-3 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-sm">Remove</button>
    </div>
  `;
  cartItemsContainer.appendChild(row);
  saveCart();
}

function removeCartItem(e) {
  e.target.closest(".cart-row").remove();
  updateTotal();
  saveCart();
}
function quantityChanged(e) {
  if (isNaN(e.target.value) || e.target.value <= 0) e.target.value = 1;
  updateTotal();
  saveCart();
}
function updateTotal() {
  let total = 0;
  document.querySelectorAll(".cart-row").forEach((row) => {
    const price = parseFloat(
      row.querySelector(".cart-price").innerText.replace("₦", "")
    );
    const qty = parseInt(row.querySelector(".cart-gty").value);
    total += price * qty;
  });
  document.querySelector(".total").innerText = `₦${total.toFixed(2)}`;
}
function placeOrderClicked() {
  if (!cartItemsContainer.children.length) return alert("Your cart is empty!");
  alert("Thank you for your order!");
  cartItemsContainer.innerHTML = "";
  updateTotal();
  saveCart();
  cartSection.classList.add("hidden");
  toggleCartBtn.textContent = "View Cart";
}
function showAddToCartMessage(btn) {
  const origText = btn.innerHTML;
  const origClass = btn.className;

  btn.innerHTML = "✓ Added to cart";
  btn.className =
    "add-to-cart bg-green-400 text-white font-semibold px-4 py-2 rounded";

  setTimeout(() => {
    btn.innerHTML = origText;
    btn.className = origClass;
  }, 2000);
}


// Pagination logic
const paginationEl = document.getElementById("pagination");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageIndicator = document.getElementById("page-indicator");

const categories = [
  {
    key: "vegetables",
    title: "Vegetables",
    products: [
      {
        id: 1,
        name: "Fresh Tomatoes",
        price: 2000,
        unit: "pc",
        image: "images/Tomatoes 1.webp",
      },
      {
        id: 2,
        name: "Fresh Vegetables",
        price: 2500,
        unit: "kg",
        image: "images/leafy-vegetables.webp",
      },
      {
        id: 3,
        name: "Onions",
        price: 5000,
        unit: " pc",
        image: "images/Onions 2.webp",
      },
      {
        id: 4,
        name: "Okra",
        price: 2000,
        unit: "pc",
        image: "images/okra 2.jpg",
      },

      {
        id: 5,
        name: "Garden Eggs",
        price: 3000,
        unit: "1 dozen",
        image: "images/garden eggs.jpg",
      },
      {
        id: 5,
        name: "Peppers",
        price: 2000,
        unit: " pc",
        image: "images/pepper.jpg",
      },

      {
        id: 5,
        name: "Plaintains",
        price: 2000,
        unit: "1 bunch",
        image: "images/plaintains.webp",
      },
      {
        id: 5,
        name: "Cucumbers",
        price: 1500,
        unit: "1pc",
        image: "images/cucumber 2.webp",
      },
    ],
  },
  {
    key: "fruits",
    title: "Fruits",
    products: [
      {
        id: 6,
        name: "Apples",
        price: 200,
        unit: "pc",
        image: "images/Apples.webp",
      },
      {
        id: 7,
        name: "Bananas",
        price: 600,
        unit: "bunch",
        image: "images/Bananas 3.webp",
      },
      {
        id: 8,
        name: "Cherry/Agbalumo",
        price: 100,
        unit: "pc",
        image: "images/Agbalumo.webp",
      },
      {
        id: 9,
        name: "Oranges",
        price: 500,
        unit: "pc",
        image: "images/oranges.jpg",
      },

      {
        id: 10,
        name: "Watermelons",
        price: 2000,
        unit: "pc",
        image: "images/watermelons.jpg",
      },

      {
        id: 6,
        name: "Mangoes",
        price: 800,
        unit: "pc",
        image: "images/mangoes.webp",
      },
      {
        id: 7,
        name: "Pineapples",
        price: 1500,
        unit: "pc",
        image: "images/pineapple.webp",
      },
      {
        name: "Avocados",
        price: 2000,
        unit: "pc",
        image: "images/avocado 2.jpg",
      },
      {
        name: "Pawpaw",
        price: 2550,
        unit: "pc",
        image: "images/pawpaw 2.jpg",
      },
    ],
  },
  {
    key: "livestock",
    title: "Livestock",
    products: [
      {
        id: 11,
        name: "Fresh Catfish",
        price: 3000,
        unit: "kg",
        image: "images/Catfish.jpg",
      },

      {
        id: 12,
        name: "Live Chicken",
        price: 10000,
        unit: "kg",
        image: "images/Live Chicken.webp",
      },

      {
        id: 13,
        name: "Goat",
        price: 50000,
        unit: "kg",
        image: "images/goat.jpg",
      },
      {
        id: 13,
        name: "Sheep",
        price: 300000,
        unit: "50kg",
        image: "images/sheep.jpg",
      },
      {
        id: 13,
        name: "Ram",
        price: 420000,
        unit: "100kg",
        image: "images/ram.jpg",
      },
      {
        id: 13,
        name: "Cattle",
        price: 600000,
        unit: "400kg",
        image: "images/cows.jpg",
      },
    ],
  },

  {
    key: "animalproducts",
    title: "Animal Products",
    products: [
      {
        id: 14,
        name: "Frozen Fish",
        price: 2000,
        unit: "kg",
        image: "images/Frozen fish.jpg",
      },

      {
        id: 15,
        name: "Frozen Chicken",
        price: 6500,
        unit: "kg",
        image: "images/Frozen Chicken.webp",
      },
      {
        id: 16,
        name: "Eggs",
        price: 6500,
        unit: "crate",
        image: "images/eggs.jpg",
      },
    ],
  },

  {
    key: "crops",
    title: " Staples/Crops",
    products: [
      {
        id: 17,
        name: "Yam",
        price: 1500,
        unit: "tuber",
        image: "images/Yam tuber.webp",
      },
      {
        id: 18,
        name: "Beans",
        price: 60000,
        unit: " bag",
        image: "images/bag of beans.jpeg",
      },
      {
        id: 19,
        name: "Groundnuts",
        price: 4500,
        unit: "kg",
        image: "images/groundnut.jpg",
      },
      {
        id: 20,
        name: "Maize",
        price: 13000,
        unit: "kg",
        image: "images/maize.jpg",
      },
      {
        id: 21,
        name: "Cocoa",
        price: 17500,
        unit: "kg",
        image: "images/cocoa.jpg",
      },
      {
        id: 22,
        name: "Rice",
        price: 84000,
        unit: "kg",
        image: "images/bag of rice.jpg",
      },
    ],
  },

  {
    key: "Bags",
    title: " Bags/Bigger Quantities",
    products: [
      {
        id: 22,
        name: "Rice",
        price: 84000,
        unit: "kg",
        image: "images/bag of rice.jpg",
      },

      {
        id: 21,
        name: "Cocoa",
        price: 17500,
        unit: "kg",
        image: "images/cocoa.jpg",
      },
      {
        id: 20,
        name: "Maize",
        price: 13000,
        unit: "kg",
        image: "images/maize.jpg",
      },
      {
        id: 18,
        name: "Beans",
        price: 60000,
        unit: " bag",
        image: "images/bag of beans.jpeg",
      },
      {
        id: 19,
        name: "Groundnuts",
        price: 4500,
        unit: "bottle",
        image: "images/groundnut.jpg",
      },
    ],
  },
];

let currentPage = 0;

// Renders products for current category
function renderCategory(page) {
  currentPage = page;
  const cat = categories[page];
  document.getElementById("category-title").innerText = cat.title;

  productList.innerHTML = "";
  cat.products.forEach((prod) => {
    const card = document.createElement("div");
    card.className =
      "shop-item bg-white rounded-lg shadow-md p-4 flex flex-col";
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" class="image h-40 object-cover rounded-md mb-4" />
      <h3 class="title font-semibold text-lg mb-1">${prod.name}</h3>
      <p class="price text-green-700 font-bold mb-4">₦${prod.price} / ${prod.unit}</p>
      <button class="add-to-cart mt-auto bg-green-700 hover:bg-green-600 text-white font-semibold py-2 rounded shadow transition">
        Add to Cart
      </button>`;
    productList.appendChild(card);
  });

  renderPagination();
  updatePagerControls();
  scrollToCategory();
}

function renderPagination() {
  paginationEl.innerHTML = "";
  categories.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.className = `px-3 py-1 rounded ${i === currentPage ? "active" : ""}`;
    btn.addEventListener("click", () => renderCategory(i));
    paginationEl.appendChild(btn);
  });
}


function updatePagerControls() {
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === categories.length - 1;
  pageIndicator.innerText = `Page ${currentPage + 1} of ${categories.length}`;
}
prevBtn.addEventListener(
  "click",
  () => currentPage > 0 && renderCategory(currentPage - 1)
);
nextBtn.addEventListener(
  "click",
  () => currentPage < categories.length - 1 && renderCategory(currentPage + 1)
);

function scrollToCategory() {
  window.scrollTo({
    top: document.getElementById("category-title").offsetTop - 20,
    behavior: "smooth",
  });
}

// Initial load
renderCategory(0);
