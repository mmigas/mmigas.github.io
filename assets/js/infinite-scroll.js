document.addEventListener("DOMContentLoaded", function () {
    // Select the trigger element and the container where new posts will be appended.
    const trigger = document.getElementById('infinite-scroll-trigger');
    const container = document.querySelector('.my-project-list');

    // If there's no trigger or container, do nothing.
    if (!trigger || !container) {
        return;
    }

    let isLoading = false; // A flag to prevent multiple simultaneous loads.

    // The function that fetches and appends the next page of content.
    async function loadNextPage() {
        // 1. Get the URL for the next page from the trigger's data attribute.
        let nextPageUrl = trigger.dataset.nextPageUrl;

        // If there's no next page URL, we're done. Hide the trigger and stop observing.
        if (!nextPageUrl) {
            trigger.style.display = 'none';
            observer.unobserve(trigger);
            return;
        }

        // 2. Set the loading flag and show the "Loading..." message.
        isLoading = true;
        trigger.querySelector('.loader').style.display = 'block';

        try {
            // 3. Fetch the HTML content of the next page.
            const response = await fetch(nextPageUrl);
            const text = await response.text();

            // 4. Parse the fetched HTML string into a full HTML document.
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // 5. Find the new project cards and the *new* trigger element from the parsed document.
            const newItems = doc.querySelectorAll('.my-project-card');
            const newTrigger = doc.getElementById('infinite-scroll-trigger');

            // 6. Append each new project card to our existing container.
            newItems.forEach(item => {
                container.appendChild(item);
            });

            // 7. Update the trigger's data attribute with the URL from the newly loaded page.
            if (newTrigger) {
                trigger.dataset.nextPageUrl = newTrigger.dataset.nextPageUrl;
            } else {
                // If no new trigger is found, it means we've reached the last page.
                trigger.removeAttribute('data-next-page-url');
                trigger.style.display = 'none';
                observer.unobserve(trigger);
            }
        } catch (error) {
            console.error('Error loading next page:', error);
            // Optionally hide the loader on error so the user can try again if you build that logic
            trigger.style.display = 'none';
        } finally {
            // 8. Reset the loading flag and hide the "Loading..." message.
            isLoading = false;
            trigger.querySelector('.loader').style.display = 'none';
        }
    }

    // Set up the Intersection Observer.
    const observer = new IntersectionObserver((entries) => {
        // The callback function is executed whenever the observed element's visibility changes.
        const firstEntry = entries[0];

        // If the trigger element is intersecting (i.e., visible) and we're not already loading...
        if (firstEntry.isIntersecting && !isLoading) {
            // ...load the next page.
            loadNextPage();
        }
    }, {
        // Options: trigger when the element is 25% visible. Adjust as needed.
        threshold: 0.25
    });

    // Start observing the trigger element.
    observer.observe(trigger);
});