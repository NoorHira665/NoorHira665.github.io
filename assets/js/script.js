'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (filterItems[i].dataset.category.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase().trim() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });

  // projects modal variables
const projectsItem = document.querySelectorAll("[data-projects-item]");
const modalContainerProj = document.querySelector("[data-modal-container]");
const modalCloseBtnProj = document.querySelector("[data-modal-close-btn]");
const overlayProj = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[modal-img-wrapper]");
const modalTitleProj = document.querySelector("[data-modal-title]");
const modalTextProj = document.querySelector("[data-modal-text]");
const modalGit = document.querySelector("[data-modal-git]");
const modalTime = document.querySelector("[data-modal-time]");

// open modal
const projectsModalFunc = function () {
  if (modalContainerProj) modalContainerProj.classList.add("active");
  if (overlayProj) overlayProj.classList.add("active");
  document.body.style.overflow = "hidden"; // stops background scrolling
}

// close modal
const projectsModalFuncClose = function () {
  if (modalContainerProj) modalContainerProj.classList.remove("active");
  if (overlayProj) overlayProj.classList.remove("active");
  document.body.style.overflow = "auto"; 
}

// add click event to all project items
if (projectsItem.length > 0) {
  for (let i = 0; i < projectsItem.length; i++) {
    projectsItem[i].addEventListener("click", function () {
      
      // Load text data
      if (modalTitleProj) modalTitleProj.innerHTML = this.querySelector("[data-projects-title]").innerHTML;
      if (modalTextProj) modalTextProj.innerHTML = this.querySelector("[data-projects-text]").innerHTML;
      if (modalTime) modalTime.innerHTML = this.querySelector("[data-projects-time]").innerHTML;
      const gitUrl = this.querySelector("[data-projects-git]").innerText.trim();
      const gitLabelEl = this.querySelector("[data-projects-git-label]");
      const gitLabel = gitLabelEl ? gitLabelEl.innerText.trim() : "View on GitHub";

      if (modalGit) {
        if (gitUrl === "#" || gitUrl === "") {
          modalGit.style.display = "none";
        } else {
          modalGit.style.display = "inline-flex";
          modalGit.href = gitUrl;
          modalGit.querySelector("span").innerText = gitLabel;
        }
        }

      // Load images
      const linkList = this.querySelector("#linkList");
      if (linkList && modalImg) {
        const links = linkList.querySelectorAll(".imgUrl");
        modalImg.innerHTML = ""; // clear old images out
        
        links.forEach(link => {
          const href = link.getAttribute("href");
          const imgElem = document.createElement("img");
          imgElem.src = href;
          imgElem.style.width = "100%";
          imgElem.style.borderRadius = "14px";
          imgElem.style.marginBottom = "15px";
          modalImg.appendChild(imgElem);
        });
      }

      projectsModalFunc();
    });
  }
}

// add click event to modal close buttons
if (modalCloseBtnProj) modalCloseBtnProj.addEventListener("click", projectsModalFuncClose);
if (overlayProj) overlayProj.addEventListener("click", projectsModalFuncClose);
}