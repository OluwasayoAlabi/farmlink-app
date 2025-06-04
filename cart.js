

// Elements
const toggleCartBtn = document.getElementById("toggle-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartSection = document.getElementById("cart-section");

// Toggle Cart Section Visibility
toggleCartBtn.addEventListener("click", () => {
  const isHidden = cartSection.classList.contains("hidden");
  if (isHidden) {
    cartSection.classList.remove("hidden");
    toggleCartBtn.classList.add("bg-teal-600", "hover:bg-teal-700");
    toggleCartBtn.classList.remove("bg-green-600", "hover:bg-green-700");
    toggleCartBtn.textContent = "Hide Cart";
  } else {
    cartSection.classList.add("hidden");
    toggleCartBtn.classList.add("bg-green-600", "hover:bg-green-700");
    toggleCartBtn.classList.remove("bg-teal-600", "hover:bg-teal-700");
    toggleCartBtn.textContent = "View Cart";
  }
});

// Close Cart Button
closeCartBtn.addEventListener("click", () => {
  cartSection.classList.add("hidden");
  toggleCartBtn.classList.add("bg-green-600", "hover:bg-green-700");
  toggleCartBtn.classList.remove("bg-teal-600", "hover:bg-teal-700");
  toggleCartBtn.textContent = "View Cart";
});

// Add event listeners for Add to Cart buttons
document.getElementById("product-list").addEventListener("click", function(event) {
  if (event.target.classList.contains("add-to-cart")) {
    addToCartClicked(event);
  }
});


// Purchase Button
document
  .getElementsByClassName("btn-purchase")[0]
  .addEventListener("click", placeOrderClicked);

// Event delegation for dynamically created elements in the cart
const cartItemsContainer = document.getElementsByClassName("cart-items")[0];

cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    removeCartItem(event);
  }
});

cartItemsContainer.addEventListener("change", (event) => {
  if (event.target.classList.contains("cart-gty")) {
    quantityChanged(event);
  }
});

// Functions

function addToCartClicked(event) {
  const button = event.target;
  const shopItem = button.parentElement;
  const title = shopItem.getElementsByClassName("title")[0].innerText;
  const price = shopItem.getElementsByClassName("price")[0].innerText;
  const image = shopItem.getElementsByClassName("image")[0].src;
  addItemToCart(title, price, image);
  updateTotal();
  showAddToCartMessage(button);
}

