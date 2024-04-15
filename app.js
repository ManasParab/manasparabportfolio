// JS code for appearing the navbar color on scroll

// JavaScript to handle scroll event
window.addEventListener("scroll", function () {
  var navbar = document.getElementById("navbar");

  // Add or remove the 'scrolled' class based on scroll position
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ======================================================================

// JS Code for working of the popup module on load of website

function validateName(input) {
  // Replace non-alphabetic characters with empty string
  input.value = input.value.replace(/[^A-Za-z\s]/g, "");
}

document.addEventListener("DOMContentLoaded", function () {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "block";

  var modal = document.getElementById("modal");
  var nameForm = document.getElementById("nameForm");

  nameForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var nameInput = document.getElementById("nameInput").value.trim(); // Remove leading and trailing spaces
    if (nameInput && nameInput.length > 0) {
      // Check if input is not null or empty
      overlay.style.display = "none";
      var name = nameInput.substring(0, 25); // Limit to maximum 25 characters
      var element = document.getElementById("welcometxt");
      element.innerHTML = "Hello " + name + ",";
    } else {
    }
  });
});

// ==========================================================================
