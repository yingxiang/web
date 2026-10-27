(() => {
  const routes = ['privacy', 'support'];
  const params = new URLSearchParams(location.search);
  const match = value => {
    if (!value) return null;
    if (Object.hasOwn(luminaPages, value)) return value;
    if (/^zh(?:-|$)/i.test(value)) return 'zh-Hans';
    const base = value.split('-')[0];
    return Object.hasOwn(luminaPages, base) ? base : null;
  };
  let stored;
  try { stored = localStorage.getItem('luminatank-language'); } catch (_) {}
  const browserLanguage = (navigator.languages || [navigator.language]).map(match).find(Boolean);
  const language = match(params.get('lang')) || browserLanguage || match(stored) || 'en';
  const content = luminaPages[language];
  const route = document.body.dataset.page;
  const index = routes.indexOf(route);
  const link = (page, label) => {
    const a = document.createElement('a');
    a.href = `./${page}.html?lang=${encodeURIComponent(language)}`;
    a.textContent = label;
    if (page === route) a.setAttribute('aria-current', 'page');
    return a;
  };
  document.documentElement.lang = language;
  document.title = `${content.name} — ${content.nav[index]}`;
  document.querySelector('.brand').href = `./privacy.html?lang=${language}`;
  document.getElementById('brand').textContent = content.name;
  document.getElementById('eyebrow').textContent = content.nav[index];
  document.getElementById('heading').textContent = `${content.name} · ${content.nav[index]}`;
  document.getElementById('date').textContent = index === 0 ? content.date : '';
  document.getElementById('contact-heading').textContent = content.contact;
  const nav = document.getElementById('navigation'); nav.replaceChildren();
  routes.forEach((page, i) => nav.append(link(page, content.nav[i])));
  const download = document.createElement('a');
  download.className = 'store-link';
  download.href = 'https://apps.apple.com/app/id6827451371';
  download.textContent = content.download;
  nav.append(download);
  const sections = document.getElementById('sections'); sections.replaceChildren();
  content[route].forEach(([title, text]) => {
    const section = document.createElement('section');
    const heading = document.createElement('h2'); heading.textContent = title;
    const paragraph = document.createElement('p'); paragraph.textContent = text;
    section.append(heading, paragraph); sections.append(section);
  });
  const footer = document.getElementById('footer'); footer.replaceChildren();
  routes.forEach((page, i) => footer.append(link(page, content.nav[i])));
  const terms = document.createElement('a');
  terms.href = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
  terms.textContent = 'Terms of Use (EULA)';
  footer.append(terms);
  const select = document.getElementById('language'); select.value = language;
  select.addEventListener('change', () => {
    try { localStorage.setItem('luminatank-language', select.value); } catch (_) {}
    const url = new URL(location.href); url.searchParams.set('lang', select.value); location.href = url.href;
  });
})();
