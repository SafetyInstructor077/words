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

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth >= 0 && menuBars) {
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
};

// Hides navbar when scrolling down and makes it reappear when scrolling up
var prev = window.pageYOffset;
window.onscroll = function() {
    var current = window.pageYOffset;
    if (prev > current){
        document.getElementById("nav").style.top = "0";
    } else {
        document.getElementById("nav").style.top = "-80px";
    }
    prev = current
};


function validerform(event) {
    event.preventDefault();

    const form = document.forms["iform"]
    let name = form["name"].value
    let username = form['username'].value
    let password = form["password"].value

    fetch("/insert", {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "username": username,
            "password": password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    setTimeout(function () {
        location.reload();
    }, 6000);
}
