//Navbar toggle
const navbarToggle = document.querySelector('[data-collapse-toggle="navbar-search"]');
const navbarSearch = document.getElementById('mobileMenu');

navbarToggle.addEventListener('click', () => {
  navbarSearch.classList.toggle('hidden');
  
});


//Multiple image upload and delete button
const imageUploadInput = document.getElementById('file-input');
const imagePreviewDiv = document.getElementById('image-preview');

imageUploadInput.addEventListener('change', (e) => {
  const files = e.target.files;

  for (const file of files) {
    const fileName = file.name;
    const fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    const fileType = file.type.split('/')[1].toUpperCase();

    const reader = new FileReader();
    reader.onload = () => {
      const html = `
        <div class="rounded-xl p-4 mt-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">  
              <div class="rounded-lg bg-emerald-500/10 p-2">
                <img src="${reader.result}" class="h-6 w-6 object-cover rounded" />
              </div>
              <div>
                <p class="text-xs">${fileName}</p>
                <p class="text-xs text-slate-400">${fileSize} • ${fileType}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <svg class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-sm font-medium text-green-600">Complete</span>

              <button class="text-red-500 hover:text-red-700">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;

      imagePreviewDiv.insertAdjacentHTML('beforeend', html);
    };
    reader.readAsDataURL(file);
  }
});

imagePreviewDiv.addEventListener('click', (e) => {
  if (e.target.closest('button')) {
    const imageContainer = e.target.closest('.rounded-xl');
    imageContainer.remove();
  }
});

//Calculation of total price (price per unit x quantity)
/*
const pricePerUnitInput = document.getElementById('price-per-unit');
    const quantityAvailableInput = document.getElementById('quantity-available');
    const totalValueSpan = document.getElementById('total-value');

    function calculateTotal() {
      const pricePerUnit = parseFloat(pricePerUnitInput.value) || 0;
      const quantityAvailable = parseInt(quantityAvailableInput.value) || 0;
      const totalValue = Math.round (pricePerUnit * quantityAvailable);
      totalValueSpan.textContent =`₦${totalValue.toLocaleString()}`;
    }

    pricePerUnitInput.addEventListener('input', calculateTotal);
    quantityAvailableInput.addEventListener('input', calculateTotal);

    const form = document.getElementById('product-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const productName = document.getElementById('product-name').value;
      const pricePerUnit = parseFloat(document.getElementById('price-per-unit').value);
      const quantityAvailable = parseInt(document.getElementById('quantity-available').value);
      const totalValue = pricePerUnit * quantityAvailable;

      console.log(totalValue);      
      // Upload product data to server or database
      const productData = {
        productName,
        pricePerUnit,
        quantityAvailable,
        totalValue,
      };
      console.log(productData);
      // Add code to send productData to server or database
    });
*/