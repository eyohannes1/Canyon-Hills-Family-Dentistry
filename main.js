document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Optional: Close all others (Accordian style)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.classList.remove('active');
            //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
            //     }
            // });

            // Toggle current
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Ripple Effect Logic
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {

            // Remove any old ripple
            const existingRipple = button.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove(); // Or wait for animationend? removing immediately restarts it nicely
            }

            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
            circle.classList.add('ripple');

            button.appendChild(circle);

            // Cleanup after animation to keep DOM clean
            setTimeout(() => {
                circle.remove();
            }, 600); // Matches animation duration
        });
    });

    // Sticky Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-dropdown-toggle)');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a regular nav link (not dropdown toggle)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Dropdown Menu Logic
    const navDropdowns = document.querySelectorAll('.nav-dropdown');

    navDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const dropdownItems = dropdown.querySelectorAll('.nav-dropdown-item');

        // Mobile: Click/Tap to toggle
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                // Check if we're on mobile
                const isMobile = window.innerWidth <= 768;

                if (isMobile) {
                    // Prevent default navigation on mobile
                    e.preventDefault();
                    e.stopPropagation();

                    // Toggle the dropdown
                    const isActive = dropdown.classList.contains('active');

                    // Close all other dropdowns first
                    navDropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('active');
                        }
                    });

                    // Toggle current dropdown
                    if (isActive) {
                        dropdown.classList.remove('active');
                    } else {
                        dropdown.classList.add('active');
                    }
                }
                // On desktop, let the link work normally (CSS handles hover)
            });
        }

        // Close dropdown when clicking a dropdown item
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class on mobile
                dropdown.classList.remove('active');

                // Close hamburger menu if open
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    });

    // Note: Removed "click outside to close" behavior for mobile
    // Dropdown only closes when clicking Services button again or clicking a service item

    // Language Toggle Logic
    const languageToggle = document.getElementById('languageToggle');
    let currentLanguage = 'en'; // Default language is English

    const translations = {
        en: {
            // Navigation
            navTeam: 'Team',
            navServices: 'Services',
            navStories: 'Stories',
            navFAQ: 'FAQ',
            navCallNow: 'Call Now',

            // Hero Section
            heroTitle: 'New Patients Get<br><span class="highlight-squiggly">Free</span> Exam & X-Rays',
            heroSubtitle: 'Transparent Pricing. Bilingual Staff. No Insurance Required.',
            heroBookOnline: 'Book Online',
            heroSeeServices: 'See Services',
            heroTrustText: '50+ 5 Star Google Reviews',

            // Testimonials Section
            testimonialsTitle: 'Real Words from<br>Real Patients.',
            testimonialsSubtitle: 'See why families in Arizona trust us with their smiles.',

            // Testimonial Reviews
            review1Text: '"Been coming here for over 10 years even though I moved several years ago and don\'t live nearby anymore. The staff is terrific and Dr. Yohannes knows his stuff. Highly recommended!"',
            review1Source: 'Google Review',
            review2Text: '"I was nervous about the cost, but their pricing is so transparent. Excellent service and very honest people."',
            review2Source: 'Google Review',
            review3Text: '"This is the best Dentist in Phoenix. I live in Gilbert and drive 40 minutes for my (and my daughter\'s) visits. My daughter is 8 years old and he puts her at ease by explaining what he is going to be doing step by step, encouraging her by letting her know she is doing a great job and that she is amazing. He also helps looks for the best most economical plan to fix the dental problem, unlike other dentists I have visited. Dr. Yohannes is truly one of a kind."',
            review3Source: 'Yelp Review',

            // Team Section
            teamTitle: 'Meet<br>Dr. Yohannes.',
            teamSubtitle: 'Get to know the dentist behind the smiles.',
            teamRole: 'Lead Dentist',
            teamBadge: '🇪🇸 Se Habla Español',
            teamBio: 'Dr. Yohannes is the owner of Canyon Hills Family Dentistry. He graduated from Howard Dental School and combines advanced dental expertise with a welcoming, compassionate approach. Dr. Yohannes is committed to providing exceptional care to patients of all ages, making every visit comfortable and stress-free.',

            // Services Section
            servicesTitle: 'Our Services.',
            servicesSubtitle: 'Comprehensive dental care for your entire family.',
            servicesCleaning: 'Cleaning / Limpieza',
            servicesExam: 'Exam & X-Rays',
            servicesRootCanal: 'Root Canal',
            servicesWhitening: 'Whitening',
            servicesLearnMore: 'Learn More',

            // Service Features
            cleaningFeature1: 'Routine adult cleaning',
            cleaningFeature2: 'Oral hygiene instruction',
            cleaningFeature3: '✨ Professional teeth cleaning',
            examFeature1: 'Comprehensive oral exam',
            examFeature2: 'Full set of digital X-rays',
            examFeature3: '🦷 Complete dental assessment',
            rootCanalFeature1: 'Pain relief treatment',
            rootCanalFeature2: 'Save your natural tooth',
            rootCanalFeature3: '🩺 Advanced endodontic care',
            whiteningFeature1: 'In-office professional whitening',
            whiteningFeature2: 'Up to 4 shades brighter',
            whiteningFeature3: '💎 Cosmetic enhancement',

            // Insurance Section
            insuranceTitle: 'Insurance & Financing',
            insuranceSubtitle: 'We make quality care accessible for everyone.',
            insuranceCardTitle: 'We Accept PPO Insurance',
            insuranceCardText: 'We accept all insurances including Delta, Cigna, MetLife, Aetna, and Blue Cross Blue Shield.',
            financingCardTitle: 'Flexible Payment Options',
            financingCardText: 'No insurance? No problem. We offer flexible monthly payment plans.',

            // FAQ Section
            faqTitle: 'Frequently Asked Questions',
            faqSubtitle: 'Got questions? We have answers.',
            faq1Question: 'Do you accept my insurance?',
            faq1Answer: 'We accept all insurances.',
            faq2Question: 'How do I make an appointment?',
            faq2Answer: 'You can book online seamlessly by clicking the "Book Appointment" button or call us directly during business hours.',
            faq3Question: 'Do you accept children?',
            faq3Answer: 'Yes! We are a family practice and love seeing kids 3 and above. Dr. Yohannes is great at making children feel comfortable and safe.',
            faq4Question: 'What if I have an emergency?',
            faq4Answer: 'We reserve time daily for emergencies. Please call us immediately at (623) 632-0284 and we will do our best to get you in the same day.',

            // Footer
            footerTagline: 'Quality care for the whole family in English and Spanish.',
            footerQuickLinks: 'Quick Links',
            footerHome: 'Home',
            footerOurTeam: 'Our Team',
            footerServices: 'Services',
            footerInsurance: 'Insurance',
            footerVisitUs: 'Visit Us',
            footerFindUs: 'Find Us',
            footerCopyright: 'Copyright © 2024 Canyon Hills Family Dentistry. All rights reserved.',
            footerPrivacy: 'Privacy Policy | Terms of Use',

            // Language Toggle Button
            languageToggle: 'ES',  // Show ES when site is in English (click to switch to Spanish)

            // Services Page
            servicesPageTitle: 'Our Services.',
            servicesPageSubtitle: 'Comprehensive dental care for your entire family. From routine cleanings to advanced procedures, we\'re here to help you maintain a healthy, beautiful smile.',

            // Exam & X-ray Service
            examTitle: 'Exam & X-ray',
            examDescription: 'Our comprehensive oral examination is the foundation of preventive dental care. During your visit, our experienced dentists will thoroughly assess your oral health, checking for cavities, gum disease, and other potential issues.',
            examWhatsIncluded: 'What\'s Included:',
            examFeature1: 'Complete oral health examination',
            examFeature2: 'Full set of digital X-rays for accurate diagnosis',
            examFeature3: 'Oral cancer screening',
            examFeature4: 'Gum disease assessment',
            examFeature5: 'Personalized treatment plan',
            examFeature6: 'Discussion of any concerns or questions',
            examButton: 'Book Exam',

            // Root Canal Service
            rootCanalTitle: 'Root Canal',
            rootCanalDescription: 'Root canal therapy is a procedure designed to save your natural tooth when the pulp becomes infected or damaged. Our gentle approach ensures your comfort while preserving your tooth and relieving pain.',
            rootCanalWhatsIncluded: 'What\'s Included:',
            rootCanalFeature1: 'Local anesthesia for pain-free treatment',
            rootCanalFeature2: 'Removal of infected or damaged pulp',
            rootCanalFeature3: 'Thorough cleaning and disinfection of root canals',
            rootCanalFeature4: 'Sealing of the tooth to prevent future infection',
            rootCanalFeature5: 'Temporary or permanent filling',
            rootCanalFeature6: 'Post-treatment care instructions',
            rootCanalButton: 'Book Appointment',

            // Whitening Service
            whiteningTitle: 'Whitening',
            whiteningDescription: 'Transform your smile with our professional in-office whitening treatment. Using advanced whitening technology, we can brighten your teeth by up to 4 shades in just one visit, giving you a radiant, confident smile.',
            whiteningWhatsIncluded: 'What\'s Included:',
            whiteningFeature1: 'Professional-grade whitening gel',
            whiteningFeature2: 'Safe and effective treatment process',
            whiteningFeature3: 'Gum protection during procedure',
            whiteningFeature4: 'Up to 4 shades brighter results',
            whiteningFeature5: 'Immediate, noticeable results',
            whiteningFeature6: 'Aftercare instructions for lasting results',
            whiteningButton: 'Book Whitening',

            // Cleaning Service
            cleaningTitle: 'Cleaning / Limpieza',
            cleaningDescription: 'Regular professional cleanings are essential for maintaining optimal oral health. Our skilled hygienists will gently remove plaque and tartar buildup, polish your teeth, and provide personalized oral hygiene guidance.',
            cleaningWhatsIncluded: 'What\'s Included:',
            cleaningFeature1: 'Thorough plaque and tartar removal',
            cleaningFeature2: 'Professional teeth polishing',
            cleaningFeature3: 'Flossing and interdental cleaning',
            cleaningFeature4: 'Fluoride treatment (if needed)',
            cleaningFeature5: 'Oral hygiene instruction and tips',
            cleaningFeature6: 'Gum health assessment',
            cleaningButton: 'Book Cleaning',

            // CTA Section
            ctaTitle: 'Ready to Get Started?',
            ctaSubtitle: 'Book your appointment today and experience quality dental care with our bilingual team.',
            ctaButton: 'Book Appointment'
        },
        es: {
            // Navigation
            navTeam: 'Equipo',
            navServices: 'Servicios',
            navStories: 'Historias',
            navFAQ: 'Preguntas',
            navCallNow: 'Llamar Ahora',

            // Hero Section
            heroTitle: 'Pacientes Nuevos Reciben<br><span class="highlight-squiggly">Gratis</span> Examen y Rayos X',
            heroSubtitle: 'Precios Transparentes. Personal Bilingüe. No Se Requiere Seguro.',
            heroBookOnline: 'Reservar en Línea',
            heroSeeServices: 'Ver Servicios',
            heroTrustText: 'Más de 50 Reseñas de 5 Estrellas en Google',

            // Testimonials Section
            testimonialsTitle: 'Palabras Reales de<br>Pacientes Reales.',
            testimonialsSubtitle: 'Vea por qué las familias en Arizona confían en nosotros con sus sonrisas.',

            // Testimonial Reviews
            review1Text: '"He estado viniendo aquí por más de 10 años aunque me mudé hace varios años y ya no vivo cerca. El personal es excelente y el Dr. Yohannes sabe lo que hace. ¡Muy recomendado!"',
            review1Source: 'Reseña de Google',
            review2Text: '"Estaba nervioso por el costo, pero sus precios son muy transparentes. Excelente servicio y gente muy honesta."',
            review2Source: 'Reseña de Google',
            review3Text: '"Este es el mejor dentista en Phoenix. Vivo en Gilbert y manejo 40 minutos para mis visitas (y las de mi hija). Mi hija tiene 8 años y él la tranquiliza explicándole lo que va a hacer paso a paso, animándola haciéndole saber que está haciendo un gran trabajo y que es increíble. También ayuda a buscar el plan más económico para solucionar el problema dental, a diferencia de otros dentistas que he visitado. El Dr. Yohannes es verdaderamente único."',
            review3Source: 'Reseña de Yelp',

            // Team Section
            teamTitle: 'Conozca al<br>Dr. Yohannes.',
            teamSubtitle: 'Conozca al dentista detrás de las sonrisas.',
            teamRole: 'Dentista Principal',
            teamBadge: '🇺🇸 We Speak English',
            teamBio: 'El Dr. Yohannes es el propietario de Canyon Hills Family Dentistry. Se graduó de la Escuela de Odontología de Howard y combina experiencia dental avanzada con un enfoque acogedor y compasivo. El Dr. Yohannes está comprometido a brindar atención excepcional a pacientes de todas las edades, haciendo que cada visita sea cómoda y sin estrés.',

            // Services Section
            servicesTitle: 'Nuestros Servicios.',
            servicesSubtitle: 'Cuidado dental integral para toda su familia.',
            servicesCleaning: 'Limpieza / Cleaning',
            servicesExam: 'Examen y Rayos X',
            servicesRootCanal: 'Endodoncia',
            servicesWhitening: 'Blanqueamiento',
            servicesLearnMore: 'Más Información',

            // Service Features
            cleaningFeature1: 'Limpieza de rutina para adultos',
            cleaningFeature2: 'Instrucción de higiene oral',
            cleaningFeature3: '✨ Limpieza dental profesional',
            examFeature1: 'Examen oral completo',
            examFeature2: 'Conjunto completo de rayos X digitales',
            examFeature3: '🦷 Evaluación dental completa',
            rootCanalFeature1: 'Tratamiento para aliviar el dolor',
            rootCanalFeature2: 'Salve su diente natural',
            rootCanalFeature3: '🩺 Atención endodóntica avanzada',
            whiteningFeature1: 'Blanqueamiento profesional en consultorio',
            whiteningFeature2: 'Hasta 4 tonos más brillante',
            whiteningFeature3: '💎 Mejora cosmética',

            // Insurance Section
            insuranceTitle: 'Seguro y Financiamiento',
            insuranceSubtitle: 'Hacemos que la atención de calidad sea accesible para todos.',
            insuranceCardTitle: 'Aceptamos Seguro PPO',
            insuranceCardText: 'Aceptamos todos los seguros incluyendo Delta, Cigna, MetLife, Aetna y Blue Cross Blue Shield.',
            financingCardTitle: 'Opciones de Pago Flexibles',
            financingCardText: '¿Sin seguro? No hay problema. Ofrecemos planes de pago mensuales flexibles.',

            // FAQ Section
            faqTitle: 'Preguntas Frecuentes',
            faqSubtitle: '¿Tiene preguntas? Tenemos respuestas.',
            faq1Question: '¿Aceptan mi seguro?',
            faq1Answer: 'Aceptamos todos los seguros.',
            faq2Question: '¿Cómo hago una cita?',
            faq2Answer: 'Puede reservar en línea sin problemas haciendo clic en el botón "Reservar Cita" o llamarnos directamente durante el horario comercial.',
            faq3Question: '¿Aceptan niños?',
            faq3Answer: '¡Sí! Somos una práctica familiar y nos encanta ver niños de 3 años en adelante. El Dr. Yohannes es excelente para hacer que los niños se sientan cómodos y seguros.',
            faq4Question: '¿Qué pasa si tengo una emergencia?',
            faq4Answer: 'Reservamos tiempo diariamente para emergencias. Llámenos inmediatamente al (623) 632-0284 y haremos todo lo posible para atenderlo el mismo día.',

            // Footer
            footerTagline: 'Atención de calidad para toda la familia en inglés y español.',
            footerQuickLinks: 'Enlaces Rápidos',
            footerHome: 'Inicio',
            footerOurTeam: 'Nuestro Equipo',
            footerServices: 'Servicios',
            footerInsurance: 'Seguro',
            footerVisitUs: 'Visítenos',
            footerFindUs: 'Encuéntrenos',
            footerCopyright: 'Copyright © 2024 Canyon Hills Family Dentistry. Todos los derechos reservados.',
            footerPrivacy: 'Política de Privacidad | Términos de Uso',

            // Language Toggle Button
            languageToggle: 'EN',  // Show EN when site is in Spanish (click to switch to English)

            // Services Page
            servicesPageTitle: 'Nuestros Servicios.',
            servicesPageSubtitle: 'Cuidado dental integral para toda su familia. Desde limpiezas de rutina hasta procedimientos avanzados, estamos aquí para ayudarle a mantener una sonrisa saludable y hermosa.',

            // Exam & X-ray Service
            examTitle: 'Examen y Rayos X',
            examDescription: 'Nuestro examen oral completo es la base del cuidado dental preventivo. Durante su visita, nuestros dentistas experimentados evaluarán minuciosamente su salud oral, verificando caries, enfermedades de las encías y otros problemas potenciales.',
            examWhatsIncluded: 'Qué Incluye:',
            examFeature1: 'Examen completo de salud oral',
            examFeature2: 'Conjunto completo de rayos X digitales para diagnóstico preciso',
            examFeature3: 'Detección de cáncer oral',
            examFeature4: 'Evaluación de enfermedades de las encías',
            examFeature5: 'Plan de tratamiento personalizado',
            examFeature6: 'Discusión de cualquier preocupación o pregunta',
            examButton: 'Reservar Examen',

            // Root Canal Service
            rootCanalTitle: 'Endodoncia',
            rootCanalDescription: 'La terapia de conducto radicular es un procedimiento diseñado para salvar su diente natural cuando la pulpa se infecta o daña. Nuestro enfoque suave garantiza su comodidad mientras preservamos su diente y aliviamos el dolor.',
            rootCanalWhatsIncluded: 'Qué Incluye:',
            rootCanalFeature1: 'Anestesia local para tratamiento sin dolor',
            rootCanalFeature2: 'Eliminación de pulpa infectada o dañada',
            rootCanalFeature3: 'Limpieza y desinfección completa de los conductos radiculares',
            rootCanalFeature4: 'Sellado del diente para prevenir infecciones futuras',
            rootCanalFeature5: 'Empaste temporal o permanente',
            rootCanalFeature6: 'Instrucciones de cuidado post-tratamiento',
            rootCanalButton: 'Reservar Cita',

            // Whitening Service
            whiteningTitle: 'Blanqueamiento',
            whiteningDescription: 'Transforme su sonrisa con nuestro tratamiento de blanqueamiento profesional en consultorio. Usando tecnología avanzada de blanqueamiento, podemos aclarar sus dientes hasta 4 tonos en una sola visita, dándole una sonrisa radiante y segura.',
            whiteningWhatsIncluded: 'Qué Incluye:',
            whiteningFeature1: 'Gel blanqueador de grado profesional',
            whiteningFeature2: 'Proceso de tratamiento seguro y efectivo',
            whiteningFeature3: 'Protección de encías durante el procedimiento',
            whiteningFeature4: 'Resultados hasta 4 tonos más brillantes',
            whiteningFeature5: 'Resultados inmediatos y notables',
            whiteningFeature6: 'Instrucciones de cuidado posterior para resultados duraderos',
            whiteningButton: 'Reservar Blanqueamiento',

            // Cleaning Service
            cleaningTitle: 'Limpieza / Cleaning',
            cleaningDescription: 'Las limpiezas profesionales regulares son esenciales para mantener una salud oral óptima. Nuestros higienistas capacitados eliminarán suavemente la acumulación de placa y sarro, pulirán sus dientes y proporcionarán orientación personalizada de higiene oral.',
            cleaningWhatsIncluded: 'Qué Incluye:',
            cleaningFeature1: 'Eliminación completa de placa y sarro',
            cleaningFeature2: 'Pulido dental profesional',
            cleaningFeature3: 'Uso de hilo dental y limpieza interdental',
            cleaningFeature4: 'Tratamiento con flúor (si es necesario)',
            cleaningFeature5: 'Instrucción y consejos de higiene oral',
            cleaningFeature6: 'Evaluación de salud de las encías',
            cleaningButton: 'Reservar Limpieza',

            // CTA Section
            ctaTitle: '¿Listo para Comenzar?',
            ctaSubtitle: 'Reserve su cita hoy y experimente atención dental de calidad con nuestro equipo bilingüe.',
            ctaButton: 'Reservar Cita'
        }
    };

    function updateContent(lang) {
        const t = translations[lang];

        // Navigation
        const navTeamLink = document.querySelector('.nav-link[href="#team"], .nav-link[href="index.html#team"]');
        const navServicesLink = document.querySelector('.nav-link[href="services.html"]');
        const navStoriesLink = document.querySelector('.nav-link[href="#testimonials"], .nav-link[href="index.html#testimonials"]');
        const navFAQLink = document.querySelector('.nav-link[href="#faq"], .nav-link[href="index.html#faq"]');
        const navCallBtn = document.querySelector('.nav-btn');

        if (navTeamLink) navTeamLink.textContent = t.navTeam;
        if (navServicesLink) navServicesLink.textContent = t.navServices;
        if (navStoriesLink) navStoriesLink.textContent = t.navStories;
        if (navFAQLink) navFAQLink.textContent = t.navFAQ;
        if (navCallBtn) navCallBtn.textContent = t.navCallNow;

        // Hero Section (only on index.html)
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroBookBtn = document.querySelector('.hero-actions .btn-primary');
        const heroServicesBtn = document.querySelector('.hero-actions .btn-secondary');
        const trustText = document.querySelector('.trust-text');

        if (heroTitle) heroTitle.innerHTML = t.heroTitle;
        if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
        if (heroBookBtn) heroBookBtn.textContent = t.heroBookOnline;
        if (heroServicesBtn) heroServicesBtn.textContent = t.heroSeeServices;
        if (trustText) trustText.textContent = t.heroTrustText;

        // Testimonials Section (only on index.html)
        const testimonialsTitle = document.querySelector('.testimonials-section .section-title');
        const testimonialsSubtitle = document.querySelector('.testimonials-section .section-subtitle');

        if (testimonialsTitle) testimonialsTitle.innerHTML = t.testimonialsTitle;
        if (testimonialsSubtitle) testimonialsSubtitle.textContent = t.testimonialsSubtitle;

        // Testimonial Reviews
        const testimonialTexts = document.querySelectorAll('.testimonial-text');
        const testimonialSources = document.querySelectorAll('.testimonial-source');

        if (testimonialTexts.length >= 3 && testimonialSources.length >= 3) {
            testimonialTexts[0].textContent = t.review1Text;
            testimonialSources[0].textContent = t.review1Source;

            testimonialTexts[1].textContent = t.review2Text;
            testimonialSources[1].textContent = t.review2Source;

            testimonialTexts[2].textContent = t.review3Text;
            testimonialSources[2].textContent = t.review3Source;
        }

        // Team Section (only on index.html)
        const teamTitle = document.querySelector('.team-section .section-title');
        const teamSubtitle = document.querySelector('.team-section .section-subtitle');
        const teamRole = document.querySelector('.team-role');
        const teamBadge = document.querySelector('.team-badge');
        const teamBio = document.querySelector('.team-bio');

        if (teamTitle) teamTitle.innerHTML = t.teamTitle;
        if (teamSubtitle) teamSubtitle.textContent = t.teamSubtitle;
        if (teamRole) teamRole.textContent = t.teamRole;
        if (teamBadge) teamBadge.textContent = t.teamBadge;
        if (teamBio) teamBio.textContent = t.teamBio;

        // Services Section (only on index.html)
        const pricingSectionTitle = document.querySelector('.pricing-section .section-title');
        const pricingSectionSubtitle = document.querySelector('.pricing-section .section-subtitle');

        if (pricingSectionTitle) pricingSectionTitle.textContent = t.servicesTitle;
        if (pricingSectionSubtitle) pricingSectionSubtitle.textContent = t.servicesSubtitle;

        const pricingTitles = document.querySelectorAll('.pricing-title');
        if (pricingTitles.length >= 4) {
            pricingTitles[0].textContent = t.servicesCleaning;
            pricingTitles[1].textContent = t.servicesExam;
            pricingTitles[2].textContent = t.servicesRootCanal;
            pricingTitles[3].textContent = t.servicesWhitening;
        }

        const learnMoreButtons = document.querySelectorAll('.pricing-card .btn');
        learnMoreButtons.forEach(btn => {
            btn.textContent = t.servicesLearnMore;
        });

        // Service Features
        const pricingFeatures = document.querySelectorAll('.pricing-features');
        if (pricingFeatures.length >= 4) {
            if (pricingFeatures[0].children.length >= 3) {
                pricingFeatures[0].children[0].textContent = t.cleaningFeature1;
                pricingFeatures[0].children[1].textContent = t.cleaningFeature2;
                pricingFeatures[0].children[2].innerHTML = t.cleaningFeature3;
            }

            if (pricingFeatures[1].children.length >= 3) {
                pricingFeatures[1].children[0].textContent = t.examFeature1;
                pricingFeatures[1].children[1].textContent = t.examFeature2;
                pricingFeatures[1].children[2].innerHTML = t.examFeature3;
            }

            if (pricingFeatures[2].children.length >= 3) {
                pricingFeatures[2].children[0].textContent = t.rootCanalFeature1;
                pricingFeatures[2].children[1].textContent = t.rootCanalFeature2;
                pricingFeatures[2].children[2].innerHTML = t.rootCanalFeature3;
            }

            if (pricingFeatures[3].children.length >= 3) {
                pricingFeatures[3].children[0].textContent = t.whiteningFeature1;
                pricingFeatures[3].children[1].textContent = t.whiteningFeature2;
                pricingFeatures[3].children[2].innerHTML = t.whiteningFeature3;
            }
        }

        // Insurance Section (only on index.html)
        const insuranceTitle = document.querySelector('.insurance-section .section-title');
        const insuranceSubtitle = document.querySelector('.insurance-section .section-subtitle');
        const insuranceCardTitle = document.querySelector('.insurance-card h3');
        const insuranceCardText = document.querySelector('.insurance-card p');
        const financingCardTitle = document.querySelector('.financing-card h3');
        const financingCardText = document.querySelector('.financing-card p');

        if (insuranceTitle) insuranceTitle.textContent = t.insuranceTitle;
        if (insuranceSubtitle) insuranceSubtitle.textContent = t.insuranceSubtitle;
        if (insuranceCardTitle) insuranceCardTitle.textContent = t.insuranceCardTitle;
        if (insuranceCardText) insuranceCardText.textContent = t.insuranceCardText;
        if (financingCardTitle) financingCardTitle.textContent = t.financingCardTitle;
        if (financingCardText) financingCardText.textContent = t.financingCardText;

        // FAQ Section (only on index.html)
        const faqTitle = document.querySelector('.faq-section .section-title');
        const faqSubtitle = document.querySelector('.faq-section .section-subtitle');

        if (faqTitle) faqTitle.textContent = t.faqTitle;
        if (faqSubtitle) faqSubtitle.textContent = t.faqSubtitle;

        const faqQuestions = document.querySelectorAll('.faq-question');
        const faqAnswers = document.querySelectorAll('.faq-answer p');

        if (faqQuestions.length >= 4 && faqAnswers.length >= 4) {
            faqQuestions[0].childNodes[0].textContent = t.faq1Question + ' ';
            faqAnswers[0].textContent = t.faq1Answer;

            faqQuestions[1].childNodes[0].textContent = t.faq2Question + ' ';
            faqAnswers[1].textContent = t.faq2Answer;

            faqQuestions[2].childNodes[0].textContent = t.faq3Question + ' ';
            faqAnswers[2].textContent = t.faq3Answer;

            faqQuestions[3].childNodes[0].textContent = t.faq4Question + ' ';
            faqAnswers[3].textContent = t.faq4Answer;
        }

        // Footer
        const footerCols = document.querySelectorAll('.footer-col');
        footerCols[0].querySelector('p').textContent = t.footerTagline;
        footerCols[1].querySelector('h4').textContent = t.footerQuickLinks;
        footerCols[1].querySelectorAll('a')[0].textContent = t.footerHome;
        footerCols[1].querySelectorAll('a')[1].textContent = t.footerOurTeam;
        footerCols[1].querySelectorAll('a')[2].textContent = t.footerServices;
        footerCols[1].querySelectorAll('a')[3].textContent = t.footerInsurance;
        footerCols[2].querySelector('h4').textContent = t.footerVisitUs;
        footerCols[3].querySelector('h4').textContent = t.footerFindUs;

        const copyrightPs = document.querySelectorAll('.copyright p');
        copyrightPs[0].textContent = t.footerCopyright;
        copyrightPs[1].textContent = t.footerPrivacy;

        // Services Page (only update if elements exist on this page)
        const servicesPageTitle = document.querySelector('.hero-section .section-title');
        if (servicesPageTitle && (servicesPageTitle.textContent.includes('Services') || servicesPageTitle.textContent.includes('Servicios'))) {
            servicesPageTitle.textContent = t.servicesPageTitle;

            const servicesPageSubtitle = document.querySelector('.hero-section .section-subtitle');
            if (servicesPageSubtitle) {
                servicesPageSubtitle.textContent = t.servicesPageSubtitle;
            }

            // Service Detail Cards
            const serviceDetailTitles = document.querySelectorAll('.service-detail-title');
            const serviceDetailDescriptions = document.querySelectorAll('.service-detail-description');
            const serviceDetailSubtitles = document.querySelectorAll('.service-detail-subtitle');
            const serviceDetailButtons = document.querySelectorAll('.service-detail-card .btn');

            // Exam & X-ray (first card)
            if (serviceDetailTitles[0]) {
                serviceDetailTitles[0].textContent = t.examTitle;
                serviceDetailDescriptions[0].textContent = t.examDescription;
                serviceDetailSubtitles[0].textContent = t.examWhatsIncluded;

                const examFeatures = document.querySelectorAll('.service-detail-card')[0].querySelectorAll('.service-detail-features li');
                examFeatures[0].textContent = t.examFeature1;
                examFeatures[1].textContent = t.examFeature2;
                examFeatures[2].textContent = t.examFeature3;
                examFeatures[3].textContent = t.examFeature4;
                examFeatures[4].textContent = t.examFeature5;
                examFeatures[5].textContent = t.examFeature6;

                serviceDetailButtons[0].textContent = t.examButton;
            }

            // Root Canal (second card)
            if (serviceDetailTitles[1]) {
                serviceDetailTitles[1].textContent = t.rootCanalTitle;
                serviceDetailDescriptions[1].textContent = t.rootCanalDescription;
                serviceDetailSubtitles[1].textContent = t.rootCanalWhatsIncluded;

                const rootCanalFeatures = document.querySelectorAll('.service-detail-card')[1].querySelectorAll('.service-detail-features li');
                rootCanalFeatures[0].textContent = t.rootCanalFeature1;
                rootCanalFeatures[1].textContent = t.rootCanalFeature2;
                rootCanalFeatures[2].textContent = t.rootCanalFeature3;
                rootCanalFeatures[3].textContent = t.rootCanalFeature4;
                rootCanalFeatures[4].textContent = t.rootCanalFeature5;
                rootCanalFeatures[5].textContent = t.rootCanalFeature6;

                serviceDetailButtons[1].textContent = t.rootCanalButton;
            }

            // Whitening (third card)
            if (serviceDetailTitles[2]) {
                serviceDetailTitles[2].textContent = t.whiteningTitle;
                serviceDetailDescriptions[2].textContent = t.whiteningDescription;
                serviceDetailSubtitles[2].textContent = t.whiteningWhatsIncluded;

                const whiteningFeatures = document.querySelectorAll('.service-detail-card')[2].querySelectorAll('.service-detail-features li');
                whiteningFeatures[0].textContent = t.whiteningFeature1;
                whiteningFeatures[1].textContent = t.whiteningFeature2;
                whiteningFeatures[2].textContent = t.whiteningFeature3;
                whiteningFeatures[3].textContent = t.whiteningFeature4;
                whiteningFeatures[4].textContent = t.whiteningFeature5;
                whiteningFeatures[5].textContent = t.whiteningFeature6;

                serviceDetailButtons[2].textContent = t.whiteningButton;
            }

            // Cleaning (fourth card)
            if (serviceDetailTitles[3]) {
                serviceDetailTitles[3].textContent = t.cleaningTitle;
                serviceDetailDescriptions[3].textContent = t.cleaningDescription;
                serviceDetailSubtitles[3].textContent = t.cleaningWhatsIncluded;

                const cleaningFeatures = document.querySelectorAll('.service-detail-card')[3].querySelectorAll('.service-detail-features li');
                cleaningFeatures[0].textContent = t.cleaningFeature1;
                cleaningFeatures[1].textContent = t.cleaningFeature2;
                cleaningFeatures[2].textContent = t.cleaningFeature3;
                cleaningFeatures[3].textContent = t.cleaningFeature4;
                cleaningFeatures[4].textContent = t.cleaningFeature5;
                cleaningFeatures[5].textContent = t.cleaningFeature6;

                serviceDetailButtons[3].textContent = t.cleaningButton;
            }

            // CTA Section
            const ctaSections = document.querySelectorAll('.section');
            ctaSections.forEach(section => {
                const ctaTitle = section.querySelector('.section-title');
                if (ctaTitle && (ctaTitle.textContent.includes('Ready') || ctaTitle.textContent.includes('Listo'))) {
                    ctaTitle.textContent = t.ctaTitle;
                    const ctaSubtitle = section.querySelector('.section-subtitle');
                    if (ctaSubtitle) {
                        ctaSubtitle.textContent = t.ctaSubtitle;
                    }
                    const ctaButton = section.querySelector('.btn');
                    if (ctaButton) {
                        ctaButton.textContent = t.ctaButton;
                    }
                }
            });
        }

        // Language Toggle Button
        const langToggleBtn = document.getElementById('languageToggle');
        if (langToggleBtn) {
            langToggleBtn.textContent = t.languageToggle;
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    if (languageToggle) {
        const wrapper = document.querySelector('.sticky-cta-wrapper');
        let hideTimer = null; // Store the timer reference

        // Function to hide the button with animation
        function hideLanguageButton() {
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'translateY(20px)';

            setTimeout(() => {
                wrapper.style.display = 'none';
            }, 400); // Wait for fade animation to complete
        }

        // Function to start/restart the auto-hide timer
        function startHideTimer() {
            // Clear any existing timer
            if (hideTimer) {
                clearTimeout(hideTimer);
            }

            // Start new 10-second timer
            hideTimer = setTimeout(() => {
                if (wrapper.style.display !== 'none') {
                    hideLanguageButton();
                }
            }, 10000); // 10 seconds
        }

        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
            updateContent(currentLanguage);

            // Explicitly update button text
            languageToggle.textContent = currentLanguage === 'en' ? 'ES' : 'EN';

            // Save preference to localStorage
            localStorage.setItem('preferredLanguage', currentLanguage);

            // Restart the 10-second timer
            startHideTimer();
        });

        // Check for saved language preference
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && savedLanguage !== 'en') {
            currentLanguage = savedLanguage;
            updateContent(currentLanguage);
        }

        // Start initial timer (10 seconds)
        startHideTimer();
    }
});
