document.addEventListener('DOMContentLoaded', function() {
    console.log("ready");    
    console.log(window.location.href)
    var navLink = document.querySelectorAll("a[href='healthAssessment.html']");
    if (navLink) {
        navLink[0].classList.add("active");
    }
})

function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    if (height && weight) {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        document.getElementById('bmi-result').textContent = `Your BMI is ${bmi}`;
    } else {
        document.getElementById('bmi-result').textContent = 'Please enter valid height and weight.';
    }
}

function calculateFramingham() {
    // Placeholder function for calculating Framingham score
    // Implement the calculation logic based on the Framingham score algorithm
    document.getElementById('framingham-result').textContent = 'Framingham score calculation logic to be implemented.';
}
