// Adding the navigation Bar from Variable
$('title').html(data.Home.Name);
$('.navbar-brand').html(data.Home.Name);
$.each(data, function(key) {
    $('#navBarAllTabs').append(`
        <li class="nav-item">
            <a class="nav-link" href="#${key.toLowerCase()}">${key}</a>
        </li>
    `);
});

// Home Info Section
$('#name').html(data.Home.Name);
$('#role').html(data.Home.Role);
$('#description').html(data.Home.Description);

$.each(data.Home.Contact, function(key,data) {
    target_value = data.target ? data.target : '_self';
    $('.homeinfosection #homesocialcontainer').append(`
        <a href="${data.href}" target="${target_value}"><i class="${data.class}"></i></a>
    `);
});

const homeImageProfile = data.Home.ImageUrl;
if (homeImageProfile) {
    $('#homeinfoprofile img').attr('src', homeImageProfile);
    $('#homeinfoprofile img').attr('alt', data.Home.Name);
    $('#homeinfoprofile').removeClass('hidden');
}

const homeBackgroundImage = data.Home.BackgroundImage;
if (homeBackgroundImage) {
  var $section = $('.homeinfosection');

  // Set background image and section styling
  $section.css({
    'position': 'relative',
    'z-index': 1
  });

  // Add a background image container only once
  if ($section.find('.bg-image').length === 0) {
    $('<div class="bg-image"></div>').css({
      'background-image': 'url(' + homeBackgroundImage + ')',
      'background-size': 'cover',
      'background-position': 'center',
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'opacity': 0.2, // 👈 Set the desired opacity here
      'z-index': 1,
      'pointer-events': 'none'
    }).appendTo($section);
  }

  // Ensure the actual content appears above the image
  $section.children().not('.bg-image').css({
    'position': 'relative',
    'z-index': 2
  });
}



// About Section
const aboutHeader = data.About.Header;
const aboutImageUrl = data.About.ImageUrl;
const aboutSubHeader = data.About.SubHeader;
const aboutSubHeaderInfo = data.About.SubHeaderInfo;
const aboutContact = data.About.Contact;
const aboutSubHeaderLast = data.About.SubHeaderLast;

var contactHtml = '';
$.each(aboutContact, function(index, contactItem) {
    contactHtml += `
        <div class="info-box">
            <p><strong>${contactItem.title}:</strong></p> <p>${contactItem.content}</p>
        </div>
    `;
});

// Conditionally build image section and adjust content column class
let imageSectionHtml = '';
let contentColClass = 'col-12'; // Default full width

if (aboutImageUrl) {
    imageSectionHtml = `
        <div class="col-lg-5 col-md-6">
            <div class="about-img">
                <img src="${aboutImageUrl}" alt="About ${data.Home?.Name || 'Me'}" class="img-fluid">
            </div>
        </div>
    `;
    contentColClass = 'col-lg-7 col-md-6'; // Shrink content if image is present
}

$('.aboutsection').html(`
    <div class="container">
        <div class="section-title">
            <h2>${aboutHeader}</h2>
        </div>
        <div class="row">
            ${imageSectionHtml}
            <div class="${contentColClass} about-content">
                <h3>${aboutSubHeader}</h3>
                <p>${aboutSubHeaderInfo}</p>
                <div class="about-info">
                    ${contactHtml}
                </div>
                <p>${aboutSubHeaderLast}</p>
            </div>
        </div>
    </div>
`);


const experienceHeader = data.Experience.Header;
const experienceData = data.Experience.ExperienceData;

let experienceHtml = `
    <div class="container">
        <div class="section-title">
            <h2>${experienceHeader}</h2>
        </div>
        <div class="row">
`;

$.each(experienceData, function(index, item) {
    const techTags = item.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    const responsibilities = item.responsibilities.map(res => `<li>${res}</li>`).join('');

    experienceHtml += `
        <div class="col-lg-12">
            <div class="experience-box">
                <h3 class="experience-title">${item.title}</h3>
                <span class="experience-company">${item.company}</span>
                <span class="experience-date">${item.date}</span>
                <div class="experience-tech">
                    ${techTags}
                </div>
                <ul class="experience-list">
                    ${responsibilities}
                </ul>
            </div>
        </div>
    `;
});

experienceHtml += `</div></div>`;

// Inject it into the section with id="experience"
$('#experience').html(experienceHtml);






