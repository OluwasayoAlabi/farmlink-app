document.addEventListener('DOMContentLoaded', function() {
  // Sticky header effect with shadow intensity adjustment
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header.classList.add('shadow-lg');
    } else {
      header.classList.remove('shadow-lg');
    }
  });

  // DOM Elements
  const searchInput = document.getElementById('product-search');
  const categoryDropdown = document.getElementById('category-dropdown');
  const categoryOptions = document.querySelectorAll('.category-option');
  const products = document.querySelectorAll('.product');
  const loader = document.getElementById('loader');
  const noProducts = document.getElementById('noProducts');
  const categoryButtons = document.querySelectorAll('.overflow-x-auto button');

  // Toggle category dropdown
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      categoryDropdown.classList.remove('hidden');
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (searchInput && !searchInput.contains(event.target) && 
        categoryDropdown && !categoryDropdown.contains(event.target)) {
      categoryDropdown.classList.add('hidden');
    }
  });

  // Filter products by category
  function filterProducts(category) {
    let hasVisibleProducts = false;
    
    products.forEach(product => {
      const productCategory = product.getAttribute('data-category');
      const shouldShow = category === 'all' || 
                        productCategory === category ||
                        productCategory.includes(category.replace(' ', '-'));
      
      if (shouldShow) {
        product.style.display = 'block';
        hasVisibleProducts = true;
      } else {
        product.style.display = 'none';
      }
    });

    // Show/hide messages based on results
    if (!hasVisibleProducts) {
      noProducts.classList.remove('hidden');
      loader.classList.add('hidden');
    } else {
      noProducts.classList.add('hidden');
    }
  }

  // Category dropdown selection
  categoryOptions.forEach(option => {
    option.addEventListener('click', function() {
      categoryOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      filterProducts(category);
      categoryDropdown.classList.add('hidden');
      
      if (searchInput) {
        searchInput.placeholder = `Search in ${this.textContent.trim()}...`;
      }
    });
  });

  // Category button selection
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      categoryButtons.forEach(btn => {
        btn.classList.remove('bg-green-600', 'text-white');
        btn.classList.add('bg-green-100', 'text-green-700');
      });
      
      this.classList.remove('bg-green-100', 'text-green-700');
      this.classList.add('bg-green-600', 'text-white');
      
      // Get category from button text (improved matching)
      const text = this.textContent.trim().toLowerCase();
      let category = text.replace(/\s+/g, '-').replace('/', '-');
      
      // Special cases for button text to data-category matching
      if (text.includes('bags')) {
        category = 'bags';
      }
      
      filterProducts(category);
    });
  });

  // Search functionality with debounce
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const searchTerm = this.value.toLowerCase();
      
      if (searchTerm.trim() === '') {
        filterProducts('all');
        return;
      }
      
      loader.classList.remove('hidden');
      noProducts.classList.add('hidden');
      
      searchTimeout = setTimeout(() => {
        let hasResults = false;
        
        products.forEach(product => {
          const productName = product.getAttribute('data-name').toLowerCase();
          const isVisible = productName.includes(searchTerm);
          
          product.style.display = isVisible ? 'block' : 'none';
          if (isVisible) hasResults = true;
        });
        
        loader.classList.add('hidden');
        noProducts.classList.toggle('hidden', hasResults);
      }, 300);
    });
  }

  // ===== CHAT FUNCTIONALITY =====
// Get chat buttons from both sidebar and bottom nav
const sidebarChatButton = document.querySelector('#sidebar button:nth-child(3)');
const bottomNavChatButton = document.querySelector('.bottom-nav button:nth-child(3)');
const chatModal = document.getElementById('chat-modal');
const farmerListModal = document.getElementById('farmer-list-modal');
const closeChat = document.getElementById('close-chat');
const closeFarmerList = document.getElementById('close-farmer-list');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendMessageBtn = document.getElementById('send-message');
const farmerList = document.getElementById('farmer-list');

// Chat state
let currentFarmer = null;
const chatHistory = {
  'organic-farm': [
    { sender: 'farmer', text: 'Hello! How can I help you with your order?', time: '10:30 AM' }
  ],
  'joe': [
    { sender: 'farmer', text: "Hi there! Joe here from Joe's Fresh Produce.", time: '9:15 AM' },
    { sender: 'farmer', text: "We have fresh tomatoes and peppers available today!", time: '9:16 AM' }
  ],
  'john-henry': [
    { sender: 'farmer', text: "I am John Henry, how can I assist you today?", time: '11:45 AM' }
  ],
  
};

// Farmer data
const farmers = [
  {
    id: 'organic-farm',
    name: 'Organic Farm Co.',
    lastOnline: '5 min ago'
  },
  {
    id: 'joe',
    name: "Joe's Fresh Produce",
    lastOnline: '15 min ago'
  },
  {
    id: 'john-henry',
    name: 'John Henry Ranch',
    lastOnline: '1 hour ago'
  },
  {
    id: 'farmer-lisa',
    name: 'Farmer Lisa',
    lastOnline: '30 min ago',
    separatePage: true
  }
];

