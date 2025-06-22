document.addEventListener('DOMContentLoaded', function() {

  // ===== NOTIFICATION FUNCTIONALITY =====
  const notificationBtn = document.getElementById('notification-btn');
  const notificationDropdown = document.getElementById('notification-dropdown');
  const notificationList = document.getElementById('notification-list');
  const notificationBadge = document.getElementById('notification-badge');
  const markAllReadBtn = document.getElementById('mark-all-read');
  
  // Notification state
  let notifications = [
    {
      id: 1,
      title: "New message from Farmer Lisa",
      message: "Your order has been confirmed and will be shipped tomorrow.",
      time: "10:30 AM",
      read: false
    },
    {
      id: 2,
      title: "Special Offer",
      message: "Get 10% off on all fruits this week!",
      time: "Yesterday",
      read: false
    },
    {
      id: 3,
      title: "Order Shipped",
      message: "Your order #12345 has been shipped.",
      time: "Jun 20",
      read: true
    }
  ];

  // Render notifications
  function renderNotifications() {
    const unreadCount = notifications.filter(n => !n.read).length;
    
    // Update badge
    if (unreadCount > 0) {
      notificationBadge.textContent = unreadCount;
      notificationBadge.classList.remove('hidden');
    } else {
      notificationBadge.classList.add('hidden');
    }
    
    // Render notification list
    if (notifications.length === 0) {
      notificationList.innerHTML = '<div class="p-3 text-center text-gray-500">No notifications</div>';
      return;
    }
    
    notificationList.innerHTML = notifications.map(notification => `
      <div class="notification-item ${notification.read ? '' : 'unread'}" data-id="${notification.id}">
        <div class="font-medium text-sm">${notification.title}</div>
        <div class="text-sm text-gray-600">${notification.message}</div>
        <div class="notification-time">${notification.time}</div>
      </div>
    `).join('');
  }

  // Toggle notification dropdown
  if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      notificationDropdown.classList.toggle('hidden');
      
      // Mark notifications as read when dropdown is opened
      if (!notificationDropdown.classList.contains('hidden')) {
        notifications = notifications.map(n => ({ ...n, read: true }));
        renderNotifications();
      }
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!notificationDropdown.contains(e.target) && e.target !== notificationBtn) {
      notificationDropdown.classList.add('hidden');
    }
  });

  // Mark all as read
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', function() {
      notifications = notifications.map(n => ({ ...n, read: true }));
      renderNotifications();
    });
  }

  // Notification item click handler
  notificationList.addEventListener('click', function(e) {
    const notificationItem = e.target.closest('.notification-item');
    if (notificationItem) {
      const id = parseInt(notificationItem.getAttribute('data-id'));
      // In a real app, you would navigate to the relevant page
      console.log('Notification clicked:', id);
      notificationDropdown.classList.add('hidden');
    }
  });

  // Initialize notifications
  renderNotifications();


  // Show/hide dropdown
  function toggleCategoryDropdown(show) {
    if (show) {
      categoryDropdown.classList.remove('hidden');
    } else {
      categoryDropdown.classList.add('hidden');
    }
  }

  // Event listeners for search input and icon
  if (searchInput) {
    searchInput.addEventListener('focus', () => toggleCategoryDropdown(true));
    searchInput.addEventListener('click', () => toggleCategoryDropdown(true));
  }

  if (searchIcon) {
    searchIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCategoryDropdown(true);
      searchInput.focus();
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!categoryDropdown.contains(e.target) && 
        e.target !== searchInput && 
        e.target !== searchIcon) {
      toggleCategoryDropdown(false);
    }
  });

  // ===== SIDEBAR FUNCTIONALITY =====
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarCollapse = document.getElementById('sidebar-collapse');
  const mainContent = document.getElementById('main-content');
  const button = document.querySelector(".button");
  const texts = document.querySelectorAll(".texts");

  button.addEventListener("click", toggleSidebar)

  function toggleSidebar() {
    texts.forEach(function(text) {
        if(text.style.display === "block") {
            text.style.display = "none";
        }

        else {
            text.style.display = "block"
        }
       })
     }; 

  function toggleSidebar() {
    sidebar.classList.toggle('-translate-x-full');
    sidebarOverlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  }

  function closeSidebar() {
    if (!sidebar.classList.contains('-translate-x-full')) {
      sidebar.classList.add('-translate-x-full');
      sidebarOverlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  // Toggle sidebar collapse
  function toggleSidebarCollapse() {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
    
    // Rotate the collapse icon
    const icon = sidebarCollapse.querySelector('i');
    icon.classList.toggle('uil-left-arrow-to-left');
    icon.classList.toggle('uil-right-arrow-to-right');
  }

  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSidebar();
    });

    sidebarOverlay.addEventListener('click', closeSidebar);
    
    document.addEventListener('click', (e) => {
      // Close sidebar when clicking outside on mobile
      if (window.innerWidth < 768 && 
          !sidebar.contains(e.target) && 
          e.target !== sidebarToggle &&
          !sidebarOverlay.classList.contains('hidden')) {
        closeSidebar();
      }
      
      // Collapse sidebar when clicking outside on desktop
      if (window.innerWidth >= 768 && 
          !sidebar.contains(e.target) && 
          !sidebar.classList.contains('collapsed') &&
          e.target !== sidebarCollapse) {
        toggleSidebarCollapse();
      }
    });
    
    sidebar.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }

  if (sidebarCollapse) {
    sidebarCollapse.addEventListener('click', toggleSidebarCollapse);
  }

  // ===== PRODUCT SEARCH AND FILTER =====
  const searchInput = document.getElementById('product-search');
  const categoryDropdown = document.getElementById('category-dropdown');
  const searchIcon = document.querySelector('.uil-search');
  const categoryOptions = document.querySelectorAll('.category-option');
  const products = document.querySelectorAll('.product');
  const loader = document.getElementById('loader');
  const noProducts = document.getElementById('noProducts');
  const categoryButtons = document.querySelectorAll('.overflow-x-auto button');
  const categoryFilterButtons = document.querySelectorAll('.category-filter-btn');

  // Filter products by category
  function filterProducts(category) {
    let hasVisibleProducts = false;
    
    products.forEach(product => {
      const productCategory = product.getAttribute('data-category');
      const shouldShow = category === 'all' || 
                        productCategory === category ||
                        productCategory.includes(category.replace(' ', '-'));
      
      product.style.display = shouldShow ? 'block' : 'none';
      if (shouldShow) hasVisibleProducts = true;
    });

    noProducts.classList.toggle('hidden', hasVisibleProducts);
    loader.classList.add('hidden');
  }

  // Filter by new categories (special offers, popular sales, etc.)
  function filterByNewCategory(category) {
    // In a real app, this would filter products based on the category
    // For now, we'll just show all products and highlight the active button
    categoryFilterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.classList.remove('text-white'); // Remove white text if it was added
      btn.classList.add('text-black'); // Ensure black text
      if (btn.getAttribute('data-category') === category) {
        btn.classList.add('active');
      }
    });
    
    // Show loading state
    loader.classList.remove('hidden');
    noProducts.classList.add('hidden');
    
    // Simulate filtering with a delay
    setTimeout(() => {
      products.forEach(product => {
        product.style.display = 'block';
      });
      loader.classList.add('hidden');
    }, 500);
  }

  // Toggle category dropdown
