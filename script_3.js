function toggleMenu() {
  document.querySelector(".nav-links")?.classList.toggle("active");
}

function toggleSortingMenu() {
  document.querySelector(".sorting-list")?.classList.toggle("active");
}

// SEARCH ELEMENTS
const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");
const searchGo = document.getElementById("searchGo");

// Only add listeners if elements exist
if (searchBtn && searchBar && searchInput) {
  searchBtn.addEventListener("click", () => {
    searchBar.classList.toggle("open");

    if (searchBar.classList.contains("open")) {
      searchInput.focus();
    }
  });
}

if (searchGo && searchInput) {
  searchGo.addEventListener("click", performSearch);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
}

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  // CAMPUS
  if (
    query.includes("main") ||
    query.includes("congress") ||
    query.includes("bagong silang") ||
    query.includes("camarin")
  ) {
    window.location.href = "Page2.html";
    return;
  }

  // COLLEGES
  if (
    query.includes("clas") ||
    query.includes("business") ||
    query.includes("criminal justice") ||
    query.includes("education") ||
    query.includes("law") ||
    query.includes("engineering")
  ) {
    window.location.href = "Page4.html";
    return;
  }

  // SCHOLARSHIP TYPES
  if (
    query.includes("merit") ||
    query.includes("need") ||
    query.includes("government") ||
    query.includes("private")
  ) {
    window.location.href = "Page3.html";
    return;
  }

  alert("No matching result found.");
}

// ACCOUNT MENU
function toggleAcct() {
  document.getElementById("acctMenu")?.classList.toggle("open");
  document.getElementById("searchBar")?.classList.remove("open");
}

function logOut(event) {
  event.preventDefault();

  document.getElementById("logoutModal").style.display = "flex";
  document.getElementById("acctMenu")?.classList.remove("open");
}

function confirmLogout() {
  window.location.href = "index.html";
}

function cancelLogout() {
  document.getElementById("logoutModal").style.display = "none";
}

// CLICK OUTSIDE
document.addEventListener("click", function (e) {
  if (
    !e.target.closest("#searchBtn") &&
    !e.target.closest("#searchBar")
  ) {
    document.getElementById("searchBar")?.classList.remove("open");
  }

  if (
    !e.target.closest("#acctBtn") &&
    !e.target.closest("#acctMenu")
  ) {
    document.getElementById("acctMenu")?.classList.remove("open");
  }
});

// SCHOLARSHIP SECTIONS
function showSection(sectionId) {
  const sections = document.querySelectorAll(".Scholarships-section");
  const introBox = document.querySelector(".box");

  sections.forEach(section => {
    section.classList.remove("active-section");
  });

  const target = document.getElementById(sectionId);

  if (!target) return;

  target.classList.add("active-section");

  if (introBox) {
    introBox.style.display = "none";
  }

  target.scrollIntoView({
    behavior: "smooth"
  });
}