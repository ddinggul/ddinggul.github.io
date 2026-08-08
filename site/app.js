const elements = {
  nav: document.querySelector('#site-nav'),
  menuButton: document.querySelector('.menu-button'),
  languageToggle: document.querySelector('#language-toggle'),
  themeToggle: document.querySelector('#theme-toggle'),
};

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
document.documentElement.dataset.theme = localStorage.getItem('theme') || systemTheme;
document.documentElement.dataset.language = ['ko', 'Kor'].includes(localStorage.getItem('language')) ? 'ko' : 'en';

const themeIcon = (theme) => (theme === 'dark' ? '☀️' : '🌙');
const langLabel = (lang) => (lang === 'ko' ? 'Kor' : 'Eng');

elements.themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  elements.themeToggle.textContent = themeIcon(next);
});

elements.languageToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.language === 'ko' ? 'en' : 'ko';
  document.documentElement.dataset.language = next;
  localStorage.setItem('language', next);
  elements.languageToggle.textContent = langLabel(next);
});

elements.menuButton.addEventListener('click', () => {
  const isOpen = elements.nav.classList.toggle('open');
  elements.menuButton.setAttribute('aria-expanded', String(isOpen));
});

elements.themeToggle.textContent = themeIcon(document.documentElement.dataset.theme);
elements.languageToggle.textContent = langLabel(document.documentElement.dataset.language);
document.querySelector('#year').textContent = new Date().getFullYear();
