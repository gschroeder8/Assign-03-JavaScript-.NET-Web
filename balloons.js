document.addEventListener("DOMContentLoaded", function() {
  const elem = document.getElementById('dob');
  const datepicker = new Datepicker(elem, {
    // options
    autohide: true,
    format: 'MM-dd'
  });

  // uncheck all boxes by default (Firefox)
  document.querySelectorAll('.form-check-input').forEach(c => c.checked = false);
  // event listener for check/uncheck
  document.getElementById('checkbox-card').addEventListener('change', function(e){
    if (e.target.classList.contains('form-check-input')) {
      const elem = document.getElementById(e.target.id + 'Img');
      elem.style.visibility = "visible";
      elem.classList.remove("animate__animated", "animate__bounceInDown", "animate__bounceOutUp");
      e.target.checked ?
        elem.classList.add("animate__animated", "animate__bounceInDown") :
        elem.classList.add("animate__animated", "animate__bounceOutUp");
    }
  });



  // #1: Randomize and apply a random animate.css attention seeker class to the greeting on page load
  const attentionSeekers = [
    'animate__bounce', 
    'animate__flash', 
    'animate__pulse', 
    'animate__rubberBand', 
    'animate__shakeX', 
    'animate__shakeY', 
    'animate__headShake', 
    'animate__swing', 
    'animate__tada', 
    'animate__wobble', 
    'animate__jello'
  ];
  
  const randomClass = attentionSeekers[Math.floor(Math.random() * attentionSeekers.length)];
  const greeting = document.querySelector('.greeting');
  greeting.classList.add(randomClass);

  
  // #2: Create a toast when the submit button is clicked if no balloons are selected
  document.getElementById('submit').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.form-check-input');
    const noSelection = [...checkboxes].every(checkbox => !checkbox.checked);

    if (noSelection) {
      const toastElement = document.getElementById('noBalloonsToast');
      const bsToast = new bootstrap.Toast(toastElement);
      bsToast.show();
    }
  });

  // #3: Check/Uncheck All functionality using the existing button with id="selectButton"
  let allSelected = false;

  document.getElementById('selectButton').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.form-check-input');
    allSelected = !allSelected;
    
    checkboxes.forEach(checkbox => {
      checkbox.checked = allSelected;
      const elem = document.getElementById(checkbox.id + 'Img');
      elem.style.visibility = checkbox.checked ? "visible" : "hidden";
      elem.classList.remove("animate__animated", "animate__bounceInDown", "animate__bounceOutUp");
      if (checkbox.checked) {
        elem.classList.add("animate__animated", "animate__bounceInDown");
      } else {
        elem.classList.add("animate__animated", "animate__bounceOutUp");
      }
    });
  });

  // #4: Hover over checkbox labels to change the h1 color to the balloon color and reset on mouseout
  const balloonColors = {
    'red': 'red',
    'green': 'green',
    'blue': 'blue'
  };

  document.querySelectorAll('.form-check-label').forEach(label => {
    label.addEventListener('mouseover', function() {
      const color = balloonColors[label.getAttribute('for')];
      greeting.style.color = color;
    });

    label.addEventListener('mouseout', function() {
      greeting.style.color = 'slategray'; // Reset to original color
    });
  });
});
