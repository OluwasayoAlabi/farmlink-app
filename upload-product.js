//Navbar toggle
const navbarToggle = document.querySelector('[data-collapse-toggle="navbar-search"]');
const navbarSearch = document.getElementById('mobileMenu');

navbarToggle.addEventListener('click', () => {
  navbarSearch.classList.toggle('hidden');
  
});


//Multiple image upload and delete button
const imageUploadInput = document.getElementById('file-input');
const imagePreviewDiv = document.getElementById('image-preview');
const uploadButton = document.getElementById('upload-btn');

let selectedFiles = [];

imageUploadInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);

  files.forEach(file => {
    const fileId = crypto.randomUUID();
    file.id = fileId;
    selectedFiles.push(file);

    const reader = new FileReader();
    reader.onload = () => {
      const html = `
        <div class="rounded-xl p-4 mt-1 bg-gray-100 flex items-center justify-between" data-id="${fileId}">
          <div class="flex items-center gap-3">  
            <div class="rounded-lg bg-emerald-500/10 p-2">
              <img src="${reader.result}" class="h-10 w-10 object-cover rounded" />
            </div>
            <div>
              <p class="text-xs font-medium">${file.name}</p>
              <p class="text-xs text-slate-400">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button class="text-red-500 hover:text-red-700 remove-btn" type="button" aria-label="Remove image">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142M5 7l.867 12.142M10 11v6m4-6v6" />
            </svg>
          </button>
        </div>
      `;
      imagePreviewDiv.insertAdjacentHTML('beforeend', html);
    };
    reader.readAsDataURL(file);
  });

  imageUploadInput.value = ''; // reset input so same file can be selected again
});

imagePreviewDiv.addEventListener('click', (e) => {
  if (e.target.closest('.remove-btn')) {
    const container = e.target.closest('[data-id]');
    const id = container.getAttribute('data-id');
    selectedFiles = selectedFiles.filter(file => file.id !== id);
    container.remove();
  }
});

uploadButton.addEventListener('click', (e) => {
  e.preventDefault(); // prevent form submit if inside a form

  if (selectedFiles.length === 0) {
    alert('Please select at least one image.');
    return;
  }

  // Grab values from your inputs by their correct IDs
  const name = document.getElementById('product-name').value.trim();
  const description = document.getElementById('product-description').value.trim();
  const category = document.getElementById('product-category').value.trim();
  const sizes = document.getElementById('product-size').value.trim();
  const color = ''; // No color input currently; leave blank or add input field
  const price = document.getElementById('price-per-unit').value.trim();
  const totalQty = document.getElementById('quantity-available').value.trim();

  // Basic validation example (optional)
  if (!name || !description || !category || !sizes || !price || !totalQty) {
    alert('Please fill in all required fields.');
    return;
  }

  const formData = new FormData();
  selectedFiles.forEach(file => formData.append('files[]', file));

  formData.append('name', name);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('sizes', sizes);
  formData.append('color', color);
  formData.append('price', price);
  formData.append('totalQty', totalQty);

  fetch('https://farmlink-api.onrender.com/api/v1/products/add-product', {
    method: 'POST',
   headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTgzMzM4ZTNlNmJjMzRiMDcyN2YxMSIsImlhdCI6MTc1MDYxMDc5NiwiZXhwIjoxNzUwODY5OTk2fQ.oSRiSc-mwdyEVh1oHKW-ol5xoChabVGnc_DKN0diXZI',
  },
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    alert('Upload successful!');
    selectedFiles = [];
    imagePreviewDiv.innerHTML = '';
    // Optionally reset inputs here if desired
  })
  .catch(err => {
    console.error('Upload failed:', err);
    alert('Upload failed, please try again.');
  });
});
