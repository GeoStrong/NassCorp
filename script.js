'use strict';

const body = document.querySelector('body');
const headerBtns = document.querySelector('.header-list__buttons');
const searchBtn = document.querySelector('.header__btn--search');
const searchBtnClose = document.querySelector('.header-search__close');
const search = document.querySelector('.header__search');
const searchBar = document.querySelector('.header__search--bar');
const list = document.querySelector('.header__list');
const item = document.querySelector('.header__item--last');
const burgerBtn = document.querySelector('.header-burger__btn');
const burgerOpen = document.querySelector('.header-burger__open');
const burgerClose = document.querySelector('.header-burger__close');
const overlay = document.querySelector('.overlay');
const allSections = document.querySelectorAll('.section');

const searchClose = function () {
  searchBar.value = '';
  search.style.display = 'none';
  list.style.display = 'flex';
};

const calcDisplay = function (property) {
  burgerOpen.style.display = property;
  burgerClose.style.display = property;
  overlay.style.display = property;
};

searchBtn.addEventListener('click', function () {
  if (getComputedStyle(search).display === 'block') {
    console.log('Success');
  } else {
    search.style.display = 'block';
    list.style.display = 'none';
  }
});

searchBtnClose.addEventListener('click', searchClose);

burgerBtn.addEventListener('click', function () {
  searchClose();
  calcDisplay('block');
  burgerBtn.style.display = 'none';
  headerBtns.style.zIndex = '0';
  item.style.margin = '0';
  list.classList.add('active');
  body.style.overflowY = 'hidden';
});

const closing = function () {
  calcDisplay('none');
  burgerBtn.style.display = 'block';
  item.style.marginRight = '2.5rem';
  headerBtns.style.zIndex = '2';
  list.classList.remove('active');
  body.style.overflowY = 'scroll';
};

burgerClose.addEventListener('click', function () {
  closing();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && list.classList.contains('active')) {
    closing();
  }
});

overlay.addEventListener('click', closing);

list.addEventListener('click', closing);

const revealSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('hidden');
});
