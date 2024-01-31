

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick=()=>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll= ()=>{
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop-150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top>=offset && top <offset+height){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+id+']').classList.add('active');
            });

        };
    });

    

    let header = document.querySelector('header');

    header.classList.add('sticky' , window.scrollY>100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


ScrollReveal({
    resest: true,
    distance: '80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home-content, .heading', {origin: 'top'});
ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .contact', {origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img img', {origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', {origin: 'right'});

const typed = new Typed('.multi-text', {
    strings: ['Aspiring' ,'Software Developer','full-stack Developer', 'Honours Student'],
    typeSpeed: 100,
    backSpeed: 40,
    backDelay: 1000,
    loop: true
});





document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
  
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phoneNumber = document.getElementById('phoneNumber');
        const message = document.getElementById('message');

        if (name && email && phoneNumber && message) {
            const formData = {
                name: name.value,
                email: email.value,
                phoneNumber: phoneNumber.value,
                message: message.value
            };

            saveContact(formData);
            
        } else {
            console.error('Error: Form elements not found.');
            // Handle the error or provide a console.log message for debugging.
        }
    });
})
  
function saveContact(data) {
    fetch(' http://localhost:3000/save-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        console.log(result);
        showAlert('Contact details saved successfully!','success');
      })
      .catch(error => {
        console.error('Error:', error.message);
        showAlert('Error saving contact details. Please try again.','error');
      });
  }
  

      
      function showAlert(message , status) {
        const popup = document.createElement('div');
        if (status === 'success') {
          popup.className = 'popup';    
        }else if (status === 'error'){
          popup.className = 'popup-error';
        }
        popup.textContent = message;
        document.body.appendChild(popup);
      
        setTimeout(() => {
          document.body.removeChild(popup);
        }, 3000); 
      }
      
  