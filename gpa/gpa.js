document.addEventListener("DOMContentLoaded", () => {
    const addCourseBtn = document.getElementById("addCourse");
    const calculateGpaBtn = document.getElementById("calculateGPA");
    const resetBtn = document.getElementById("reset");
    const courseList = document.getElementById("courseList");
    const result = document.getElementById("result");
    const menuToggle = document.querySelector(".menu-toggle"); // Fix for dropdown toggle
    const navLinks = document.querySelector(".nav-links"); // Fix for dropdown toggle

    // Function to get Grade Point
    function getGradePoint(score) {
        if (score >= 70) return 5.0; // A
        if (score >= 60) return 4.0; // B
        if (score >= 50) return 3.0; // C
        if (score >= 45) return 2.0; // D
        if (score >= 40) return 1.0; // E
        return 0.0; // F
    }

    // Add new course row
    addCourseBtn.addEventListener("click", () => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" placeholder="Course Name"></td>
            <td><input type="number" class="score" min="0" max="100" value="50"></td>
            <td><input type="number" class="unit" min="1" value="3"></td>
            <td><button class="delete-btn">❌</button></td>
        `;
        courseList.appendChild(row);
        row.querySelector(".delete-btn").addEventListener("click", () => row.remove());
    });

    // Calculate GPA
    calculateGpaBtn.addEventListener("click", () => {
        let totalUnits = 0, totalGradePoints = 0;
        document.querySelectorAll("#courseList tr").forEach(row => {
            const score = parseFloat(row.querySelector(".score").value);
            const units = parseFloat(row.querySelector(".unit").value);
            totalGradePoints += getGradePoint(score) * units;
            totalUnits += units;
        });
        result.textContent = `GPA: ${(totalUnits ? (totalGradePoints / totalUnits).toFixed(2) : 0.00)}`;
    });

    // Reset function
    resetBtn.addEventListener("click", () => {
        courseList.innerHTML = "";
        result.textContent = "GPA: 0.00";
    });

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
});
