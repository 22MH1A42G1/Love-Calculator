class LoveCalculator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loveMessages = this.initializeLoveMessages();
    }

    initializeElements() {
        this.name1Input = document.getElementById('name1');
        this.name2Input = document.getElementById('name2');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resultSection = document.getElementById('result');
        this.meterFill = document.getElementById('meterFill');
        this.percentageDisplay = document.getElementById('percentage');
        this.messageDisplay = document.getElementById('message');
        this.shareBtn = document.getElementById('shareBtn');
        this.tryAgainBtn = document.getElementById('tryAgainBtn');
    }

    bindEvents() {
        this.calculateBtn.addEventListener('click', () => this.calculateLove());
        this.shareBtn.addEventListener('click', () => this.shareResult());
        this.tryAgainBtn.addEventListener('click', () => this.resetCalculator());
        
        // Allow Enter key to trigger calculation
        [this.name1Input, this.name2Input].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.calculateLove();
                }
            });
        });

        // Auto-focus next input
        this.name1Input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.name2Input.focus();
            }
        });
    }

    initializeLoveMessages() {
        return {
            0: "😅 Oops! Maybe you're better as friends. But hey, friendship is beautiful too!",
            10: "🤔 There's potential, but you might need to work on your connection.",
            20: "😊 You have some chemistry! Keep getting to know each other.",
            30: "💫 Not bad! There's definitely something special brewing here.",
            40: "😍 You two have great compatibility! Love is in the air!",
            50: "💕 Wow! You're a pretty good match. Romance is definitely possible!",
            60: "💖 Amazing! You two are meant for each other. This could be the real deal!",
            70: "💗 Incredible compatibility! You're practically soulmates!",
            80: "💓 Outstanding! Your love story could be legendary!",
            90: "💝 Perfect match! You're absolutely meant to be together!",
            100: "🔥💕 PERFECT LOVE! You two are destined for an epic love story! 💕🔥"
        };
    }

    calculateLove() {
        const name1 = this.name1Input.value.trim().toLowerCase();
        const name2 = this.name2Input.value.trim().toLowerCase();

        if (!this.validateInputs(name1, name2)) {
            return;
        }

        this.showCalculating();
        
        // Add a delay for dramatic effect
        setTimeout(() => {
            const percentage = this.computeLovePercentage(name1, name2);
            this.displayResult(percentage, name1, name2);
        }, 1500);
    }

    validateInputs(name1, name2) {
        if (!name1 || !name2) {
            alert('Please enter both names! 💕');
            return false;
        }

        if (name1.length < 2 || name2.length < 2) {
            alert('Names should be at least 2 characters long! 😊');
            return false;
        }

        if (name1 === name2) {
            alert('Please enter two different names! 😄');
            return false;
        }

        return true;
    }

    computeLovePercentage(name1, name2) {
        // Create a unique algorithm based on name characteristics
        const combinedName = name1 + name2;
        let score = 0;

        // Factor 1: Common letters (30% weight)
        const commonLetters = this.countCommonLetters(name1, name2);
        score += (commonLetters / Math.max(name1.length, name2.length)) * 30;

        // Factor 2: Name length compatibility (20% weight)
        const lengthDiff = Math.abs(name1.length - name2.length);
        const lengthScore = Math.max(0, 10 - lengthDiff) / 10;
        score += lengthScore * 20;

        // Factor 3: Vowel harmony (25% weight)
        const vowelHarmony = this.calculateVowelHarmony(name1, name2);
        score += vowelHarmony * 25;

        // Factor 4: Letter position magic (25% weight)
        const positionMagic = this.calculatePositionMagic(combinedName);
        score += positionMagic * 25;

        // Add some randomness but keep it consistent for same name pairs
        const seed = this.createSeed(name1, name2);
        const randomBonus = (seed % 20) - 10; // -10 to +10
        score += randomBonus;

        // Ensure score is between 0 and 100
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    countCommonLetters(name1, name2) {
        const letters1 = [...name1];
        const letters2 = [...name2];
        let common = 0;

        letters1.forEach(letter => {
            const index = letters2.indexOf(letter);
            if (index !== -1) {
                common++;
                letters2.splice(index, 1); // Remove to avoid double counting
            }
        });

        return common;
    }

    calculateVowelHarmony(name1, name2) {
        const vowels = 'aeiou';
        const vowels1 = [...name1].filter(letter => vowels.includes(letter));
        const vowels2 = [...name2].filter(letter => vowels.includes(letter));
        
        const totalVowels = vowels1.length + vowels2.length;
        if (totalVowels === 0) return 0.5;

        const commonVowels = this.countCommonLetters(vowels1.join(''), vowels2.join(''));
        return commonVowels / totalVowels;
    }

    calculatePositionMagic(combinedName) {
        let magic = 0;
        for (let i = 0; i < combinedName.length; i++) {
            const charCode = combinedName.charCodeAt(i);
            magic += (charCode * (i + 1)) % 13;
        }
        return (magic % 100) / 100;
    }

    createSeed(name1, name2) {
        const combined = name1 + name2;
        let seed = 0;
        for (let i = 0; i < combined.length; i++) {
            seed += combined.charCodeAt(i) * (i + 1);
        }
        return seed;
    }

    showCalculating() {
        this.calculateBtn.textContent = 'Calculating... 💫';
        this.calculateBtn.disabled = true;
        this.resultSection.classList.add('hidden');
    }

    displayResult(percentage, name1, name2) {
        this.resultSection.classList.remove('hidden');
        
        // Animate the meter fill
        this.meterFill.style.width = '0%';
        setTimeout(() => {
            this.meterFill.style.width = percentage + '%';
        }, 100);

        // Animate the percentage counter
        this.animatePercentage(percentage);

        // Show the love message
        const message = this.getLoveMessage(percentage);
        this.messageDisplay.textContent = message;

        // Reset button
        this.calculateBtn.textContent = 'Calculate Love ✨';
        this.calculateBtn.disabled = false;

        // Store result for sharing
        this.lastResult = {
            percentage,
            name1: this.capitalizeFirst(name1),
            name2: this.capitalizeFirst(name2),
            message
        };
    }

    animatePercentage(targetPercentage) {
        let current = 0;
        const increment = targetPercentage / 50; // 50 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetPercentage) {
                current = targetPercentage;
                clearInterval(timer);
            }
            this.percentageDisplay.textContent = Math.round(current) + '%';
        }, 20);
    }

    getLoveMessage(percentage) {
        // Find the appropriate message based on percentage ranges
        const ranges = Object.keys(this.loveMessages).map(Number).sort((a, b) => b - a);
        
        for (const range of ranges) {
            if (percentage >= range) {
                return this.loveMessages[range];
            }
        }
        
        return this.loveMessages[0];
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    shareResult() {
        if (!this.lastResult) return;

        const { percentage, name1, name2 } = this.lastResult;
        const shareText = `💕 Love Calculator Result 💕\n${name1} ❤️ ${name2}\nCompatibility: ${percentage}%\n\nTry it yourself at: ${window.location.href}`;

        if (navigator.share) {
            navigator.share({
                title: 'Love Calculator Result',
                text: shareText
            }).catch(console.error);
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Result copied to clipboard! 📋💕');
            }).catch(() => {
                // Final fallback - show result in alert
                alert(shareText);
            });
        }
    }

    resetCalculator() {
        this.name1Input.value = '';
        this.name2Input.value = '';
        this.resultSection.classList.add('hidden');
        this.name1Input.focus();
        this.lastResult = null;
    }
}

// Initialize the Love Calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new LoveCalculator();
});

// Add some fun effects
document.addEventListener('DOMContentLoaded', () => {
    // Create additional floating hearts periodically
    setInterval(() => {
        createFloatingHeart();
    }, 3000);
});

function createFloatingHeart() {
    const heart = document.createElement('span');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100vh';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1';
    heart.style.animation = 'float 8s linear forwards';
    heart.style.opacity = '0.6';

    document.body.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 8000);
}