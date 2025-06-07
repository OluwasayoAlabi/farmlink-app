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
    name: "Onions",
    price: 5000,
    quantity: "50 pcs",
    image: "images/Onions 2.webp"
  },
  {
    name: "Okra",
    price: 2000,
    quantity: "20 pcs",
    image: "images/okra 2.jpg"
  },
  {
    name: "Garden Eggs",
    price: 3000,
    quantity: "1 dozen",
    image: "images/garden eggs.jpg"
  },
  {
    name: "Peppers",
    price: 2000,
    quantity: "30 pcs",
    image: "images/pepper.jpg"
  },
  {
    name: "Plaintains",
    price: 2000,
    quantity: "1 bunch",
    image: "images/plaintains.webp"
  },
  {
    name: "Cucumbers",
    price: 1500,
    quantity: "1pc",
    image: "images/cucumber 2.webp"
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
    name: "Cherry/Agbalumo",
    price: 100,
    quantity: "1pc",
    image: "images/Agbalumo.webp"
  },
  {
    name: "Oranges",
    price: 500,
    quantity: "2pcs",
    image: "images/oranges.jpg"
  },
  {
    name: "Watermelons",
    price: 2000,
    quantity: "1pc",
    image: "images/watermelons.jpg"
  },
  {
    name: "Mangoes",
    price: 800,
    quantity: "1pc",
    image: "images/mangoes.webp"
  },
  {
    name: "Pineapples",
    price: 1500,
    quantity: "1pc",
    image: "images/pineapple.webp"
  },
  {
    name: "Avocados",
    price: 2000,
    quantity: "1pc",
    image: "images/avocado 2.jpg"
  },
  {
    name: "Pawpaw",
    price: 2550,
    quantity: "1pc",
    image: "images/pawpaw 2.jpg"
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
    name: "Eggs",
    price: 5500,
    quantity: "1 crate",
    image: "images/eggs.jpg"
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
    quantity: "1kg",
    image: "images/Frozen Chicken.webp"
  },
  {
    name: "Goat",
    price: 50000,
    quantity: "20kg",
    image: "images/goat.jpg"
  },
  {
    name: "Sheep",
    price: 300000,
    quantity: "50kg",
    image: "images/sheep.jpg"
  },
  {
    name: "Ram",
    price: 420000,
    quantity: "100kg",
    image: "images/ram.jpg"
  },
  {
    name: "Cattle",
    price: 600000,
    quantity: "400kg",
    image: "images/cows.jpg"
  },
  {
    name: "Yam",
    price: 1500,
    quantity: "1 tuber",
    image: "images/Yam tuber.webp"
  },
  {
    name: "Beans",
    price: 150000,
    quantity: "100kg",
    image: "images/bag of beans.jpeg"
  },
  {
    name: "Groundnuts",
    price: 90000,
    quantity: "80kg",
    image: "images/groundnut.jpg"
  },
  {
    name: "Maize",
    price: 13000,
    quantity: "50kg",
    image: "images/maize.jpg"
  },
  {
    name: "Cocoa",
    price: 17500,
    quantity: "1kg",
    image: "images/cocoa.jpg"
  },
  {
    name: "Rice",
    price: 84000,
    quantity: "50kg",
    image: "images/bag of rice.jpg"
  }
];


const productGrid = document.getElementById("productGrid");
const loader = document.getElementById("loader");
const noProducts = document.getElementById("noProducts");
const searchInput = document.getElementById("searchInput");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

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

      const productSlug = encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, "-"));

      card.innerHTML = `
        <div class="relative">
          
          <button class="fav-btn absolute top-2 right-2 p-1 rounded-full text-white hover:text-yellow-400 transition-colors duration-300">
            <i class="fi fi-rr-heart text-lg"></i>
          </button>

          <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-md">
        </div>

        <div class="p-4">
          <h2 class="text-lg font-semibold mb-1">${product.name}</h2>
          <p class="text-green-700 font-bold mb-1">₦${product.price.toLocaleString()}</p>
          <p class="text-gray-600 text-sm mb-2">Quantity: ${product.quantity}</p>
          <div class="flex items-center justify-between mt-2">
          <a href="product details.html?product=${productSlug}" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex-1 text-center transition">
          View Details
        </a>
            <button class="add-to-cart-btn ml-3 w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300">
              <i class="fi fi-rr-shopping-cart text-xl"></i>
            </button>
          </div>
        </div>
      `;

      const addToCartBtn = card.querySelector('.add-to-cart-btn');
      addToCartBtn.addEventListener('click', () => addToCart(product));

      const favBtn = card.querySelector('.fav-btn');
      favBtn.addEventListener('click', () => {
        const icon = favBtn.querySelector('i');
        const isFavorited = icon.classList.contains('fi-sr-heart');
        if (isFavorited) {
          icon.classList.remove('fi-sr-heart');
          icon.classList.add('fi-rr-heart');
        } else {
          icon.classList.remove('fi-rr-heart');
          icon.classList.add('fi-sr-heart');
        }
      });

      productGrid.appendChild(card);
    });
  }, 500);
}


function addToCart(product) {
  alert(`Added ${product.name} to cart!`);
}

renderProducts(products);
