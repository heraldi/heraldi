// Modern Love Message Application
class ModernLoveMessage {
    constructor() {
        this.letters = [];
        this.highestZ = 10;
        this.currentTheme = 'default';
        this.themes = ['default', 'dark-theme', 'ocean-theme', 'forest-theme'];
        this.envelopeOpened = false;
        this.currentLetterIndex = 0;
        this.totalLetters = 5;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupVanillaTilt();
    }

    setupEventListeners() {
        // Envelope click event
        const envelope = document.getElementById('envelope');
        envelope.addEventListener('click', () => {
            this.openEnvelope();
        });

        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.previousLetter();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextLetter();
        });

        // Touch events for swipe
        const lettersContainer = document.getElementById('lettersContainer');
        lettersContainer.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        }, { passive: true });

        lettersContainer.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        }, { passive: true });

        // Mouse events for swipe
        lettersContainer.addEventListener('mousedown', (e) => {
            this.handleMouseDown(e);
        });

        lettersContainer.addEventListener('mouseup', (e) => {
            this.handleMouseUp(e);
        });


        // Theme button
        document.getElementById('themeBtn').addEventListener('click', () => {
            this.changeTheme();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousLetter();
            } else if (e.key === 'ArrowRight') {
                this.nextLetter();
            } else if (e.key === 't' && e.ctrlKey) {
                e.preventDefault();
                this.changeTheme();
            }
        });
    }

    setupVanillaTilt() {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    openEnvelope() {
        if (this.envelopeOpened) return;
        
        this.envelopeOpened = true;
        const envelope = document.getElementById('envelope');
        const envelopeContainer = document.getElementById('envelopeContainer');
        const lettersContainer = document.getElementById('lettersContainer');
        
        // Add open class to envelope
        envelope.classList.add('open');
        
        // Hide envelope after animation
        setTimeout(() => {
            envelopeContainer.style.display = 'none';
            lettersContainer.classList.add('show');
            
            // Initialize letters after envelope opens
            this.setupLetters();
            this.setGreetingBasedOnTime();
            this.showLetter(0);
            this.createIndicators();
            this.updateNavigationButtons();
        }, 800);
    }

    setupLetters() {
        const lettersElements = document.querySelectorAll('.letter');
        lettersElements.forEach((letter, index) => {
            this.letters.push(new Letter(letter, this.highestZ - index));
        });
    }

    showLetter(index) {
        // Hide all letters
        this.letters.forEach((letter, i) => {
            letter.element.classList.remove('active', 'prev');
            if (i < index) {
                letter.element.classList.add('prev');
            }
        });

        // Show current letter
        if (this.letters[index]) {
            this.letters[index].element.classList.add('active');
        }

        // Update indicators
        this.updateIndicators();
    }

    nextLetter() {
        if (this.currentLetterIndex < this.totalLetters - 1) {
            this.currentLetterIndex++;
            this.showLetter(this.currentLetterIndex);
            this.updateNavigationButtons();
        }
    }

    previousLetter() {
        if (this.currentLetterIndex > 0) {
            this.currentLetterIndex--;
            this.showLetter(this.currentLetterIndex);
            this.updateNavigationButtons();
        }
    }

    createIndicators() {
        const indicatorsContainer = document.getElementById('letterIndicators');
        for (let i = 0; i < this.totalLetters; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicatorsContainer.appendChild(indicator);
        }
    }

    setGreetingBasedOnTime() {
        const greetingElement = document.getElementById('greetingMessage');
        const hour = new Date().getHours();
        let greeting = '';
        
        if (hour >= 5 && hour < 12) {
            greeting = 'Haii, Selamat Pagi nona muda 😊';
        } else if (hour >= 12 && hour < 15) {
            greeting = 'Haii, Selamat Siang nona muda 😊';
        } else if (hour >= 15 && hour < 18) {
            greeting = 'Haii, Selamat Sore nona muda 😊';
        } else {
            greeting = 'Haii, Selamat Malam nona muda 😊';
        }
        
        greetingElement.textContent = greeting;
    }

    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentLetterIndex);
        });
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.disabled = this.currentLetterIndex === 0;
        nextBtn.disabled = this.currentLetterIndex === this.totalLetters - 1;
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipeGesture();
    }

    handleMouseDown(e) {
        this.touchStartX = e.screenX;
    }

    handleMouseUp(e) {
        this.touchEndX = e.screenX;
        this.handleSwipeGesture();
    }

    handleSwipeGesture() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next letter
                this.nextLetter();
            } else {
                // Swipe right - previous letter
                this.previousLetter();
            }
        }
    }


    changeTheme() {
        const body = document.body;
        const currentThemeIndex = this.themes.indexOf(this.currentTheme);
        const nextThemeIndex = (currentThemeIndex + 1) % this.themes.length;
        
        // Remove current theme class
        if (this.currentTheme !== 'default') {
            body.classList.remove(this.currentTheme);
        }
        
        // Add new theme class
        this.currentTheme = this.themes[nextThemeIndex];
        if (this.currentTheme !== 'default') {
            body.classList.add(this.currentTheme);
        }
        
        // Update button text
        const themeBtn = document.getElementById('themeBtn');
        const themeNames = {
            'default': 'Change Theme',
            'dark-theme': 'Dark Theme',
            'ocean-theme': 'Ocean Theme',
            'forest-theme': 'Forest Theme'
        };
        themeBtn.textContent = themeNames[this.currentTheme];
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.background = 'rgba(0, 0, 0, 0.8)';
        notification.style.color = 'white';
        notification.style.padding = '12px 24px';
        notification.style.borderRadius = '30px';
        notification.style.zIndex = '1000';
        notification.style.fontSize = '14px';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

}

