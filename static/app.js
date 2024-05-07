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


function validerformcr(event) {
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
            window.location.href = "../"
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    setTimeout(function () {
        location.reload();
    }, 6000);
}

function validerformlog(event) {
  event.preventDefault();

  const form = document.forms["iformlog"]
  let username = form['username'].value
  let password = form["password"].value

  fetch("/login", {
      method: "POST",
      body: JSON.stringify({
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
          window.location.href = "../"
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
  setTimeout(function () {
      location.reload();
  }, 30000);
}


// typewriter 
document.addEventListener('DOMContentLoaded', function () {
  fetch('../jsonuser')
    .then(response => response.json())
    .then(data => {
      const wordn = data.wordn;
      const uname = data.uname;

      async function typeSentence(sentence, eleRef, delay = 100) {
        const letters = sentence.split("");
        let i = 0;
        while (i < letters.length) {
          await waitForMs(delay);
          $(eleRef).append(letters[i]);
          i++;
        }
      }

      function waitForMs(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      function brcreate(line) {
        var br = document.createElement("br");
        document.getElementById(line).appendChild(br);
      }

      typewriter();

      async function typewriter() {
        document.getElementById("line").style.display = "block";
        await typeSentence("Welcome back " + uname + "!", "#line");
        await waitForMs(100);
        await brcreate('line');
        document.getElementById("input-cursor").style.display = "none";
        document.getElementById("input-cursor2").style.display = "inline-block";
        document.getElementById("line2").style.display = "block";
        await typeSentence("Today's word of the day is", "#line2");
        await waitForMs(100);
        await brcreate('line2');
        document.getElementById("input-cursor2").style.display = "none";
        document.getElementById("input-cursor3").style.display = "inline-block";
        document.getElementById("line3").style.display = "block";
        await typeSentence(wordn[0][0], "#line3");
        await waitForMs(100);
        await brcreate('line3');
        document.getElementById("input-cursor3").style.display = "none";
        document.getElementById("input-cursor4").style.display = "inline-block";
        document.getElementById("line4").style.display = "block";
        await typeSentence(wordn[0][1], "#line4");
}

      })})
