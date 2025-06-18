const productList = document.getElementById("product-list");

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
}

productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const shopItem = event.target.closest(".shop-item");
    const title = shopItem.querySelector(".title").innerText;
    const price = shopItem.querySelector(".price").innerText;
    const img = shopItem.querySelector("img").src;
    addItemToCart(title, price, img);
    showAddToCartMessage(event.target);
  }
});

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

function addItemToCart(title, price, image, qty = 1) {
  const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItemIndex = existingItems.findIndex(
    (item) => item.title === title
  );

  if (existingItemIndex > -1) {
    alert("Item already added to cart!");
    return;
  } else {
    existingItems.push({ title, price, image, quantity: qty });
    localStorage.setItem("cartItems", JSON.stringify(existingItems));
  }
}

function renderPagination() {
  const paginationEl = document.getElementById("pagination");
  paginationEl.innerHTML = "";
  categories.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.className = `px-3 py-1 rounded ${i === currentPage ? "active" : ""}`;
    btn.addEventListener("click", () => renderCategory(i));
    paginationEl.appendChild(btn);
  });
}

renderCategory(0);
renderPagination();
