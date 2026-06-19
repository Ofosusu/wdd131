
'use strict';


const beaches = [
  {
    id: 1,
    name: 'Labadi Beach',
    region: 'Greater Accra',
    category: 'social',
    description: 'The most popular beach in Accra, famous for its vibrant atmosphere, live music, and lively weekends by the Atlantic.',
    features: ['Live Music', 'Restaurants', 'Beach Volleyball'],
    rating: 4.5,
    bestSeason: 'Nov–Feb',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=75',
    alt: 'Golden sandy Labadi Beach with palm trees and blue waves'
  },
  {
    id: 2,
    name: 'Busua Beach',
    region: 'Western Region',
    category: 'surf',
    description: 'Ghana\'s surf capital with consistent Atlantic swells, a laid-back vibe, and access to the historic Fort Metal Cross.',
    features: ['Surfing', 'Snorkeling', 'Historic Fort'],
    rating: 4.8,
    bestSeason: 'Nov–Apr',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700&q=75',
    alt: 'Surfers riding waves at Busua Beach at golden hour'
  },
  {
    id: 3,
    name: 'Anomabo Beach',
    region: 'Central Region',
    category: 'cultural',
    description: 'A tranquil stretch near a historic slave fort, blending serene coastline with deep cultural significance and local fishing culture.',
    features: ['Fishing Village', 'Heritage Site', 'Quiet Coves'],
    rating: 4.3,
    bestSeason: 'Nov–Mar',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=75',
    alt: 'Peaceful Anomabo Beach with traditional fishing boats on shore'
  },
  {
    id: 4,
    name: 'Green Turtle Lodge',
    region: 'Western Region',
    category: 'eco',
    description: 'Eco-friendly retreat on a pristine stretch of coast near Akwidaa — a paradise for sea turtle watching and responsible tourism.',
    features: ['Sea Turtles', 'Eco Lodge', 'Nature Trails'],
    rating: 4.9,
    bestSeason: 'Oct–Mar',
    image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=700&q=75',
    alt: 'Pristine eco beach at sunset with green vegetation and calm waves'
  },
  {
    id: 5,
    name: 'Kokrobite Beach',
    region: 'Greater Accra',
    category: 'social',
    description: 'A favourite weekend escape from Accra with reggae music, cultural drumming, local craft vendors, and fresh seafood.',
    features: ['Craft Markets', 'Drumming', 'Seafood'],
    rating: 4.2,
    bestSeason: 'Nov–Feb',
    image: 'https://images.unsplash.com/photo-1601581975053-7c036a2e3e3e?w=700&q=75',
    alt: 'Colourful umbrellas and people relaxing on Kokrobite Beach'
  },
  {
    id: 6,
    name: 'Cape Three Points',
    region: 'Western Region',
    category: 'eco',
    description: 'The southernmost point of Ghana — a remote, forested cape with untouched beaches, whale watching, and incredible biodiversity.',
    features: ['Whale Watching', 'Forest Hikes', 'Secluded'],
    rating: 4.7,
    bestSeason: 'Dec–Mar',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=700&q=75',
    alt: 'Remote forest-lined beach at Cape Three Points, Ghana'
  }
];


function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', `${isOpen}`);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach(img => observer.observe(img));
  }
}


function renderFeaturedBeaches() {
  const container = document.querySelector('.beach-grid');
  if (!container) return;

  
  const featured = beaches.slice(0, 3);

  container.innerHTML = featured.map(beach => `
    <article class="beach-card">
      <img
        class="beach-card-img"
        src="${beach.image}"
        alt="${beach.alt}"
        loading="lazy"
      />
      <div class="beach-card-body">
        <p class="beach-card-region">${beach.region}</p>
        <h3>${beach.name}</h3>
        <p>${beach.description}</p>
        <div class="beach-card-meta">
          <span>⭐ ${beach.rating}</span>
          <span>📅 Best: ${beach.bestSeason}</span>
        </div>
      </div>
    </article>
  `).join('');
}


function renderAllBeaches(filter = 'all') {
  const container = document.querySelector('.beaches-grid');
  if (!container) return;

  const filtered = filter === 'all'
    ? beaches
    : beaches.filter(b => b.category === filter);

  container.innerHTML = filtered.map(beach => `
    <article class="destination-card" data-category="${beach.category}">
      <div class="dest-img-wrap">
        <img
          src="${beach.image}"
          alt="${beach.alt}"
          loading="lazy"
        />
        <span class="dest-tag">${beach.region}</span>
        <span class="dest-rating">⭐ ${beach.rating}</span>
      </div>
      <div class="dest-body">
        <h3>${beach.name}</h3>
        <p>${beach.description}</p>
        <div class="dest-features">
          ${beach.features.map(f => `<span class="dest-feature">${f}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  // Re-init lazy loading for new images
  initLazyLoad();
}

function initBeachFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      renderAllBeaches(filter);
    });
  });

  renderAllBeaches(); // initial render
}

