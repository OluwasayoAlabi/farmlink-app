document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.querySelector(".cart-items");

  function addItemToCart(title, price, image, quantity = 1) {
    const cartRow = document.createElement("div");
    cartRow.classList.add(
      "cart-row",
      "flex",
      "items-center",
      "border-b",
      "py-4"
    );

    cartRow.innerHTML = `
<div class="cart-item w-1/2 flex items-center gap-3">
  <img src="${image}" alt="${title}" class="w-16 h-16 object-cover rounded-md" />
  <span class="cart-title font-semibold">${title}</span>
</div>
<span class="cart-price w-1/4 text-green-700 font-semibold">${price}</span>
<div class="cart-quantity w-1/4 flex items-center">
  <input class="cart-gty w-16 border border-gray-300 rounded text-center" type="number" value="${quantity}" min="1" />
  <button class="remove-btn ml-3 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-sm">Remove</button>
</div>
<span class="cart-subtotal w-1/4 text-gray-800 font-semibold">₦${(
      price * quantity
    ).toFixed(2)}</span>
`;

    cartItemsContainer.appendChild(cartRow);
    updateTotal();

    // Update quantity change event
    const quantityInput = cartRow.querySelector(".cart-gty");
    quantityInput.addEventListener("change", () => {
      if (quantityInput.value < 1) quantityInput.value = 1;
      saveCartToLocalStorage();
      updateTotal();
    });

    // Remove button event
    const removeBtn = cartRow.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      cartRow.remove();
      saveCartToLocalStorage();
      updateTotal();
    });
  }

  function updateSubtotals() {
    const cartRows = cartItemsContainer.getElementsByClassName("cart-row");

    for (let i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i];
      const priceElement = cartRow.querySelector(".cart-price");
      const quantityElement = cartRow.querySelector(".cart-gty");
      const subtotalElement = cartRow.querySelector(".cart-subtotal");

      const price = parseFloat(priceElement.innerText.replace("₦", ""));
      const quantity = parseInt(quantityElement.value);

      const subtotal = price * quantity;
      subtotalElement.innerText = `₦${subtotal.toFixed(2)}`;
    }
  }

  function updateTotal() {
    updateSubtotals();
    let total = 0;
    document.querySelectorAll(".cart-row").forEach((row) => {
      const price = parseFloat(
        row.querySelector(".cart-price").innerText.replace("₦", "")
      );
      const qty = parseInt(row.querySelector(".cart-gty").value);
      total += price * qty;
    });
    document.querySelector(".total").innerText = `₦${total.toFixed(2)}`;
    localStorage.setItem("cartTotal", total.toFixed(2));
  }

  function saveCartToLocalStorage() {
    const cartRows = cartItemsContainer.getElementsByClassName("cart-row");
    let cart = [];

    for (let i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i];
      const title = cartRow.querySelector(".cart-title").innerText;
      const price = parseFloat(
        cartRow.querySelector(".cart-price").innerText.replace("₦", "")
      );
      const image = cartRow.querySelector("img").src;
      const quantity = parseInt(cartRow.querySelector(".cart-gty").value);

      cart.push({ title, price, image, quantity });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  function loadCartFromLocalStorage() {
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (savedItems.length === 0) {
      cartItemsContainer.innerHTML =
        "<p class='text-center text-gray-500 py-4'>Cart is empty</p>";
    } else {
      savedItems.forEach((item) => {
        addItemToCart(item.title, item.price, item.image, item.quantity);
      });
      updateTotal(); 
    }
  }
      document.getElementById("placeOrderBtn").addEventListener("click", function () {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const totalAmount = localStorage.getItem("cartTotal") || 0;

  // You can replace these with actual form values later
  const orderData = {
    items: cartItems,
    totalAmount: parseFloat(totalAmount),
    customer: {
      name: "Test User",
      email: "test@example.com",
      phone: "08012345678"
    }
  };

  fetch("https://farmlink-api.onrender.com/api/v1/orders/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to place order.");
      }
      return response.json();
    })
    .then(data => {
      console.log("Order success:", data);
      alert("✅ Order placed successfully!");

      // Clear cart
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartTotal");

      // Redirect or reload
      window.location.href = "confirmation.html"; // Change if needed
    })
    .catch(error => {
      console.error("Order error:", error);
      alert("❌ Failed to place order. Please try again.");
    });
});
 
  loadCartFromLocalStorage();
});
