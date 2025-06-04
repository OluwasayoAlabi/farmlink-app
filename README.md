FarmLink App


FarmLink App is a responsive marketplace platform connecting farmers to buyers. It enables farmers to upload products, buyers to browse through product listings, search and filter products, view detailed product info with farmer profiles, and add products to their cart for purchase.

This README outlines the core features, team responsibilities, and development guidelines.

Features

Farmer Product Upload Form
Description:
A form for farmers to submit new products including name, category, price, quantity, and image upload.

Key Tasks:

Build UI form with input validation (required fields, numeric checks).

Image preview before upload.

Form submission to backend or local storage (for MVP).

Assigned to: Oreoluwa Akinboade 


Product Cards Grid (Product Listing Page)

Description:
Display products as responsive cards showing image, name, price, and quantity.

Key Tasks:

Create reusable product card components styled with Tailwind CSS.

Responsive grid layout for different screen sizes.

Load product data dynamically (initially from static JSON).

Handle empty states when no products are available.

Assigned to: Oluwasayo Alabi


Search and Filter

Description:
Enable users to search products by name and filter by category, price, and location.

Key Tasks:

Text input for live search filtering.

Dropdowns or checkboxes for categories and price ranges.

Combine multiple filters seamlessly.

Debounce input to optimize performance.

Assigned to: Blessing Ikyav


Product Detail Page + Farmer Profile

Description:
Show detailed product info with multiple images and farmer profile details (name, rating, location).

Key Tasks:

Layout product detail and farmer profile side-by-side or stacked on mobile.

Image gallery or slider for product photos.

Link to farmer’s other products or full profile.

Fetch product and farmer data dynamically by product ID.

Assigned to: Edudje Wisdom


Add to Cart / Order Button & System 

Description:
Allow users to add products to a cart or initiate orders from listing or detail pages.

Key Tasks:

Cart data structure (local storage/session for MVP).

Dynamic cart count badge updates.

UI feedback (toast messages) when adding items.

Prepare data for checkout integration in future.

Assigned to: Irene Faadong


Pagination

Description:
Manage long product lists by paginating or infinite scrolling to improve performance.

Key tasks:

- Implement page buttons or scroll listener
- Load product batches dynamically
- Update product grid without reloading the page

Assigned to: Irene Faadong


Contact
For questions or collaboration, reach out to the project maintainer at emilyalabi98@gmail.com