if (searchInput && categoryDropdown) {
  // Show dropdown when input is clicked or focused
  searchInput.addEventListener('click', function() {
    categoryDropdown.classList.remove('hidden');
  });
  
  searchInput.addEventListener('focus', function() {
    categoryDropdown.classList.remove('hidden');
  });

  // Also show dropdown when clicking the search icon
  const searchIcon = searchInput.nextElementSibling;
  if (searchIcon) {
    searchIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      categoryDropdown.classList.remove('hidden');
      searchInput.focus();
    });
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  if (!categoryDropdown.classList.contains('hidden')) {
    const isClickInside = searchInput.contains(event.target) || 
                         categoryDropdown.contains(event.target) ||
                         (searchInput.nextElementSibling && 
                          searchInput.nextElementSibling.contains(event.target));
    
    if (!isClickInside) {
      categoryDropdown.classList.add('hidden');
    }
  }
});

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
      
      const text = this.textContent.trim().toLowerCase();
      let category = text.replace(/\s+/g, '-').replace('/', '-');
      
      if (text.includes('bags')) {
        category = 'bags';
      }
      
      filterProducts(category);
    });
  });

  // New category filter buttons
  categoryFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      filterByNewCategory(category);
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
    'farmer-lisa': [
      { 
        sender: 'buyer', 
        text: "Hello Lisa! How are you doing today?", 
        time: "5:10 PM" 
      },
      { 
        sender: 'farmer', 
        text: "Hello Michael! Very well, thank you.", 
        time: "5:12 PM" 
      },
      { 
        sender: 'farmer', 
        text: "What would you like to get from us today? I am also available to answer your questions.", 
        time: "5:12 PM" 
      },
      { 
        sender: 'buyer', 
        text: "Oh, that's nice to hear. I just wanted to ask if you could give a discount on the plantain.", 
        time: "5:14 PM" 
      }
    ]
  };

  // Initialize farmer list
  function renderFarmerList() {
    if (!farmerList) return;
    
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
    
    farmerList.innerHTML = farmers.map(farmer => {
      // Special case for Farmer Lisa - link to separate page
      if (farmer.id === 'farmer-lisa') {
        return `
          <a href="/dashboard/farmers-lisa-chat.html" class="farmer-item p-3 border-b cursor-pointer hover:bg-gray-50 flex items-center gap-3">
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
    document.querySelectorAll('.farmer-item[data-farmer-id]').forEach(farmer => {
      farmer.addEventListener('click', (e) => {
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
          
          // Update chat header with farmer name
          const chatHeader = chatModal.querySelector('div:first-child h3');
          if (chatHeader) {
            const farmerName = farmer.querySelector('h4').textContent;
            chatHeader.textContent = `Chat with ${farmerName}`;
          }
          
          // Add back button to chat modal
          const chatHeaderDiv = chatModal.querySelector('div:first-child');
          if (!chatHeaderDiv.querySelector('.back-to-farmers')) {
            const backButton = document.createElement('div');
            backButton.className = 'back-to-farmers';
            backButton.innerHTML = '<i class="uil uil-arrow-left"></i>';
            backButton.addEventListener('click', () => {
              chatModal.classList.add('hidden');
              farmerListModal.classList.remove('hidden');
            });
            chatHeaderDiv.appendChild(backButton);
          }
          
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
    
    chatMessages.innerHTML = (chatHistory[currentFarmer] || []).map(msg => `
      <div class="flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'} mb-3">
        <div class="${msg.sender === 'buyer' ? 'bg-green-800 text-white' : 'bg-green-300 text-gray-800'} rounded-lg py-2 px-3 max-w-xs">
          <div class="text-sm">${msg.text}</div>
          <div class="text-xs mt-1 ${msg.sender === 'buyer' ? 'text-green-200' : 'text-gray-600'}">${msg.time}</div>
        </div>
      </div>
    `).join('');
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage() {
    const message = chatInput?.value.trim();
    if (message && currentFarmer) {
      // Initialize chat history if it doesn't exist for this farmer
      if (!chatHistory[currentFarmer]) {
        chatHistory[currentFarmer] = [];
      }
      
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
            // Custom replies for Farmer Lisa
            if (message.toLowerCase().includes('discount')) {
              reply = "I can offer you a 10% discount if you purchase more than 5kg of plantain. Would that work for you?";
            } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
              reply = "Hello Michael! What can I help you with today?";
            } else {
              reply = "Thanks for your message! I'll get back to you shortly with more details.";
            }
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

  // Event Listeners for chat buttons
  function setupChatButtons() {
    // Get chat buttons from both sidebar and bottom nav
    const chatButtons = [
      ...document.querySelectorAll('#sidebar button:nth-child(4)'), // Updated index for new buttons
      ...document.querySelectorAll('.bottom-nav button:nth-child(3)')
    ];
    
    chatButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        farmerListModal.classList.remove('hidden');
      });
    });

    // Also handle onclick attributes
    document.querySelectorAll('[onclick*="farmer-list-modal"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        farmerListModal.classList.remove('hidden');
      });
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

  // Modal close when clicking outside
  if (farmerListModal) {
    farmerListModal.addEventListener('click', (e) => {
      if (e.target === farmerListModal) {
        farmerListModal.classList.add('hidden');
      }
    });
  }

  if (chatModal) {
    chatModal.addEventListener('click', (e) => {
      if (e.target === chatModal) {
        chatModal.classList.add('hidden');
      }
    });
  }

  // ===== INITIALIZATION =====
  setupChatButtons();
  renderFarmerList();
  filterProducts('all'); // Show all products by default
  
  // Activate "All" button by default
  document.querySelector('.category-filter-btn[data-category="all"]').classList.add('active');
});