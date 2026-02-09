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

// Create falling photo and video hearts
function createFallingPhotoHearts() {
    // List of images to use - all except us.jpg
    const images = [
        'assets/IMG_1562.jpg',
        'assets/IMG_1564.jpg',
    ];
    
    // List of videos to use - all converted videos
    const videos = [
        'assets/IMG_0846.mp4',
        'assets/IMG_0924.mp4',
        'assets/IMG_0925.mp4',
        'assets/IMG_1568.mp4',
        'assets/IMG_1650.mp4',
        'assets/IMG_1651.mp4',
        'assets/IMG_1652.mp4',
        'assets/IMG_6235.mp4',
        'assets/IMG_6236.mp4',
        'assets/IMG_6237.mp4',
        'assets/IMG_6238.mp4',
    ];
    
    // Combine all media (images and videos)
    const allMedia = [...images, ...videos];
    
    // If no media available, don't create hearts
    if (allMedia.length === 0) return;
    
    const heartsContainer = document.querySelector('.hearts-background');
    
    // Create falling heart with photo or video
    function createFallingHeart() {
        const heart = document.createElement('div');
        heart.className = 'photo-heart';
        
        // Random media from the list
        const randomMedia = allMedia[Math.floor(Math.random() * allMedia.length)];
        const isVideo = randomMedia.endsWith('.mp4');
        
        if (isVideo) {
            // Create video element
            const video = document.createElement('video');
            video.src = randomMedia;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.alt = 'Video';
            video.onerror = function() {
                // If video fails to load, remove the heart
                heart.remove();
            };
            heart.appendChild(video);
        } else {
            // Create image element
            const img = document.createElement('img');
            img.src = randomMedia;
            img.alt = 'Photo';
            img.onerror = function() {
                // If image fails to load, remove the heart
                heart.remove();
            };
            heart.appendChild(img);
        }
        
        // Random starting position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random drift (horizontal movement while falling)
        const driftX = (Math.random() - 0.5) * 2; // -1 to 1
        heart.style.setProperty('--drift-x', driftX);
        
        // Random size (60px to 120px)
        const size = 60 + Math.random() * 60;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        
        // Random animation duration (8 to 15 seconds)
        const duration = 8 + Math.random() * 7;
        heart.style.animationDuration = duration + 's';
        
        // Random delay
        heart.style.animationDelay = Math.random() * 1 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove after animation completes
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, (duration + 2) * 1000);
    }
    
    // Create initial falling hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFallingHeart();
        }, i * 1000);
    }
    
    // Continue creating falling hearts continuously
    setInterval(() => {
        createFallingHeart();
    }, 2000); // Create a new heart every 2 seconds for continuous effect
}

// NO button dodge logic
let noClickCount = 0;
const noButtonMessages = [
    'JO 🙈',
    'Je e sigurt? 🥺',
    'Mos më thyej zemrën 💔',
    'Provo përsëri 😌',
    'Të lutem? 🥺',
    'Më lër një shans tjetër 💕',
    'Unë nuk do të heq dorë ❤️',
    'Ti je e veçantë për mua 🌹',
    'Mos më refuzo 😢',
    'Unë të dua shumë 💖',
    'Më jep një mundësi tjetër 🥰',
    'Zemra ime është e jotja 💗',
    'Mos më lë kështu 😭',
    'Unë do të pres për ty ⏳',
    'Ti je e vetmja për mua 💝',
    'Mos më bëj kështu të mërzitur 😔',
    'Unë do të vazhdoj të përpiqem 💪',
    'Ti je gjithçka për mua 🌟',
    'Mos më thyej kështu zemrën 💔',
    'Unë të dua më shumë se çdo gjë ❤️',
    'Më jep një shans 🥺',
    'Ti je e bukur dhe e veçantë 🌸',
    'Mos më refuzo, të lutem 🙏',
    'Unë do të jem këtu për ty 💕',
    'Mos më lë vetëm 😢',
    'Ti je e vetmja që dua 🌹',
    'Unë do të pres deri sa të më pranosh ⏰',
    'Mos më bëj kështu të trishtuar 😞',
    'Unë të dua me gjithë zemrën ❤️',
    'Ti je e përsosur për mua ✨',
    'Mos më refuzo, të lutem shumë 🥺',
    'Unë do të jem i patundur 💪',
    'Ti je gjithçka që dua 🌟',
    'Mos më lë kështu të vetëm 😭',
    'Unë do të vazhdoj të të dua ❤️',
    'Ti je e veçantë dhe e bukur 🌸',
    'Mos më thyej zemrën, të lutem 💔',
    'Unë do të pres për ty përgjithmonë ⏳',
    'Ti je e vetmja për mua 💝',
    'Mos më refuzo, unë të dua shumë 🥰'
];

function handleNoButton() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    
    // Update button text - cycle through all messages
    noClickCount++;
    const messageIndex = noClickCount % noButtonMessages.length;
    noBtn.textContent = noButtonMessages[messageIndex];
    
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
    // Create falling hearts on both pages
    createFallingPhotoHearts();
    
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Event listeners (only on index.html)
    if (yesBtn) {
        yesBtn.addEventListener('click', handleYesButton);
    }
    if (noBtn) {
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
    }
});
