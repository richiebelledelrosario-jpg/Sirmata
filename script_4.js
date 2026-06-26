function toggleMenu() {
      document.querySelector(".nav-links").classList.toggle("active");
}

  
const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");
const searchGo = document.getElementById("searchGo");

searchBtn.addEventListener("click", () => {
  searchBar.classList.toggle("open");

  if (searchBar.classList.contains("open")) {
    searchInput.focus();
  }
});

// ✅ Now calls performSearch() instead of just alerting
searchGo.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query === "") {
    alert("Please enter a search term.");
    return;
  }
  performSearch();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchGo.click();
  }
});

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();

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

  alert("No matching scholarship category found.");
}

    
    function toggleAcct() {
      document.getElementById('acctMenu').classList.toggle('open');
      document.getElementById('searchBar').classList.remove('open');
    }

function logOut(event) {
  event.preventDefault();
  document.getElementById('logoutModal').style.display = 'flex';
  document.getElementById('acctMenu').classList.remove('open');
}

function confirmLogout() {
  window.location.href = 'index.html';
}

function cancelLogout() {
  document.getElementById('logoutModal').style.display = 'none';
}
    
    
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#searchBtn') && !e.target.closest('#searchBar')) {
        document.getElementById('searchBar').classList.remove('open');
      }
      if (!e.target.closest('#acctBtn') && !e.target.closest('#acctMenu')) {
        document.getElementById('acctMenu').classList.remove('open');
      }
    });







function showCollege(collegeId) {


    let colleges = document.querySelectorAll('.college-section');
    let introBox = document.querySelector('.box');                                                 // kung may intro section ka


    colleges.forEach(college => {
        college.classList.remove('active-college');
    });


    let target = document.getElementById(collegeId);
    target.classList.add('active-college');


                                                                                                       // hide intro section
    if(introBox){
        introBox.style.display = "none";
    }


    target.scrollIntoView({
        behavior: "smooth"
    });
}
