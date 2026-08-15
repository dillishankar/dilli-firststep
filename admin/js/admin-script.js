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
    window.openAdminModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active');
    };

    window.closeAdminModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    };
});