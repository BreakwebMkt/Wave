// Header Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Fechar menu quando o mouse sair de cima do menu
    mobileMenu.addEventListener('mouseleave', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
}

// Smooth Scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Formulário de contato -> WhatsApp
const contactForm = document.getElementById('contactForm');

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = contactForm.nome.value.trim();
        const email = contactForm.email.value.trim();
        const telefone = contactForm.telefone.value.trim();
        const mensagem = contactForm.mensagem.value.trim();

        const texto = 
`Olá, vim pelo site da WAVE Planejados.

Nome: ${nome}
Telefone: ${telefone}
E-mail: ${email}

Mensagem:
${mensagem}`;

        const url = 'https://wa.me/5511939434466?text=' + encodeURIComponent(texto);

        window.open(url, '_blank');

        showToast('Redirecionando para o WhatsApp...');
        contactForm.reset();
    });
}

// Validação simples visual
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
            input.style.borderColor = '';
        }
    });
});

// Máscara simples para telefone (Brasil)
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                e.target.value = value;
            } else if (value.length <= 6) {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 10) {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            } else {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        }
    });
}

// Destacar link ativo do menu conforme a rolagem
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.mobile-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 120) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Acordeão dos diferenciais
const diffHeaders = document.querySelectorAll('.diferencial-header');
if (diffHeaders.length > 0) {
    diffHeaders.forEach(headerEl => {
        headerEl.addEventListener('click', () => {
            const card = headerEl.parentElement;
            const openCard = document.querySelector('.diferencial-card.open');

            if (openCard && openCard !== card) {
                openCard.classList.remove('open');
            }

            card.classList.toggle('open');
        });
    });
}

// Carrossel automático da seção de fabricação
const fabricSlides = document.querySelectorAll('.fabricacao-slide');
const fabricDots = document.querySelectorAll('.fabricacao-dot');
let fabricIndex = 0;

function setFabricSlide(index) {
    if (!fabricSlides.length) return;

    fabricSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    if (fabricDots.length) {
        fabricDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    fabricIndex = index;
}

if (fabricSlides.length > 0) {
    let fabricInterval = setInterval(() => {
        const nextIndex = (fabricIndex + 1) % fabricSlides.length;
        setFabricSlide(nextIndex);
    }, 5000); // troca a cada 5s

    // Clique nos dots para navegar manualmente
    if (fabricDots.length) {
        fabricDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                setFabricSlide(i);
                clearInterval(fabricInterval);
                fabricInterval = setInterval(() => {
                    const nextIndex = (fabricIndex + 1) % fabricSlides.length;
                    setFabricSlide(nextIndex);
                }, 5000);
            });
        });
    }
}

console.log('WAVE Planejados - Site carregado com sucesso!');
