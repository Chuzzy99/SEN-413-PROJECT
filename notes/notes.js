document.addEventListener("DOMContentLoaded", () => {
    const noteCaption = document.getElementById("noteCaption");
    const noteArea = document.getElementById("noteArea");
    const saveNoteBtn = document.getElementById("saveNote");
    const clearNotesBtn = document.getElementById("clearNotes");
    const savedNotesList = document.getElementById("savedNotesList");
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    // Load temporary note from localStorage
    noteCaption.value = localStorage.getItem("currentCaption") || "";
    noteArea.value = localStorage.getItem("currentNote") || "";
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];

    // Display saved notes
    function displayNotes() {
        savedNotesList.innerHTML = "";
        savedNotes.forEach((note, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="note-content">
                    <h3>${note.caption}</h3>
                    <p>${note.text}</p>
                </div>
                <button class="delete-note" data-index="${index}">❌</button>
            `;
            savedNotesList.appendChild(li);
        });
    }

    // Save note
    saveNoteBtn.addEventListener("click", () => {
        if (!noteCaption.value.trim() || !noteArea.value.trim()) {
            alert("⚠️ Please enter a caption and note before saving!");
            return;
        }

        savedNotes.push({ caption: noteCaption.value, text: noteArea.value });
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
        noteCaption.value = "";
        noteArea.value = "";
        displayNotes();
    });

    // Delete a saved note
    savedNotesList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-note")) {
            savedNotes.splice(event.target.dataset.index, 1);
            localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
            displayNotes();
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener("click", () => navLinks.classList.toggle("show"));

    // Load saved notes
    displayNotes();
});
