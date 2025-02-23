const modals = () => {
  let btnPressed = false

  function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
    const triggers = document.querySelectorAll(triggerSelector)
    const modal = document.querySelector(modalSelector)
    const close = document.querySelector(closeSelector)
    const scrollSize = calcScroll()
    const gift = document.querySelector('.fixed-gift')
    const currentPositionGift = getComputedStyle(gift).right


    triggers.forEach(item => {
      item.addEventListener('click', () => {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        document.body.style.marginRight = `${scrollSize}px`
        modal.setAttribute('data-active', true)
        gift.style.right = `${(parseInt(currentPositionGift) + scrollSize) / 10}rem`

        if (destroy) {
          item.remove()
        }

        btnPressed = true

      })
    })

    close.addEventListener('click', () => {
      modal.style.display = 'none'
      document.body.style.overflow = ''
      document.body.style.marginRight = `0px`
      modal.removeAttribute('data-active')
      console.log(parseInt(currentPositionGift));
      gift.style.right = `${parseInt(currentPositionGift) / 10}rem`
    })

    modal.addEventListener('click', (e) => {
      const target = e.target
      if (target === modal) {
        modal.style.display = 'none'
        document.body.style.overflow = ''
        document.body.style.marginRight = `0px`
        modal.removeAttribute('data-active')
        gift.style.right = `${parseInt(currentPositionGift) / 10}rem`
      }
    })

  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      const activeModal = document.querySelector('[data-active]')
      if (!activeModal) {
        document.querySelector(selector).style.display = 'block'
        document.body.style.overflow = 'hidden'
        const scrollSize = calcScroll()
        document.body.style.marginRight = `${scrollSize}px`
      }
    }, time)
  }

  function calcScroll() {
    return window.innerWidth - document.documentElement.clientWidth
  }

  window.addEventListener('scroll', () => {
    if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
      document.querySelector('.fixed-gift').click()
    }
  })

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close')
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close')
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true)
  showModalByTime('.popup-consultation', 60000)

}

export default modals;