$(document).ready(function () {

    console.log("Events page loaded.");

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


    // Register buttons
    $(".register-btn").click(function () {

        const button = $(this);

        button.text("Registered ✓");

        button.css({
            "background": "#16a34a"
        });

    });

});