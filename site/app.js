const elements = {
  nav: document.querySelector('#site-nav'),
  menuButton: document.querySelector('.menu-button'),
  languageToggle: document.querySelector('#language-toggle'),
  themeToggle: document.querySelector('#theme-toggle'),
};

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
document.documentElement.dataset.theme = localStorage.getItem('theme') || systemTheme;
document.documentElement.dataset.language = localStorage.getItem('language') || 'en';

const themeIcon = (theme) => (theme === 'dark' ? '☀️' : '🌙');

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
  elements.languageToggle.textContent = next === 'ko' ? 'en' : 'ko';
});

elements.menuButton.addEventListener('click', () => {
  const isOpen = elements.nav.classList.toggle('open');
  elements.menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.topic-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const topic = tab.dataset.topic;
    document.querySelectorAll('.topic-tab').forEach((item) => item.classList.toggle('active', item === tab));
    document.querySelectorAll('.topic-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.topicPanel === topic);
    });
  });
});

elements.themeToggle.textContent = themeIcon(document.documentElement.dataset.theme);
elements.languageToggle.textContent = document.documentElement.dataset.language === 'ko' ? 'en' : 'ko';
document.querySelector('#year').textContent = new Date().getFullYear();
