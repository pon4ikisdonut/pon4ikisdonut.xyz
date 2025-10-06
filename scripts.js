document.addEventListener('DOMContentLoaded', () => {

    AOS.init({duration:800, once:true});

    const themeToggle = document.querySelector('.theme-toggle');

    if(localStorage.getItem('theme')==='dark'){
        document.body.classList.add('dark-theme');
        document.body.setAttribute('data-theme','dark');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        document.body.setAttribute('data-theme', isDark?'dark':'light');
        localStorage.setItem('theme', isDark?'dark':'light');
    });

    document.querySelectorAll('.nav-link').forEach(link=>{
        link.addEventListener('click',(e)=>{
            e.preventDefault();
            const targetId=link.getAttribute('href').substring(1);
            const currentSection=document.querySelector('.page-section.active');
            const targetSection=document.getElementById(targetId);
            if(targetSection===currentSection) return;
            currentSection.classList.remove('active');
            targetSection.classList.add('active');
            document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
            link.classList.add('active');
            window.history.pushState(null,null,`#${targetId}`);
            AOS.refresh();
        });
    });

    const initialSection = window.location.hash.substring(1)||'home';
    document.querySelector(`[href="#${initialSection}"]`).click();
});

function openModal(){document.getElementById('nemaloModal').style.display='block'}
function closeModal(){document.getElementById('nemaloModal').style.display='none'}

window.onclick=function(event){
    if(event.target.className==='modal'){closeModal();}
}

particlesJS.load('particles','particles-config.json',function(){console.log('Particles.js loaded');});
