// Renders posts.json into the feed. Edit posts.json to add updates —
// you never need to touch this file.

document.getElementById('year').textContent = new Date().getFullYear();

const feed = document.getElementById('feed');

fetch('posts.json', { cache: 'no-store' })
  .then(res => {
    if (!res.ok) throw new Error('posts.json not found');
    return res.json();
  })
  .then(posts => {
    if (!Array.isArray(posts) || posts.length === 0) {
      feed.innerHTML = '<p class="feed-empty">nothing posted yet. check back soon.</p>';
      return;
    }

    // newest first
    const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

    feed.innerHTML = '';
    sorted.forEach((post, i) => {
      feed.appendChild(renderPost(post, i));
    });
  })
  .catch(err => {
    feed.innerHTML = `
      <p class="feed-error">
        couldn't load posts.json.<br>
        if you're viewing this file directly on your computer, browsers block that —
        run a local server (see README) or upload the site somewhere and it'll work fine.
      </p>`;
    console.error(err);
  });

function renderPost(post, index) {
  const article = document.createElement('article');
  article.className = 'post';
  // tiny alternating tilt so cards don't look machine-stamped
  const tilt = (index % 2 === 0) ? '-0.3deg' : '0.3deg';
  article.style.setProperty('--tilt', tilt);

  const dateStr = formatDate(post.date);

  article.innerHTML = `
    <div class="post-meta">
      <span>${escapeHTML(dateStr)}</span>
      ${post.tag ? `<span class="post-tag">${escapeHTML(post.tag)}</span>` : ''}
    </div>
    <h2 class="post-title">${escapeHTML(post.title || 'untitled update')}</h2>
    ${post.body ? `<p class="post-body">${escapeHTML(post.body)}</p>` : ''}
    ${post.image ? `
      <div class="post-image-wrap">
        <img src="${escapeAttr(post.image)}" alt="${escapeAttr(post.alt || post.title || 'update image')}" loading="lazy">
      </div>` : ''}
  `;

  return article;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr || '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}
