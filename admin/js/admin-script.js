// -------------------------------------------------------------
// 1. MAIN ADMIN DASHBOARD SCRIPT
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
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openAdminModal('profileModal');
        });
    }

    // --- Close Dropdowns on Click Outside ---
    document.addEventListener('click', (e) => {
        if (notifDropdown && !notifDropdown.contains(e.target) && !notifBtn?.contains(e.target)) {
            notifDropdown.classList.remove('show');
        }
    });

    // --- Sidebar & Mobile Overlay (Event Delegation for All Pages) ---
    const sidebar = document.querySelector('.admin-sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#sidebarToggle');
        
        // Toggle Sidebar open/close
        if (toggleBtn && sidebar) {
            sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        }

        // Close Sidebar when clicking overlay
        if (overlay && e.target === overlay) {
            sidebar?.classList.remove('active');
            overlay.classList.remove('active');
        }

        // Close Sidebar on mobile menu link click
        if (e.target.closest('.sidebar-link') && window.innerWidth < 992) {
            sidebar?.classList.remove('active');
            overlay?.classList.remove('active');
        }
    });

    // --- Logout Action ---
    document.addEventListener('click', (e) => {
        const logoutTarget = e.target.closest('#logoutBtn, #modalLogoutBtn');
        if (logoutTarget) {
            e.preventDefault();
            sessionStorage.removeItem('isAdminLoggedIn');
            window.location.href = 'login.html';
        }
    });
});

// -------------------------------------------------------------
// 2. GLOBAL MODAL HELPERS
// -------------------------------------------------------------
window.openAdminModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
};

window.closeAdminModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
};

// -------------------------------------------------------------
// 3. LOGIN PAGE FORM HANDLER
// -------------------------------------------------------------
function handleAdminLogin(event) {
    if (event) event.preventDefault();
    sessionStorage.setItem('isAdminLoggedIn', 'true');
    window.location.href = 'index.html';
}