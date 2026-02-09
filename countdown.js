// Set target date - Next Valentine's Day (February 14 at 00:00)
// Automatically calculates the next Valentine's Day
function getNextValentinesDay() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const valentinesThisYear = new Date(currentYear, 1, 14, 0, 0, 0); // February 14 (month is 0-indexed)
    
    // If Valentine's Day has already passed this year, use next year
    if (now > valentinesThisYear) {
        return new Date(currentYear + 1, 1, 14, 0, 0, 0).getTime();
    } else {
        return valentinesThisYear.getTime();
    }
}

const targetDate = getNextValentinesDay();

// Celebration animation - Hearts and Flowers
let celebrationActive = false;

function createCelebrationAnimation() {
    if (celebrationActive) return;
    celebrationActive = true;
    
    // Create celebration container
    let celebrationContainer = document.getElementById('celebrationAnimation');
    if (!celebrationContainer) {
        celebrationContainer = document.createElement('div');
        celebrationContainer.id = 'celebrationAnimation';
        celebrationContainer.className = 'celebration-animation';
        document.body.appendChild(celebrationContainer);
    }
    
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '🧡'];
    const flowers = ['🌹', '🌺', '🌸', '🌷', '🌻', '💐', '🌼', '🏵️'];
    const roses = ['🌹', '🌺', '🌸'];
    
    const allItems = [...hearts, ...flowers, ...roses];
    const ANIMATION_DURATION = 5000; // 5 seconds total
    
    // Create items for a full-screen effect within 5 seconds
    const totalItems = 80; // Reduced for 5 second duration
    const creationInterval = ANIMATION_DURATION / totalItems; // Spread creation over 5 seconds
    
    for (let i = 0; i < totalItems; i++) {
        setTimeout(() => {
            const item = document.createElement('div');
            const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
            item.textContent = randomItem;
            
            // Determine class based on emoji type
            if (hearts.includes(randomItem)) {
                item.className = 'celebration-item celebration-heart';
            } else if (roses.includes(randomItem)) {
                item.className = 'celebration-item celebration-rose';
            } else {
                item.className = 'celebration-item celebration-flower';
            }
            
            // Random position
            const randomX = (Math.random() - 0.5) * 2; // -1 to 1
            const randomY = (Math.random() - 0.5) * 2; // -1 to 1
            item.style.setProperty('--random-x', randomX);
            item.style.setProperty('--random-y', randomY);
            
            // Random starting position
            const direction = Math.floor(Math.random() * 4);
            if (direction === 0) {
                // Start from bottom
                item.style.left = Math.random() * 100 + '%';
                item.style.bottom = '0';
                item.style.animationName = 'celebrationFloat';
            } else if (direction === 1) {
                // Start from top
                item.style.left = Math.random() * 100 + '%';
                item.style.top = '0';
                item.style.animationName = 'celebrationFloatReverse';
            } else if (direction === 2) {
                // Start from left
                item.style.left = '0';
                item.style.top = Math.random() * 100 + '%';
                item.style.animationName = 'celebrationFloatLeft';
            } else {
                // Start from right
                item.style.right = '0';
                item.style.top = Math.random() * 100 + '%';
                item.style.animationName = 'celebrationFloatRight';
            }
            
            // Random size
            const size = 20 + Math.random() * 40;
            item.style.fontSize = size + 'px';
            
            // Shorter animation duration to fit 5 second window
            item.style.animationDelay = '0s';
            item.style.animationDuration = '5s';
            
            celebrationContainer.appendChild(item);
            
            // Remove after animation completes
            setTimeout(() => {
                if (item.parentNode) {
                    item.remove();
                }
            }, ANIMATION_DURATION);
        }, i * creationInterval); // Stagger creation over 5 seconds
    }
    
    // Remove entire celebration container after 5 seconds
    setTimeout(() => {
        if (celebrationContainer && celebrationContainer.parentNode) {
            celebrationContainer.remove();
        }
        celebrationActive = false; // Reset flag so animation can run again if needed
    }, ANIMATION_DURATION);
}

