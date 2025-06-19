document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.querySelector(".cart-items");

  function addItemToCart(title, image, subtotal) {
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
            <span class="cart-subtotal w-1/4 text-green-700 font-semibold">₦${subtotal.toFixed(
              2
            )}</span>
        `;

    cartItemsContainer.appendChild(cartRow);
  }

  function updateTotal() {
    let total = 0;
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    savedItems.forEach((item) => {
      total += item.price * item.quantity; // Calculate total based on price and quantity
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
        const subtotal = item.price * item.quantity; // Calculate subtotal for each item
        addItemToCart(item.title, item.image, subtotal);
      });
      updateTotal(); // Update total after loading items
    }
  }

  // Initialize cart summary
  loadCartFromLocalStorage();

  // Proceed to payment button
  document.getElementById("proceed-btn").addEventListener("click", () => {
    window.location.href = "address-form.html"; // Redirect to address form page
  });
});
