let approvedRepositories = ["mdeslippe", "personal-website", "java-discord-api", "grade-calculator", "java-mysql-utility"];

/**
 * Create a single repository display.
 * @param {Object} repository The repository to display.
 * @return {Object} A div containing the repository display.
 */
function createRepositoryEntry(repository) {

  let name = repository.name.split("-").map(capitalizeFirstLetter).join(" ");
  let description = repository.description;

  let div = document.createElement("div");
  div.classList.add("project");

  let a = document.createElement("a");
  a.classList.add("project-btn");
  a.setAttribute("href", repository.html_url);
  a.setAttribute("alt", "My, " + " GitHub project");

  let h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode(name));

  let p = document.createElement("p");
  p.appendChild(document.createTextNode(description));

  div.appendChild(a);
  a.appendChild(h2);
  a.appendChild(p);

  return div;

}

/**
 * Display all of the GitHub repositories as children elements of the element specified.
 * @param {String} user The GitHub account user name, who's repositories will be displayed.
 * @param {Object} element The element the repositories will be displayed in.
 * @param {Boolean} ownerOnly If all repositories that are returned by the query should be displayed,
 *                            or only ones who's owner matches the user specified.
 * @return {Void} This function does not return anything.
 */
function displayGitHubRepositories(user, element, ownerOnly) {

  fetch("https://api.github.com/users/mdeslippe/repos")
    .then(response => response.json())
    .then(repositories => {

      for (i = 0; i < repositories.length; i++) {
        if (ownerOnly && repositories.owner.login != user)
          continue;

        if (approvedRepositories.includes(repositories[i].name))
        element.appendChild(createRepositoryEntry(repositories[i]));
      }
          
    });

}

/**
 * Capitalize the first letter of the string given.
 * @param {String} str The string to modify.
 * @return {String} The modified string.
 */
function capitalizeFirstLetter(str) {

  return str.charAt(0).toUpperCase() + str.slice(1);

}

// Display my GitHub repositories to the element with an ID of "github-projects".
displayGitHubRepositories("mdeslippe", document.querySelector("#github-projects"));
