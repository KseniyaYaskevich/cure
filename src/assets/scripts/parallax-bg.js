import simpleParallax from 'simple-parallax-js';

var images = document.querySelectorAll('.parallax-bg__img');
new simpleParallax(images, {
  delay: .6,
  transition: 'cubic-bezier(0,0,0,1)',
  scale: 1.3,
  customWrapper: '.parallax-bg'
});
