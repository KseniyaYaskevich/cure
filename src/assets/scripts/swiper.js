import Swiper from 'swiper';
import 'swiper/css';

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  spaceBetween: 30,
  grabCursor: true,
});

swiper.update();