// Function to generate QR code
function generateQRCode() {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const qrCodeCanvas = document.getElementById('qrCode');
    
    if (!qrCodeContainer || !qrCodeCanvas) return;
    
    // YouTube URL to encode in QR code
    const youtubeUrl = 'https://www.youtube.com/watch?v=S6nBo-vDoZ4&list=RDS6nBo-vDoZ4&start_radio=1';
    
    // Check if QRCode library is loaded
    if (typeof QRCode !== 'undefined') {
        QRCode.toCanvas(qrCodeCanvas, youtubeUrl, {
            width: 250,
            margin: 2,
            color: {
                dark: '#c2185b',
                light: '#ffffff'
            }
        }, function (error) {
            if (error) {
                console.error('QR Code generation error:', error);
                // Fallback to online service if canvas generation fails
                useOnlineQRCode(qrCodeCanvas, youtubeUrl);
            }
        });
    } else {
        // Fallback: use online QR code service if library not loaded
        useOnlineQRCode(qrCodeCanvas, youtubeUrl);
    }
}

// Fallback function to use online QR code service
function useOnlineQRCode(canvasElement, url) {
    const qrCodeWrapper = canvasElement.parentElement;
    if (!qrCodeWrapper) return;
    
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}&color=c2185b&bgcolor=ffffff`;
    const img = document.createElement('img');
    img.src = qrCodeUrl;
    img.alt = 'QR Code';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    img.style.margin = '0 auto';
    img.style.borderRadius = '10px';
    
    // Replace canvas with img
    qrCodeWrapper.replaceChild(img, canvasElement);
}

// Function to show countdown end state (reusable for test button)
function showCountdownEnd() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const finalMessageElement = document.getElementById('finalMessage');
    const countdownContainer = document.querySelector('.countdown-container');
    const countdownText = document.querySelector('.countdown-text');
    const callButton = document.getElementById('callButton');
    const testButton = document.getElementById('testButton');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    
    // Set countdown to 0
    if (daysElement) daysElement.textContent = '0';
    if (hoursElement) hoursElement.textContent = '0';
    if (minutesElement) minutesElement.textContent = '0';
    if (secondsElement) secondsElement.textContent = '0';
    
    // Show final message
    if (finalMessageElement) {
        finalMessageElement.textContent = 'Tani është koha ❤️';
    }
    
    // Hide countdown elements
    if (countdownContainer) {
        countdownContainer.style.display = 'none';
    }
    
    if (countdownText) {
        countdownText.style.display = 'none';
    }
    
    // Hide test button
    if (testButton) {
        testButton.style.display = 'none';
    }
    
    // Hide call button
    if (callButton) {
        callButton.style.display = 'none';
    }
    
    // Show QR code
    if (qrCodeContainer) {
        qrCodeContainer.style.display = 'block';
        qrCodeContainer.style.animation = 'fadeIn 1s ease-in';
        generateQRCode();
    }
    
    // Start celebration animation
    createCelebrationAnimation();
}

// Update countdown every second
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        // Countdown has ended
        showCountdownEnd();
        return;
    }
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display
    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Handle image loading error
document.addEventListener('DOMContentLoaded', function() {
    const photo = document.getElementById('ourPhoto');
    if (photo) {
        photo.addEventListener('error', function() {
            // If image doesn't exist, hide the container or show placeholder
            this.style.display = 'none';
            const container = this.closest('.photo-container');
            if (container) {
                container.innerHTML = '<p style="padding: 40px; color: #999;">Vendosni foton tuaj në assets/us.jpg</p>';
            }
        });
    }
    
    // Test button functionality
    const testButton = document.getElementById('testButton');
    if (testButton) {
        testButton.addEventListener('click', function() {
            showCountdownEnd();
        });
    }
    
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
