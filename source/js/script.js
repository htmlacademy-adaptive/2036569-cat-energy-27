let navMain = document.querySelector('.main-header__nav');
let navWrapper = document.querySelector('.main-header__nav-wrapper');
let navToggle = document.querySelector('.main-header__nav-toggle');

navMain.classList.remove('main-header__nav--nojs');
navWrapper.classList.remove('main-header__nav-wrapper--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-header__nav--closed')) {
    navMain.classList.remove('main-header__nav--closed');
    navMain.classList.add('main-header__nav--opened');
  } else {
    navMain.classList.add('main-header__nav--closed');
    navMain.classList.remove('main-header__nav--opened');
  }
});
