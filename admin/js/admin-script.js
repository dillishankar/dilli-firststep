// -------------------------------------------------------------
// 1. AUTH GUARD (Runs immediately when the page loads)
// -------------------------------------------------------------
const currentPage = window.location.pathname.split('/').pop();

// If trying to access admin.html without being logged in, redirect to login page
if (currentPage === 'admin.html' || currentPage === 'admin') {
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

// -------------------------------------------------------------
// 2. MAIN ADMIN DASHBOARD SCRIPT
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // --- Notification Dropdown ---
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('show');
        });
    }

    // --- Profile Click Action ---
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            openAdminModal('profileModal');
        });
    }

    // --- Close Dropdowns on Click Outside ---
    document.addEventListener('click', () => {
        if (notifDropdown) notifDropdown.classList.remove('show');
    });

    // --- Sidebar & Mobile Overlay ---
    const sidebar = document.querySelector('.admin-sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && sidebar) {
                sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });

    // --- Logout Action (Attach to your Logout button ID) ---
    const logoutBtn = document.getElementById('logoutBtn'); // Make sure your logout button has id="logoutBtn"
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('isAdminLoggedIn');
            window.location.href = 'login.html';
        });
    }
});

// -------------------------------------------------------------
// 1. GLOBAL AUTH GUARD CHECK
// -------------------------------------------------------------
const path = window.location.pathname.toLowerCase();
const isLoginPage = path.endsWith('login.html') || path.endsWith('/login');

if (!isLoginPage && sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// -------------------------------------------------------------
// 2. MAIN ADMIN DASHBOARD SCRIPT
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // --- Notification Dropdown ---
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('show');
        });
    }

    // --- Profile Click Action ---
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            if (typeof openAdminModal === 'function') {
                openAdminModal('profileModal');
            }
        });
    }

    // --- Close Dropdowns on Click Outside ---
    document.addEventListener('click', () => {
        if (notifDropdown) notifDropdown.classList.remove('show');
    });

    // --- Sidebar & Mobile Overlay ---
    const sidebar = document.querySelector('.admin-sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && sidebar) {
                sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });

    // --- Logout Action (Attached to all Logout Buttons) ---
    const logoutElements = document.querySelectorAll('#logoutBtn, #modalLogoutBtn');
    logoutElements.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('isAdminLoggedIn');
            window.location.href = 'login.html';
        });
    });
});

// --- Global Modal Helpers ---
window.openAdminModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
};

window.closeAdminModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
};

// -------------------------------------------------------------
// 3. LOGIN PAGE SCRIPT
// -------------------------------------------------------------
function handleAdminLogin(event) {
    if (event) event.preventDefault();
    sessionStorage.setItem('isAdminLoggedIn', 'true');
    window.location.href = 'index.html';
}