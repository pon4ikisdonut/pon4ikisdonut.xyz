document.addEventListener('DOMContentLoaded', () => {
    // Инициализация анимаций
    AOS.init({
        duration: 800,
        once: true
    });

    // Переключение темы
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    });

    // Обработчик навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const currentSection = document.querySelector('.page-section.active');
            const targetSection = document.getElementById(targetId);

            if (targetSection === currentSection) return;

            document.body.classList.add('animate-bg');
            currentSection.classList.add('exit');
            
            setTimeout(() => {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                currentSection.classList.remove('active', 'exit');
                targetSection.classList.add('active');
                
                window.history.pushState(null, null, `#${targetId}`);
                AOS.refresh();
                document.body.classList.remove('animate-bg');
            }, 400);
        });
    });

    // Первоначальная загрузка
    const initialSection = window.location.hash.substring(1) || 'home';
    document.querySelector(`[href="#${initialSection}"]`).click();
});

// Модальное окно
function openModal() {
    document.getElementById('nemaloModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('nemaloModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target.className === 'modal') {
        closeModal();
    }
}

// Частицы
particlesJS.load('particles', 'particles-config.json', function() {
    console.log('Particles.js loaded');
});
