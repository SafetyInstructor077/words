const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const menuIcons = document.querySelectorAll('.navbar__icons')
const navLogo = document.querySelector('#navbar__logo');
const nav = document.querySelector('.navbar');


// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  nav.classList.add('active');
  menuLinks.classList.toggle('active');
};

const navbarblack = () => {
  if (mobileMenu){
    nav.classList.add('active');
  } else {
    nav.classList.remove('active');
  }
};

menu.addEventListener('click', mobileMenu, navbarblack);

// Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page');
  const pilotMenu = document.querySelector('#pilot-page');
  let scrollPos = window.scrollY;
  // console.log(scrollPos);

  // adds 'highlight' class to my menu items
  if (window.innerWidth > 960 && scrollPos < 400) {
    homeMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 1100) {
    aboutMenu.classList.add('highlight');
    homeMenu.classList.remove('highlight');
    pilotMenu.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 1300) {
    pilotMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  }

  if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
    elem.classList.remove('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

function makeinvisible(navbar){
  var element=document.getElementsByClassName('navbar')
  if (menuBars)
   try { 
     element.classList.remove(".navbar");
     } catch (ex){}
     element.classList.add(".navbar.active");
}    

const navbar = document.querySelector('.navbar');
const show = window.scrollY > window.innerHeight;
window.onscroll = () => {
    if (window.scrollY > show) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
};



