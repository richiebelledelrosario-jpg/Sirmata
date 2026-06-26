function toggleMenu() {
      document.querySelector(".nav-links").classList.toggle("active");
}

function toggleSortingMenu() {
  const sortingList = document.querySelector('.sorting-list');
  sortingList.classList.toggle('active');
}

// SEARCH
const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");
const searchGo = document.getElementById("searchGo");

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
    window.location.href = "C_Campus.html";
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
    window.location.href = "A_Colleges.html";
    return;
  }

  // SCHOLARSHIPS
  if (
    query.includes("merit") ||
    query.includes("need") ||
    query.includes("government") ||
    query.includes("private")
  ) {
    window.location.href = "B_Scholar.html";
    return;
  }

  alert("No matching scholarship category found.");
}

// ACCOUNT MENU
function toggleAcct() {
  document.getElementById("acctMenu")?.classList.toggle("open");
  document.getElementById("searchBar")?.classList.remove("open");
}

function logOut(event) {
  event.preventDefault();

  const modal = document.getElementById("logoutModal");
  if (modal) {
    modal.style.display = "flex";
  }

  document.getElementById("acctMenu")?.classList.remove("open");
}

function confirmLogout() {
  window.location.href = "index.html";
}

function cancelLogout() {
  const modal = document.getElementById("logoutModal");

  if (modal) {
    modal.style.display = "none";
  }
}

// CLICK OUTSIDE MENUS
document.addEventListener("click", function (e) {
  const searchBar = document.getElementById("searchBar");
  const acctMenu = document.getElementById("acctMenu");

  if (
    !e.target.closest("#searchBtn") &&
    !e.target.closest("#searchBar")
  ) {
    searchBar?.classList.remove("open");
  }

  if (
    !e.target.closest("#acctBtn") &&
    !e.target.closest("#acctMenu")
  ) {
    acctMenu?.classList.remove("open");
  }
});








/* ===========================
   SIRMATA — dashboard.js
=========================== */

/* ---------- STATE ---------- */

let tasks = JSON.parse(localStorage.getItem('sirmata_tasks') || '[]');
let checklist = [];          // temp list while building a new task
let editingId = null;        // id of the task being edited (null = new)
let activeFilter = 'All';


/* ---------- DOM REFS ---------- */

const taskTitle    = document.getElementById('taskTitle');
const taskNotes    = document.getElementById('taskNotes');
const priority     = document.getElementById('priority');
const dueDate      = document.getElementById('dueDate');
const category     = document.getElementById('category');
const checkItem    = document.getElementById('checkItem');
const addChecklist = document.getElementById('addChecklist');
const checkPreview = document.getElementById('checkPreview');
const saveBtn      = document.getElementById('saveTask');
const taskContainer= document.getElementById('taskContainer');
const dashboardSearch = document.getElementById('searchInput');

const totalEl      = document.getElementById('totalTasks');
const pendingEl    = document.getElementById('pendingTasks');
const completedEl  = document.getElementById('completedTasks');
const overdueEl    = document.getElementById('overdueTasks');

const filters      = document.querySelectorAll('.filter');
const template     = document.getElementById('taskTemplate');


/* ---------- HELPERS ---------- */

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

const today = () => new Date().toISOString().split('T')[0];

const isOverdue = task =>
    task.dueDate && task.dueDate < today() && !isTaskCompleted(task);

const isTaskCompleted = task =>
    task.checklist.length > 0 &&
    task.checklist.every(item => item.done);

const save = () =>
    localStorage.setItem('sirmata_tasks', JSON.stringify(tasks));


/* ---------- CHECKLIST BUILDER ---------- */

addChecklist.addEventListener('click', addCheckItem);
checkItem.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addCheckItem(); } });

function addCheckItem() {
    const text = checkItem.value.trim();
    if (!text) return;
    checklist.push({ id: uid(), text, done: false });
    checkItem.value = '';
    renderCheckPreview();
}