// Initialize farmer list
function renderFarmerList() {
  if (!farmerList) return;
  
  farmerList.innerHTML = farmers.map(farmer => {
    // Special case for Farmer Lisa - link to separate page
    if (farmer.id === 'farmer-lisa') {
      return `
        <a href="farmers-lisa-chat.html" class="farmer-item p-3 border-b cursor-pointer hover:bg-gray-50 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <i class="uil uil-user text-gray-600"></i>
          </div>
          <div>
            <h4 class="font-medium">${farmer.name}</h4>
            <p class="text-xs text-gray-500">Last online: ${farmer.lastOnline}</p>
          </div>
        </a>
      `;
    }
    
    // Regular farmers use the modal
    return `
      <div class="farmer-item p-3 border-b cursor-pointer hover:bg-gray-50 flex items-center gap-3" data-farmer-id="${farmer.id}">
        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <i class="uil uil-user text-gray-600"></i>
        </div>
        <div>
          <h4 class="font-medium">${farmer.name}</h4>
          <p class="text-xs text-gray-500">Last online: ${farmer.lastOnline}</p>
        </div>
      </div>
    `;
  }).join('');

  // Add event listeners to farmer items
  document.querySelectorAll('.farmer-item').forEach(farmer => {
    // Skip if it's an anchor tag (Farmer Lisa)
    if (farmer.tagName === 'A') return;
    
    farmer.addEventListener('click', () => {
      if (farmer.classList.contains('active')) return;
      
      // Show loading state
      loader.classList.remove('hidden');
      
      setTimeout(() => {
        currentFarmer = farmer.getAttribute('data-farmer-id');
        document.querySelectorAll('.farmer-item').forEach(f => {
          if (f.tagName !== 'A') f.classList.remove('active');
        });
        farmer.classList.add('active');
        farmerListModal.classList.add('hidden');
        chatModal.classList.remove('hidden');
        renderChatMessages();
        
        // Hide loader
        loader.classList.add('hidden');
      }, 300);
    });
  });
}


// Initialize chat messages
function renderChatMessages() {
  if (!currentFarmer || !chatMessages) return;
  
  chatMessages.innerHTML = chatHistory[currentFarmer].map(msg => `
    <div class="chat-message ${msg.sender === 'buyer' ? 'message-sent' : 'message-received'}">
      <div>${msg.text}</div>
      <div class="message-time">${msg.time}</div>
    </div>
  `).join('');
  
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const message = chatInput?.value.trim();
  if (message && currentFarmer) {
    // Add user message
    chatHistory[currentFarmer].push({
      sender: 'buyer',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    if (chatInput) chatInput.value = '';
    renderChatMessages();
    
    // Farmer replies differently based on who they are
    setTimeout(() => {
      let reply;
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      switch(currentFarmer) {
        case 'joe':
          reply = "Thanks! We'll have your order ready by tomorrow.";
          break;
        case 'john-henry':
          reply = "I'll check the availability and get back to you shortly.";
          break;
        case 'farmer-lisa':
          reply = "Wonderful! Would you like to add anything else to your order?";
          break;
        default:
          reply = "Thanks for your message! We'll get back to you soon.";
      }
      
      chatHistory[currentFarmer].push({
        sender: 'farmer',
        text: reply,
        time: now
      });
      
      renderChatMessages();
    }, 1000 + Math.random() * 2000);
  }
}

// Initialize chat when page loads
renderFarmerList();
renderChatMessages();

// Event Listeners for both chat buttons
if (sidebarChatButton) {
  sidebarChatButton.addEventListener('click', () => {
    farmerListModal.classList.remove('hidden');
  });
}

if (bottomNavChatButton) {
  bottomNavChatButton.addEventListener('click', () => {
    farmerListModal.classList.remove('hidden');
  });
}

if (closeChat) {
  closeChat.addEventListener('click', () => {
    chatModal.classList.add('hidden');
  });
}

if (closeFarmerList) {
  closeFarmerList.addEventListener('click', () => {
    farmerListModal.classList.add('hidden');
  });
}

if (sendMessageBtn) {
  sendMessageBtn.addEventListener('click', sendMessage);
}

if (chatInput) {
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

  // Sidebar functionality
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarButtons = document.querySelectorAll('#sidebar button');
  const bottomNavButtons = document.querySelectorAll('.bottom-nav button');

  if (sidebarToggle && sidebar && sidebarOverlay) {
    // Toggle sidebar on mobile
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('translate-x-0');
      sidebarOverlay.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    });

    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('translate-x-0');
      sidebarOverlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // Sync active state between mobile nav and sidebar
  const syncActiveState = (index) => {
    bottomNavButtons.forEach(btn => btn.classList.remove('active'));
    sidebarButtons.forEach(btn => btn.classList.remove('bg-green-100'));
    
    if (index >= 0) {
      bottomNavButtons[index]?.classList.add('active');
      sidebarButtons[index]?.classList.add('bg-green-100');
    }
  };

  // Update both navs when clicking
  bottomNavButtons.forEach((button, index) => {
    button.addEventListener('click', () => syncActiveState(index));
  });

  sidebarButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      syncActiveState(index);
      
      // On mobile, close sidebar after selection
      if (window.innerWidth < 768) {
        sidebar?.classList.remove('translate-x-0');
        sidebarOverlay?.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });
 
  // Initialize this - show all products
  renderFarmerList();
});