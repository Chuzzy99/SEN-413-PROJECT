document.addEventListener("DOMContentLoaded", () => {
    const timetableBody = document.getElementById("timetableBody");
    const saveTimetableBtn = document.getElementById("saveTimetable");
    const loadTimetableBtn = document.getElementById("loadTimetable");
    const timetableTypeSelect = document.getElementById("timetableType");
    const menuToggle = document.querySelector(".menu-toggle"); // Fix for dropdown toggle
    const navLinks = document.querySelector(".nav-links"); // Fix for dropdown toggle

    // Load timetable data based on selected category
    function loadTimetable() {
        const selectedType = timetableTypeSelect.value;
        const savedTimetable = JSON.parse(localStorage.getItem(selectedType)) || {};

        document.querySelectorAll("#timetableBody tr").forEach(row => {
            const day = row.cells[0].textContent;
            if (savedTimetable[day]) {
                row.cells[1].textContent = savedTimetable[day].time;
                row.cells[2].textContent = savedTimetable[day].course;
            } else {
                row.cells[1].textContent = "";
                row.cells[2].textContent = "";
            }
        });
    }

    // Save timetable data based on selected category
    function saveTimetable() {
        const selectedType = timetableTypeSelect.value;
        let timetable = {};

        document.querySelectorAll("#timetableBody tr").forEach(row => {
            timetable[row.cells[0].textContent] = {
                time: row.cells[1].textContent,
                course: row.cells[2].textContent
            };
        });

        localStorage.setItem(selectedType, JSON.stringify(timetable));
        alert(`✅ ${selectedType.replace("Timetable", "")} Timetable saved successfully!`);
    }

    // Toggle mobile menu
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show"); // Add or remove 'show' class for dropdown
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show"); // Ensure menu closes after clicking a link
        });
    });

    // Button Event Listeners
    saveTimetableBtn.addEventListener("click", saveTimetable);
    loadTimetableBtn.addEventListener("click", loadTimetable);

    // Load default timetable on page load
    loadTimetable();
});
