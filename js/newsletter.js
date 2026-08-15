document.addEventListener("DOMContentLoaded", function () {

    const newsletters = document.querySelectorAll(".newsletter");

    newsletters.forEach(function (newsletter) {

        const input = newsletter.querySelector(".newsletter-email");
        const button = newsletter.querySelector(".newsletter-btn");
        const message = newsletter.querySelector(".newsletter-message");

        if (!input || !button) return;

        function showSubscribed(email) {

            input.value = email || "";
            input.disabled = true;

            button.textContent = "Subscribed ✓";
            button.disabled = true;

            if (message) {
                message.textContent =
                    "You're subscribed to our updates!";

                message.classList.add("show");
            }
        }

        button.addEventListener("click", function () {

            if (!input.checkValidity()) {
                input.reportValidity();
                return;
            }

            const email = input.value.trim();

            if (!email) {
                input.reportValidity();
                return;
            }

            let subscribers =
                JSON.parse(
                    localStorage.getItem("aiClubNewsletterSubscribers")
                ) || [];

            if (!subscribers.includes(email)) {
                subscribers.push(email);
            }

            localStorage.setItem(
                "aiClubNewsletterSubscribers",
                JSON.stringify(subscribers)
            );

            // Only change the UI for the current page session
            showSubscribed(email);
        });

        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                event.preventDefault();
                button.click();
            }

        });

    });

});