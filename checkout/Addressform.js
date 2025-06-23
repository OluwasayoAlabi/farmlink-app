document.getElementById("address-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const postalCode = document.getElementById("postal-code").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Get cart items and total from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalAmount = parseFloat(localStorage.getItem("cartTotal")) || 0;

  if (cartItems.length === 0) {
    alert("🛒 Cart is empty. Please add products first.");
    return;
  }

  // Prepare customer and order data
  const orderData = {
    items: cartItems,
    totalAmount: totalAmount,
    customer: {
      name: name,
      phone: phone,
      address: `${address}, ${city}, ${state}, ${postalCode}`
    }
  };

  // 🔄 Send data to FarmLink Orders API
  fetch("https://farmlink-api.onrender.com/api/v1/orders/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ Order placed:", data);

      // Clear cart and localStorage
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartTotal");

      // Redirect to confirmation
      window.location.href = "confirmation.html";
    })
    .catch((err) => {
      console.error("❌ Failed to place order:", err);
      alert("There was an error placing your order. Please try again.");
    });
});
