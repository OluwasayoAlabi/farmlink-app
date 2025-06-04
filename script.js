const products = [
  {
    name: "Fresh Tomatoes",
    price: 2000,
    quantity: "20pcs",
    image: "images/Tomatoes 1.webp"
  },
  {
    name: "Fresh Vegetables",
    price: 2500,
    quantity: "5kg",
    image: "images/leafy-vegetables.webp"
  },
  {
    name: "Apples",
    price: 200,
    quantity: "1pc",
    image: "images/Apples.webp"
  },
  {
    name: "Bananas",
    price: 600,
    quantity: "1 bunch",
    image: "images/Bananas 3.webp"
  },
  {
    name: "Agbalumo",
    price: 100,
    quantity: "1pc",
    image: "images/Agbalumo.webp"
  },
  {
    name: "Fresh Catfish",
    price: 3000,
    quantity: "3kg",
    image: "images/Catfish.jpg"
  },
  {
    name: "Frozen Fish",
    price: 2000,
    quantity: "1kg",
    image: "images/Frozen fish.jpg"
  },
  {
    name: "Live Chicken",
    price: 10000,
    quantity: "8kg",
    image: "images/Live Chicken.webp"
  },
  {
    name: "Frozen Chicken",
    price: 6500,
    quantity: "1 kilo",
    image: "images/Frozen Chicken.webp"
  }
];

const productGrid = document.getElementById("productGrid");
const loader = document.getElementById("loader");
const noProducts = document.getElementById("noProducts");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
});

function renderProducts(productsList) {
  productGrid.innerHTML = "";
  loader.classList.remove("hidden");
  noProducts.classList.add("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
    if (productsList.length === 0) {
      noProducts.classList.remove("hidden");
      return;
    }

    productsList.forEach(product => {
      const card = document.createElement("div");
      card.className = "bg-white rounded shadow overflow-hidden hover:shadow-lg transition";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-1">${product.name}</h2>
          <p class="text-green-700 font-bold mb-1">₦${product.price.toLocaleString()}</p>
          <p class="text-gray-600 text-sm mb-2">Quantity: ${product.quantity}</p>
          <button class="bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700">View Details</button>
        </div>
      `;

      productGrid.appendChild(card);
    });
  }, 500);
}

renderProducts(products);
