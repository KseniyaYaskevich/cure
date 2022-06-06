const parallaxWrapper = document.querySelector('.parallax__wrapper');

let scrollPosition = 0;

document.addEventListener('scroll', function () {
  scrollPosition = window.pageYOffset;
  parallaxWrapper.style.transform = 'translate3d(0px,' + scrollPosition / 3 + 'px, 0px) scale(' + +(1 + scrollPosition / 2000) + ')';
});
