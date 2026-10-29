(() => {
  'use strict';
  const menu = document.querySelector('.menu-button');
  const navigation = document.querySelector('.site-nav');
  const closeMenu = () => {
    navigation?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  };
  menu?.addEventListener('click', () => {
    if (!navigation) return;
    const open = navigation.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation?.classList.contains('open')) {
      closeMenu();
      menu?.focus();
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMenu(); });
  document.querySelectorAll('#year').forEach(element => { element.textContent = new Date().getFullYear(); });

  const declined = document.querySelector('#declined-slider');
  const average = document.querySelector('#average-check-slider');
  if (!declined || !average) return;
  const ranges = [[3, 5], [5, 7], [7, 10]];
  const labels = ['3–5', '5–7', '7–10+'];
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const finiteBounded = (value, fallback, minimum, maximum, step) => {
    const parsed = Number(value);
    const number = value === '' || !Number.isFinite(parsed) ? fallback : parsed;
    return Math.min(maximum, Math.max(minimum, minimum + Math.round((number - minimum) / step) * step));
  };
  const write = (id, value) => {
    const element = document.querySelector('#' + id);
    if (element) element.textContent = value;
  };
  const update = () => {
    const index = finiteBounded(declined.value, 1, 0, 2, 1);
    const check = finiteBounded(average.value, 100, 70, 700, 10);
    declined.value = String(index);
    average.value = String(check);
    const label = labels[index];
    const amountLabel = check === 700 ? '$700+' : money.format(check);
    const [low, high] = ranges[index];
    const exposure = multiplier => `${money.format(low * check * multiplier)}–${money.format(high * check * multiplier)}`;
    write('declined-badge', label);
    write('declined-range-display', `${label} checks per month`);
    write('average-check-badge', amountLabel);
    write('average-check-display', `${amountLabel} average check`);
    write('monthly-revenue-lost', exposure(1));
    write('annual-revenue-lost', exposure(12));
    write('monthly-tips-lost', exposure(0.2));
    write('annual-tips-lost', exposure(2.4));
    declined.setAttribute('aria-valuetext', `${label} checks per month`);
    average.setAttribute('aria-valuetext', `${amountLabel} average check`);
  };
  declined.addEventListener('input', update);
  average.addEventListener('input', update);
  update();
})();