function renderCheckPreview() {
    checkPreview.innerHTML = '';
    checklist.forEach((item, i) => {
        const li = document.createElement('li');
        li.textContent = item.text;

        // small remove button
        const rm = document.createElement('span');
        rm.textContent = ' ✕';
        rm.style.cssText = 'cursor:pointer;color:#e53935;margin-left:8px;font-size:12px;';
        rm.addEventListener('click', () => {
            checklist.splice(i, 1);
            renderCheckPreview();
        });
        li.appendChild(rm);
        checkPreview.appendChild(li);
    });
}


/* ---------- SAVE / EDIT ---------- */

saveBtn.addEventListener('click', () => {
    const title = taskTitle.value.trim();
    if (!title) { taskTitle.focus(); taskTitle.style.borderColor = '#e53935'; return; }
    taskTitle.style.borderColor = '';

    if (editingId) {
        // update existing
        const idx = tasks.findIndex(t => t.id === editingId);
        if (idx !== -1) {
            tasks[idx] = {
                ...tasks[idx],
                title,
                notes     : taskNotes.value.trim(),
                priority  : priority.value,
                dueDate   : dueDate.value,
                category  : category.value,
                checklist : checklist.length ? checklist : tasks[idx].checklist,
            };
        }
        editingId = null;
        saveBtn.textContent = 'Save Requirement';
    } else {
        const task = {
            id        : uid(),
            title,
            notes     : taskNotes.value.trim(),
            priority  : priority.value,
            dueDate   : dueDate.value,
            category  : category.value,
            checklist : [...checklist],
            createdAt : new Date().toISOString(),
        };
        tasks.unshift(task);
    }

    save();
    resetForm();
    render();
});


function resetForm() {
    taskTitle.value = '';
    taskNotes.value = '';
    priority.value  = 'High';
    dueDate.value   = '';
    category.value  = 'Personal';
    checkItem.value = '';
    checklist       = [];
    checkPreview.innerHTML = '';
    editingId       = null;
    saveBtn.textContent = 'Save Requirement';
}


/* ---------- FILTER BAR ---------- */

filters.forEach(btn => {
    btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        render();
    });
});


/* ---------- SEARCH ---------- */

dashboardSearch?.addEventListener('input', render);


/* ---------- RENDER ---------- */

function render() {
   const query = dashboardSearch?.value.toLowerCase() ?? '';

    const visible = tasks.filter(task => {
        const matchSearch =
            task.title.toLowerCase().includes(query) ||
            task.notes.toLowerCase().includes(query) ||
            task.category.toLowerCase().includes(query);

        if (!matchSearch) return false;

        if (activeFilter === 'All')       return true;
        if (activeFilter === 'Completed') return isTaskCompleted(task);
        if (activeFilter === 'High')      return task.priority === 'High'   && !isTaskCompleted(task);
        if (activeFilter === 'Medium')    return task.priority === 'Medium' && !isTaskCompleted(task);
        if (activeFilter === 'Low')       return task.priority === 'Low'    && !isTaskCompleted(task);
        return true;
    });

    taskContainer.innerHTML = '';
    if (visible.length === 0) {
        taskContainer.innerHTML =
            `<p style="color:#888;text-align:center;padding:40px 0;">No requirements found.</p>`;
    } else {
        visible.forEach(task => taskContainer.appendChild(buildCard(task)));
    }

    updateDashboard();
}


/* ---------- BUILD CARD ---------- */

