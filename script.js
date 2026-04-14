document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.querySelector('i').classList.remove('fa-times');
                mobileBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // Scroll States Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fade Elements Observer
    const fadeElements = document.querySelectorAll('.glass-card, .section-title, .hero-content > p, .hero-content > h2, .hero-image, .cyber-skill-card');
    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px', threshold: 0.15 });

    fadeElements.forEach(el => observer.observe(el));

    // Animación de nombre Formación de Estrellas (Loop cada 10s)
    const nameEl = document.querySelector('.name');
    if (nameEl) {
        const text = nameEl.innerText;
        nameEl.innerHTML = '';
        const words = text.split(' ');
        
        words.forEach((word, wIdx) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            if(wIdx < words.length - 1) wordSpan.style.marginRight = '0.3em';
            
            word.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.innerText = char;
                charSpan.className = 'star-letter';
                wordSpan.appendChild(charSpan);
            });
            nameEl.appendChild(wordSpan);
        });

        // Trigger animation dynamically
        function triggerStarAnimation() {
            let charIndex = 0;
            const letters = document.querySelectorAll('.star-letter');
            
            // Removing animation allows us to reset it
            letters.forEach(charSpan => {
                charSpan.style.animation = 'none';
                charSpan.style.opacity = '0'; // hide immediately
            });
            
            // Force dom reflow
            void nameEl.offsetWidth;
            
            // Reapply CSS animation to start movement
            letters.forEach(charSpan => {
                // Nuevas posiciones aleatorias estelares
                const rx = (Math.random() - 0.5) * 500;
                const ry = (Math.random() - 0.5) * 500;
                charSpan.style.setProperty('--rx', `${rx}px`);
                charSpan.style.setProperty('--ry', `${ry}px`);
                
                // Set animation inline to guarantee restart
                charSpan.style.animation = `starForm 2s cubic-bezier(0.16, 1, 0.3, 1) ${charIndex * 0.08}s forwards`;
                
                charIndex++;
            });
        }
        
        setTimeout(triggerStarAnimation, 100);
        setInterval(triggerStarAnimation, 10000); // Repetir cada 10 segundos
    }

    // Form logic animacion transmision estelar
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-satellite-dish fa-spin"></i> Emitiendo Señal...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> ¡Señal Recibida por la Estación!';
                btn.style.background = 'rgba(16, 185, 129, 0.2)';
                btn.style.borderColor = '#10B981';
                btn.style.boxShadow = '0 0 20px #10B981';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.boxShadow = '';
                    btn.disabled = false;
                }, 4000);
            }, 2000);
        });
    }

    // ========= INTERACTIVE SPACE CANVAS =========
    const canvas = document.getElementById('space-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        let mouse = { x: null, y: null, radius: 120 };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('resize', initSpace);

        // Define Star / Particle class
        class Star {
            constructor() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.size = Math.random() * 2 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                // Random blue/purple tint para fondo Nova
                const hues = [200, 280, 240, 180];
                const hue = hues[Math.floor(Math.random() * hues.length)];
                this.color = `hsl(${hue}, 80%, ${Math.random() * 50 + 50}%)`;
                this.speed = Math.random() * 0.5 + 0.1;
                this.opacity = Math.random();
                this.fadeMode = Math.random() > 0.5 ? 1 : -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            update() {
                // Parpadeo / Twinkle
                this.opacity += 0.005 * this.fadeMode;
                if (this.opacity <= 0.1) this.fadeMode = 1;
                if (this.opacity >= 1) this.fadeMode = -1;

                // Move slowly up like floating towards stars
                this.y -= this.speed;
                if (this.y < 0) {
                    this.y = height + 10;
                    this.x = Math.random() * width;
                    this.baseX = this.x;
                }

                // Interaction con el mouse: Se repelen un poco
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    if (distance < mouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        // Vuelve a la normalidad si el raton se aleja (suave horizontalmente)
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 50;
                        }
                    }
                }
                this.draw();
            }
        }

        function initSpace() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            particles = [];
            // Calculate number of stars
            const numStars = Math.floor((width * height) / 5000);
            for (let i = 0; i < numStars; i++) {
                particles.push(new Star());
            }
        }

        function animateSpace() {
            requestAnimationFrame(animateSpace);
            ctx.clearRect(0, 0, width, height);

            // Subtle nebula gradient background
            const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
            gradient.addColorStop(0, 'rgba(3, 6, 19, 1)'); // Deepest middle
            gradient.addColorStop(0.6, 'rgba(5, 10, 25, 0.9)');
            gradient.addColorStop(1, 'rgba(2, 4, 12, 1)'); 
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Draw all stars
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            
            // Connect very close particles (constellation effect - subtle)
            connectParticles();
        }

        function connectParticles() {
            let maxLineDistance = 80;
            for (let a = 0; a < particles.length; a++) {
                // only check up to a limit for performance avoiding N^2
                for (let b = a; b < Math.min(particles.length, a + 40); b++) { 
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                                 + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    
                    if (distance < (maxLineDistance * maxLineDistance)) {
                        let opacityValue = 1 - (distance / (maxLineDistance * maxLineDistance));
                        ctx.strokeStyle = `rgba(56, 189, 248, ${opacityValue * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        initSpace();
        animateSpace();
        
        // Stop reacting if mouse leaves the page
        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });
    }
});
