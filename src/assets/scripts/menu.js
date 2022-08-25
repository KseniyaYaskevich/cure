import {offset} from "./util";

const pageHeader = document.querySelector('.page-header');
const navMain = document.querySelector('.main-nav');
const navMainInner = document.querySelector('.main-nav__inner');
const navToggle = navMain.querySelector('.main-nav__toggle');
const mainNavList = navMain.querySelector('.main-nav__list');

const colorHeader = (sectionColor) => {
  const navMainColor = window.getComputedStyle(navMainInner).backgroundColor;

  if (navMain.classList.contains('main-nav--opened')) {
    pageHeader.style.backgroundColor = navMainColor;
  }
  if (!navMain.classList.contains('main-nav--opened')) {
    pageHeader.style.backgroundColor = sectionColor;
  }
};

const closeMenu = () => {
  document.body.classList.remove('page__body--lock');
  navMain.classList.remove('main-nav--opened');
  mainNavList.classList.remove('_active');
}

const onNavToggleClick = () => {
  document.body.classList.toggle('page__body--lock');
  navMain.classList.toggle('main-nav--opened');
  mainNavList.classList.toggle('_active');

  colorHeader('transparent');
};

const onMainNavListClick = (evt) => {
  evt.preventDefault();

  const id = evt.target.getAttribute('href');
  const scrollTarget = document.querySelector(id);

  if (scrollTarget !== null) {
    const topOffset = document.querySelector('.page-header').offsetHeight;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition - 40,
      behavior: 'smooth'
    });

    closeMenu();
  } else return;
};

const menuOnScroll = () => {
  const windowY = window.pageYOffset;
  const pageSections = document.querySelectorAll('section');

  if (windowY > 10) {
    pageHeader.classList.add('is-scrolled');
  } else {
    pageHeader.classList.remove('is-scrolled');
  }
  pageSections.forEach(section => {
    const sectionOffTop = offset(section).top;
    const sectionOffBtm = offset(section).top + section.offsetHeight;

    if (windowY >= sectionOffTop && windowY <= sectionOffBtm) {
      const sectionColor = window.getComputedStyle(section).backgroundColor;
      pageHeader.style.backgroundColor = sectionColor;
      colorHeader(sectionColor);
    }
  });
};

if (navToggle) {
  navToggle.addEventListener('click', onNavToggleClick);
}

if (navMain) {
  mainNavList.addEventListener('click', onMainNavListClick);
}
