document.addEventListener('DOMContentLoaded', function() {
    console.log("ready");    
    console.log(window.location.href)
    var navLink = document.querySelectorAll("a[href='fitnessTracker.html']");
    if (navLink) {
        navLink[0].classList.add("active");
    }
})
const stats = {};

function trackWorkout() {
    const date = document.getElementById('date').value;
    const exercise = document.getElementById('exercise').value;
    const duration = document.getElementById('duration').value;

    if (date && exercise && duration > 0) {
        const table = document.getElementById('workout-table').getElementsByTagName('tbody')[0];

        // Create a new row
        const newRow = table.insertRow();
        const dateCell = newRow.insertCell(0);
        const exerciseCell = newRow.insertCell(1);
        const durationCell = newRow.insertCell(2);

        dateCell.textContent = date;
        exerciseCell.textContent = exercise;
        durationCell.textContent = duration;

        // Convert table rows to an array for sorting
        const rowsArray = Array.from(table.rows);

        // Sort the rows by date in ascending order
        rowsArray.sort((a, b) => {
            const dateA = new Date(a.cells[0].textContent);
            const dateB = new Date(b.cells[0].textContent);
            return dateA - dateB;
        });

        // Remove existing rows and re-append them in sorted order
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        rowsArray.forEach(row => table.appendChild(row));

        // Update workout statistics
        updateStats(exercise, parseInt(duration));

        document.getElementById('workout-form').reset();
    } else {
        alert('Please fill out all fields and ensure duration is a positive number.');
    }
}

function updateStats(exercise, duration) {
    if (!stats[exercise]) {
        stats[exercise] = 0;
    }
    stats[exercise] += duration;

    const statsTable = document.getElementById('stats-table').getElementsByTagName('tbody')[0];

    // Clear the existing rows in the stats table
    while (statsTable.firstChild) {
        statsTable.removeChild(statsTable.firstChild);
    }

    // Add updated stats
    for (const [exercise, totalDuration] of Object.entries(stats)) {
        const newRow = statsTable.insertRow();
        const exerciseCell = newRow.insertCell(0);
        const durationCell = newRow.insertCell(1);

        exerciseCell.textContent = exercise;
        durationCell.textContent = totalDuration;
    }
}
