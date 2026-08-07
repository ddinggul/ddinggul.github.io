document.documentElement.dataset.theme = localStorage.getItem('theme') || 'light';
document.documentElement.dataset.language = localStorage.getItem('language') || 'en';

const themeToggle = document.querySelector('#theme-toggle');
const languageToggle = document.querySelector('#language-toggle');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? 'Light' : 'Dark';
});

languageToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.language === 'ko' ? 'en' : 'ko';
  document.documentElement.dataset.language = next;
  localStorage.setItem('language', next);
  languageToggle.textContent = next === 'ko' ? 'EN' : 'KO';
});

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

if (themeToggle) themeToggle.textContent = document.documentElement.dataset.theme === 'dark' ? 'Light' : 'Dark';
if (languageToggle) languageToggle.textContent = document.documentElement.dataset.language === 'ko' ? 'EN' : 'KO';
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
