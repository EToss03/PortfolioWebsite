// Fetching Github Repo

const username = "evanross14";
const repoTree = document.getElementById("repo-tree");

// Utility: fetch and display the contents of a repo path
async function fetchAndRenderContents(owner, repo, path, container) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
  const items = await res.json();

  items.forEach(item => {
    if (item.type === "dir") {
      const subfolder = document.createElement("div");
      subfolder.classList.add("subfolder");
      subfolder.innerHTML = `
        <i class="fa-solid fa-caret-right"></i>
        <i class="fa-solid fa-folder"></i>
        <span>${item.name}</span>
      `;

      const subContents = document.createElement("div");
      subContents.classList.add("contents");

      subfolder.addEventListener("click", async (e) => {
        e.stopPropagation();
        const isOpen = subfolder.classList.toggle("open");
        subfolder.querySelector(".fa-caret-right").style.transform = isOpen ? "rotate(90deg)" : "rotate(0deg)";
        if (isOpen && subContents.childElementCount === 0) {
          await fetchAndRenderContents(owner, repo, item.path, subContents);
        }
        subContents.style.display = isOpen ? "block" : "none";
      });

      container.appendChild(subfolder);
      container.appendChild(subContents);
    } else if (item.type === "file") {
      const file = document.createElement("div");
      file.classList.add("file");
      file.innerHTML = `<i class="fa-regular fa-file"></i><span>${item.name}</span>`;
      container.appendChild(file);
    }
  });
}

// Main: list all repos
fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    repos.forEach(repo => {
      if (repo.fork) return;

      const folder = document.createElement("div");
      folder.classList.add("folder");
      folder.innerHTML = `
        <i class="fa-solid fa-caret-right"></i>
        <i class="fa-solid fa-folder"></i>
        <span class="folder-name">${repo.name}</span>
      `;

      const contents = document.createElement("div");
      contents.classList.add("contents");

      folder.addEventListener("click", async () => {
        const isOpen = folder.classList.toggle("open");
        folder.querySelector(".fa-caret-right").style.transform = isOpen ? "rotate(90deg)" : "rotate(0deg)";
        if (isOpen && contents.childElementCount === 0) {
          await fetchAndRenderContents(username, repo.name, "", contents);
        }
        contents.style.display = isOpen ? "block" : "none";
      });

      repoTree.appendChild(folder);
      repoTree.appendChild(contents);
    });

    // Bottom link
    const githubLink = document.createElement("a");
    githubLink.href = `https://github.com/${username}?tab=repositories`;
    githubLink.target = "_blank";
    githubLink.classList.add("github-link");
    githubLink.textContent = "View all on GitHub →";
    repoTree.appendChild(githubLink);
  })
  .catch(err => {
    console.error("Error fetching repos:", err);
    repoTree.innerHTML = `<p>Could not load repositories.</p>`;
  });
