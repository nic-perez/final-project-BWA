const screens = ['feed', 'browse', 'saved', 'inbox', 'profile'];

const Icons = {
  feed: `<svg fill="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="5" rx="1"/><rect x="3" y="10" width="7" height="11" rx="1"/><rect x="13" y="3" width="8" height="11" rx="1"/><rect x="13" y="16" width="8" height="5" rx="1"/></svg>`,
  browse: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" stroke-linecap="round"/></svg>`,
  saved: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  inbox: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>`,
  profile: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>`
};

const navItems = [
  { id: 'feed',    label: 'Feed',    icon: Icons.feed },
  { id: 'browse',  label: 'Browse',  icon: Icons.browse },
  { id: 'saved',   label: 'Saved',   icon: Icons.saved },
  { id: 'inbox',   label: 'Inbox',   icon: Icons.inbox, badge: true },
  { id: 'profile', label: 'Profile', icon: Icons.profile },
];

function buildNavs(active) {
  screens.forEach(s => {
    const nav = document.getElementById('nav-' + s);
    nav.innerHTML = navItems.map((item, i) =>
      `${i > 0 ? '<div class="nav-divider"></div>' : ''}
      <button class="nav-btn${item.id === active ? ' active' : ''}" onclick="showScreen('${item.id}')">
        ${item.badge ? '<span class="inbox-badge">2</span>' : ''}
        ${item.icon}${item.label}
      </button>`
    ).join('');
  });
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  buildNavs(name);
}

function toggleHeart(btn) {
  const liked = btn.classList.toggle('liked');
  btn.textContent = liked ? '♥' : '♡';
}

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', function () {
    this.closest('.chips-wrap').querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
  });
});

/* ══════════════════════════════════════
   SIDEBAR
══════════════════════════════════════ */
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

/* ══════════════════════════════════════
   POST LISTING MODAL
══════════════════════════════════════ */
function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
  requestAnimationFrame(() => {
    document.getElementById('modal-sheet').classList.add('open');
  });
}

function closeModal() {
  document.getElementById('modal-sheet').classList.remove('open');
  document.getElementById('modal-overlay').classList.remove('open');
}

function selectCat(el) {
  el.closest('.category-chips').querySelectorAll('.cat-chip')
    .forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function submitListing() {
  closeModal();
  alert('Listing posted! 🎉');
}

buildNavs('feed');
