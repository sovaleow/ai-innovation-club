let allEvents = [];
let currentCalendarDate = new Date();

$(document).ready(function () {

    console.log("Events page loaded.");

    // Load events
    loadEvents();

    // Search button
    $("#searchBtn").click(function () {

        saveFilterState();
        applyFilters();

    });


    // Reset button
    $("#resetBtn").click(function () {

        resetFilters();

    });

    // Register
    $(document).on("click", ".register-btn", function () {

        const button = $(this);

        const eventId = button.data("event-id");

        registerForEvent(eventId);

        button.text("Registered ✓");

        button.css({
            "background": "#16a34a"
        });

        button.prop("disabled", true);

    });

    $(document).on("click", ".upcoming-register-btn", function () {

        const button = $(this);

        const eventId = button.data("event-id");

        registerForEvent(eventId);

        button.text("Registered ✓");

        button.addClass("registered");

        button.prop("disabled", true);

    });
    $("#prevMonth").click(function () {

        currentCalendarDate.setMonth(
            currentCalendarDate.getMonth() - 1
        );

        renderCalendar();

    });


    $("#nextMonth").click(function () {

        currentCalendarDate.setMonth(
            currentCalendarDate.getMonth() + 1
        );

        renderCalendar();

    });

    $(document).on("click", ".event-day", function () {

        const eventId = Number(
            $(this).data("event-id")
        );

        showCalendarEvent(eventId);

    });

    $("#closeCalendarPopup").click(function () {

        $("#calendarEventPopup").slideUp(200);

    });
});


function loadEvents() {

    console.log("Trying to load events.json using jQuery AJAX...");

    $.ajax({

        url: "http://localhost:3000/events",
        method: "GET",
        dataType: "json",

        success: function (events) {

            console.log("Events loaded using jQuery:", events);

            // Store all events
            allEvents = events;

            // Render the calendar after events are loaded
            renderCalendar();

            //Upcoming events
            displayUpcomingEvents(allEvents);
            console.log("Upcoming events:", events);

            // Check whether there are saved filters
            const savedFilters =
                sessionStorage.getItem("eventFilters");

            if (savedFilters) {

                const filterState =
                    JSON.parse(savedFilters);

                // Restore filter UI
                $("#eventSearch").val(filterState.search);
                $("#categoryFilter").val(filterState.category);
                $("#dateFilter").val(filterState.date);
                $("#skillFilter").val(filterState.skill);

                console.log(
                    "Filter state restored:",
                    filterState
                );

                // Apply restored filters AFTER events are loaded
                applyFilters();

            } else {

                // No saved filters
                displayEvents(allEvents);

            }

        },

        error: function (xhr, status, error) {

            console.error("Failed to load events:", error);

        }

    });

}

function applyFilters() {

    const searchValue = $("#eventSearch")
        .val()
        .toLowerCase()
        .trim();

    const categoryValue = $("#categoryFilter").val();

    const dateValue = $("#dateFilter").val();

    const skillValue = $("#skillFilter").val();


    const filteredEvents = allEvents.filter(function (event) {

        // -------------------------
        // SEARCH FILTER
        // -------------------------

        const searchableText = `
            ${event.title}
            ${event.speaker}
            ${event.venue}
            ${event.type}
        `.toLowerCase();

        const matchesSearch =
            searchValue === "" ||
            searchableText.includes(searchValue);


        // -------------------------
        // CATEGORY FILTER
        // -------------------------

        const matchesCategory =
            categoryValue === "all" ||
            event.type.toLowerCase() === categoryValue;


        // -------------------------
        // SKILL LEVEL FILTER
        // -------------------------

        const matchesSkill =
            skillValue === "all" ||
            event.level.toLowerCase() === skillValue;


        // -------------------------
        // DATE FILTER
        // -------------------------

        const matchesDate = checkDateFilter(
            event.date,
            dateValue
        );


        return (
            matchesSearch &&
            matchesCategory &&
            matchesSkill &&
            matchesDate
        );

    });


    console.log("Filtered events:", filteredEvents);

    displayEvents(filteredEvents);

}

function checkDateFilter(eventDate, dateFilter) {

    if (dateFilter === "all") {
        return true;
    }


    const date = new Date(eventDate);

    const now = new Date();


    // Start of current month
    const startOfThisMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );


    // Start of next month
    const startOfNextMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1
    );


    // Start of month after next
    const startOfMonthAfterNext = new Date(
        now.getFullYear(),
        now.getMonth() + 2,
        1
    );


    if (dateFilter === "this-month") {

        return (
            date >= startOfThisMonth &&
            date < startOfNextMonth
        );

    }


    if (dateFilter === "next-month") {

        return (
            date >= startOfNextMonth &&
            date < startOfMonthAfterNext
        );

    }


    return true;
}

