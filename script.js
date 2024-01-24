let slideIndex = 1;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");

// Function to show a specific slide
function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove the "active" class from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Display the current slide and mark its corresponding dot as active
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Function to advance to the next slide
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Function to navigate to a specific slide
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Automatically advance to the next slide every 3 seconds (3000 milliseconds)
setInterval(function () {
  plusSlides(1);
}, 5000);

// Initialize the slider
showSlides(slideIndex);


gsap.to(".bubble--container", 20, {
  rotation: 360,
  transformOrigin: "left 50%",
  repeat: -1,
  ease: "none"
});

var quotes = [
  '"Thank you so much for all of your help with everything!',
  '"Hands down the best support I have ever received."',
  '"The best service I have ever received!"',
  '"We could not have done it without you!"',
  '"Beyond grateful for the service I received!"',
  '"A wonderful experience all around!"'
];

var previousInt = 0;

function animateOut() {
  gsap.fromTo(".text", 2, { opacity: 1 }, { opacity: 0 });
}

function animateIn() {
  gsap.fromTo(".text", 2, { opacity: 0 }, { opacity: 1 });
}

// returns a random integer for the quote randomizer
function getRandomInt() {
  return Math.floor(Math.random() * quotes.length);
}

function handleAnimation() {
  var randomInt = getRandomInt();

  // prevents the new quote from being the same as the previous quote
  while (randomInt == previousInt) {
    randomInt = getRandomInt();
  }

  previousInt = randomInt;

  // fades the animation out after a second
  setTimeout(() => {
    animateOut();
  }, 1000);

  // changes the text of the quote after 2.8 seconds
  setTimeout(() => {
    document.querySelector(".text").innerHTML = quotes[randomInt];
  }, 2800);

  // fades the quote back in after 3 seconds
  setTimeout(() => {
    animateIn();
  }, 3000);
}

// changes the quote every 7 seconds
setInterval(handleAnimation, 7000);



let loadMoreBtn = document.querySelector('#load-more-btn');
let currentItem = 3;

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.container .box-container')];

    for (var i = currentItem; i < currentItem + 5; i++) {
        boxes[i].style.display = "inline-block";
    }

    currentItem += 5;

    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = "none"
    }

}

  // vars
  'use strict'
  var	testim = document.getElementById("testim"),
      testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
      testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
      testimLeftArrow = document.getElementById("left-arrow"),
      testimRightArrow = document.getElementById("right-arrow"),
      testimSpeed = 4500,
      currentSlide = 0,
      currentActive = 0,
      testimTimer,
      touchStartPos = true,
      touchEndPos,
      touchPosDiff,
      ignoreTouch = 30;
  ;
  
  window.onload = function() {
  
      // Testim Script
      function playSlide(slide) {
          for (var k = 0; k < testimDots.length; k++) {
              testimContent[k].classList.remove("active");
              testimContent[k].classList.remove("inactive");
              testimDots[k].classList.remove("active");
          }
  
          if (slide < 0) {
              slide = currentSlide = testimContent.length-1;
          }
  
          if (slide > testimContent.length - 1) {
              slide = currentSlide = 0;
          }
  
          if (currentActive != currentSlide) {
              testimContent[currentActive].classList.add("inactive");            
          }
          testimContent[slide].classList.add("active");
          testimDots[slide].classList.add("active");
  
          currentActive = currentSlide;
      
          clearTimeout(testimTimer);
          testimTimer = setTimeout(function() {
              playSlide(currentSlide += 1);
          }, testimSpeed)
      }
  
      testimLeftArrow.addEventListener("click", function() {
          playSlide(currentSlide -= 1);
      })
  
      testimRightArrow.addEventListener("click", function() {
          playSlide(currentSlide += 1);
      })    
  
      for (var l = 0; l < testimDots.length; l++) {
          testimDots[l].addEventListener("click", function() {
              playSlide(currentSlide = testimDots.indexOf(this));
          })
      }
  
      playSlide(currentSlide);
  
      // keyboard shortcuts
      document.addEventListener("keyup", function(e) {
          switch (e.keyCode) {
              case 37:
                  testimLeftArrow.click();
                  break;
                  
              case 39:
                  testimRightArrow.click();
                  break;
  
              case 39:
                  testimRightArrow.click();
                  break;
  
              default:
                  break;
          }
      })
      
      testim.addEventListener("touchstart", function(e) {
          touchStartPos = e.changedTouches[0].clientX;
      })
    
      testim.addEventListener("touchend", function(e) {
          touchEndPos = e.changedTouches[0].clientX;
        
          touchPosDiff = touchStartPos - touchEndPos;
        
          console.log(touchPosDiff);
          console.log(touchStartPos);	
          console.log(touchEndPos);	
  
        
          if (touchPosDiff > 0 + ignoreTouch) {
              testimLeftArrow.click();
          } else if (touchPosDiff < 0 - ignoreTouch) {
              testimRightArrow.click();
          } else {
            return;
          }        
      })
  }