function addItemToCart(title, price, image) {
  // Check if item already exists in cart
  const cartItemTitles =
    cartItemsContainer.getElementsByClassName("cart-title");
  for (let i = 0; i < cartItemTitles.length; i++) {
    if (cartItemTitles[i].innerText === title) {
      alert("Item already added to cart");
      return;
    }
  }

  // Create cart row
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row", "flex", "items-center", "border-b", "py-4");

  cartRow.innerHTML = `
    <div class="cart-item w-1/2 flex items-center gap-3">
      <img src="${image}" alt="${title}" class="w-16 h-16 object-cover rounded-md" />
      <span class="cart-title font-semibold">${title}</span>
    </div>
    <span class="cart-price w-1/4 text-green-700 font-semibold">${price}</span>
    <div class="cart-quantity w-1/4">
      <input
        class="cart-gty w-16 border border-gray-300 rounded text-center"
        type="number"
        value="1"
        min="1"
      />
      <button
        class="remove-btn ml-3 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-sm"
      >
        Remove
      </button>
    </div>
  `;

  cartItemsContainer.appendChild(cartRow);
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateTotal();
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function updateTotal() {
  let total = 0;
  const cartRows = cartItemsContainer.getElementsByClassName("cart-row");

  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName("cart-price")[0];
    const quantityElement = cartRow.getElementsByClassName("cart-gty")[0];
    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = quantityElement.value;
    total += price * quantity;
  }

  // Round total to 2 decimals
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total")[0].innerText = `$${total.toFixed(
    2
  )}`;
}

function placeOrderClicked() {
  if (cartItemsContainer.children.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you for your order!");
  // Clear cart
  while (cartItemsContainer.firstChild) {
    cartItemsContainer.removeChild(cartItemsContainer.firstChild);
  }
  updateTotal();
  // Hide cart
  cartSection.classList.add("hidden");
  toggleCartBtn.textContent = "View Cart";
  toggleCartBtn.classList.add("bg-green-600", "hover:bg-green-700");
  toggleCartBtn.classList.remove("bg-teal-600", "hover:bg-teal-700");
}

function showAddToCartMessage(button) {
  const originalText = button.innerHTML;
  const originalClasses = button.className;

  // Change text and apply lighter blue-green background
  button.innerHTML = "✓ Item Added";
  button.className =
    "add-to-cart bg-teal-200 text-teal-900 font-semibold px-4 py-2 rounded transition";

  // Revert back after 2 seconds
  setTimeout(() => {
    button.innerHTML = originalText;
    button.className = originalClasses;
  }, 2000);
}
    

const categories = [
  {
    key: "vegetables",
    title: "Vegetables",
    products: [
      {
        id: 1,
        name: "Fresh Tomatoes",
        price: 15,
        unit: "kg",
        image: "img/tomato.jpg",
      },
      {
        id: 2,
        name: "Fresh Vegetables",
        price: 12,
        unit: "bunch",
        image: "img/fresh-vegetables.jpg",
      },
      { id: 3, name: "Onions", price: 8, unit: "kg", image: "img/onions.jpg" },
      { id: 4, name: "Okra", price: 10, unit: "bunch", image: "img/okra.jpg" },
      {
        id: 5,
        name: "Pepper",
        price: 10,
        unit: "bunch",
        image: "img/pepper.jpg",
      },
    ],
  },
  {
    key: "fruits",
    title: "Fruits",
    products: [
      { id: 6, name: "Apples", price: 20, unit: "kg", image: "img/apples.jpg" },
      {
        id: 7,
        name: "Bananas",
        price: 18,
        unit: "bunch",
        image: "img/bananas.jpg",
      },
      {
        id: 8,
        name: "Agbalumo",
        price: 12,
        unit: "kg",
        image: "img/agbalumo.jpg",
      },
      {
        id: 9,
        name: "Oranges",
        price: 15,
        unit: "kg",
        image: "img/oranges.jpg",
      },
      {
        id: 10,
        name: "Watermelons",
        price: 25,
        unit: "piece",
        image: "img/watermelon.jpg",
      },
    ],
  },
  {
    key: "animalProducts",
    title: "Animal Products",
    products: [
      {
        id: 11,
        name: "Fresh Catfish",
        price: 30,
        unit: "kg",
        image: "img/fresh-catfish.jpg",
      },
      {
        id: 12,
        name: "Frozen Fish",
        price: 28,
        unit: "kg",
        image: "img/frozen-fish.jpg",
      },
      {
        id: 13,
        name: "Live Chicken",
        price: 40,
        unit: "piece",
        image: "img/live-chicken.jpg",
      },
      {
        id: 14,
        name: "Frozen Chicken",
        price: 35,
        unit: "piece",
        image: "img/frozen-chicken.jpg",
      },
      {
        id: 15,
        name: "Goat",
        price: 120,
        unit: "piece",
        image: "img/goat.jpg",
      },
    ],
  },
  {
    key: "bags",
    title: "Bags/Bigger Quantities (Staples/Crops)",
    products: [
      { id: 16, name: "Yam", price: 50, unit: "bag", image: "img/yam.jpg" },
      { id: 17, name: "Beans", price: 45, unit: "bag", image: "img/beans.jpg" },
      {
        id: 18,
        name: "Groundnuts",
        price: 40,
        unit: "bag",
        image: "img/groundnuts.jpg",
      },
      { id: 19, name: "Maize", price: 35, unit: "bag", image: "img/maize.jpg" },
      { id: 20, name: "Cocoa", price: 70, unit: "bag", image: "img/cocoa.jpg" },
      {
        id: 21,
        name: "Bag of Rice",
        price: 60,
        unit: "bag",
        image: "img/rice.jpg",
      },
    ],
  },
];

const productListEl = document.getElementById("product-list");
const categoryTitleEl = document.getElementById("category-title");
const paginationEl = document.getElementById("pagination");

let currentPage = 0; // index in categories array

function renderCategory(pageIndex) {
  currentPage = pageIndex;

  const category = categories[pageIndex];
  categoryTitleEl.textContent = category.title;

  // Clear current products
  productListEl.innerHTML = "";

  // Render all products in that category
  category.products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "shop-item bg-white rounded-lg shadow-md p-4 flex flex-col";

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="image h-40 object-cover rounded-md mb-4" />
        <h3 class="title font-semibold text-lg mb-1">${product.name}</h3>
        <p class="price text-green-700 font-bold mb-4">$${product.price} / ${product.unit}</p>
        <button class="add-to-cart mt-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded shadow transition">
          Add to Cart
        </button>
      `;

    productListEl.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  paginationEl.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    const btn = document.createElement("button");
    btn.className = "pagination-btn";
    if (i === currentPage) btn.classList.add("active");
    btn.textContent = i + 1;
    btn.addEventListener("click", () => {
      renderCategory(i);
      // Scroll to top of products on page switch
      window.scrollTo({
        top: categoryTitleEl.offsetTop - 20,
        behavior: "smooth",
      });
    });
    paginationEl.appendChild(btn);
  }
}

// Initial render
renderCategory(0);

function setupPaginationControls() {
  const container = document.getElementById('pagination');
  if (!container) return;

  // Add pagination class to container
  container.classList.add('pagination');

  // Create Previous button if not exist
  if (!container.querySelector('button.prev')) {
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.classList.add('prev');
    container.prepend(prevBtn);
  }

  // Create Next button if not exist
  if (!container.querySelector('button.next')) {
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.classList.add('next');
    container.appendChild(nextBtn);
  }

  // Add event listeners for prev and next buttons (optional, depending on your existing JS)
  // Example:
  container.querySelector('.prev').onclick = () => {
    const activeBtn = container.querySelector('button.active');
    if (!activeBtn) return;

    const prevPageBtn = activeBtn.previousElementSibling;
    if (prevPageBtn && !prevPageBtn.classList.contains('prev')) {
      activeBtn.classList.remove('active');
      prevPageBtn.classList.add('active');
      // You should also trigger page change here if your pagination is functional
    }
  };

  container.querySelector('.next').onclick = () => {
    const activeBtn = container.querySelector('button.active');
    if (!activeBtn) return;

    const nextPageBtn = activeBtn.nextElementSibling;
    if (nextPageBtn && !nextPageBtn.classList.contains('next')) {
      activeBtn.classList.remove('active');
      nextPageBtn.classList.add('active');
      // You should also trigger page change here if your pagination is functional
    }
  };
}

// Run after pagination buttons rendered, call again if pagination changes dynamically
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(setupPaginationControls, 100);
});


  