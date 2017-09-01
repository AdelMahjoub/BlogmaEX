window.addEventListener('DOMContentLoaded', function() {

  var navbarBurger = document.querySelector('.navbar-burger');
  var navbarMenu = document.querySelector('.navbar-menu');
  var notificationBtns = document.querySelectorAll('.delete');

  function toggleNavbarMenu(e) {
    if(navbarBurger.classList.contains('is-active')) {
      navbarBurger.classList.remove('is-active');
    } else {
      navbarBurger.classList.add('is-active');
    }

    if(navbarMenu.classList.contains('is-active')) {
      navbarMenu.classList.remove('is-active');
    } else {
      navbarMenu.classList.add('is-active');
    }
  }

  function closeNotification(e) {
    var notification = e.target.parentElement;
    notification.classList.add('is-hidden');
  }

  if(navbarBurger) {
    navbarBurger.addEventListener('click', toggleNavbarMenu, false);
  }

  if(notificationBtns) {
    notificationBtns.forEach(function(btn) {
      if(btn) {
        btn.addEventListener('click', closeNotification, false);
      }
    });
  }
  
});