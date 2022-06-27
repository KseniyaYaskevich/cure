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
    } else if (animItem.classList.contains('is-parallax')) {
      if (animItem.getBoundingClientRect().top > 1000 || animItem.getBoundingClientRect().bottom < -100) {
        animItem.classList.remove('_active');
      }
    } else if (animItem.getBoundingClientRect().top <= 0) {
      animItem.classList.add('_active');
    } else {
      animItem.classList.remove('_active');
    }
  }
};

animOnScroll();

const parallaxOnScroll = () => {
  let translate;
  const distanceY = window.pageYOffset;
  const layers = document.querySelectorAll("[data-type='parallax']");
  const imageWrappers = document.querySelectorAll("[data-type='parallax-background']");

  layers.forEach((layer) => {
    if (mediaQuery.matches && layer.closest('._active')) {
      const layerOffset = offset(layer).top;
      const depth = layer.getAttribute('data-depth');
      const movement = `${((layerOffset - distanceY) * depth)}px`;
      translate = `translate(0, ${movement})`;
    } else {
      translate = `translate(0, 0)`;
    }
    layer.style.transform = translate;
  });

  imageWrappers.forEach((wrapper) => {
    const depth = wrapper.getAttribute('data-depth');
    const movement = `${(distanceY * depth)}px`;
    const scale = `${(1 + distanceY / 3000)}`;
    translate = `translate3d(0px, ${movement}, 0px) scale(${scale})`;
    wrapper.style.transform = translate;
  });
};

window.addEventListener('scroll', animOnScroll);
window.addEventListener('scroll', parallaxOnScroll);
