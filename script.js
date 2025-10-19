// Configuration
const PASSWORD = 'catalina2025'; // Change this to your preferred password
const SESSION_KEY = 'catalina_gallery_session';

// State
let currentMediaIndex = 0;
let mediaItems = [];
let currentFilter = 'all';

// DOM Elements
const passwordScreen = document.getElementById('password-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordError = document.getElementById('password-error');
const logoutBtn = document.getElementById('logout-btn');
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    initializeEventListeners();
    loadGallery();
});

// Session Management
function checkSession() {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === 'authenticated') {
        showMainContent();
    }
}

function showMainContent() {
    passwordScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
}

function showPasswordScreen() {
    passwordScreen.classList.remove('hidden');
    mainContent.classList.add('hidden');
    passwordInput.value = '';
    passwordError.textContent = '';
}

// Event Listeners
function initializeEventListeners() {
    // Password submission
    passwordSubmit.addEventListener('click', handlePasswordSubmit);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handlePasswordSubmit();
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem(SESSION_KEY);
        showPasswordScreen();
    });

    // Filter tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterGallery();
        });
    });

    // Lightbox controls
    closeLightbox.addEventListener('click', closeLightboxView);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxView();
    });
    prevBtn.addEventListener('click', showPreviousMedia);
    nextBtn.addEventListener('click', showNextMedia);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightboxView();
            if (e.key === 'ArrowLeft') showPreviousMedia();
            if (e.key === 'ArrowRight') showNextMedia();
        }
    });

    // Upload
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
}

// Password Handling
function handlePasswordSubmit() {
    const enteredPassword = passwordInput.value;

    if (enteredPassword === PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, 'authenticated');
        passwordError.textContent = '';
        showMainContent();
    } else {
        passwordError.textContent = 'Incorrect password. Please try again.';
        passwordInput.value = '';
        passwordInput.focus();

        // Shake animation
        passwordInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
    }
}

// Gallery Management
function loadGallery() {
    // Load media from localStorage
    const savedMedia = localStorage.getItem('catalina_media');
    if (savedMedia) {
        mediaItems = JSON.parse(savedMedia);
        renderGallery();
    }
}

function renderGallery() {
    gallery.innerHTML = '';

    mediaItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.type}`;
        galleryItem.dataset.type = item.type;

        if (item.type === 'photo') {
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="Photo ${index + 1}">
                <div class="overlay">
                    <span class="view-btn">View</span>
                </div>
            `;
        } else {
            galleryItem.innerHTML = `
                <video src="${item.src}"></video>
                <div class="overlay">
                    <span class="view-btn">Play</span>
                </div>
            `;
        }

        galleryItem.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(galleryItem);
    });

    filterGallery();
}

function filterGallery() {
    const items = gallery.querySelectorAll('.gallery-item');

    items.forEach(item => {
        if (currentFilter === 'all') {
            item.style.display = 'block';
        } else if (currentFilter === 'photos' && item.dataset.type === 'photo') {
            item.style.display = 'block';
        } else if (currentFilter === 'videos' && item.dataset.type === 'video') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// File Upload
function handleFileUpload(e) {
    const files = Array.from(e.target.files);

    files.forEach(file => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const isVideo = file.type.startsWith('video/');
            const mediaItem = {
                type: isVideo ? 'video' : 'photo',
                src: event.target.result,
                name: file.name,
                date: new Date().toISOString()
            };

            mediaItems.push(mediaItem);
            saveMedia();
            renderGallery();
        };

        reader.readAsDataURL(file);
    });

    fileInput.value = '';
}

function saveMedia() {
    localStorage.setItem('catalina_media', JSON.stringify(mediaItems));
}

// Lightbox
function openLightbox(index) {
    currentMediaIndex = index;
    showMediaInLightbox();
    lightbox.classList.remove('hidden');
}

function closeLightboxView() {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
    lightboxVideo.src = '';
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
}

function showMediaInLightbox() {
    const item = mediaItems[currentMediaIndex];

    if (item.type === 'photo') {
        lightboxImg.src = item.src;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();
    } else {
        lightboxVideo.src = item.src;
        lightboxVideo.style.display = 'block';
        lightboxImg.style.display = 'none';
    }
}

function showPreviousMedia() {
    currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
    showMediaInLightbox();
}

function showNextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
    showMediaInLightbox();
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
