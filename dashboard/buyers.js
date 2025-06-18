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
  const chatButton = document.querySelector('.bottom-nav button:nth-child(3)'); // More reliable selector
  const chatModal = document.getElementById('chat-modal');
  const farmerListModal = document.getElementById('farmer-list-modal');
  const closeChat = document.getElementById('close-chat');
  const closeFarmerList = document.getElementById('close-farmer-list');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendMessageBtn = document.getElementById('send-message');
  const farmerItems = document.querySelectorAll('.farmer-item');

  if (chatButton && chatModal && farmerListModal) {
    // Chat state
    let currentFarmer = null;
    const chatHistory = {
      'farmer1': [
        { sender: 'farmer', text: 'Hello! How can I help you with your order?', time: '10:30 AM' }
      ]
    };

    // Initialize chat
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
        chatHistory[currentFarmer].push({
          sender: 'buyer',
          text: message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        
        if (chatInput) chatInput.value = '';
        renderChatMessages();
        
        setTimeout(() => {
          const replies = [
            "Thanks for your message!",
            "We'll check on that for you.",
            "The items are available in stock.",
            "When would you like to collect your order?"
          ];
          const randomReply = replies[Math.floor(Math.random() * replies.length)];
          
          chatHistory[currentFarmer].push({
            sender: 'farmer',
            text: randomReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          
          renderChatMessages();
        }, 1000 + Math.random() * 2000);
      }
    }

    // Event Listeners
    chatButton.addEventListener('click', () => {
      farmerListModal.classList.remove('hidden');
    });

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

    farmerItems.forEach(farmer => {
      farmer.addEventListener('click', () => {
        currentFarmer = 'farmer1';
        farmerItems.forEach(f => f.classList.remove('active'));
        farmer.classList.add('active');
        farmerListModal.classList.add('hidden');
        chatModal.classList.remove('hidden');
        renderChatMessages();
      });
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

  // Initialize - show all products
  filterProducts('all');
});