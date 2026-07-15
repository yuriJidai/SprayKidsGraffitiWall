# StepOnTheSprayKids — update site

A no-login, no-backend teaser site. To post an update, you edit one file:
**`posts.json`**. That's it.

## Adding a new post

Open `posts.json` in any text editor and add a new block at the top of the
list (order doesn't matter, it sorts by date automatically). Copy this
template:

```json
{
  "date": "2026-08-01",
  "tag": "teaser",
  "title": "your headline here",
  "body": "Your update text.\n\nUse \\n\\n for a paragraph break.",
  "image": "images/your-image.jpg",
  "alt": "short description of the image, for accessibility"
}
```

Notes:
- `tag` is optional — use it for things like `teaser`, `log`, `art`, `hint`. Leave it out and it just won't show.
- `image` and `alt` are optional. Leave them out entirely for a text-only post.
- Don't forget the comma between post entries (it's a JSON list — if you're
  not sure, an online "JSON validator" will catch mistakes for you).

## Adding an image

1. Drop your image file into the `images/` folder.
2. Reference it in `posts.json` as `"images/your-file-name.jpg"`.

Any image format works (jpg, png, gif, webp). Keep file sizes reasonable
(under ~1–2MB each) so the page loads fast.

## Viewing it while you work

Browsers block a page from loading `posts.json` directly from your hard
drive (a security rule for the `file://` protocol) — you'll see a
"couldn't load posts.json" message if you just double-click `index.html`.
Two easy fixes:

**Option A — quick local preview**, if you have Python installed:
```
cd path/to/this/folder
python3 -m http.server
```
Then open `http://localhost:8000` in your browser.

**Option B — just host it for real** (recommended once you're happy with it):
Any static host works since there's no backend at all. Free options:
- [Netlify Drop](https://app.netlify.com/drop) — drag the whole folder in, done.
- [GitHub Pages](https://pages.github.com/) — push the folder to a repo.
- [Cloudflare Pages](https://pages.cloudflare.com/) — similar drag-and-drop flow.

Once hosted, updating the live site is just: edit `posts.json` and/or add an
image, re-upload the folder (or push the commit). No accounts for visitors,
no admin panel, nothing to log into.

## Files

- `index.html` — page structure, don't need to touch this
- `style.css` — all the visual styling
- `app.js` — reads `posts.json` and builds the feed, don't need to touch this
- `posts.json` — **this is the only file you'll edit regularly**
- `images/` — put your update images here
