// where profile info will appear
const overview = document.querySelector(".overview");
const username = "emilyann1";
const repoList = document.querySelector(".repo-list");

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
    displayRepoInfo(repoData);
};

const displayRepoInfo = function (repos) {
    for (const repo of repos) {
       const repoItem = document.createElement("li"); 
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};