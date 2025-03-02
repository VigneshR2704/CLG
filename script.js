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



faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    console.log('FAQ item clicked');  // Debugging line
    const faqItem = question.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    faqItem.classList.toggle('active');
    if (faqItem.classList.contains('active')) {
      faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
    } else {
      faqAnswer.style.maxHeight = '0';
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search');
  const locationFilter = document.getElementById('location');
  const categoryFilter = document.getElementById('category');
  const jobCards = document.querySelectorAll('.job-card');

  function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();
    const location = locationFilter.value.toLowerCase();
    const category = categoryFilter.value.toLowerCase();

    jobCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const company = card.querySelector('.company').textContent.toLowerCase();
      const jobLocation = card.querySelector('.location').textContent.toLowerCase();
      const jobCategory = card.querySelector('.description').textContent.toLowerCase();

      const matchesSearch = title.includes(searchTerm) || company.includes(searchTerm);
      const matchesLocation = location === '' || jobLocation.includes(location);
      const matchesCategory = category === '' || jobCategory.includes(category);

      if (matchesSearch && matchesLocation && matchesCategory) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  searchInput.addEventListener('input', filterJobs);
  locationFilter.addEventListener('change', filterJobs);
  categoryFilter.addEventListener('change', filterJobs);
});


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate form fields
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Submit form data using Fetch API
    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const resultElement = document.getElementById('result');
        if (data.success) {
          resultElement.textContent = 'Message sent successfully!';
          resultElement.style.color = 'green';
          form.reset(); // Clear the form
        } else {
          resultElement.textContent = 'Failed to send message. Please try again.';
          resultElement.style.color = 'red';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        const resultElement = document.getElementById('result');
        resultElement.textContent = 'An error occurred. Please try again.';
        resultElement.style.color = 'red';
      });
  });

  // Add real-time validation feedback
  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
      }
    });
  });
});


        // Enable form validation on page load
        (function () {
          'use strict';

          // Wait for the DOM to fully load
          window.addEventListener('load', function () {
              const form = document.getElementById('form');

              // Add event listener for form submission
              form.addEventListener('submit', function (event) {
                  if (!form.checkValidity()) {
                      event.preventDefault();
                      event.stopPropagation();
                  }

                  // Add visual feedback for validation
                  form.classList.add('was-validated');
              }, false);
          });
      })();