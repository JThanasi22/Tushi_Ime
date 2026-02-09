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
    const animationTypes = ['celebrationFloat', 'celebrationFloatReverse', 'celebrationFloatLeft', 'celebrationFloatRight'];
    
    // Create many items for a full-screen effect
    for (let i = 0; i < 100; i++) {
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
            if (i % 4 === 0) {
                // Start from bottom
                item.style.left = Math.random() * 100 + '%';
                item.style.bottom = '0';
                item.style.animationName = 'celebrationFloat';
            } else if (i % 4 === 1) {
                // Start from top
                item.style.left = Math.random() * 100 + '%';
                item.style.top = '0';
                item.style.animationName = 'celebrationFloatReverse';
            } else if (i % 4 === 2) {
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
            
            // Random delay
            item.style.animationDelay = Math.random() * 2 + 's';
            item.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            celebrationContainer.appendChild(item);
            
            // Remove after animation
            setTimeout(() => {
                if (item.parentNode) {
                    item.remove();
                }
            }, 12000);
        }, i * 50); // Stagger creation
    }
    
    // Continue creating items for a while
    let itemCount = 100;
    const interval = setInterval(() => {
        if (itemCount >= 300) {
            clearInterval(interval);
            return;
        }
        
        for (let j = 0; j < 10; j++) {
            const item = document.createElement('div');
            const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
            item.textContent = randomItem;
            
            if (hearts.includes(randomItem)) {
                item.className = 'celebration-item celebration-heart';
            } else if (roses.includes(randomItem)) {
                item.className = 'celebration-item celebration-rose';
            } else {
                item.className = 'celebration-item celebration-flower';
            }
            
            const randomX = (Math.random() - 0.5) * 2;
            const randomY = (Math.random() - 0.5) * 2;
            item.style.setProperty('--random-x', randomX);
            item.style.setProperty('--random-y', randomY);
            
            const direction = Math.floor(Math.random() * 4);
            if (direction === 0) {
                item.style.left = Math.random() * 100 + '%';
                item.style.bottom = '0';
                item.style.animationName = 'celebrationFloat';
            } else if (direction === 1) {
                item.style.left = Math.random() * 100 + '%';
                item.style.top = '0';
                item.style.animationName = 'celebrationFloatReverse';
            } else if (direction === 2) {
                item.style.left = '0';
                item.style.top = Math.random() * 100 + '%';
                item.style.animationName = 'celebrationFloatLeft';
            } else {
                item.style.right = '0';
                item.style.top = Math.random() * 100 + '%';
                item.style.animationName = 'celebrationFloatRight';
            }
            
            const size = 20 + Math.random() * 40;
            item.style.fontSize = size + 'px';
            item.style.animationDelay = Math.random() * 1 + 's';
            item.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            celebrationContainer.appendChild(item);
            
            setTimeout(() => {
                if (item.parentNode) {
                    item.remove();
                }
            }, 12000);
        }
        
        itemCount += 10;
    }, 2000);
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
    
    // Show call button with animation
    if (callButton) {
        callButton.style.display = 'block';
        callButton.style.animation = 'fadeIn 1s ease-in, pulse 2s infinite';
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
