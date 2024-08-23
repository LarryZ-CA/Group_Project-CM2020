document.addEventListener('DOMContentLoaded', function() {
    console.log("ready");    
    console.log(window.location.href)
    var navLink = document.querySelectorAll("a[href='healthAssessment.html']");
    if (navLink) {
        navLink[0].classList.add("active");
    }
})


document.getElementById('assessment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting automatically

    setTimeout(() => {

        const main = document.querySelector("main");
        const APIresultsDiv = document.getElementById("ApiResults");

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

    getExercises(dailyCalories);
    suggestFoods(bmi, goal, exerciseFrequency, exerciseType, intensity, currentDiet, mealFrequency, foodPreferences, bodyType);
});


async function getExercises(dailyCalories) {
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
        const header = document.createElement("h3");
    
        let dailyCal = document.createElement("div");
        dailyCal.innerHTML = "Your daily caloric needs are approximately " +  dailyCalories.toFixed(0) + " calories.";
        header.innerHTML = "Recommended Exercises Based on Your Daily Caloric Needs:";
        
        // Clear any existing content in APIresultsDiv
        APIresultsDiv.innerHTML = "";
        
        FormResultsDiv.appendChild(header); 
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

function suggestFoods(bmi, goal, exerciseFrequency, exerciseType, intensity, currentDiet, mealFrequency, foodPreferences, bodyType) {
    const foodSuggestions = [];
    const FormResultsDiv = document.getElementById("formResults");


    if (goal === 'weight_loss') {
        foodSuggestions.push("Focus on portion control and meal timing.");
        foodSuggestions.push("Incorporate more high-fiber foods to increase satiety.");
    } else if (goal === 'muscle_gain') {
        foodSuggestions.push("Increase protein intake to support muscle growth.");
        foodSuggestions.push("Consume post-workout meals with both carbs and protein.");
    } else if (goal === 'general_fitness') {
        foodSuggestions.push("Maintain a balanced diet with controlled portion sizes.");
        foodSuggestions.push("Include a variety of foods to meet micronutrient needs.");
    }

    if (exerciseFrequency >= 5) {
        foodSuggestions.push("Consider high-protein snacks post-workout to aid recovery.");
        foodSuggestions.push("Hydrate adequately, especially if exercising intensely.");
    } else if (exerciseFrequency <= 2) {
        foodSuggestions.push("Focus on maintaining a calorie balance to avoid weight gain.");
    }

    if (exerciseType === 'cardiovascular' && intensity === 'intense') {
        foodSuggestions.push("Increase protein intake to support muscle recovery and growth.");
        foodSuggestions.push("Ensure adequate carbohydrate intake for energy.");
    } else if (exerciseType === 'strength_training' && intensity === 'intense') {
        foodSuggestions.push("Focus on protein-rich foods to aid muscle repair.");
    }

    if (currentDiet.toLowerCase().includes('vegetarian')) {
        foodSuggestions.push("Incorporate plant-based proteins like lentils, beans, and tofu.");
        foodSuggestions.push("Include a variety of vegetables to ensure a broad nutrient intake.");
    } else if (currentDiet.toLowerCase().includes('keto')) {
        foodSuggestions.push("Focus on high-fat foods like avocados, nuts, and fatty fish.");
        foodSuggestions.push("Limit carb intake by avoiding grains and starchy vegetables.");
    }

    if (mealFrequency < 3) {
        foodSuggestions.push("Consider increasing meal frequency for better nutrient absorption.");
        foodSuggestions.push("Ensure meals are nutrient-dense to compensate for lower frequency.");
    } else if (mealFrequency >= 5) {
        foodSuggestions.push("Distribute calories evenly across meals to maintain energy levels.");
    }

    if (foodPreferences.toLowerCase().includes('spicy')) {
        foodSuggestions.push("Incorporate spicy foods like peppers to boost metabolism.");
    }
    if (foodPreferences.toLowerCase().includes('sweet')) {
        foodSuggestions.push("Opt for naturally sweet foods like fruits to satisfy cravings.");
    }
    if (foodPreferences.toLowerCase().includes('salty')) {
        foodSuggestions.push("Use herbs and spices to enhance flavor without added sodium.");
    }

    if (bodyType === 'endomorph') {
        foodSuggestions.push("Focus on low-carb, high-protein meals to manage weight.");
    } else if (bodyType === 'ectomorph') {
        foodSuggestions.push("Increase calorie intake with nutrient-dense foods.");
    } else if (bodyType === 'mesomorph') {
        foodSuggestions.push("Maintain a balanced diet with moderate carbs and protein.");
    }

    let foodDiv = document.createElement("div");
    foodDiv.innerHTML = `<h3>Recommended Diet Based on Your BMI (${bmi.toFixed(1)}) and Other Factors:</h3><div>${foodSuggestions.map(food => `<p>${food}</p>`).join('')}</div>`;
    FormResultsDiv.appendChild(foodDiv);
}

