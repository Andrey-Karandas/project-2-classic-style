import modals from './modules/modals'
import slider from './modules/slider'
import forms from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
  modals();
  slider('.main-slider-item', 1, 1, 'vertical', true, 3000);
  slider('.feedback-slider-item', 2, 1, 'horizontal', true, 3000, '.main-prev-btn', '.main-next-btn');
  forms();
})