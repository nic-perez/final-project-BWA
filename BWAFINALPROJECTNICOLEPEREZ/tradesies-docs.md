# Tradesies — Markdown

### How It Differs from Class Code (Help from Claude)

- **Multi-screen single-page app** — all screens live in one HTML file and are toggled with JavaScript, rather than separate linked pages
- **Navigation** — the bottom nav is built and injected programmatically via `buildNavs()` rather than written statically in HTML
- **Overlay UI patterns** — includes a slide-in sidebar and a bottom-sheet modal with CSS transitions, which were not covered in class
- **Mobile phone frame** — the entire UI is wrapped in a simulated iPhone frame using CSS

Because this code is different from class examples, this document is included alongside the code files.

---

## Pages Built

> This project has 5 screens total, but only 3 are being fully built out.

| Screen | Description |
|--------|-------------|
| **Feed** | Main home screen — nearby trade listings with images, user info, and what they're looking for |
| **Browse** | Filterable listing view with category chips and heart/save buttons |
| **Inbox** | Message threads with unread indicators |
| Profile | Static placeholder, no full functionality |

---

## Screen 1 — Feed

The default landing screen. Shows a scrollable list of trade listings from nearby users.

**Each card includes:**
- User avatar, name, star rating, and location
- A listing photo
- Title, description, and what they're looking for in return

**Triggered by:** loads on page open (`buildNavs('feed')` called on startup)

---

## Screen 2 — Browse

A searchable, filterable view of all listings.

**Features:**
- Search bar at the top
- Category filter chips: All / Services / Items / Food / Lessons
- Browse cards with user quote, trade tags, and a heart/save toggle

**Key interaction:**
```js
function toggleHeart(btn) {
  const liked = btn.classList.toggle('liked');
  btn.textContent = liked ? '♥' : '♡';
}
```

---

## Screen 3 — Inbox

Message thread list showing conversations with trade partners.

**Features:**
- Unread dot indicator on new messages
- Message preview, subject line, sender name, and timestamp
- Badge on the nav icon showing unread count (2)

---

## Navigation

All screens share bottom nav bar, injected into each screen's `.bottom-nav` div by `buildNavs()` in `testing.js`.

```js
buildNavs('feed');      // called on page load
showScreen('browse');   // called when a nav button is tapped
```

`showScreen(name)` removes `active` from all `.screen` divs, adds it to the target, then rebuilds the nav with the correct active state highlighted.

---

## Sidebar

Opened by the **☰** button. Slides in from the left as an overlay.

```js
openSidebar()   // adds .open class → CSS transition slides it in
closeSidebar()  // removes .open → slides it back out
```

Tapping the dark backdrop also closes it.

### CSS — Slide-in Transition

The sidebar uses `transform` to animate on and off screen. This is GPU-accelerated and avoids the layout recalculations that animating `left` would cause.

```css
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 260px;
  transform: translateX(-100%);       /* hidden off-screen to the left */
  transition: transform 0.3s ease;    /* animate the slide */
}

.sidebar.open {
  transform: translateX(0);           /* slide into view */
}
```

The overlay behind the sidebar fades in simultaneously using a `visibility` + `background` transition. Using `visibility` alongside the color ensures the overlay doesn't intercept clicks while invisible.

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0);       /* start transparent */
  visibility: hidden;                  /* hidden from clicks */
  transition: background 0.3s ease, visibility 0.3s;
}

.overlay.open {
  background: rgba(0, 0, 0, 0.45);    /* fade in dark bg */
  visibility: visible;
}
```

### JS — Toggling the Sidebar

The sidebar state is controlled entirely by toggling the `.open` class — CSS handles the animation.

```js
function openSidebar()  { document.getElementById('sidebar').classList.add('open'); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); }
```

Or as a single toggle:

```js
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
```

### Transition Reference

```css
/* Shorthand breakdown */
transition: property duration easing delay;

/* Examples */
transition: transform 0.3s ease;
transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); /* material easing */
transition: transform 0.3s ease, opacity 0.2s ease 0.1s;  /* staggered */
```

Keep sidebar duration between `0.2s–0.35s` — slower feels sluggish on mobile.

> **If a right-side sidebar were needed**, flip the direction: set `left: auto; right: 0` and `transform: translateX(100%)` so it starts off-screen to the right.

---

## Post Listing Modal

Opened by the **+** button. Slides up from the bottom as a sheet.

```js
openModal()       // shows overlay + animates sheet up
closeModal()      // reverses the animation
submitListing()   // stub — ready to connect to a backend
```

---

## Colour Palette

| Hex | Usage |
|-----|-------|
| `#273C2C` | Primary dark green (header, nav) |
| `#38563F` | Secondary green (search bar) |
| `#FFE2FE` | Light pink (nav text, accents) |
| `#f5f0e8` | Off-white (app background) |
| `#939196` | Grey (scroll area background) |
| `#c0392b` | Red (hearts, badges) |
| `#4a3fa8` | Purple (offering labels) |

---

## Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Font | Used for |
|------|----------|
| Playfair Display (italic bold) | App logo / wordmark |
| Inter | All UI text |
