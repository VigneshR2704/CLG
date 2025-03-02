// Auto-scrolling News
const newsGrid = document.querySelector('.news-grid');
const newsCards = document.querySelectorAll('.news-card');
const cardWidth = newsCards[0].offsetWidth + 30; // card width + gap
let scrollAmount = 0;

function autoScroll() {
  scrollAmount += cardWidth;
  if (scrollAmount >= cardWidth * (newsCards.length - 2)) {
    scrollAmount = 0;
  }
  newsGrid.style.transform = `translateX(-${scrollAmount}px)`;
}

// Start auto-scroll
let scrollInterval = setInterval(autoScroll, 2500);

// Pause on hover
const newsContainer = document.querySelector('.news-container');
newsContainer.addEventListener('mouseenter', () => clearInterval(scrollInterval));
newsContainer.addEventListener('mouseleave', () => {
  scrollInterval = setInterval(autoScroll, 2500);
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

