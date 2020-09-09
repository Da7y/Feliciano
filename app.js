// UI CONTROLLER
var UIController = (function() {
  ///////////////////////
  // slider
  var n = 1;
  sliderNum = 3;

  //remove active
  var removeSlide = function() {
    $(".slide").removeClass("active");
  };

  //change slide
  var changeSlide = function() {
    if ((this.id = "right")) {
      n++;
    } else if ((this.id = "left")) {
      n--;
    }
  };

  //add change every 2s
  sliderTime = function() {
    setInterval(function() {
      if (location.hash.slice(1) == "Home" || location.hash.slice(1) == "") {
        n++;
        removeSlide();
        displaySlide();
      } else {
        n = 1;
        removeSlide();
        displaySlide();
      }
    }, 3000);
  };

  //display slide
  displaySlide = function() {
    if (n > sliderNum) {
      n = 1;
    } else if (n < 1) {
      n = sliderNum;
    }

    $(".slide--" + n).addClass("active");
  };

  //nav function goto
  const activeNavSection = () => {
    $(".navbar__item *").removeClass("active");
    $(`.navbar__item--${sectionName}`).addClass("active");
  };

  const goToAnti = () => {
    $(".RESERVATION").removeClass("goto__book");
    $(".blog-grid--extra").addClass("not-active");
    $("#map").hide();
  };

  const goToNorm = () => {
    sectionName = location.hash.slice(1);
    //remove dishes
    $(".featured-menu").show();
    //remove slider header replace with with section name
    $(".header-1--slider").show();
    $(".header-2.header-2--light").show();

    // add new dev with this diplay
    // and header display none
    $("#goto__header").hide();
    $("#goto__header").text(sectionName);

    // slider 50% width no slide (if (**)return;)
    $(".slider").css("height", "100vh");
    $(".arrow").show();

    //blog
    $(".blog-grid--extra").addClass("not-active");
  };

  ///////////////////////
  //return
  return {
    slider: function() {
      removeSlide();
      changeSlide();
      displaySlide();
    },

    sliderTimer: function() {
      sliderTime();
    },
    removeActive: function() {
      $(".menu__grid").removeClass("active");
    },
    removeSelected: function() {
      $(".menu-nav__item").removeClass("selected");
    },

    displayMenu: function(self) {
      let menuName = self.id;
      $("." + menuName).addClass("active");
      $(self).addClass("selected");
    },

    //counter
    countAnimation: function() {
      const counters = document.querySelectorAll(".counter");
      const speed = 5500;

      counters.forEach((counter) => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;

          const interval = speed / target;

          if (Math.floor(target / speed) > 0) {
            const inc = 14;

            if (count < target) {
              counter.innerText = count + inc;
              setTimeout(updateCount, interval);
            } else {
              counter.innerText = "15,000";
            }
          } else {
            const inc = 1;

            if (count < target) {
              counter.innerText = count + inc;
              setTimeout(updateCount, interval);
            }
          }
        };
        updateCount();
      });
    },

    // testimony
    currentSlide: function(n) {
      const size = $(".testimony__slide")[0].clientWidth + 30;

      $(".testimony__slide").css("transform", `translateX(${-size * n}px)`);

      $(`.dot`).removeClass("dot--active");
      $(`.dot--${n}`).addClass("dot--active");
    },

    //nav togo
    goToInit: () => {
      sectionName = location.hash.slice(1);

      //remove dishes
      $(".featured-menu").hide();

      //remove slider header replace with with section name
      $(".header-1--slider").hide();
      $(".header-2.header-2--light").hide();

      // add new dev with this display
      // and header display none
      $("#goto__header").show();
      $("#goto__header").text(sectionName);

      // slider 50% width no slide (if (**)return;)
      $(".slider").css("height", "50vh");
      $(".arrow").hide();
    },

    goToHome: () => {
      activeNavSection();
      $("section").css("display", "grid");
      goToAnti();
      // function to cancel all that
      goToNorm();
      AOS.init();
    },

    goToAbout: () => {
      activeNavSection();
      goToAnti();
      $("section").css("display", "grid");
      $(".featured-menu").hide();

      $(".Menu").css("display", "none");
      AOS.init();
    },

    goToMenu: () => {
      activeNavSection();

      $("section").css("display", "none");
      $(".slider").css("display", "block");

      $(".Menu").css("display", "block");
      AOS.init();
    },

    goToBlog: () => {
      activeNavSection();
      goToAnti();
      $("section").css("display", "none");
      $(".slider").css("display", "block");

      $("#Blog").css("display", "block");

      //cancel it
      $(".blog-grid--extra").removeClass("not-active");
      AOS.init();
    },

    goToReservation: () => {
      activeNavSection();
      goToAnti();
      $("section").css("display", "none");
      $(".slider").css("display", "block");

      $(".RESERVATION").css("display", "block");
      //cancel it
      $(".RESERVATION").addClass("goto__book");
      $("#map").show();

      AOS.init();
    },
  };
})();

/////////////////////////////////////////
//  APP CONTROLLER
var controller = (function(UICtrl) {
  var setupEventListeners = function() {
    $(".arrow").click(UICtrl.slider);

    $(".menu-nav__item").click(function() {
      const self = this;
      menuCTRL(self);
    });

    //scroll
    $(window).scroll(function() {
      if (!scrollActive && window.scrollY > 850) {
        scrollActive = true;
        UICtrl.countAnimation();
      }
    });

    // nav menu
    $(".burger-menu").click(() => {
      $(".nav-container").toggleClass("clicked");
    });

    //fixed nav
    $(window).on("scroll", () => {
      $(window).scrollTop() > 200
        ? $(".nav-container").addClass("nav-active")
        : $(".nav-container").removeClass("nav-active");
    });
  };

  var sliderTimer = function() {
    UICtrl.sliderTimer();
  };

  ///////scroll
  var scrollActive = false;

  //////////menu
  const menuCTRL = function(self) {
    //remove active from all
    UICtrl.removeActive();
    //remove selected
    UICtrl.removeSelected();

    //displayMenu
    UICtrl.displayMenu(self);
  };

  //nav goto controller
  function navGoTo() {
    UICtrl.goToInit();

    if (sectionName === "Home") {
      UICtrl.goToHome();
    } else if (sectionName === "About") {
      UICtrl.goToAbout();
    } else if (sectionName === "Menu") {
      UICtrl.goToMenu();
    } else if (sectionName === "Blog") {
      UICtrl.goToBlog();
    } else if (sectionName === "RESERVATION") {
      UICtrl.goToReservation();
    }
  }

  return {
    init: function() {
      setupEventListeners();
      sliderTimer();
      UICtrl.currentSlide(0);
      window.onhashchange = navGoTo;
    },
  };
})(UIController);

controller.init();

let map;

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 29.977325,
      lng: 31.132446,
    },
    zoom: 14,
  });

  var marker = new google.maps.Marker({
    position: {
      lat: 29.977325,
      lng: 31.132446,
    },
    map: map,
  });
}
