window.addEventListener('load', function () {
  platformDetection();
  preloader();
  stickyHeader();
  pageCursor();
  initSlider();
  initPageNav();
  mobileMenu();
  initBackToTop();
  contactForm();
  initTyped();
  Splitting();
});
window.addEventListener('resize', function () {
  platformDetection();
})
window.addEventListener('scroll', function () {
  stickyHeader();
})


// -----------------------------------------------------
// ---------------   FUNCTIONS    ----------------------
// -----------------------------------------------------

function platformDetection() {
  const html = document.querySelector('html');
  var mobileTest;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || window.innerWidth < 992) {
    mobileTest = true;
    html.classList.add("mobile");
  }
  else {
    mobileTest = false;
    html.classList.remove("mobile");
  }
}
function initWow() {
  const wowInstance = new WOW({
    offset: 100,
    mobile: true,
    live: true,
  });
  wowInstance.init();

}
function mobileMenu() {
  if (document.querySelector('html').classList.contains('mobile')) {
    const button = document.querySelector('.js-menu-toggle');
    if (!button) return;
    const siteMenu = document.querySelector('.site-menu');
    const links = siteMenu.querySelectorAll('a');
    button.addEventListener('click', function () {
      siteMenu.classList.toggle('opened');
      button.classList.toggle('active');
    });
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        const target = e.currentTarget;
        if (target.closest('.has-submenu')) {
          if (target.getAttribute('href') === '#') {
            e.preventDefault();
          }
          const li = target.closest('.has-submenu');
          if (li.querySelector('.submenu')) {
            $(li.querySelector('.submenu')).slideToggle(300)
          }
        }
        else {
          setTimeout(function () {
            siteMenu.classList.toggle('opened');
            button.classList.toggle('active');
          }, 200);
        }
      })
    });
  }

}

function initTyped() {
  const texts = document.querySelectorAll('.typed-strings span');
  if (texts.length > 0) {
    var typed = new Typed('.typed', {
      strings: Array.from(texts).map(text => text.innerHTML),
      typeSpeed: 100,
      backDelay: 1000,
      loop: true,
      contentType: 'html', // or text
      // defaults to false for infinite loop
      loopCount: false,
    });

  }
}


function initSlider() {
  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    const swiper = new Swiper(".testimonial-slider", {
      slidesPerView: 1,
      spaceBetween: 42,
      speed: 1000,
      pagination: { el: ".swiper-testimonial-pagination" },
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 42,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 42,
        }
      },
      navigation: {
        nextEl: ".testimonial-slider-nav .nav-next",
        prevEl: ".testimonial-slider-nav .nav-prev",
      }
    })
  }

}

function debounce(func, timeout = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => func.apply(this, args), timeout);
  };
}

function initPageNav() {
  const onePageNavInstance = Object.create(onePageLink);
  onePageNavInstance.render();
}

var onePageLink = {
  config: {
    sections: [],
    currentClassName: 'active',
    linkSelector: '.one-page-link',
    scrollOffset: 80
  },

  render: function () {
    const links = document.querySelectorAll(this.config.linkSelector);
    const self = this;
    links.forEach(link => {
      if (self.isValidSelector(link.getAttribute('href'))) {
        self.config.sections.push(document.querySelector(link.getAttribute('href')));
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const destinationId = e.currentTarget.getAttribute('href');
          if (destinationId) {
            const destination = document.querySelector(destinationId);
            if (destination) {
              window.scrollTo({
                top: destination.offsetTop - (self.config.scrollOffset - 16),
                left: 0,
                behavior: "smooth",
              });
            }
          }
        });
      }
    });
    this.getCurrentSection();

    window.addEventListener('scroll', debounce(this.handleWindowOnScrolled.bind(this), 300));
  },

  isValidSelector: function (selector) {
    try {
      document.querySelector(selector)
    }
    catch {
      return false
    }
    return true
  },

  handleWindowOnScrolled: function () {
    this.getCurrentSection();
  },

  getCurrentSection: function () {
    const winH = window.innerHeight;
    this.config.sections.forEach(section => {
      if (section) {
        const sectionY = section.getBoundingClientRect().y;
        const sectionH = section.getBoundingClientRect().height;
        if (sectionY < winH && Math.abs(sectionY) < sectionH) {
          if (sectionY < this.config.scrollOffset + 1) {
            this.setActiveMenuLink(section.getAttribute('id'));
          }
        }
      }
    });
  },

  setActiveMenuLink: function (sectionId) {
    const currentActiveLink = document.querySelector(`${this.config.linkSelector}.${this.config.currentClassName}`);
    if (currentActiveLink) {
      currentActiveLink.classList.remove('active');
      const nextCurrentLink = document.querySelector(`a[href="#${sectionId}"]`);
      nextCurrentLink.classList.add('active');
    }
  }
}
document.addEventListener('DOMContentLoaded', function() {
  const marqueeContent = document.querySelector('.marquee-text-content');
  const marqueeTrack = document.querySelector('.marquee-text-track');

  // Clone the content to create a seamless loop
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;

  // Scroll the marquee
  function scrollMarquee() {
    if (marqueeTrack.scrollLeft >= marqueeContent.offsetWidth) {
      marqueeTrack.scrollLeft = 0;
    } else {
      marqueeTrack.scrollLeft += 1;
    }
  }

  setInterval(scrollMarquee, 20);
});
function initBackToTop() {
  const backToTopInstance = Object.create(BackToTop);
  backToTopInstance.config = {
    button: document.querySelector('.back-to-top')
  }
  backToTopInstance.init();

}

