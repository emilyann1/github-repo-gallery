// where profile info will appear
const overview = document.querySelector(".overview");
const username = "emilyann1";
const repoList = document.querySelector(".repo-list");
const allRepoInfo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos"); 


const getProfile = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    displayUser(user);
};

getProfile();

const displayUser = function (user) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${user.avatar_url} />
    </figure>
  <div>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Bio:</strong> ${user.bio}</p>
    <p><strong>Location:</strong> ${user.location}</p>
    <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
  </div>`;
    overview.append(div);
    getRepos();
};

const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
       const repoItem = document.createElement("li"); 
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const getRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getRepo.json();
    console.log(repoInfo);
    // get languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    
    // add languages
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    viewReposButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allRepoInfo.classList.add("hide");
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(newDiv);
};

viewReposButton.addEventListener("click", function () {
    allRepoInfo.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerText = searchText.toLowerCase();
    
    for (let repo of repos) {
        const lowerRepo = repo.innerText.toLowerCase();
        if (lowerRepo.includes(lowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});