function buildCard(task) {
    const clone = template.content.cloneNode(true);
    const card  = clone.querySelector('.task-card');

    /* title & category */
    card.querySelector('.task-title').textContent    = task.title;
    card.querySelector('.task-category').textContent = task.category;

    /* priority badge */
    const priBadge = card.querySelector('.priority');
    priBadge.textContent = task.priority;
    priBadge.classList.add(task.priority.toLowerCase());

    /* due date */
    const dueBadge = card.querySelector('.due');
    if (task.dueDate) {
        dueBadge.textContent = `Due: ${formatDate(task.dueDate)}`;
        if (isOverdue(task)) {
            dueBadge.classList.add('overdue');
            dueBadge.textContent += ' — Overdue';
        }
    } else {
        dueBadge.textContent = 'No due date';
    }

    /* completed badge (appended to .task-info) */
    if (isTaskCompleted(task)) {
        const done = document.createElement('span');
        done.textContent = '✔ Completed';
        done.style.cssText =
            'background:#d4edda;color:#155724;padding:6px 14px;border-radius:30px;font-size:13px;';
        card.querySelector('.task-info').appendChild(done);
    }

    /* notes */
    card.querySelector('.notes').textContent = task.notes || '';

    /* checklist + progress */
    const checklistDiv = card.querySelector('.checklist');
    const progressBar  = card.querySelector('.progress-bar');
    const progressText = card.querySelector('.progress-text');

    if (task.checklist.length > 0) {
        const doneCount = task.checklist.filter(i => i.done).length;
        const pct       = Math.round((doneCount / task.checklist.length) * 100);

        progressBar.style.width = pct + '%';
        progressText.textContent = `${doneCount} / ${task.checklist.length} items complete (${pct}%)`;

        task.checklist.forEach(item => {
            const lbl = document.createElement('label');

            const cb = document.createElement('input');
            cb.type    = 'checkbox';
            cb.checked = item.done;
            cb.addEventListener('change', () => {
                item.done = cb.checked;
                save();
                render();
            });

            const span = document.createElement('span');
            span.textContent = item.text;
            if (item.done) span.classList.add('completed');

            lbl.appendChild(cb);
            lbl.appendChild(span);
            checklistDiv.appendChild(lbl);
        });
    } else {
        card.querySelector('.progress-container').style.display = 'none';
        progressText.style.display = 'none';
    }

    /* collapse toggle */
    const collapseBtn = card.querySelector('.collapse');
    const taskBody    = card.querySelector('.task-body');

    collapseBtn.addEventListener('click', () => {
        taskBody.classList.toggle('hide');
        collapseBtn.textContent = taskBody.classList.contains('hide') ? '▶' : '▼';
    });

    /* edit */
    card.querySelector('.edit').addEventListener('click', () => startEdit(task));

    /* delete */
    card.querySelector('.delete').addEventListener('click', () => {
        if (confirm(`Delete "${task.title}"?`)) {
            tasks = tasks.filter(t => t.id !== task.id);
            save();
            render();
        }
    });

    return card;
}


/* ---------- EDIT ---------- */

function startEdit(task) {
    editingId          = task.id;
    taskTitle.value    = task.title;
    taskNotes.value    = task.notes;
    priority.value     = task.priority;
    dueDate.value      = task.dueDate;
    category.value     = task.category;
    checklist          = task.checklist.map(i => ({ ...i }));
    saveBtn.textContent = 'Update Requirement';

    renderCheckPreview();

    // scroll to form
    document.querySelector('.left-panel').scrollIntoView({ behavior: 'smooth' });
}


/* ---------- DASHBOARD COUNTS ---------- */

function updateDashboard() {
    const total     = tasks.length;
    const completed = tasks.filter(isTaskCompleted).length;
    const overdue   = tasks.filter(isOverdue).length;
const pending   = tasks.filter(t => !isTaskCompleted(t) && !isOverdue(t)).length;

    totalEl.textContent     = total;
    pendingEl.textContent   = pending;
    completedEl.textContent = completed;
    overdueEl.textContent   = overdue;
}


/* ---------- DATE FORMAT ---------- */

function formatDate(str) {
    if (!str) return '';
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
}


/* ---------- INIT ---------- */

document.getElementById('dueDate').min = today();

render();