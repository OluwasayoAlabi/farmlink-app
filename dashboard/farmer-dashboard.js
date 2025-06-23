//Navbar toggle
const navbarToggle = document.querySelector('[data-collapse-toggle="navbar-search"]');
const navbarSearch = document.getElementById('mobileMenu');

navbarToggle.addEventListener('click', () => {
  navbarSearch.classList.toggle('hidden');
  
});

const images = [
  { src: '../images/Agbalumo.webp', 
    alt: 'Agbalumo',
    name: 'Agbalumo' },

  { src: '../images/Apples.webp', 
    alt: 'Apples', 
    name: 'Apples' },
  { src: '../images/avocado 2.jpg', 
    alt: 'Avocados', 
    name: 'Avocados'},
  { src: '../images/bag of beans.jpeg', 
    alt: 'Bag of beans',
    name: 'Bag of beans' },

  { src: '../images/bag of rice.jpg', 
    alt: 'bag of rice', 
    name: 'bag of rice'},

  { src: '../images/Bananas 2.webp', 
    alt: 'Bananas',
    name:'Bananas'},

  { src: '../images/cashews.webp', 
    alt: 'Cashew',
    name: 'Cashew' },

  { src: '../images/Catfish.jpg', 
    alt: 'Catfish',
    name: 'Catfish'},

  { src: '../images/cocoa.jpg', 
    alt: 'cocoa',
    name:'cocoa'},

  { src: '../images/cows.jpg', 
    alt: 'Cows',
    name: 'Cows'},

  { src: '../images/cucumbers.webp', 
    alt: 'Cucumbers',
    name: 'Cucumbers'},

  { src: '../images/eggs.jpg', 
    alt: 'eggs',
    name: 'Eggs' },

  { src: '../images/Frozen Chicken.webp', 
    alt: 'Frozen Chicken',
    name:'Frozen Chicken' },

  { src: '../images/Frozen fish.jpg', 
    alt: 'Frozen fish',
    name: 'Frozen fish'},


  { src: '../garden eggs.jpg', 
    alt: 'garden eggs',
    name: 'Garden Eggs'},

  { src: '../images/goat.jpg', 
    alt: 'goat',
    name: 'Goat'},

  { src: '../images/groundnut.jpg', 
    alt: 'Groundnut',
    name: 'Groundnut' },

  { src: '../images/leafy-vegetables.webp', 
    alt: 'leafy-vegetables',
    name:'Leafy-Vegetables' },

  { src: '../images/Live Chicken.webp', 
    alt: 'Live Chicken',
    name: 'Live Chicken'},

  { src: '../images/maize.jpg', 
    alt: 'maize',
    name: 'Maize'},

  { src: '../images/mangoes.webp', 
    alt: 'mangoes',
    name: 'Mangoes' },

  { src: '../images/okra 2.jpg', 
    alt: 'okra',
    name: 'Okra'},

  { src: '../images/Onions 2.webp', 
    alt: 'Onions',
    name: 'Onions'},

  { src: '../images/oranges.jpg', 
    alt: 'oranges', 
    name: 'Oranges'},

  { src: '../images/pawpaw.webp', 
    alt: 'pawpaw',
    name: 'Pawpaw'},

  { src: '../images/pepper.jpg', 
    alt: 'pepper',
    name: 'Pepper'},

  { src: '../images/pineapple.webp', 
    alt: 'pineapple', 
    name: 'Pineapple'},

  { src: '../images/plaintains.webp',
    alt: 'plaintains',
    name: 'Plaintains'},

  { src: '../images/ram.jpg', 
    alt: 'ram', 
    name:'Ram' },

  { src: '../images/sheep.jpg', 
    alt: 'sheep',
    name: 'Sheep'},

  { src: '../images/Tomatoes 1.webp', 
    alt: 'Fresh-Tomatoes',
    name:'Fresh-Tomatoes'},

  { src: '../images/watermelons.jpg', 
    alt: 'watermelons',
    name: 'Watermelons'},

  { src: '../images/Yam tuber.webp', 
    alt: 'Yam tuber',
    name: 'Yam tuber'},
];

