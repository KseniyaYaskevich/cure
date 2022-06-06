const navMain = document.querySelector('.main-nav');
const navToggle = navMain.querySelector('.main-nav__toggle');
const mainNavList = navMain.querySelector('.main-nav__list');

const closeMenu = () => {
  document.body.classList.remove('page__body--lock');
  navMain.classList.remove('main-nav--opened');
  mainNavList.classList.remove('main-nav__list--opened');
}

const onNavToggleClick = () => {
  document.body.classList.toggle('page__body--lock');
  navMain.classList.toggle('main-nav--opened');
  mainNavList.classList.toggle('main-nav__list--opened');
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

if (navToggle) {
  navToggle.addEventListener('click', onNavToggleClick);
}

if (navMain) {
  mainNavList.addEventListener('click', onMainNavListClick);
}