var BackToTop = {
  config: {
    button: undefined,
    path: undefined,
  },
  init: function () {
    if (!this.config.button) return;
    const progressWrap = this.config.button.querySelector('.progress-wrap');
    this.config.path = progressWrap.querySelector('path');

    this.config.button.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    })

    this.updateProgress();
    window.addEventListener('scroll', debounce(this.updateProgress.bind(this), 100));
  },

  updateProgress: function () {
    const body = document.body;
    const html = document.documentElement;
    const documentH = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight;
    const windowScrollY = window.scrollY;

    const buttonWrap = this.config.button.closest('.back-to-top-wrapper');
    if ((windowScrollY / documentH) > 0.2) {
      buttonWrap.classList.add('active');
      setTimeout(() => {
        this.config.button.classList.add('active');
      }, 100)

      const pathLength = this.config.path.getTotalLength();
      this.config.path.style.strokeDasharray = pathLength + ' ' + pathLength;
      const progress = pathLength - (windowScrollY * (pathLength / documentH));
      this.config.path.style.strokeDashoffset = progress;
    } else {
      this.config.button.classList.remove('active');
      setTimeout(() => {
        buttonWrap.classList.remove('active');
      }, 300)
    }

  }

}

// ===== ACTIVE SECTION DETECTION =====
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.site-menu a.one-page-link');
  
  // Set initial active state
  setActiveLink();
  
  // Update on scroll
  window.addEventListener('scroll', setActiveLink);
  
  // Update on click
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    });
  });

  function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href').substring(1);
      
      // Check both main and submenu links
      if (linkHref === current) {
        link.classList.add('active');
        
        // Also activate parent menu item if in submenu
        const submenuParent = link.closest('.has-submenu');
        if (submenuParent) {
          submenuParent.querySelector('> a').classList.add('active');
        }
      }
    });
  }
});

function contactForm() {
  const contactForm = document.querySelector('#contactForm');
  if (!contactForm) return;
  const formAction = contactForm.getAttribute('action');
  const formMessage = document.querySelector('.form-action-message');
  const successMessage = formMessage.querySelector('.success-message');
  const errorMessage = formMessage.querySelector('.error-message');

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (formAction === '#') {
      showSuccessMessage();
      return;
    }
    // Construct a FormData instance
    const formData = new FormData();
    try {
      const response = await fetch(formAction, {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        contactForm.classList.add('wow-out', 'animated');
        setTimeout(() => {
          contactForm.classList.add('fadeOutUp');
          setTimeout(() => {
            showSuccessMessage();
            contactForm.classList.add('invisible');
          }, 1000)
        }, 200)
      } else {
        showErrorMessage();
      }
    } catch (e) {
      console.error(e);
      showErrorMessage();
    }
  })

  function showSuccessMessage() {
    successMessage.classList.remove('d-none');
    successMessage.classList.add('wow', 'fadeInDown');
    setTimeout(() => {
      successMessage.classList.add('animated');
    }, 200);
  }

  function showErrorMessage() {
    errorMessage.classList.remove('d-none');
    errorMessage.classList.add('wow', 'fadeInUp');
    setTimeout(() => {
      errorMessage.classList.add('animated');
    }, 200);
  }
}

