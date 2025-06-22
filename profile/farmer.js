window.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      // Hide all tab contents
      tabContents.forEach(content => content.classList.add("hidden"));

      // Deactivate all buttons
      tabButtons.forEach(btn => {
        btn.classList.remove("text-green-600", "border-b-2", "border-green-600");
        btn.classList.add("text-gray-600");
      });

      // Activate clicked button
      button.classList.add("text-green-600", "border-b-2", "border-green-600");
      button.classList.remove("text-gray-600");

      // Show selected tab content
      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.remove("hidden");
      }
    });
  });

  // Default active tab
  const defaultTab = document.querySelector('[data-tab="about"]');
  if (defaultTab) defaultTab.click();
});

//Gallery Images
const galleryImages = [
  { src: "./Assets/Frame 993.png", alt: "Image 1" },                                         
  { src: "./Assets/Frame 995.png", alt: "Image 2" },                                          
  { src: "./Assets/Image holder 3.png", alt: "Image 3" },  
  { src: "./Assets/fd627a94ca67dc8a722a0b6344fa480f.png", alt: "Image 4" },
  { src: "./Assets/f47963e772c2867da04ce051b703384d.png", alt: "Image 5" }, 
  { src: "./Assets/b1c0182c3bbdc748f1965dded47db9f8.png", alt: "Image 6" },

  ];

                   
 const galleryContainer = document.getElementById("galleryGrid");
  galleryImages.forEach((img) => {
  const imageElement = document.createElement("img");
  imageElement.src = img.src;
  imageElement.alt = img.alt;
  imageElement.className = "w-full h-32 object-cover rounded-lg";
  galleryContainer.appendChild(imageElement);
  });

  // Add modal logic
const modal = document.getElementById("galleryModal");
const modalGalleryGrid = document.getElementById("modalGalleryGrid");
const seeAllLink = document.querySelector("#gallery a");
const closeModalButton = document.getElementById("closeGalleryModal");

seeAllLink.addEventListener("click", (e) => {
  e.preventDefault();
  renderGalleryModal();
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

closeModalButton.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

// Populate modal gallery
function renderGalleryModal() {
  modalGalleryGrid.innerHTML = "";
  galleryImages.forEach((img) => {
    const image = document.createElement("img");
    image.src = img.src;
    image.alt = img.alt;
    image.className = "w-full h-40 object-cover rounded-lg";
    modalGalleryGrid.appendChild(image);
  });
}

//Chart JS
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Tomatoes', 'Maize', 'Rice', 'Cassava'],
        datasets: [{
          label: 'Weekly Sales',
          data: [35, 25, 20, 20], // Sample values
          backgroundColor: [
            'red',
            'green',
            'yellow',
            'blue'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    //Navbar toggle
const navbarToggle = document.querySelector('[data-collapse-toggle="navbar-search"]');
const navbarSearch = document.getElementById('mobileMenu');

navbarToggle.addEventListener('click', () => {
  navbarSearch.classList.toggle('hidden');
  
});

//back arrow button
   document.getElementById('closeModalBtn').addEventListener('click', function () {
    window.history.back();
});


