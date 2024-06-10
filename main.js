document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(tabLink => {
        tabLink.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked tab and the corresponding content
            tabLink.classList.add('active');
            document.getElementById(tabLink.getAttribute('data-tab')).classList.add('active');
        });
    });
});