const gridContainer = document.querySelector('.listing-grid');

images.forEach((image, index) => {
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('overflow-hidden', 'rounded-lg', 'shadow-md');

  const img = document.createElement('img');
  img.src = image.src;
  img.alt = image.alt;
  img.classList.add('w-full', 'h-60', 'object-fill');

  const seeDetailsLink = document.createElement('a');
  seeDetailsLink.href = `product-detail.html?product=${image.name.toLowerCase().replace(' ', '-')}`;
  seeDetailsLink.textContent = 'See Details';
  seeDetailsLink.classList.add('block','mt-2', 'text-black', 'pl-2', 'hover:text-green-700');

  imageContainer.appendChild(img);
  imageContainer.appendChild(seeDetailsLink);
  gridContainer.appendChild(imageContainer);
});

  const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modal = document.getElementById("modal");

    openModalBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    // Optional: Close modal when clicking outside of it
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
    //back arrow button
    document.getElementById('closeModalBtn').addEventListener('click', function () {
  document.getElementById('modal').classList.add('hidden');
});


//Multiple image upload and delete button
const form = document.getElementById('product-form');
const imageUploadInput = document.getElementById('file-input');
const imagePreviewDiv = document.getElementById('image-preview');

let selectedFiles = [];

// Image preview and selection (same as before)
imageUploadInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    selectedFiles.push(file);
    const reader = new FileReader();
    reader.onload = () => {
      const html = `
        <div class="rounded-xl p-4 mt-1 image-container">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">  
              <div class="rounded-lg bg-emerald-500/10 p-2">
                <img src="${reader.result}" class="h-10 w-10 object-cover rounded" />
              </div>
              <div>
                <p class="text-xs">${file.name}</p>
                <p class="text-xs text-slate-400">${(file.size / 1024 / 1024).toFixed(2)} MB • ${file.type.split('/')[1]}</p>
              </div>
            </div>
            <button class="delete-image text-red-500 hover:text-red-700" data-name="${file.name}">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4
                   a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      `;
      imagePreviewDiv.insertAdjacentHTML('beforeend', html);
    };
    reader.readAsDataURL(file);
  });

  // Reset input so user can select same file again if needed
  imageUploadInput.value = '';
});

// Delete preview image and remove from selectedFiles
imagePreviewDiv.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.delete-image');
  if (deleteBtn) {
    const name = deleteBtn.dataset.name;
    selectedFiles = selectedFiles.filter(file => file.name !== name);
    deleteBtn.closest('.image-container').remove();
  }
});

// Handle form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (selectedFiles.length === 0) {
    alert("Please upload at least one image.");
    return;
  }

  const formData = new FormData();

  selectedFiles.forEach(file => formData.append('files', file));

  formData.append('name', document.getElementById('product-name').value);
  formData.append('description', document.getElementById('product-description').value);
  formData.append('category', document.getElementById('product-category').value);
  formData.append('price', document.getElementById('price-per-unit').value);
  formData.append('totalQty', document.getElementById('quantity-available').value);
  formData.append('sizes', document.getElementById('product-size').value + ' ' + document.getElementById('unit-of-measurement').value);
  formData.append('color', 'others');

  // Optional: show loader, disable button, etc.

  fetch('https://farmlink-api.onrender.com/api/v1/products/add-product', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTgzMzM4ZTNlNmJjMzRiMDcyN2YxMSIsImlhdCI6MTc1MDYxMDc5NiwiZXhwIjoxNzUwODY5OTk2fQ.oSRiSc-mwdyEVh1oHKW-ol5xoChabVGnc_DKN0diXZ')}`
    },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      alert('Product uploaded successfully!');
      resetForm();
    })
    .catch(err => {
      console.error(err);
      alert('Upload failed!');
    });
});

function resetForm() {
  selectedFiles = [];
  imagePreviewDiv.innerHTML = '';
  form.reset();
  // Reset file input manually if needed
  imageUploadInput.value = '';
}
