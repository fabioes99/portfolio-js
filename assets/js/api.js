
async function fetchProfileData() {
    const url = 'https://api.github.com/users/fabioes99';
    const response = await fetch(url)
    const profileData = await response.json()
    const profileDataConverted = convertGithubInfoToModel(profileData)
    return profileDataConverted 
}


async function fetchProfileDataGithub() {
    const url = 'https://api.github.com/users/fabioes99/repos';
    const response = await fetch(url)
    const profileData = await response.json()
    const profileDataConverted = convertGithubReposToModel(profileData)
    return profileDataConverted 
}
