document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });

    // === Тема с сохранением ===
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) document.body.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // === Навигация ===
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    function showSection(targetId) {
        sections.forEach(sec => sec.classList.remove('active', 'exit'));
        links.forEach(l => l.classList.remove('active'));
        document.querySelector(`[href="#${targetId}"]`).classList.add('active');
        document.getElementById(targetId).classList.add('active');
        window.history.pushState(null, null, `#${targetId}`);
        AOS.refresh();
    }

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            showSection(link.getAttribute('href').substring(1));
        });
    });

    // === Первичная секция ===
    const initial = window.location.hash.substring(1) || 'home';
    showSection(initial);

    // === Модалка ===
    window.openModal = () => document.getElementById('nemaloModal').style.display = 'flex';
    window.closeModal = () => document.getElementById('nemaloModal').style.display = 'none';
    window.onclick = e => { if (e.target.classList.contains('modal')) closeModal(); };

    // === Частицы ===
    particlesJS('particles', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#8A2BE2" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#8A2BE2", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, out_mode: "out" }
        },
        interactivity: { detect_on: "canvas", events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true } },
        retina_detect: true
    });
});
