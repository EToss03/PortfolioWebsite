/*
Scrolling animation scripts
*/

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Add scroll event listener
document.addEventListener("scroll", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");
    fadeInElements.forEach((element) => {
        if (isInViewport(element)) {
            element.classList.add("active");
        }
    });
});

// Trigger animations for already-visible elements on load
document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");
    fadeInElements.forEach((element) => {
        if (isInViewport(element)) {
            element.classList.add("active");
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

// Select all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

console.log("Fade-in animaitions loaded properly");

/*
This is header scrolling scripts
*/

// Select the header element
const header = document.querySelector("header");

let lastScrollY = 0;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        header.classList.add("hidden");
    } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        header.classList.remove("hidden");
        header.classList.add("visible");
    } else if (currentScrollY <= 100) {
        // At the top of the page
        header.classList.remove("hidden");
        header.classList.remove("visible");
    }

    lastScrollY = currentScrollY;
});

/*
Hamburger menu scripting
*/

// Select hamburger menu and off-screen menu elements
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

// Toggle the menu on click
hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});

// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
    const isClickInsideMenu = offScreenMenu.contains(event.target);
    const isClickOnHamMenu = hamMenu.contains(event.target);

    // Close menu if click is outside both the menu and the hamburger icon
    if (!isClickInsideMenu && !isClickOnHamMenu) {
        hamMenu.classList.remove('active');
        offScreenMenu.classList.remove('active');
    }
});

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