function pageCursor() {
  const cursors = document.querySelectorAll('.mouse-cursor');
  const cursorTargetSelectors = ['a', '.cursor-pointer', 'button', '.project-box'];
  const cursorTargets = document.querySelectorAll(cursorTargetSelectors.join(','));
  if (cursors.length === 2) {
    const cursorInner = document.querySelector('.cursor-inner');
    const cursorOuter = document.querySelector('.cursor-outer');

    window.addEventListener('mousemove', function (event) {
      cursorInner.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      cursorOuter.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    });

    cursorTargets.forEach(target => {
      target.addEventListener('mouseenter', function () {
        cursorInner.classList.add('cursor-hover');
        cursorOuter.classList.add('cursor-hover');
      });

      target.addEventListener('mouseleave', function () {
        cursorInner.classList.remove('cursor-hover');
        cursorOuter.classList.remove('cursor-hover');
      });
    });
    cursorInner.style.visibility = 'visible';
    cursorOuter.style.visibility = 'visible';
  }
}

function preloader() {
  const preloader = document.querySelector('.preloader');

  setTimeout(() => {
    preloader.classList.add('preloaded');

    initWow();
    setTimeout(() => {
      preloader.classList.add('d-none');
      preloader.remove();
    }, 2000);
  }, 1000);
}

function stickyHeader() {
  if (document.querySelector('.site-header')) {
    if (window.scrollY > 0) {
      document.querySelector('.site-header').classList.add('body-scrolled');
    } else {
      document.querySelector('.site-header').classList.remove('body-scrolled');
    }
  }
}

const aboutSection = document.querySelector('.about-section')
const aboutMeBtn = document.querySelector('.about-me-btn')
const xIcon = document.querySelector('.x-icon')
const navbar = document.querySelector('.navbar')
const socialIcons = document.querySelector('.social-links')
const overlay = document.querySelector('.overlay')
const bodyContainer = document.querySelector('#body-container')
const latestWorks = document.querySelector('.more-about-me-link')
const downArrow = document.querySelector('.down-arrow')
const latestWorksArrow = document.querySelector('.more-about-me-arrow')
const blackLogo = document.querySelector('.black-logo')
// const sendButton = document.querySelector('.submit-btn')
const mainSection = document.querySelector('.main-section')

//Sun and Moon icon document selector
const icon = document.getElementById("icon")

//form label selection
var contact_section =  document.querySelector(".contact-section")
var label1= contact_section.querySelector(".label1")
var label2= contact_section.querySelector(".label2")
var label3= contact_section.querySelector(".label3")


//when icon is clicked theme is toggled
icon.onclick = function () {
  document.body.classList.toggle("dark-theme")

  //if theme is dark then sun icon will be displayed
  if (document.body.classList.contains("dark-theme")) {
      icon.src = "images/sun.png"
  }
  //else moon icon will by default be displayed
  else {
      icon.src = "images/moon.png"
  }
  //if theme is dark then form label is white else will remain black
  label1.style.color="white"
  label2.style.color="white"
  label3.style.color="white"
}

aboutMeBtn.addEventListener('click', () => {
  aboutSection.classList.add('active')
  overlay.classList.add('active')
  navbar.classList.add('hidden')
  navbar.classList.add('hidden')
  socialIcons.classList.add('hidden')
  disableScroll()
})

xIcon.addEventListener('click', () => {
  aboutSection.classList.remove('active')
  overlay.classList.remove('active')
  navbar.classList.remove('hidden')
  socialIcons.classList.remove('hidden')
  enableScroll()
})

overlay.addEventListener('click', () => {
  aboutSection.classList.remove('active')
  overlay.classList.remove('active')
  navbar.classList.remove('hidden')
  socialIcons.classList.remove('hidden')
  enableScroll()
})


// canvas.addEventListener('wheel', (e) => {
//   window.scrollTo(0, (mainSection.clientHeight * e.deltaY) / Math.abs(e.deltaY))
// })

latestWorks.addEventListener('click', (e) => {
  scrollTo(0, mainSection.clientHeight)
})

downArrow.addEventListener('click', (e) => {
  scrollTo(0, mainSection.clientHeight)
})

latestWorksArrow.addEventListener('click', (e) => {
  scrollTo(0, mainSection.clientHeight)
})

blackLogo.addEventListener('click', (e) => {
  scrollTo(0, 0)
})


var swiper = new Swiper('.mySwiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
})


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

function preventDefault(e) {
  e.preventDefault()
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true
      },
    })
  )
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false
var wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false)
  console.log('Scroll Disabled')
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false)
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
  window.removeEventListener('touchmove', preventDefault, wheelOpt)
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
  console.log('Scroll Enabled')
}

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    
  })

  observer.observe(document.body, {
    childList: true,
  })
})


