// Entry point for Vite
// SCSS imports the main stylesheet via index.html <link>, but module-side init lives here.

document.addEventListener('DOMContentLoaded', () => {
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

  // 航路ナビ：現在地の船をスクロールに同期させる
  // 章の長さがバラバラなので、単純なスクロール率ではなく「各章区間で補間」して
  // 次の章に着いたら次のドットにちょうど船が乗るようにする。
  const nav = document.querySelector('.c-voyage-nav');
  if (nav) {
    const dots = Array.from(nav.querySelectorAll('.c-voyage-nav__dot'));
    const ship = nav.querySelector('.c-voyage-nav__ship');
    const stageBg = document.querySelector('.c-stage-bg');
    // ドットと同じ並び順の各章セクション（寄港地）
    const sections = [
      '.p-intro',
      '.p-prologue',
      '.p-chapter--drift',
      '.p-chapter--bottle',
      '.p-chapter--voyage',
      '.p-chapter--sender',
      '.p-chapter--isle',
      '.p-outro',
    ].map((sel) => document.querySelector(sel));

    // ステージ背景（全画面の背後レイヤー）を開いている章の色にする（_variables.scss の章背景色と対応）
    const stageColors = [
      '#fafaf7', // 出港（intro・白背景）
      '#111725', // 出発（prologue）
      '#111725', // 漂流（drift）
      '#243244', // 光（bottle）
      '#506f8d', // 航海（voyage）
      '#7caed7', // 灯台（sender）
      '#f79f3e', // 島影（isle）
      '#bfd5e6', // 返事（outro）
    ];

    let sectionTops = [];
    let dotCenters = [];
    let dotCenterX = 0;

    // 要素の nav 基準オフセット（offsetTop/Left を offsetParent 連鎖で積み上げる）。
    // getBoundingClientRect は top トランジションやスクロールの途中で不安定な値を
    // 返すが、offset 系はレイアウト値なのでその影響を受けない。
    const offsetIn = (el, prop) => {
      let v = 0;
      let cur = el;
      while (cur && cur !== nav) {
        v += cur[prop];
        cur = cur.offsetParent;
      }
      return v;
    };

    const measure = () => {
      sectionTops = sections.map((el) =>
        el ? el.getBoundingClientRect().top + window.scrollY : 0
      );
      dotCenters = dots.map((d) => offsetIn(d, 'offsetTop') + d.offsetHeight / 2);
      // 船の x はドット中心に合わせる（左パディング可変・中央寄せでもズレない）
      if (dots[0]) {
        dotCenterX = offsetIn(dots[0], 'offsetLeft') + dots[0].offsetWidth / 2;
      }
    };

    const update = () => {
      if (!dotCenters.length) return;
      const mid = window.scrollY + window.innerHeight / 2;
      let i = 0;
      while (i < sectionTops.length - 1 && mid >= sectionTops[i + 1]) i++;

      let shipY;
      let activeDot; // ドットのハイライト（船に追従・連続的）
      let stageIndex; // 背景色の判定（実際に画面中央が入った章）
      if (i >= sectionTops.length - 1) {
        // 最後の寄港地（返事）に到達
        shipY = dotCenters[dotCenters.length - 1];
        activeDot = dotCenters.length - 1;
        stageIndex = sectionTops.length - 1;
      } else {
        const span = sectionTops[i + 1] - sectionTops[i] || 1;
        const t = Math.min(1, Math.max(0, (mid - sectionTops[i]) / span));
        shipY = dotCenters[i] + t * (dotCenters[i + 1] - dotCenters[i]);
        activeDot = t < 0.5 ? i : i + 1;
        // 背景は「その章に実際に入るまで」変えない（船の位置では繰り上げない）
        stageIndex = i;
      }

      ship.style.left = `${dotCenterX}px`;
      ship.style.transform = `translate(-50%, ${shipY}px) translateY(-50%)`;
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === activeDot));
      if (stageBg) stageBg.style.backgroundColor = stageColors[stageIndex];

      // 物語の外（出港＝表紙 / 返事＝署名）ではナビを隠し、本編でだけ見せる
      const outsideStory =
        stageIndex === 0 || stageIndex === sectionTops.length - 1;
      nav.classList.toggle('is-hidden', outsideStory);
    };

    // モバイル：トグルボタンで航路パネルを開閉する
    const toggle = document.querySelector('.c-voyage-nav__toggle');
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      if (toggle) {
        toggle.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? '航路を閉じる' : '航路を開く');
      }
      if (open) {
        // offsetTop 基準の measure はトランジション非依存なので、
        // 開いた瞬間に測って正しい船位置を即セットできる（ラグなし）。
        measure();
        update();
      }
    };
    const closeNav = () => setOpen(false);
    if (toggle) {
      toggle.addEventListener('click', () => {
        setOpen(!nav.classList.contains('is-open'));
      });
    }

    dots.forEach((d, idx) => {
      d.addEventListener('click', () => {
        // モバイルは行き先が見えるようパネルを閉じてから移動
        closeNav();
        if (sections[idx]) {
          sections[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      measure();
      update();
    });
    window.addEventListener('load', () => {
      measure();
      update();
    });

    measure();
    update();
  }
});
