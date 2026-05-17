const elements = {
  nav: document.querySelector('#site-nav'),
  menuButton: document.querySelector('.menu-button'),
  languageToggle: document.querySelector('#language-toggle'),
  themeToggle: document.querySelector('#theme-toggle'),
};

document.documentElement.dataset.theme = localStorage.getItem('theme') || 'light';
document.documentElement.dataset.language = localStorage.getItem('language') || 'en';

elements.themeToggle.textContent = document.documentElement.dataset.theme === 'dark' ? 'Light' : 'Dark';
elements.languageToggle.textContent = document.documentElement.dataset.language === 'ko' ? 'EN' : 'KO';

elements.themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  elements.themeToggle.textContent = next === 'dark' ? 'Light' : 'Dark';
});

elements.languageToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.language === 'ko' ? 'en' : 'ko';
  document.documentElement.dataset.language = next;
  localStorage.setItem('language', next);
  elements.languageToggle.textContent = next === 'ko' ? 'EN' : 'KO';
});

elements.menuButton.addEventListener('click', () => {
  const isOpen = elements.nav.classList.toggle('open');
  elements.menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelector('#year').textContent = new Date().getFullYear();
