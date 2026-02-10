
/* HERO SLIDER */
(function () {
  // Select all slide elements inside the hero section
  var slides = document.querySelectorAll(".slide");

  // If there are no slides on this page, stop here
  if (!slides.length) return;

  // Track which slide is currently visible (start at 0)
  var index = 0;

  // List of possible pan animation directions
  var pans = ["pan-left", "pan-right", "pan-up", "pan-down"];

  // Pick a random pan and apply it to the first slide on load
  var firstPan = pans[Math.floor(Math.random() * pans.length)];
  slides[0].classList.add(firstPan);

  // Function to advance to the next slide
  function nextSlide() {
    // Remove active state and all pan classes from every slide
    slides.forEach(function (s) {
      s.classList.remove("active", "pan-left", "pan-right", "pan-up", "pan-down");
    });

    // Move to the next slide index, wrapping around at the end
    index = (index + 1) % slides.length;

    // Choose a random pan direction for the new slide
    var pan = pans[Math.floor(Math.random() * pans.length)];

    // Make the new slide visible and start its pan animation
    slides[index].classList.add("active", pan);
  }

  // Automatically switch slides every 8 seconds
  setInterval(nextSlide, 8000);
})();


/* BOOKING FORM  */
(function () {
  // Get the booking form element
  var form = document.getElementById("booking-form");

  // Get the success message container
  var success = document.getElementById("booking-success-message");

  // Get the background video element (may not exist)
  var video = document.getElementById("booking-bg-video");

  // If form or success message is missing, this is not the booking page
  if (!form || !success) return;

  // Listen for form submission
  form.addEventListener("submit", function (e) {
    // Prevent the browser from actually sending the form
    e.preventDefault();

    // Hide the form
    form.style.display = "none";

    // Show the success message by adding the active class
    success.classList.add("active");

    // Try to play the background video (may be blocked on mobile)
    if (video) {
      video.play().catch(function () {});
    }

    // Smoothly scroll the success message into view
    success.scrollIntoView({ behavior: "smooth" });
  });
})();


/* ABOUT PAGE INQUIRY FORM */
(function () {
  // Get the inquiry form element
  var form = document.getElementById("about-enquiry-form");

  // Get the wrapper div that contains the form
  var formWrapper = document.getElementById("about-enquiry-form-wrapper");

  // Get the success panel element
  var success = document.getElementById("about-enquiry-success");

  // If any required element is missing, stop here
  if (!form || !formWrapper || !success) return;

  // Listen for form submission
  form.addEventListener("submit", function (e) {
    // Prevent default browser form submission
    e.preventDefault();

    // Hide the entire form wrapper
    formWrapper.style.display = "none";

    // Reveal the success panel (remove the hidden attribute)
    success.hidden = false;

    // Smoothly scroll the success panel into view
    success.scrollIntoView({ behavior: "smooth" });
  });
})();



/* LOCATION SLIDER*/
(function () {
  // Get the main slider container
  var slider = document.querySelector(".location-slider");

  // If no slider exists on this page, stop here
  if (!slider) return;

  // Collect all individual slide elements into an array
  var slides = [];
  var nodeList = slider.querySelectorAll(".loc-slide");
  for (var i = 0; i < nodeList.length; i++) {
    slides.push(nodeList[i]);
  }

  // Get the previous and next buttons
  var prev = document.getElementById("loc-prev");
  var next = document.getElementById("loc-next");

  // Track the index of the currently visible slide
  var current = 0;

  // Function to display a specific slide by its index
  function show(index) {
    // Loop through all slides
    for (var i = 0; i < slides.length; i++) {
      // Remove the active class from this slide
      slides[i].classList.remove("active");

      // Pause any video inside this slide and reset it
      var video = slides[i].querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      // If this is the slide we want to show
      if (i === index) {
        // Make it visible
        slides[i].classList.add("active");

        // If this slide has a video, start playing it
        var activeVideo = slides[i].querySelector("video");
        if (activeVideo) {
          activeVideo.play().catch(function () {});
        }
      }
    }
  }

  // Function to advance to the next slide
  function showNext() {
    // Increment index, wrapping around at the end
    current = (current + 1) % slides.length;
    show(current);
  }

  // Function to go back to the previous slide
  function showPrev() {
    // Decrement index, wrapping around at the beginning
    current = (current - 1 + slides.length) % slides.length;
    show(current);
  }

  // Attach click handlers to the navigation buttons
  next.addEventListener("click", showNext);
  prev.addEventListener("click", showPrev);

  // Show the first slide when the page loads
  show(0);
})();

/* MOBILE BURGER MENU*/

(function () {
  // Get the burger menu toggle button
  var btn = document.getElementById("mobile-menu-toggle");

  // Get the site header element
  var header = document.querySelector(".site-header");

  // If either element is missing, stop here
  if (!btn || !header) return;

  // When the burger button is clicked
  btn.addEventListener("click", function () {
    // Toggle the nav-open class on the header (opens/closes menu)
    var isOpen = header.classList.toggle("nav-open");

    // Update the aria-expanded attribute for screen readers
    btn.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu when clicking anywhere outside of it
  document.addEventListener("click", function (e) {
    // Check if the click was inside the header area
    var isClickInsideNav = header.contains(e.target);

    // If clicked outside and menu is open, close it
    if (!isClickInsideNav && header.classList.contains("nav-open")) {
      header.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // Close the menu when the Escape key is pressed
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header.classList.contains("nav-open")) {
      // Remove the open class to close the menu
      header.classList.remove("nav-open");

      // Update accessibility attribute
      btn.setAttribute("aria-expanded", "false");

      // Return keyboard focus to the burger button
      btn.focus();
    }
  });
})();
