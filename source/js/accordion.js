'use strict';

// Аккордион (мобильная версия футера)

(function () {
  var navList = document.querySelector('.footer__list-wrap');
  var contactsList = document.querySelector('.footer__contacts-wrap');

  var CLOSE_MENU_LIST = 'footer__list--close';
  var CLOSE_CONTACTS_LIST = 'footer__contacts-wrap--close';
  var TOGGLE_ICON_ON = 'accordion-toggle__icon--js';
  var ACCORDION_TOGGLE_ON = 'accordion-toggle--js';

  var accordionMenuToggle = document.querySelector('.accordion-toggle--menu');
  var accordionContactsToggle = document.querySelector('.accordion-toggle--contacts');

  var accordionMenuToggleBig = document.querySelector('.accordion--menu');
  var accordionContactsToggleBig = document.querySelector('.accordion--contacts');

  var accordionMenuToggleIconOpen;
  var accordionMenuToggleIconClose;
  var accordionContactsToggleIconOpen;
  var accordionContactsToggleIconClose;

  if (accordionMenuToggle) {
    accordionMenuToggleIconOpen = accordionMenuToggle.querySelector('.accordion-toggle__icon--open');

    accordionMenuToggleIconClose = accordionMenuToggle.querySelector('.accordion-toggle__icon--close');

    accordionMenuToggle.classList.add(ACCORDION_TOGGLE_ON);
  }

  if (accordionContactsToggle) {
    accordionContactsToggleIconOpen = accordionContactsToggle.querySelector('.accordion-toggle__icon--open');

    accordionContactsToggleIconClose = accordionContactsToggle.querySelector('.accordion-toggle__icon--close');

    accordionContactsToggle.classList.add(ACCORDION_TOGGLE_ON);
  }

  if (navList) {
    navList.classList.add(CLOSE_MENU_LIST);
  }

  if (contactsList) {
    contactsList.classList.add(CLOSE_CONTACTS_LIST);
  }

  if (accordionMenuToggleIconOpen) {
    accordionMenuToggleIconOpen.classList.add(TOGGLE_ICON_ON);
  }

  if (accordionContactsToggleIconOpen) {
    accordionContactsToggleIconOpen.classList.add(TOGGLE_ICON_ON);
  }

  function toggleNavaccordionState() {
    accordionMenuToggleIconOpen.classList.toggle(TOGGLE_ICON_ON);

    accordionMenuToggleIconClose.classList.toggle(TOGGLE_ICON_ON);

    navList.classList.toggle(CLOSE_MENU_LIST);

    if (accordionContactsToggleIconClose.classList.contains(TOGGLE_ICON_ON)) {
      accordionContactsToggleIconOpen.classList.toggle(TOGGLE_ICON_ON);
      accordionContactsToggleIconClose.classList.toggle(TOGGLE_ICON_ON);

      contactsList.classList.toggle(CLOSE_CONTACTS_LIST);
    }
  }

  function toggleContactsaccordionState() {
    accordionContactsToggleIconOpen.classList.toggle(TOGGLE_ICON_ON);

    accordionContactsToggleIconClose.classList.toggle(TOGGLE_ICON_ON);

    contactsList.classList.toggle(CLOSE_CONTACTS_LIST);

    if (accordionMenuToggleIconClose.classList.contains(TOGGLE_ICON_ON)) {
      accordionMenuToggleIconOpen.classList.toggle(TOGGLE_ICON_ON);
      accordionMenuToggleIconClose.classList.toggle(TOGGLE_ICON_ON);

      navList.classList.toggle(CLOSE_MENU_LIST);
    }
  }

  function toggleNavClickHandler() {
    toggleNavaccordionState();
  }

  function toggleClassListClickHandler() {
    toggleContactsaccordionState();
  }

  function activateToggleClickListener() {
    if (accordionMenuToggleBig) {
      accordionMenuToggleBig.addEventListener('click', toggleNavClickHandler);
    }

    if (accordionContactsToggleBig) {
      accordionContactsToggleBig.addEventListener('click', toggleClassListClickHandler);
    }
  }

  activateToggleClickListener();

})();