// ===========================
// SEASON CARDS (interactive)
// ===========================
function initSeasonCards() {
  const cards = document.querySelectorAll('.season-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

// ===========================

const galleryItems = [
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80', caption: 'Labadi Beach — Greater Accra' },
  { src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80', caption: 'Busua Beach — Western Region' },
  { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80', caption: 'Anomabo — Central Region' },
  { src: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=900&q=80', caption: 'Cape Three Points — Western Region' },
  { src: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80', caption: 'Remote shoreline near Akwidaa' },
  { src: 'https://images.unsplash.com/photo-1601581975053-7c036a2e3e3e?w=900&q=80', caption: 'Kokrobite — Greater Accra' },
  { src: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=900&q=80', caption: 'Sunrise over the Atlantic, Ghana' },
  { src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=900&q=80', caption: 'Traditional fishing canoes at dusk' }
];

let currentGalleryIndex = 0;

function openLightbox(index) {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  currentGalleryIndex = index;
  updateLightboxContent();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const item = galleryItems[currentGalleryIndex];
  const img = lightbox.querySelector('.lightbox-img');
  const caption = lightbox.querySelector('.lightbox-caption');

  img.src = item.src;
  img.alt = item.caption;
  caption.textContent = `${item.caption} (${currentGalleryIndex + 1} / ${galleryItems.length})`;
}

function initGallery() {
  const grid = document.querySelector('.gallery-grid');
  if (!grid) return;

  grid.innerHTML = galleryItems.map((item, index) => `
    <div class="gallery-item" data-index="${index}" tabindex="0" role="button" aria-label="View ${item.caption}">
      <img
        src="${item.src}"
        alt="${item.caption}"
        loading="lazy"
      />
      <div class="gallery-caption">
        <p>${item.caption}</p>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(index);
    });
  });

  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
  });
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateLightboxContent();
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightboxContent();
    }
    if (e.key === 'ArrowRight') {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
      updateLightboxContent();
    }
  });
}

// ===========================
// TRIP PLANNER – Form + localStorage
// ===========================
const STORAGE_KEY = 'ghana_trips';

function getSavedTrips() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveTripToStorage(trip) {
  const trips = getSavedTrips();
  trips.push(trip);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

function clearTrips() {
  localStorage.removeItem(STORAGE_KEY);
  renderSavedTrips();
}

function renderSavedTrips() {
  const panel = document.querySelector('.saved-trips-panel');
  if (!panel) return;

  const trips = getSavedTrips();
  const listEl = panel.querySelector('.trips-list');

  if (!listEl) return;

  if (trips.length === 0) {
    listEl.innerHTML = `<p class="no-trips">No saved trips yet. Plan your first adventure!</p>`;
    return;
  }

  listEl.innerHTML = trips.map((trip, i) => `
    <div class="saved-trip-item">
      <h4>${trip.destination}</h4>
      <p>${trip.name} · ${trip.arrival} → ${trip.departure} · ${trip.travelers} traveler${trip.travelers > 1 ? 's' : ''}</p>
      ${trip.interests.length > 0 ? `<p style="margin-top:0.3rem;font-size:0.78rem;color:var(--sea)">${trip.interests.join(', ')}</p>` : ''}
    </div>
  `).join('');
}

function initTripForm() {
  const form = document.querySelector('.trip-form form');
  if (!form) return;

  renderSavedTrips();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.querySelector('.form-message');

    const name       = form.querySelector('#name').value.trim();
    const email      = form.querySelector('#email').value.trim();
    const dest       = form.querySelector('#destination').value;
    const arrival    = form.querySelector('#arrival').value;
    const departure  = form.querySelector('#departure').value;
    const travelers  = parseInt(form.querySelector('#travelers').value, 10);
    const notes      = form.querySelector('#notes').value.trim();
    const interests  = [...form.querySelectorAll('input[name="interest"]:checked')].map(cb => cb.value);

    // Conditional validation
    if (!name || !email || !dest || !arrival || !departure) {
      msg.className = 'form-message error';
      msg.textContent = 'Please fill in all required fields.';
      return;
    }

    if (new Date(departure) <= new Date(arrival)) {
      msg.className = 'form-message error';
      msg.textContent = 'Your departure date must be after your arrival date.';
      return;
    }

    const trip = { name, email, destination: dest, arrival, departure, travelers, notes, interests };
    saveTripToStorage(trip);
    renderSavedTrips();

    msg.className = 'form-message success';
    msg.textContent = `Your trip to ${dest} has been saved! We'll be in touch at ${email}.`;
    form.reset();
  });

  const clearBtn = document.querySelector('.clear-trips-btn');
  if (clearBtn) clearBtn.addEventListener('click', clearTrips);
}

// ===========================
// VISIT COUNTER (localStorage)
// ===========================
function trackVisits() {
  const key = 'ghana_beach_visits';
  const count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
  localStorage.setItem(key, `${count}`);

  const el = document.querySelector('.visit-count');
  if (el) {
    el.textContent = count === 1
      ? `Welcome! This is your first visit.`
      : `Welcome back! You've visited ${count} times.`;
  }
}

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLazyLoad();
  initSeasonCards();
  renderFeaturedBeaches();  // home page
  initBeachFilters();       // beaches page
  initGallery();            // gallery page
  initTripForm();           // plan page
  trackVisits();
});
