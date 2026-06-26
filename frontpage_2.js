

    function toggleMenu() {
      document.getElementById('navLinks').classList.toggle('active');
    }

  
    function toggleSearch() {
      const bar = document.getElementById('searchBar');
      const isOpen = bar.classList.toggle('open');
      document.getElementById('acctMenu').classList.remove('open');
      if (isOpen) setTimeout(() => document.getElementById('searchInput').focus(), 50);
    }

    function runSearch() {
      const q = document.getElementById('searchInput').value.trim();
      const result = document.getElementById('searchResult');

      if (!q) {
        result.classList.remove('show');
        return;
      }

      result.innerHTML = '🔍 Showing results for: <strong>' + q + '</strong>';
      result.classList.add('show');
      document.getElementById('searchBar').classList.remove('open');
      document.getElementById('searchInput').value = '';
    }

    function handleSearchKey(e) {
      if (e.key === 'Enter') runSearch();
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




    /* FAQ Section */
  
    document.querySelectorAll('#faq button').forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.parentElement;
        const ans = question.querySelector('.ans');
        const isOpen = question.classList.contains('open');
        document.querySelectorAll('.question').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.ans').style.maxHeight = null;
        });
        if (!isOpen) {
          question.classList.add('open');
          ans.style.maxHeight = ans.scrollHeight + 'px';
        }
      });
    });
