const toggleCartBtn = document.getElementById("toggle-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartSection = document.getElementById("cart-section");
const placeOrderBtn = document.getElementById("btn-purchase"); 

toggleCartBtn.addEventListener("click", () => {
  cartSection.classList.remove("hidden");

});

closeCartBtn.addEventListener("click", () => {
  cartSection.classList.add("hidden");

 

  toggleCartBtn.textContent = "View Cart";
});

document
  .getElementById("product-list")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
      addToCartClicked(event);
    }
  });

document
  .getElementsByClassName("btn-purchase")[0]
  .addEventListener("click", placeOrderClicked);

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
  const cartItemTitles =
    cartItemsContainer.getElementsByClassName("cart-title");
  for (let i = 0; i < cartItemTitles.length; i++) {
    if (cartItemTitles[i].innerText === title) {
      alert("Item already added to cart");
      return;
    }
  }

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
    const price = parseFloat(priceElement.innerText.replace("₦", ""));
    const quantity = quantityElement.value;
    total += price * quantity;
  }

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
  

  while (cartItemsContainer.firstChild) {
    cartItemsContainer.removeChild(cartItemsContainer.firstChild);
  }
  updateTotal();

  cartSection.classList.add("hidden");
  toggleCartBtn.textContent = "View Cart";

 

  toggleCartBtn.classList.add("bg-green-600", "hover:bg-green-700");
  toggleCartBtn.classList.remove("bg-teal-600", "hover:bg-teal-700");

 
}




function showAddToCartMessage(button) {
  const originalText = button.innerHTML;
  const originalClasses = button.className;

  button.innerHTML = "✓ Item Added";
  button.className =
    "add-to-cart bg-[#FF6600] text-white font-semibold px-4 py-2 rounded transition";

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
        name: "Peppers",
        price: 2000,
        unit: " pc",
        image: "images/pepper.jpg",
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
        unit: "kg",
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
        image: "images/bag of beans.jpg",
      },
      {
        id: 19,
        name: "Groundnuts",
        price: 4500,
        unit: "bottle",
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
];

const productListEl = document.getElementById("product-list");
const categoryTitleEl = document.getElementById("category-title");
const paginationEl = document.getElementById("pagination");

let currentPage = 0;

function renderCategory(pageIndex) {
  currentPage = pageIndex;

  const category = categories[pageIndex];
  categoryTitleEl.textContent = category.title;

  productListEl.innerHTML = "";

  category.products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "shop-item bg-white rounded-lg shadow-md p-4 flex flex-col";

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="image h-40 object-cover rounded-md mb-4" />
        <h3 class="title font-semibold text-lg mb-1">${product.name}</h3>
        <p class="price text-green-700 font-bold mb-4">₦${product.price} / ${product.unit}</p>
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

      window.scrollTo({
        top: categoryTitleEl.offsetTop - 20,
        behavior: "smooth",
      });
    });
    paginationEl.appendChild(btn);
  }
}

renderCategory(0);

function setupPaginationControls() {
  const container = document.getElementById("pagination");
  if (!container) return;

  container.classList.add("pagination");

  if (!container.querySelector("button.prev")) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.classList.add("prev");
    container.prepend(prevBtn);
  }

  if (!container.querySelector("button.next")) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.classList.add("next");
    container.appendChild(nextBtn);
  }

  container.querySelector(".prev").onclick = () => {
    const activeBtn = container.querySelector("button.active");
    if (!activeBtn) return;

    const prevPageBtn = activeBtn.previousElementSibling;
    if (prevPageBtn && !prevPageBtn.classList.contains("prev")) {
      activeBtn.classList.remove("active");
      prevPageBtn.classList.add("active");
    }
  };

  container.querySelector(".next").onclick = () => {
    const activeBtn = container.querySelector("button.active");
    if (!activeBtn) return;

    const nextPageBtn = activeBtn.nextElementSibling;
    if (nextPageBtn && !nextPageBtn.classList.contains("next")) {
      activeBtn.classList.remove("active");
      nextPageBtn.classList.add("active");
    }
  };
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(setupPaginationControls, 100);
});
