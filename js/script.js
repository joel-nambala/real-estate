'use strict';

// DOM Elements
const header = document.querySelector('.header');
const navigation = document.querySelector('.nav');
const navMenu = document.querySelector('.nav-menu');
const navList = document.querySelector('.nav-list');
const scrollLinks = document.querySelectorAll('.link');
const menuToggle = document.querySelectorAll('.menu');
const links = document.querySelectorAll('a');

const btnOpenModal = document.querySelector('.btn--cta');
const modalWindow = document.querySelector('.book');
const btnCloseModal = document.querySelector('.btn--close');

const btnCta = document.querySelector('.btn--form');
const inputUsername = document.querySelector('.input-username');
const inputEmail = document.querySelector('.input-email');
const inputPassword = document.querySelector('.input-password');
const inputSelect = document.querySelector('.input-select');

const linksContainer = document.querySelector('.links-container');

const btnTop = document.querySelector('.btn--top');
const copyYear = document.querySelector('.year');

/////////////////////////////////////////
// State variables
const clients = [];

/////////////////////////////////////
// Copyright year
const changeCopyrightYear = function () {
  const today = new Date();

  const year = today.getFullYear();

  copyYear.textContent = year;
};

changeCopyrightYear();

/////////////////////////////////////////////////
// Sticky navigation bar
const fixedNav = function () {
  // Calculate the heights
  const navHeight = navigation.getBoundingClientRect().height;
  const headerHeight = header.getBoundingClientRect().height;
  const scrollHeight = window.scrollY;

  // Add the sticky navigation bar
  if (scrollHeight > headerHeight - navHeight)
    navigation.classList.add('sticky');
  else navigation.classList.remove('sticky');

  if (headerHeight < scrollHeight) btnTop.classList.remove('hide');
  else btnTop.classList.add('hide');
};

window.addEventListener('scroll', fixedNav);

/////////////////////////////////////////////////
// Monile navigation bar
const mobileNav = function () {
  // Calculate the heights
  const listHeight = navList.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;

  // Adjust the height of the container
  if (containerHeight === 0) linksContainer.style.height = `${listHeight}px`;
  else linksContainer.style.height = 0;
};

navMenu.addEventListener('click', mobileNav);

//////////////////////////////////////////////////
// Smooth scroll
const smoothScroll = function () {
  scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const id = e.target.getAttribute('href').slice(1);
      const element = document.getElementById(id);

      const navHeight = navigation.getBoundingClientRect().height;
      const containerHeight = linksContainer.getBoundingClientRect().height;
      const fixedNav = navigation.classList.contains('sticky');

      let position = element.offsetTop - navHeight;

      if (!fixedNav) position = position - navHeight;
      if (navHeight > 82) position = position + containerHeight;

      window.scrollTo({
        left: 0,
        top: position,
      });

      linksContainer.style.height = 0;
    });
  });
};

smoothScroll();

links.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const hash = link.getAttribute('href');
    if (hash === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      linksContainer.style.height = 0;
    }
  });
});

/////////////////////////////////////////
// Open and close modal
const openModal = function (e) {
  e.preventDefault();
  modalWindow.classList.add('show');
};

const closeModal = function (e) {
  // e.preventDefault();
  modalWindow.classList.remove('show');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

/////////////////////////////////////////////////////////////////
// Capture user data
const userData = function (e) {
  e.preventDefault();

  if (
    inputUsername.value === '' &&
    inputEmail.value === '' &&
    inputPassword.value === '' &&
    inputSelect.value === ''
  )
    return;

  const client = {
    name: inputUsername.value,
    email: inputEmail.value,
    pin: +inputPassword.value,
    city: inputSelect.value,
  };

  clients.push(client);
  console.log(clients);

  inputUsername.value =
    inputEmail.value =
    inputPassword.value =
    inputSelect.value =
      '';

  inputUsername.focus();
  // localStorage.setItem('clients', JSON.stringify(clients));
  // closeModal();
  // localStorage.clear();
};

btnCta.addEventListener('click', userData);
