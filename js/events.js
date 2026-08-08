$(document).ready(function () {

    console.log("Events page loaded.");

    // Load events
    loadEvents();


    // Search button
    $("#searchBtn").click(function () {

        const searchValue = $("#eventSearch").val();

        console.log("Searching for:", searchValue);

    });


    // Reset button
    $("#resetBtn").click(function () {

        $("#eventSearch").val("");

        $("#categoryFilter").val("all");
        $("#dateFilter").val("all");
        $("#skillFilter").val("all");

        console.log("Filters reset.");

    });

});


function loadEvents() {

    console.log("Trying to load events.json using jQuery AJAX...");

    $.ajax({

        url: "data/events.json",
        method: "GET",
        dataType: "json",

        success: function (events) {

            console.log("Events loaded using jQuery:", events);

            displayEvents(events);

        },

        error: function (xhr, status, error) {

            console.error("Failed to load events:", error);

        }

    });

}


function displayEvents(events) {

    console.log("Displaying events...");

    const workshopContainer = $("#workshopContainer");
    const hackathonContainer = $("#hackathonContainer");

    console.log("Workshop container:", workshopContainer.length);
    console.log("Hackathon container:", hackathonContainer.length);

    workshopContainer.empty();
    hackathonContainer.empty();


    events.forEach(event => {

        const card = createEventCard(event);

        if (event.type === "Workshop") {

            workshopContainer.append(card);

        }

        else if (event.type === "Hackathon") {

            hackathonContainer.append(card);

        }

    });

}


function createEventCard(event) {

    return `
        <div class="col-lg-4 col-md-6">

            <div class="event-card">

                <div class="event-image">

                    <img
                        src="${event.image}"
                        alt="${event.title}"
                    >

                    <span class="event-type">
                        ${event.type.toUpperCase()}
                    </span>

                    <span class="event-level">
                        ${event.level}
                    </span>

                </div>

                <div class="event-content">

                    <h3>${event.title}</h3>

                    <p>
                        <i class="bi bi-calendar3"></i>
                        ${event.displayDate}
                    </p>

                    <p>
                        <i class="bi bi-clock"></i>
                        ${event.time}
                    </p>

                    <p>
                        <i class="bi bi-geo-alt"></i>
                        ${event.venue}
                    </p>

                    <p>
                        <i class="bi bi-person"></i>
                        ${event.speaker}
                    </p>

                    <button
                        class="register-btn"
                        data-event-id="${event.id}"
                    >
                        Register Now
                    </button>

                </div>

            </div>

        </div>
    `;
}