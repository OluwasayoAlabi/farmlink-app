function loadPayment() {
  document.getElementById("app").innerHTML = `
        <h2 class="text-2xl font-bold mb-4">💳 Choose Payment Method</h2>
        <div class="space-y-3">
            <button onclick="payWithCard()" class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                Pay with Debit/Credit Card
            </button>
            <button onclick="payWithBank()" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Pay with Bank Transfer
            </button>
            <button onclick="payWithUSSD()" class="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                Pay with USSD
            </button>
            <button onclick="payWithPaystack()" class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                Pay with Paystack
            </button>
            <button onclick="payWithFlutterwave()" class="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
                Pay with Flutterwave
            </button>
        </div>
    `;
}

function payWithCard() {
  document.getElementById("app").innerHTML = `
        <h2 class="text-2xl font-bold mb-4">💳 Card Payment</h2>
        <form onsubmit="event.preventDefault(); showConfirmation();" class="space-y-4">
            <input class="w-full p-2 border rounded" placeholder="Card Number" required />
            <input class="w-full p-2 border rounded" placeholder="Cardholder Name" required />
            <div class="flex gap-2">
                <input class="w-1/2 p-2 border rounded" placeholder="MM/YY" required />
                <input class="w-1/2 p-2 border rounded" placeholder="CVV" required />
            </div>
            <button class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Pay Now</button>
        </form>
    `;
}

function payWithBank() {
  document.getElementById("app").innerHTML = `
        <h2 class="text-2xl font-bold mb-4">🏦 Bank Transfer</h2>
        <p class="mb-4">Transfer <strong>₦35</strong> to:</p>
        <div class="bg-gray-100 p-4 rounded mb-4">
            <p><strong>Account Name:</strong> MyShop Ltd</p>
            <p><strong>Account Number:</strong> 0123456789</p>
            <p><strong>Bank:</strong> GTBank</p>
        </div>
        <button onclick="showConfirmation()" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            I Have Paid
        </button>
    `;
}

function payWithUSSD() {
  document.getElementById("app").innerHTML = `
        <h2 class="text-2xl font-bold mb-4">📱 USSD Payment</h2>
        <p class="mb-4">Dial the code below to complete payment:</p>
        <div class="bg-gray-100 p-4 rounded text-center font-bold text-xl mb-4">
            *123*0000#
        </div>
        <button onclick="showConfirmation()" class="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
            I Have Paid
        </button>
    `;
}

function payWithPaystack() {
  document.getElementById("app").innerHTML = `
        <h2 class="text-2xl font-bold mb-4">💰 Pay with Paystack</h2>
        <p class="mb-4">This is a simulated Paystack payment.</p>
        <button onclick="showConfirmation()" class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
            Simulate Paystack Payment
        </button>
    `;
}

function payWithFlutterwave() {
  document.getElementById("app").innerHTML = `
        <h2 class="text-2xl font-bold mb-4">💸 Pay with Flutterwave</h2>
        <p class="mb-4">This is a simulated Flutterwave payment.</p>
        <button onclick="showConfirmation()" class="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
            Simulate Flutterwave Payment
        </button>
    `;
}

function showConfirmation() {
  
  window.location.href = "confirmation.html";
}


loadPayment();