function resetFilters() {

    $("#eventSearch").val("");

    $("#categoryFilter").val("all");

    $("#dateFilter").val("all");

    $("#skillFilter").val("all");

    // Remove saved filter state from sessionStorage
    sessionStorage.removeItem("eventFilters");

    // Show all events again
    displayEvents(allEvents);

    console.log("Filters reset.");

}

function saveFilterState() {

    const filterState = {

        search: $("#eventSearch").val(),

        category: $("#categoryFilter").val(),

        date: $("#dateFilter").val(),

        skill: $("#skillFilter").val()

    };


    sessionStorage.setItem(
        "eventFilters",
        JSON.stringify(filterState)
    );


    console.log("Filter state saved:", filterState);

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
    let registeredEvents =
        JSON.parse(localStorage.getItem("registeredEvents")) || [];

    const isRegistered =
        registeredEvents.includes(Number(event.id));

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
                        ${isRegistered ? "disabled" : ""}
                        style="${isRegistered ? "background: #16a34a;" : ""}"
                    >
                        ${isRegistered ? "Registered ✓" : "Register Now"}
                    </button>

                </div>

            </div>

        </div>
    `;
}

function registerForEvent(eventId) {

    // Get existing registrations
    let registeredEvents =
        JSON.parse(localStorage.getItem("registeredEvents")) || [];


    // Convert event ID to number
    eventId = Number(eventId);


    // Check if already registered
    if (!registeredEvents.includes(eventId)) {

        registeredEvents.push(eventId);

        localStorage.setItem(
            "registeredEvents",
            JSON.stringify(registeredEvents)
        );

        console.log("Registered for event:", eventId);

    }
}

function renderCalendar() {

    const year = currentCalendarDate.getFullYear();

    const month = currentCalendarDate.getMonth();


    const monthName = currentCalendarDate.toLocaleString(
        "default",
        {
            month: "long"
        }
    );


    $("#calendarMonth").text(
        `${monthName} ${year}`
    );


    const firstDay = new Date(
        year,
        month,
        1
    ).getDay();


    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();


    const calendarDays = $("#calendarDays");

    calendarDays.empty();


    // Empty spaces before first day
    for (let i = 0; i < firstDay; i++) {

        calendarDays.append(`
            <div class="calendar-day empty"></div>
        `);

    }


    // Generate days
    for (let day = 1; day <= daysInMonth; day++) {

        const dateString = formatCalendarDate(
            year,
            month,
            day
        );


        const eventForDate = allEvents.find(function (event) {

            return event.date === dateString;

        });

        const hasEvent = eventForDate !== undefined;


        calendarDays.append(`
            <div
                class="calendar-day ${hasEvent ? "event-day" : ""}"
                data-date="${dateString}"
                ${hasEvent ? `data-event-id="${eventForDate.id}"` : ""}
            >
                ${day}
            </div>
        `);

    }

}

function formatCalendarDate(year, month, day) {

    const monthNumber = String(
        month + 1
    ).padStart(2, "0");


    const dayNumber = String(
        day
    ).padStart(2, "0");


    return `${year}-${monthNumber}-${dayNumber}`;

}

function showCalendarEvent(eventId) {

    const event = allEvents.find(function (event) {

        return Number(event.id) === eventId;

    });


    if (!event) {

        return;

    }


    $("#popupEventTitle").text(event.title);

    $("#popupEventDate").text(event.displayDate);

    $("#popupEventTime").text(event.time);

    $("#popupEventVenue").text(event.venue);

    $("#popupEventSpeaker").text(event.speaker);

    $("#popupEventType").text(event.type);


    $("#calendarEventPopup").slideDown(200);

}

function displayUpcomingEvents(events) {

    const container = $("#upcomingEvents");

    container.empty();


    events.forEach(function (event) {

        const date = new Date(event.date);


        const month = date
            .toLocaleString("default", {
                month: "short"
            })
            .toUpperCase();


        const day = String(
            date.getDate()
        ).padStart(2, "0");


        const eventHTML = `
            <div class="upcoming-event">

                <div class="date-box">

                    <strong>${month}</strong>

                    <span>${day}</span>

                </div>


                <div class="upcoming-info">

                    <strong>
                        ${event.title}
                    </strong>

                    <small>
                        ${event.type}
                    </small>

                </div>


                <button
                    class="upcoming-register-btn"
                    data-event-id="${event.id}"
                >
                    Register
                </button>

            </div>
        `;


        container.append(eventHTML);

    });

}