class Letter {
    constructor(element, zIndex) {
        this.element = element;
        this.holdingLetter = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        this.zIndex = zIndex;
        
        this.init();
    }

    init() {
        // Mouse events
        this.element.addEventListener('mousedown', (e) => this.dragStart(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.dragEnd());
        
        // Touch events
        this.element.addEventListener('touchstart', (e) => this.dragStart(e));
        document.addEventListener('touchmove', (e) => this.drag(e));
        document.addEventListener('touchend', () => this.dragEnd());
    }

    dragStart(e) {
        if (e.type === "touchstart") {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }

        if (e.target === this.element || this.element.contains(e.target)) {
            this.holdingLetter = true;
            this.element.style.zIndex = this.getHighestZ() + 1;
        }
    }

    drag(e) {
        if (this.holdingLetter) {
            e.preventDefault();
            
            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            this.setTranslate(this.currentX, this.currentY);
        }
    }

    dragEnd() {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.holdingLetter = false;
    }

    setTranslate(xPos, yPos) {
        // Get the current rotation from the computed style
        const currentTransform = window.getComputedStyle(this.element).transform;
        let currentRotation = 0;
        
        if (currentTransform !== 'none') {
            const values = currentTransform.split('(')[1].split(')')[0].split(',');
            const a = values[0];
            const b = values[1];
            currentRotation = Math.atan2(b, a) * (180 / Math.PI);
        }
        
        this.element.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${currentRotation}deg)`;
    }

    setPosition(x, y) {
        this.xOffset = x;
        this.yOffset = y;
        this.currentX = x;
        this.currentY = y;
        this.initialX = x;
        this.initialY = y;
        this.setTranslate(x, y);
    }

    animateToPosition(x, y, rotation = null) {
        this.xOffset = x;
        this.yOffset = y;
        this.currentX = x;
        this.currentY = y;
        this.initialX = x;
        this.initialY = y;
        
        if (rotation !== null) {
            this.element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        } else {
            this.setTranslate(x, y);
        }
    }

    getHighestZ() {
        const letters = document.querySelectorAll('.letter');
        let highest = 0;
        
        letters.forEach(letter => {
            const zIndex = parseInt(window.getComputedStyle(letter).zIndex) || 0;
            if (zIndex > highest) {
                highest = zIndex;
            }
        });
        
        return highest;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernLoveMessage();
});

// Add some extra interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add click effect to letters
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        letter.addEventListener('click', function(e) {
            if (!this.classList.contains('dragging')) {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
    
    // Add double-click to maximize/minimize photos
    const photoLetters = document.querySelectorAll('.photo-letter');
    photoLetters.forEach(letter => {
        letter.addEventListener('dblclick', function() {
            this.classList.toggle('maximized');
        });
    });
});