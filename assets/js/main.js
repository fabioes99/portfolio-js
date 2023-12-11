function updateProfileInfo(profileData) {
    const photo = document.getElementById('profile.photo')
    photo.src = profileData.photo
    photo.alt = profileData.name

    const name = document.getElementById('profile.name')
    name.innerText = profileData.name

    const job = document.getElementById('profile.job')
    job.innerText = profileData.job

    const location = document.getElementById('profile.location')
    location.innerText = profileData.location

    const phone = document.getElementById('profile.phone')
    phone.innerText = profileData.phone
    phone.href = `tel:${profileData.phone}`

    const email = document.getElementById('profile.email')
    email.innerText = profileData.email
    email.href = `mailto:${profileData.email}`
}

function updateSoftSkills(profileData) {
    const softSkills = document.getElementById('profile.skills.softSkills')
    softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li>${skill}</li>`).join('')
}

function updateHardSkills(profileData) {
    const hardSkills = document.getElementById('profile.skills.hardSkills')
    hardSkills.innerHTML = profileData.skills.hardSkills.map(skill => `<li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}"></li>`).join('')
}

function updateLanguages(profileData) {
    const languages = document.getElementById('profile.languages')
    languages.innerHTML = profileData.languages.map(language => `<li>${language}</li>`).join('')
}

function updatePortfolio(profileData) {
    const portfolio = document.getElementById('profile.portfolio')
    portfolio.innerHTML = profileData.portfolio.map(project => {
        return `
            <li>
                <h3 ${project.github ? 'class="github"' : ''}>${project.name}</h3>
                <a href="${project.url}" target="_blank">${project.url}</a>
                <p>Language: ${project.language} </p>
            </li>
        `
    }).join('')
}

function updateProfessionalExperience(profileData) {
    const professionalExperience = document.getElementById('profile.professionalExperience')
    professionalExperience.innerHTML = profileData.professionalExperience.map(experience => {
        return `
            <li>
                <h3 class="title">${experience.name}</h3>
                <p class="period">${experience.period}</p>
                <p>${experience.description}</p>
            </li>
        `
    }).join('')
}

function convertGithubInfoToModel(githubInfo) {
    const portfolio = new PortfolioModel()
    portfolio.name = githubInfo.name
    portfolio.photo = githubInfo.avatar_url
    portfolio.job = 'https://www.linkedin.com/in/fabio-esferra-simoes-9a816a14a/'  
    portfolio.location = githubInfo.location
    portfolio.phone = '(15) 98154-4609'
    portfolio.email = 'fabioes.99@outlook.com'

    const skills = { 
        "hardSkills": [
          {
            "name": "Laravel",
            "logo": "data/imgs/laravel.png"
          },
          {
            "name": "PHP",
            "logo": "data/imgs/php.png"
          },
          {
            "name": "Vue.js",
            "logo": "data/imgs/vue.png"
          },
          {
            "name": "React",
            "logo": "data/imgs/react.png"
          },
          {
            "name": "MySql",
            "logo": "data/imgs/mysql.png"
          },
          {
            "name": "Linux",
            "logo": "data/imgs/linux.png"
          }
        ],
        "softSkills": [
            "Empatia",
            "Lideran&ccedil;a",
            "Trabalho em equipe",
            "Flexibilidade",
            "Organiza&ccedil;&atilde;o",
            "Proatividade"
        ]
    }
    const languages = [
        "Portugu&ecirc;s BR",
        "Ingl&ecirc;s (intermedi&aacute;rio)",
        "Espanhol (iniciante)",
    ]
    const professionalExperience = [
        {
            "name": "Tech Lead - Grupo Well",
            "period": "2023",
            "description": "Foi um grande prazer liderar este time fant&aacute;stico e poder contribuir com a transforma&ccedil;&atilde;o de tantas vidas."
        },
        {
            "name": "Desenvolvedor - Grupo Well",
            "period": "2021 - 2023",
            "description": "Anos incr&iacute;veis ao lado de pessoas maravilhosas ajudando muitas empresas por todo o mundo."
        },
        {
            "name": "Estoquista - Assa&iacute;",
            "period": "2019 - 2021",
            "description": "Anos incr&iacute;veis ao lado de pessoas maravilhosas."
        }
    ]

    portfolio.skills = skills;
    portfolio.languages = languages;
    portfolio.professionalExperience = professionalExperience;

    return portfolio
}

function convertGithubReposToModel(githubInfo){
    const lista = githubInfo.map( (info) => { 
        return { 'name': info.description, 'url': info.url , 'language': info.language }
    } )
    return { 'portfolio': lista };
}


(async () => {
    const profileData = await fetchProfileData()
    const reposData = await fetchProfileDataGithub()
    updateProfileInfo(profileData)
    updateSoftSkills(profileData)
    updateHardSkills(profileData)
    updateLanguages(profileData)
    updatePortfolio(reposData)
    updateProfessionalExperience(profileData)
})()
