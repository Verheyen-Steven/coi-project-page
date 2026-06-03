const toggle = document.querySelector(".nav-toggle");
const list = document.querySelector("#nav-list");

if (toggle && list) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    list.setAttribute("data-open", String(!isOpen));
  });

  list.addEventListener("click", (e) => {
    if (e.target && e.target.tagName.toLowerCase() === "a") {
      toggle.setAttribute("aria-expanded", "false");
      list.setAttribute("data-open", "false");
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Assemble the contact email at runtime. The address is stored base64-encoded
// in the markup and the "mailto:" scheme is built from pieces, so the plain
// address never appears as scrapeable text in the served HTML.
const emailLink = document.querySelector(".contact-email");
if (emailLink && emailLink.dataset.email) {
  let address = "";
  try {
    address = atob(emailLink.dataset.email);
  } catch (e) {
    address = "";
  }

  if (address) {
    emailLink.textContent = address;
    emailLink.setAttribute("href", "mai" + "lto:" + address);
    delete emailLink.dataset.email;
  }
}

const peopleSection = document.querySelector("#people");
const peopleGrid = document.querySelector("#people-grid");
const peopleToggle = document.querySelector("#people-toggle");

if (peopleSection && peopleGrid && peopleToggle) {
  const extraPeople = peopleGrid.querySelectorAll(".person.is-extra");

  // If there are no extra cards, hide the button
  if (extraPeople.length === 0) {
    peopleToggle.style.display = "none";
  }

  peopleToggle.addEventListener("click", () => {
    const expanded = peopleSection.classList.toggle("is-expanded");

    peopleToggle.setAttribute("aria-expanded", String(expanded));
    peopleToggle.textContent = expanded ? "Show less" : "Show more";

    // Optional: keep keyboard context sensible on collapse
    if (!expanded) peopleToggle.focus();
  });
}