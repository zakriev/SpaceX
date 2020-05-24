let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");
let rocketData = [];
navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});
const rocketContainer = document.getElementById('rocket-container');
if(rocketContainer) {
  fetch('https://api.spacexdata.com/v3/rockets')
  .then(res => res.json())
  .then(data => data.map((rocket) => rocketContainer.appendChild(createRocket(rocket))));
}


const createRocket = (data) => {
  let rocket = document.createElement('div');
  rocket.classList.add('rocket');
  let link = document.createElement('a');
  link.href = data.wikipedia;
  link.innerText = "Read more";
  let heading = document.createElement('h2');
  heading.classList.add('rocket-heading');
  heading.innerText = data.rocket_name;
  let desc = document.createElement('p');
  desc.innerText = data.description;
  let img = document.createElement('img');
  img.src = data.flickr_images[0];
  rocket.appendChild(img);
  rocket.appendChild(heading);
  rocket.appendChild(desc);
  rocket.appendChild(link);
  return rocket;
}

if(document.getElementById('countdown')) {
  let countdownDate = '';
  fetch('https://api.spacexdata.com/v3/launches/upcoming').then(res => res.json())
  .then(data => countdownDate = new Date(data[0].launch_date_local));
  setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('countdown').innerText = days + ":" + minutes + ":" + seconds;
    if (distance < 0) {
      clearInterval(x);
      document.getElementById('countdown').innerHTML = "EXPIRED";
    }
  }, 1000);
}


const contactForm = document.getElementById('contact-form');
if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    console.log(e);
  })
}

