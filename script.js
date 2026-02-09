// Create floating hearts
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-background');
    const heartEmoji = '❤️';
    const numberOfHearts = 10;
    
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmoji;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.animationDuration = (10 + Math.random() * 10) + 's';
        heartsContainer.appendChild(heart);
    }
}

// NO button dodge logic
let noClickCount = 0;
const noButtonMessages = [
    'JO 🙈',
    'Je e sigurt? 🥺',
    'Mos më thyej zemrën 💔',
    'Provo përsëri 😌'
];

function handleNoButton() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    
    // Update button text
    if (noClickCount < noButtonMessages.length - 1) {
        noClickCount++;
        noBtn.textContent = noButtonMessages[noClickCount];
    }
    
    // Calculate random position (avoiding edges)
    const maxX = window.innerWidth - noBtn.offsetWidth - 40;
    const maxY = window.innerHeight - noBtn.offsetHeight - 40;
    const minX = 20;
    const minY = 20;
    
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;
    
    // Apply position with smooth transition
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.3s ease';
    
    // Make YES button bigger to encourage clicking
    if (noClickCount >= 2) {
        yesBtn.style.transform = 'scale(1.2)';
        yesBtn.style.transition = 'transform 0.3s ease';
    }
}

// YES button - heart explosion and redirect
function handleYesButton() {
    const yesBtn = document.getElementById('yesBtn');
    const container = document.querySelector('.container');
    
    // Create heart explosion effect
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.className = 'heart-explosion';
            
            const rect = yesBtn.getBoundingClientRect();
            const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 200;
            const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 200;
            
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }, i * 50);
    }
    
    // Fade out container
    container.style.transition = 'opacity 0.8s ease';
    container.style.opacity = '0';
    
    // Redirect after animation
    setTimeout(() => {
        window.location.href = 'yes.html';
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Event listeners
    yesBtn.addEventListener('click', handleYesButton);
    noBtn.addEventListener('click', handleNoButton);
    noBtn.addEventListener('touchstart', handleNoButton);
    noBtn.addEventListener('mouseenter', function() {
        if (noClickCount > 0) {
            // Slight movement on hover after first click
            const slightX = (Math.random() - 0.5) * 30;
            const slightY = (Math.random() - 0.5) * 30;
            const currentLeft = parseInt(noBtn.style.left) || noBtn.offsetLeft;
            const currentTop = parseInt(noBtn.style.top) || noBtn.offsetTop;
            noBtn.style.left = (currentLeft + slightX) + 'px';
            noBtn.style.top = (currentTop + slightY) + 'px';
        }
    });
});
