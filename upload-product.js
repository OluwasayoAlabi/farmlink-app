const navbarToggle = document.querySelector('[data-collapse-toggle="navbar-search"]');
const navbarSearch = document.getElementById('navbar-search');

navbarToggle.addEventListener('click', () => {
  navbarSearch.classList.toggle('hidden');
  
});