// Translation Dictionary
const translations = {
    en: {
        nav_services: "Services",
        nav_pricing: "Pricing",
        nav_team: "Team",
        nav_contact: "Contact",
        nav_call: "Call (555) 555-5555",
        hero_title: "Quality Dental Care for Your Family",
        hero_subtitle: "Transparent Pricing. Bilingual Staff. Gentle Care.",
        hero_cta_primary: "Call Now",
        hero_cta_secondary: "See Prices",
        section_services: "Our Services",
        section_pricing: "Transparent Pricing",
        section_team: "Meet Our Team",

        // Services
        srv_exam_title: "Checkups & X-Rays",
        srv_exam_desc: "Comprehensive exams to keep your smile healthy.",
        srv_clean_title: "Deep Cleaning",
        srv_clean_desc: "Gentle cleaning to remove plaque and tartar.",
        srv_kids_title: "Pediatric Care",
        srv_kids_desc: "Fun, safe environment for children of all ages.",
        srv_emergency_title: "Emergency Care",
        srv_emergency_desc: "Same-day appointments for pain relief.",

        // Pricing
        pricing_subtitle: "No hidden fees. You'll know the cost before we start.",
        price_exam: "New Patient Exam & X-Rays",
        price_cleaning: "Adult Cleaning",
        price_filling: "White Filling (Starting at)",
        price_extraction: "Simple Extraction",
        insurance_note: "We accept most major insurance plans. Call for your specific coverage details.",

        // Team
        role_dentist: "Dentist",
        role_hygienist: "Hygienist",
        role_staff: "Support Staff",
        bio_daniel: "Dedicated to providing gentle care for the whole family.",
        bio_maria: "Ensuring your smile is bright and healthy with care.",
        bio_staff: "Here to help with insurance and scheduling.",

        footer_hours: "Mon-Fri: 9am - 6pm | Sat: By Appointment"
    },
    es: {
        nav_services: "Servicios",
        nav_pricing: "Precios",
        nav_team: "Equipo",
        nav_contact: "Contacto",
        nav_call: "Llamar (555) 555-5555",
        hero_title: "Cuidado Dental de Calidad para su Familia",
        hero_subtitle: "Precios Transparentes. Personal Bilingüe. Cuidado Suave.",
        hero_cta_primary: "Llamar Ahora",
        hero_cta_secondary: "Ver Precios",
        section_services: "Nuestros Servicios",
        section_pricing: "Precios Transparentes",
        section_team: "Conozca a Nuestro Equipo",

        // Services
        srv_exam_title: "Exámenes y Rayos X",
        srv_exam_desc: "Exámenes completos para mantener su sonrisa saludable.",
        srv_clean_title: "Limpieza Profunda",
        srv_clean_desc: "Limpieza suave para eliminar placa y sarro.",
        srv_kids_title: "Cuidado Pediátrico",
        srv_kids_desc: "Ambiente divertido y seguro para niños de todas las edades.",
        srv_emergency_title: "Atención de Emergencia",
        srv_emergency_desc: "Citas el mismo día para aliviar el dolor.",

        // Pricing
        pricing_subtitle: "Sin sorpresas. Precios claros antes de comenzar.",
        price_exam: "Examen de Nuevo Paciente y Rayos X",
        price_cleaning: "Limpieza de Adultos",
        price_filling: "Empaste Blanco (Desde)",
        price_extraction: "Extracción Simple",
        insurance_note: "Aceptamos la mayoría de los planes de seguro. Llame para detalles.",

        // Team
        role_dentist: "Dentista",
        role_hygienist: "Higienista",
        role_staff: "Personal de Apoyo",
        bio_daniel: "Dedicado a brindar un cuidado suave para toda la familia.",
        bio_maria: "Asegurando que su sonrisa sea brillante y saludable con cuidado.",
        bio_staff: "Aquí para ayudar con seguros y programación.",

        footer_hours: "Lun-Vie: 9am - 6pm | Sab: Con Cita"
    }
};

// Current Language State
let currentLang = 'en';

// Function to set language
function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    // Update DOM text
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Toggle active class on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });

    // Save preference (optional local storage could go here)
    console.log(`Language set to: ${lang}`);
}

// Auto-detect browser language
window.addEventListener('DOMContentLoaded', () => {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('es')) {
        setLanguage('es');
    }
});

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});
