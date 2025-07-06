document.addEventListener("DOMContentLoaded", function() {
    const loadMoreButton = document.getElementById('load-more');
    const projectGrid = document.getElementById('project-grid');

    if (!loadMoreButton) {
        return; // No button, do nothing
    }

    loadMoreButton.addEventListener('click', async function() {
        const nextPageUrl = this.getAttribute('data-next-page-url');
        if (!nextPageUrl) {
            this.style.display = 'none'; // No more pages, hide button
            return;
        }

        // Show loading state
        this.textContent = 'Loading...';
        this.disabled = true;

        try {
            const response = await fetch(nextPageUrl);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // Find the new items and the next link in the fetched page
            const newItems = doc.querySelectorAll('#project-grid .grid__item');
            const nextLink = doc.querySelector('#load-more');

            // Append new items to the grid
            newItems.forEach(item => {
                projectGrid.appendChild(item);
            });

            // Update the button for the *next* page, or hide it
            if (nextLink) {
                this.setAttribute('data-next-page-url', nextLink.getAttribute('data-next-page-url'));
                this.textContent = 'Load More';
                this.disabled = false;
            } else {
                this.style.display = 'none';
            }
        } catch (error) {
            console.error('Could not load more projects:', error);
            this.textContent = 'Error';
        }
    });
});