const projectsHeader = data.Projects.Header;
const projects = data.Projects.ProjectData;

let projectsHtml = `
    <div class="container">
        <div class="section-title">
            <h2>${projectsHeader}</h2>
        </div>
        <div class="row align-items-stretch">
`;

$.each(projects, function(index, project) {
    const techHtml = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    const descHtml = project.description.map(line => `<li>${line}</li>`).join('');
    const tagHtml = (project.tags || []).map(tag => `<span class="badge bg-secondary me-1 mb-2">${tag}</span>`).join('');

    let linksHtml = '';
    if (Array.isArray(project.links)) {
        linksHtml = project.links.map(link => `
            <a href="${link.url}" target="_blank" class="project-link">
                <i class="${link.icon}"></i> ${link.label}
            </a>
        `).join('');
    }

    projectsHtml += `
        <div class="col-lg-6 mb-4">
            <div class="project-card h-100">
                <div class="project-content">
                    <div class="mb-2">${tagHtml}</div>
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-tech">${techHtml}</div>
                    <ul class="project-list">${descHtml}</ul>
                    <div class="project-links">${linksHtml}</div>
                </div>
            </div>
        </div>
    `;
});

projectsHtml += `
        </div>
    </div>
`;

$('#projects').html(projectsHtml);




const skillsHeader = data.Skills.Header;
const skills = data.Skills.SkillList;

const skillsHtml = `
  <div class="container">
    <div class="section-title">
      <h2>${skillsHeader}</h2>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="skills-content text-center">
          ${skills.map(skill => {
            const ratingStars = skill.rating
              ? `<span class="skill-stars">${'★'.repeat(skill.rating)}${'☆'.repeat(5 - skill.rating)}</span>`
              : '';
            const tooltip = skill.hoverText ? `title="${skill.hoverText}"` : '';
            const typeBadge = skill.type ? `<span class="skill-type">${skill.type}</span>` : '';
            
            return `
              <div class="skill-item" ${tooltip}>
                <div class="d-flex justify-content-center align-items-center gap-2">
                  <span class="skill-name">${skill.name}</span>
                  ${ratingStars}
                </div>
                ${typeBadge}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  </div>
`;

$('#skills').html(skillsHtml);




const educationHeader = data.Education.Header;
const education = data.Education.EducationList;

const educationHtml = `
  <div class="container">
    <div class="section-title">
      <h2>${educationHeader}</h2>
    </div>
    <div class="row">
      ${education.map(item => {
        const location = item.location ? `<p class="education-location">Location: ${item.location}</p>` : '';
        const studyType = item.studyType ? `<p class="education-type">Study Type: ${item.studyType}</p>` : '';
        const notes = item.notes ? `<p class="education-notes">${item.notes}</p>` : '';
        
        return `
          <div class="col-lg-4">
            <div class="education-item">
              <span class="education-year">${item.year}</span>
              <h3 class="education-degree">${item.degree}</h3>
              <p class="education-school">${item.school}</p>
              <p class="education-score">${item.score}</p>
              ${location}
              ${studyType}
              ${notes}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  </div>
`;

$('#education').html(educationHtml);






const contactData = data.Contact;
const contactList = contactData.ContactList;

let finalContactHtml = `
  <div class="container">
    <div class="section-title">
      <h2>${contactData.Header}</h2>
    </div>
    <div class="row" style="justify-content: center;">
`;

$.each(contactList, function(index, item) {
  let content = '';
  if (item.type === 'email') {
    content = `<p><a href="mailto:${item.value}">${item.value}</a></p>`;
  } else if (item.type === 'phone') {
    content = `<p><a href="tel:${item.value}">${item.value}</a></p>`;
  } else if (item.type === 'url') {
    content = `<p><a href="${item.value}" target="_blank">${item.displayText || item.value}</a></p>`;
  } else {
    content = `<p>${item.value}</p>`;
  }

finalContactHtml += `
  <div class="col-lg-3 col-md-6 mb-4">
    <div class="card h-100 text-center contact-info-item">
      <div class="card-body d-flex flex-column justify-content-center">
        <i class="${item.icon} fa-2x mb-3"></i>
        <h5 class="card-title">${item.label}</h5>
        <div class="card-text">
          ${content}
        </div>
      </div>
    </div>
  </div>
`;

});

finalContactHtml += `</div></div>`;
$('#contact').html(finalContactHtml);
