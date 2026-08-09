$(document).ready(function () {

    console.log("AI Projects page loaded.");

    loadProjects();

});

function loadProjects() {

    console.log("Trying to load projects.json using jQuery AJAX...");

    $.ajax({
        url: "data/projects.json",
        method: "GET",
        dataType: "json",

        success: function (projects) {

            console.log("Projects loaded:", projects);

            displayFeaturedProjects(projects);

            displayAllProjects(projects);

        },

        error: function (xhr, status, error) {

            console.error("Failed to load projects:", error);

        }
    });

}

function displayFeaturedProjects(projects) {

    const container = $("#featuredProjectsContainer");

    container.empty();

    const featuredProjects = projects.filter(function (project) {
        return project.featured === true;
    });

    featuredProjects.forEach(function (project) {

        const card = `
    <div class="col-lg-4 col-md-6">

        <div class="project-card">

            <!-- Image -->
            <div class="project-image">

                <img
                    src="${project.image}"
                    alt="${project.title}"
                >

                <span class="project-category">
                    ${project.category}
                </span>

            </div>


            <!-- Content -->
            <div class="project-content">

                <h3>
                    ${project.title}
                </h3>

                <p>
                    ${project.description}
                </p>


                <!-- Technologies -->
                <div class="project-tags">

                    ${project.technologies.map(function (tech) {
            return `<span>${tech}</span>`;
        }).join("")
            }

                </div>


                <!-- Author -->
                <div class="project-meta">

                    <div class="project-author">

                        <strong>
                            ${project.author}
                        </strong>

                        <small>
                            ${project.role} · ${project.year}
                        </small>

                    </div>


                    <!-- Statistics -->
                    <div class="project-stats">

                        <span>
                            ☆ ${project.stars}
                        </span>

                        <span>
                            ♡ ${project.comments}
                        </span>

                    </div>

                </div>


                <!-- Button -->
                <button
                    class="view-project-btn project-detail-btn"
                    data-id="${project.id}">
                    View Project →
                </button>

            </div>

        </div>

    </div>
`;

        container.append(card);

    });

}

let currentPage = 1;
const projectsPerPage = 3;
let allProjectsData = [];


function displayAllProjects(projects) {

    allProjectsData = projects;

    const totalPages = Math.ceil(
        allProjectsData.length / projectsPerPage
    );

    // Make sure current page is valid
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex =
        (currentPage - 1) * projectsPerPage;

    const endIndex =
        startIndex + projectsPerPage;

    const projectsToDisplay =
        allProjectsData.slice(startIndex, endIndex);


    const container = $("#allProjectsContainer");

    container.empty();


    projectsToDisplay.forEach(function (project) {

        const card = `
            <div class="col-lg-4 col-md-6">

                <div class="project-card">

                    <div class="project-image">

                        <img
                            src="${project.image}"
                            alt="${project.title}"
                        >

                        <span class="project-category">
                            ${project.category}
                        </span>

                    </div>


                    <div class="project-content">

                        <h3>
                            ${project.title}
                        </h3>

                        <p>
                            ${project.description}
                        </p>


                        <div class="project-tags">

                            ${project.technologies.map(function (tech) {
            return `<span>${tech}</span>`;
        }).join("")
            }

                        </div>


                        <div class="project-meta">

                            <div class="project-author">

                                <strong>
                                    ${project.author}
                                </strong>

                                <small>
                                    ${project.year}
                                </small>

                            </div>


                            <div class="project-stats">

                                <span>
                                    ☆ ${project.stars}
                                </span>

                            </div>

                        </div>


                        <button
                            class="view-project-btn project-detail-btn"
                            data-id="${project.id}">
                            Learn more →
                        </button>

                    </div>

                </div>

            </div>
        `;

        container.append(card);

    });


    displayPagination(totalPages);
}

function displayPagination(totalPages) {

    const pagination = $("#projectPagination");

    pagination.empty();


    // Previous button
    const previousButton = $(`
        <button class="pagination-btn">
            ← Previous
        </button>
    `);

    if (currentPage === 1) {
        previousButton.prop("disabled", true);
    }


    previousButton.click(function () {

        if (currentPage > 1) {

            currentPage--;

            displayAllProjects(allProjectsData);

        }

    });


    pagination.append(previousButton);


    // Page numbers
    for (let i = 1; i <= totalPages; i++) {

        const pageButton = $(`
            <button class="pagination-number">
                ${i}
            </button>
        `);


        if (i === currentPage) {
            pageButton.addClass("active");
        }


        pageButton.click(function () {

            currentPage = i;

            displayAllProjects(allProjectsData);

        });


        pagination.append(pageButton);

    }


    // Next button
    const nextButton = $(`
        <button class="pagination-btn">
            Next →
        </button>
    `);


    if (currentPage === totalPages) {
        nextButton.prop("disabled", true);
    }


    nextButton.click(function () {

        if (currentPage < totalPages) {

            currentPage++;

            displayAllProjects(allProjectsData);

        }

    });


    pagination.append(nextButton);

}

$("#projectSort").change(function () {

    const sortValue = $(this).val();

    $.ajax({
        url: "data/projects.json",
        method: "GET",
        dataType: "json",

        success: function (projects) {

            if (sortValue === "stars") {

                projects.sort(function (a, b) {
                    return b.stars - a.stars;
                });

            }

            else if (sortValue === "newest") {

                projects.sort(function (a, b) {
                    return b.year - a.year;
                });

            }

            else if (sortValue === "oldest") {

                projects.sort(function (a, b) {
                    return a.year - b.year;
                });

            }

            displayAllProjects(projects);

        },

        error: function (xhr, status, error) {

            console.error(
                "Failed to sort projects:",
                error
            );

        }

    });

});

$(document).on("click", ".project-detail-btn", function () {

    const projectId = $(this).data("id");

    const project = allProjectsData.find(function (project) {
        return project.id == projectId;
    });

    if (!project) {
        console.error("Project not found:", projectId);
        return;
    }


    $("#modalProjectImage")
        .attr("src", project.image)
        .attr("alt", project.title);

    $("#modalProjectCategory")
        .text(project.category);

    $("#modalProjectTitle")
        .text(project.title);

    $("#modalProjectDescription")
        .text(project.description);

    $("#modalProjectAuthor")
        .text(project.author);

    $("#modalProjectRole")
        .text(project.role);

    $("#modalProjectYear")
        .text(project.year);


    const tagsContainer = $("#modalProjectTags");

    tagsContainer.empty();

    project.technologies.forEach(function (technology) {

        tagsContainer.append(
            `<span>${technology}</span>`
        );

    });


    $("#projectModal").addClass("show");

});

$("#closeProjectModal").click(function () {

    $("#projectModal").removeClass("show");

});

$("#projectModal").click(function (event) {

    if (event.target === this) {

        $(this).removeClass("show");

    }

});