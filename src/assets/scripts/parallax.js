const parallaxWrapper = document.querySelector('.parallax__wrapper');

const offset = (el) => {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};


let scrollPosition = 0;

document.addEventListener('scroll', function () {
  scrollPosition = window.pageYOffset;
  parallaxWrapper.style.transform = 'translate3d(0px,' + scrollPosition / 3 + 'px, 0px) scale(' + +(1 + scrollPosition / 2000) + ')';
});
