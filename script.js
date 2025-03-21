document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
        }
    });
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            nav.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    fetchDiscordStats();
    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .tool-preview, .tool-description');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    const elementsToAnimate = document.querySelectorAll('.feature-card, .tool-preview, .tool-description');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

function fetchDiscordStats() {
    fetch('https://discord.com/api/guilds/1269661064530890863/widget.json')
        .then(response => response.json())
        .then(data => {
            const memberCountElement = document.getElementById('member-count');
            const onlineCountElement = document.getElementById('online-count');
            
            if (memberCountElement && data.members) {
                const onlineCount = data.members.length;
                const estimatedTotal = Math.max(1, Math.floor(onlineCount * 2.5));
                memberCountElement.textContent = estimatedTotal + '+';
            }
            
            if (onlineCountElement && data.presence_count) {
                onlineCountElement.textContent = data.presence_count;
            }
        })
        .catch(error => {
            console.error('Error fetching Discord stats:', error);
            const memberCountElement = document.getElementById('member-count');
            const onlineCountElement = document.getElementById('online-count');
            
            if (memberCountElement) memberCountElement.textContent = '500+';
            if (onlineCountElement) onlineCountElement.textContent = '50+';
        });
}