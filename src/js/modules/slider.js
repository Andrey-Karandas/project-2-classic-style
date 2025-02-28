const sliders = (slides, start, step, dir, auto = false, time, prev, next) => {
  let slideIndex = start;
  let paused
  const items = document.querySelectorAll(slides);

  function showSlides(n) {
    if (n > items.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = items.length;
    }

    items.forEach(item => {
      item.classList.add('animated');
      item.style.display = 'none';
    });

    items[slideIndex - 1].style.display = 'block';
  }

  showSlides(slideIndex)

  function changeSlides(n) {
    showSlides(slideIndex += n)
  }

  try {
    const prevBtn = document.querySelector(prev);
    const nextBtn = document.querySelector(next);

    prevBtn.addEventListener('click', () => {
      changeSlides(-step)
      if (dir === 'vertical') {
        items[slideIndex - 1].classList.remove('slideInDown');
        items[slideIndex - 1].classList.add('slideInUp');
      } else {
        items[slideIndex - 1].classList.remove('slideInLeft');
        items[slideIndex - 1].classList.add('slideInRight');
      }
    })

    nextBtn.addEventListener('click', () => {
      changeSlides(step)
      if (dir === 'vertical') {
        items[slideIndex - 1].classList.remove('slideInUp');
        items[slideIndex - 1].classList.add('slideInDown');

      } else {
        items[slideIndex - 1].classList.remove('slideInRight');
        items[slideIndex - 1].classList.add('slideInLeft');
      }
    })
  } catch (e) { }

  function activationAnimation() {
    if (auto) {
      if (dir === 'vertical') {
        paused = setInterval(() => {
          changeSlides(step)
          items[slideIndex - 1].classList.add('slideInDown');
        }, time)
      } else {
        paused = setInterval(() => {
          changeSlides(step)
          items[slideIndex - 1].classList.remove('slideInRight');
          items[slideIndex - 1].classList.add('slideInLeft');
        }, time)
      }
    }
  }
  activationAnimation();

  items[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused);
  });

  items[0].parentNode.addEventListener('mouseleave', () => {
    activationAnimation();
  });
}

export default sliders;