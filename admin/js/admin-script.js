document.addEventListener('DOMContentLoaded', () => {
    // 1st Fix: Notification Dropdown Toggle
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('show');
        });
    }

    // 2nd Fix: Profile Click Action
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            openAdminModal('profileModal');
        });
    }

    // Close Dropdowns on Click Outside
    document.addEventListener('click', () => {
        if (notifDropdown) notifDropdown.classList.remove('show');
    });

    // Modal Helpers
    window.openAdminModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active');
    };

    window.closeAdminModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    };
});

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.admin-sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');

    // Toggle Sidebar on Mobile Button Click
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }

    // Close Sidebar when clicking outside on the overlay backdrop
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Auto-close mobile sidebar when clicking menu links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && sidebar) {
                sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });
});