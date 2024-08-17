document.addEventListener('DOMContentLoaded', function() {
    console.log("ready");    
    console.log(window.location.href)
    var navLink = document.querySelectorAll("a[href='healthAssessment.html']");
    if (navLink) {
        navLink[0].classList.add("active");
    }
})


document.getElementById('assessment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    setTimeout(() => {

        const main = document.querySelector("main");
        const APIresultsDiv = document.getElementById("ApiResults");
        const FormResultsDiv = document.getElementById("FormResults");

        APIresultsDiv.style.display = "flex";

        main.style.display = "none";

    }, 500);

    // Retrieve form values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters
    const weight = parseFloat(document.getElementById('weight').value);
    const activityLevel = document.getElementById('activity-level').value;
    const goal = document.getElementById('goal').value;
    const exerciseFrequency = parseInt(document.getElementById('exercise-frequency').value);
    const exerciseType = document.getElementById('exercise-type').value;
    const intensity = document.getElementById('intensity').value;
    const currentDiet = document.getElementById('current-diet').value;
    const mealFrequency = parseInt(document.getElementById('meal-frequency').value);
    const foodPreferences = document.getElementById('food-preferences').value;
    const bodyType = document.getElementById('body-type').value;

    // BMI Calculation
    const bmi = weight / (height * height);

    // Daily Caloric Needs Calculation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * (height * 100) - 5 * age + 5; // Mifflin-St Jeor Equation for males
    } else {
        bmr = 10 * weight + 6.25 * (height * 100) - 5 * age - 161; // Mifflin-St Jeor Equation for females
    }

    // Adjust BMR based on activity level
    const activityFactors = {
        'sedentary': 1.2,
        'lightly_active': 1.375,
        'moderately_active': 1.55,
        'very_active': 1.725
    };
    const dailyCalories = bmr * activityFactors[activityLevel];

    // Display results
    // alert(`Your BMI is ${bmi.toFixed(2)}.\nYour daily caloric needs are approximately ${dailyCalories.toFixed(0)} calories.`);

    // You can now use this information to recommend workouts and diets based on the user's input and calculations.

    getExercises(bmi, dailyCalories);

});


async function getExercises(bmi ,dailyCalories) {
    const APIresultsDiv = document.getElementById("ApiResults");
    const FormResultsDiv = document.getElementById("formResults");
    
    const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'f1a9633cb7mshc234deffdb746e6p1d1594jsn4513111a6663',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse the response as JSON
    
        let bmiDiv = document.createElement("div");
        let dailyCal = document.createElement("div");
        bmiDiv.innerHTML = "Your BMI is " + bmi.toFixed(2);
        dailyCal.innerHTML = "Your daily caloric needs are approximately " +  dailyCalories.toFixed(0) + " calories.";
    
        // Clear any existing content in APIresultsDiv
        APIresultsDiv.innerHTML = "";

        FormResultsDiv.appendChild(bmiDiv);
        FormResultsDiv.appendChild(dailyCal);

        // Loop through the array of exercise objects
        result.forEach(exercise => {
            // Create a div for each exercise
            const exerciseDiv = document.createElement("div");
            exerciseDiv.classList.add("exercise-item"); // Add a class for styling (optional)
            
            // Set the content of the div
            exerciseDiv.innerHTML = `
                <h3>${exercise.name}</h3>
                <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
                <p><strong>Equipment:</strong> ${exercise.equipment}</p>
                <p><strong>Target:</strong> ${exercise.target}</p>
                <img src="${exercise.gifUrl}" alt="${exercise.name}" />
            `;
    
            // Append the div to the results container
            APIresultsDiv.appendChild(exerciseDiv);
        });
    } catch (error) {
        console.error(error);
        APIresultsDiv.innerHTML = `<p>Error fetching exercises. Please try again later.</p>`;
    }
}

// Call the function to load the exercises when the page loads
