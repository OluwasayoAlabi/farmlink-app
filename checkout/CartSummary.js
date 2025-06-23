
document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.querySelector(".cart-items");

  function addItemToCart(title, image, subtotal) {
    const cartRow = document.createElement("div");
    cartRow.classList.add("cart-row", "flex", "items-center", "border-b", "py-4");

    cartRow.innerHTML = `
      <div class="cart-item w-1/2 flex items-center gap-3">
        <img src="${image}" alt="${title}" class="w-16 h-16 object-cover rounded-md" />
        <span class="cart-title font-semibold">${title}</span>
      </div>
      <span class="cart-subtotal w-1/4 text-green-700 font-semibold">₦${subtotal.toFixed(2)}</span>
    `;

    cartItemsContainer.appendChild(cartRow);
  }

  function updateTotal() {  
    let total = 0;
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    savedItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    document.querySelector(".total").innerText = `₦${total.toFixed(2)}`;
  }

  function loadCartFromLocalStorage() {
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (savedItems.length === 0) {
      cartItemsContainer.innerHTML =
        "<p class='text-center text-gray-500 py-4'>Cart is empty</p>";
    } else {
      savedItems.forEach((item) => {
        const subtotal = item.price * item.quantity;
        addItemToCart(item.title, item.image, subtotal);
      });
      updateTotal();
    }
  }

  // Initialize cart
  loadCartFromLocalStorage();

  // Proceed to payment button handler
  document.getElementById("proceed-btn").addEventListener("click", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalAmount = parseFloat(localStorage.getItem("cartTotal")) || 0;

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Dummy customer info (you can replace with real form inputs)
    const customer = {
      name: "Edudje Wisdom",
      email: "wisdom@example.com",
      phone: "08012345678",
      address: "123 Street, Lagos"
    };

    const orderData = {
      items: cartItems,
      totalAmount: totalAmount,
      customer: customer
    };

    // 🔄 Send order to FarmLink API
    fetch("https://farmlink-api.onrender.com/api/v1/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Order Success:", data);
        alert("✅ Order placed successfully!");

        // Clear cart and redirect
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartTotal");
        window.location.href = "confirmation.html";
      })
      .catch((err) => {
        console.error("Order Failed:", err);
        alert("❌ Failed to place order. Please try again.");
      });
  });
});
