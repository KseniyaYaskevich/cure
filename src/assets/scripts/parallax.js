const parallaxWrapper = document.querySelector('.parallax__wrapper');
const animItems = document.querySelectorAll("[data-type='anim-item']");
const mediaQuery = window.matchMedia('(min-width: 768px)');

const offset = (el) => {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

const animOnScroll = () => {
  for (let index = 0; index < animItems.length; index++) {
    const animItem = animItems[index];
    const animItemHeight = animItem.offsetHeight;
    const animItemOffset = offset(animItem).top;
    const animStart = animItem.getAttribute('data-anim-start');

    let animItemPoint = window.innerHeight - animItemHeight / animStart;

    if (animItemHeight > window.innerHeight / animStart) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if ((window.pageYOffset > animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)) {
      animItem.classList.add('_active');
    } else if (animItem.getBoundingClientRect().top <= 0) {
      animItem.classList.add('_active');
    } else {
      animItem.classList.remove('_active');
    }
  }
};

animOnScroll();

let scrollPosition = 0;

document.addEventListener('scroll', function () {
  scrollPosition = window.pageYOffset;
  parallaxWrapper.style.transform = 'translate3d(0px,' + scrollPosition / 3 + 'px, 0px) scale(' + +(1 + scrollPosition / 2000) + ')';
});

window.addEventListener('scroll', animOnScroll);
