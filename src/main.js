// Entry point for Vite
// SCSS imports the main stylesheet via index.html <link>, but module-side init lives here.

document.addEventListener('DOMContentLoaded', () => {
  // 航跡パターン A〜Eトグル（旧船カーソル切替UIを流用）
  const buttons = document.querySelectorAll('.c-cursor-toggle__btn');
  let wakeVariant = 'c';
  const apply = (variant) => {
    wakeVariant = variant;
    buttons.forEach((b) => {
      b.classList.toggle('is-active', b.dataset.cursor === variant);
    });
  };
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => apply(btn.dataset.cursor));
  });
  apply('c');

  // 章連動色反転（パターンA用）
  // 暗背景セクションが画面中央領域に入ると body.in-dark-section を付ける
  const darkSections = document.querySelectorAll(
    '.p-prologue__scene, .p-chapter--bottle .p-chapter__scene, .p-chapter--voyage .p-chapter__scene'
  );
  const darkObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-in-view', entry.isIntersecting);
    });
    const anyInView = document.querySelector('.is-in-view') !== null;
    document.body.classList.toggle('in-dark-section', anyInView);
  }, {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0,
  });
  darkSections.forEach((s) => darkObserver.observe(s));

  // マウス位置追跡
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let mouseMoved = false;
  let lastSpawnX = mouseX;
  let lastSpawnY = mouseY;

  const MIN_MOVE_DIST = 14;
  const STERN_OFFSET = 8;
  const SCROLL_THROTTLE_MS = 100;

  const spawnAt = (x, y) => {
    const ring = document.createElement('div');
    ring.className = `c-wake c-wake--${wakeVariant}`;
    ring.style.left = `${x}px`;
    ring.style.top = `${y - STERN_OFFSET}px`;
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 1000);
  };

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseMoved = true;
    const dx = mouseX - lastSpawnX;
    const dy = mouseY - lastSpawnY;
    if (Math.hypot(dx, dy) > MIN_MOVE_DIST) {
      spawnAt(mouseX, mouseY);
      lastSpawnX = mouseX;
      lastSpawnY = mouseY;
    }
  }, { passive: true });

  let lastScrollSpawn = 0;
  window.addEventListener('scroll', () => {
    if (!mouseMoved) return;
    const now = performance.now();
    if (now - lastScrollSpawn < SCROLL_THROTTLE_MS) return;
    lastScrollSpawn = now;
    spawnAt(mouseX, mouseY);
  }, { passive: true });

  // スクロールリビール演出（ふんわり現れる）
  // prefers-reduced-motion 環境では演出そのものを付けない
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!prefersReducedMotion) {
    // 本文テキスト・引用：下からふんわり
    const textTargets = document.querySelectorAll(
      '.p-prologue__scene-quote, .p-prologue__scene-text, .p-chapter__scene-quote, .p-chapter__scene-text'
    );
    textTargets.forEach((el) => el.classList.add('u-reveal'));

    // 章タイトル（eyebrow + title）：左から右へ動きながら
    const titleTargets = document.querySelectorAll(
      '.p-chapter__eyebrow, .p-chapter__title'
    );
    titleTargets.forEach((el) => {
      el.classList.add('u-reveal', 'u-reveal--slide');
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.15 }
    );

    document
      .querySelectorAll('.u-reveal')
      .forEach((el) => revealObserver.observe(el));
  }
});
