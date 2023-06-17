//change navbar style when scroll
const navbar = document.querySelector('.navbar');
const links = document.querySelectorAll('.navbar .links .link');

const checkNavTop = () => {
  //navbar dark to light when scroll
  if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
  //navbar active links
  links.forEach(link => {
    link.classList.remove('active');
    let currentSection = getCurrentSectionId();
    let anchoreHref = link.children[0].getAttribute('href').substring(1);
    let isStats = (anchoreHref === 'services' && currentSection === 'statics');
    if (anchoreHref === currentSection || isStats) {
      link.classList.add('active');
    }
  });

}

//burger icon toggle
const burgerIcon = document.querySelector('.navbar .burger-icon');
const list = document.querySelector('.navbar .links');
burgerIcon.addEventListener('click', toggleMenu);
links.forEach(link => {
  link.addEventListener('click', toggleMenu);
});

function toggleMenu() {
  burgerIcon.classList.toggle('active');
  list.classList.toggle('active');
}
//get the current section id
const getCurrentSectionId = () => {
  let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  let screenHeight = window.innerHeight || document.documentElement.clientHeight;
  let sections = document.getElementsByTagName('section');
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    let sectionTop = section.offsetTop - (screenHeight * 0.3);
    let sectionBottom = sectionTop + section.offsetHeight;
    //the 200 is the navbar height and some offset
    if(scrollPosition >= sectionTop  && scrollPosition < sectionBottom){
      return section.id;
    }
  }
  return null;
}

// dinamic skills progress
const skillsSection = document.querySelector('.skills');
const skillProgress = document.querySelectorAll('.skills .skill .progress');

const handleSkills = () => {
  const sectionPosition = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  if (sectionPosition < windowHeight-20) {
    skillProgress.forEach(skill => {
      skill.style.width = skill.dataset.value + '%';
      skill.innerHTML = skill.dataset.value + '%';
    });
  } else {
    skillProgress.forEach(skill => {
      skill.style.width = 0;
    });
  }
}

// handle user scroll event
window.addEventListener('scroll' , () =>{
  checkNavTop();
  handleSkills();
});

// loading function
const load = () => {
  checkNavTop();
  handleSkills();
}

//auto typing text
const myText = ['Web Devleoper' , 'Front-end Developer' , 'Freelancer']

let typed = new Typed ('.home .home-content .my-titles',{
    strings : myText ,
    typeSpeed : 70 ,
    loop : true ,
    smartBackspace: true ,
    backSpeed: 20
});

//viewing Projects
const projects = document.querySelectorAll('.work .cards .project');

projects.forEach(project => {
  project.addEventListener('click' , () => {
    createView(project.querySelector('.pic img').src);
  })
});

//create view function
const createView = (src) => {
  let container = document.createElement('div');
  let img = document.createElement('img');
  let closeBtn = document.createElement('button');
  container.classList.add('view');
  img.src = src;
  closeBtn.innerText = 'x';
  container.appendChild(img);
  container.appendChild(closeBtn);
  document.body.appendChild(container);
  closeBtn.onclick = () => {
    container.remove();
  }
}

//
