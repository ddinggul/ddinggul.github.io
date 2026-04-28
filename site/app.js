const state = {
  posts: [],
  activeTag: 'all',
  query: '',
};

const elements = {
  nav: document.querySelector('#site-nav'),
  menuButton: document.querySelector('.menu-button'),
  languageToggle: document.querySelector('#language-toggle'),
  themeToggle: document.querySelector('#theme-toggle'),
  postList: document.querySelector('#post-list'),
  postReader: document.querySelector('#post-reader'),
  postSearch: document.querySelector('#post-search'),
  tagFilter: document.querySelector('#tag-filter'),
  resultCount: document.querySelector('#result-count'),
  adminPanel: document.querySelector('#admin-panel'),
  adminTrigger: document.querySelector('.admin-trigger'),
  adminClose: document.querySelector('.admin-close'),
};

const formatDate = (value) => new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(new Date(value));

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const markdownToHtml = (markdown) => {
  const blocks = markdown.split(/\n{2,}/);
  let inList = false;

  const html = blocks.map((block) => {
    const text = block.trim();
    if (!text) return '';

    if (text.startsWith('```')) {
      return `<pre><code>${escapeHtml(text.replace(/^```[a-z]*\n?|\n?```$/g, ''))}</code></pre>`;
    }

    if (text.startsWith('## ')) {
      return `<h3>${escapeHtml(text.slice(3))}</h3>`;
    }

    if (text.startsWith('# ')) {
      return `<h2>${escapeHtml(text.slice(2))}</h2>`;
    }

    if (text.split('\n').every((line) => line.startsWith('- '))) {
      inList = true;
      const items = text.split('\n').map((line) => `<li>${escapeHtml(line.slice(2))}</li>`).join('');
      return `<ul>${items}</ul>`;
    }

    if (inList) inList = false;
    return `<p>${escapeHtml(text).replaceAll('\n', '<br>')}</p>`;
  }).join('');

  return html;
};

const renderTags = () => {
  const tags = [...new Set(state.posts.flatMap((post) => post.tags || []))].sort();
  elements.tagFilter.innerHTML = '<option value="all">All tags</option>';
  tags.forEach((tag) => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    elements.tagFilter.append(option);
  });
};

const getFilteredPosts = () => state.posts
  .filter((post) => !post.draft)
  .filter((post) => state.activeTag === 'all' || post.tags.includes(state.activeTag))
  .filter((post) => {
    if (!state.query) return true;
    return [post.title, post.description, ...(post.tags || [])]
      .join(' ')
      .toLowerCase()
      .includes(state.query);
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const openPost = (post) => {
  elements.postReader.hidden = false;
  elements.postReader.innerHTML = `
    <p class="eyebrow">${formatDate(post.date)} · ${(post.tags || []).join(', ')}</p>
    <h2>${escapeHtml(post.title)}</h2>
    <p>${escapeHtml(post.description)}</p>
    ${markdownToHtml(post.body || '')}
  `;
  elements.postReader.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const renderPosts = () => {
  const posts = getFilteredPosts();
  elements.postList.innerHTML = '';
  elements.resultCount.textContent = `Showing ${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`;

  posts.forEach((post) => {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.tabIndex = 0;
    article.innerHTML = `
      <p class="post-date">${formatDate(post.date)}</p>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.description)}</p>
      <p class="post-tags">${(post.tags || []).map((tag) => `#${escapeHtml(tag)}`).join(' ')}</p>
    `;
    article.addEventListener('click', () => openPost(post));
    article.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') openPost(post);
    });
    elements.postList.append(article);
  });
};

const loadPosts = async () => {
  try {
    const response = await fetch('data/posts.json', { cache: 'no-store' });
    const data = await response.json();
    state.posts = data.posts || [];
    renderTags();
    renderPosts();
  } catch (error) {
    elements.resultCount.textContent = 'Could not load posts.';
  }
};

const showAdminPanel = () => {
  document.body.classList.add('admin-enabled');
  elements.adminPanel.classList.add('visible');
  localStorage.setItem('authorToolsVisible', 'true');
};

const revealAdminTools = () => {
  document.body.classList.add('admin-enabled');
  localStorage.setItem('authorToolsVisible', 'true');
};

document.documentElement.dataset.theme = localStorage.getItem('theme') || 'light';
document.documentElement.dataset.language = localStorage.getItem('language') || 'en';

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

document.querySelectorAll('.topic-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const topic = tab.dataset.topic;
    document.querySelectorAll('.topic-tab').forEach((item) => item.classList.toggle('active', item === tab));
    document.querySelectorAll('.topic-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.topicPanel === topic);
    });
  });
});

elements.postSearch.addEventListener('input', (event) => {
  state.query = event.target.value.toLowerCase().trim();
  renderPosts();
});

elements.tagFilter.addEventListener('change', (event) => {
  state.activeTag = event.target.value;
  renderPosts();
});

elements.adminTrigger.addEventListener('click', showAdminPanel);
elements.adminClose.addEventListener('click', () => elements.adminPanel.classList.remove('visible'));

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'a') {
    revealAdminTools();
    showAdminPanel();
  }
});

if (new URLSearchParams(window.location.search).get('admin') === '1' || localStorage.getItem('authorToolsVisible') === 'true') {
  revealAdminTools();
}

elements.themeToggle.textContent = document.documentElement.dataset.theme === 'dark' ? 'Light' : 'Dark';
elements.languageToggle.textContent = document.documentElement.dataset.language === 'ko' ? 'EN' : 'KO';
document.querySelector('#year').textContent = new Date().getFullYear();
loadPosts();
