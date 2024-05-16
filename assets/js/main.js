/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


const username = document.getElementById('name');
const form = document.getElementById('submit-form');
const errorElement = document.getElementById('nameError');
const email=document.getElementById('email')
const emailerror=document.getElementById('emailError')
const subject=document.getElementById('subject')
const subjectError=document.getElementById('subjectError')
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    let nameMessages = [];
    let emailMessages=[];
  let subjectMessages=[];
    // Validation logic
    if (username.value === '' || username.value == null || !/^[a-zA-Z\s]+$/.test(username.value)) {
    nameMessages.push('Enter a valid name');
 }
 if(email.value === '' || email.value == null || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) ){
  emailMessages.push('Enter a valid email')
 }
 if(subject.value === '' || subject.value == null ||  !/^[a-zA-Z0-9\s]+$/.test(subject.value)){
  subjectMessages.push('enter a subject')
 }

    if (nameMessages.length > 0 ) {
        errorElement.innerText = nameMessages.join(', ');
    }else if (emailMessages.length >0) {
        emailerror.innerText = emailMessages.join(',')
    }else if(subjectMessages.length >0){
      subjectError.innerText = subjectMessages.join(',');
    }else {
        
        errorElement.innerText = '';
        emailerror.innerText = '';
        subjectError.innerText= '';
        // AJAX request using Fetch API
        const formData = new FormData(form);
        fetch('https://script.google.com/macros/s/AKfycbz9d8B_7PfaMefyhxNLdjjU0Y_8nH6ROqOzfXKJZsaDUqb3Iqdluv8n8XH7DhD1VoEi/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert("Form submitted successfully");
            window.location.reload();
            // window.location.href = "https://google.com";
        })
        .catch(error => {
            alert("Something went wrong");
        });
    }
});





// $("#submit-form").submit((e)=>{
//   e.preventDefault()
//   $.ajax({
//       url:"https://script.google.com/macros/s/AKfycbz9d8B_7PfaMefyhxNLdjjU0Y_8nH6ROqOzfXKJZsaDUqb3Iqdluv8n8XH7DhD1VoEi/exec",
//       data:$("#submit-form").serialize(),
//       method:"post",
//       success:function (response){
//           alert("Form submitted successfully")
//           window.location.reload()
//           //window.location.href="https://google.com"
//       },
//       error:function (err){
//           alert("Something Error")

//       }
//   })
// })