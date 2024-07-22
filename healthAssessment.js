function calculateBMI() {
    const height = document.getElementById('height').value;
    const heightUnit = document.getElementById('height-unit').value;
    const weight = document.getElementById('weight').value;
    const weightUnit = document.getElementById('weight-unit').value;

    if (height && weight) {
        let heightInMeters;
        if (heightUnit === 'cm') {
            heightInMeters = height / 100;
        } else {
            heightInMeters = height * 0.3048; // Convert feet to meters
        }

        let weightInKg;
        if (weightUnit === 'kg') {
            weightInKg = weight;
        } else {
            weightInKg = weight * 0.453592; // Convert pounds to kilograms
        }

        const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
        document.getElementById('bmi-result').textContent = `Your BMI is ${bmi}`;
        provideBMIRecommendation(bmi);
    } else {
        document.getElementById('bmi-result').textContent = 'Please enter valid height and weight.';
        document.getElementById('bmi-recommendation').textContent = '';
    }
}

function provideBMIRecommendation(bmi) {
    let recommendation = '';

    if (bmi < 18.5) {
        recommendation = 'You are underweight. It is recommended to include calorie-dense and nutrient-rich foods in your diet and engage in strength training exercises.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        recommendation = 'You have a normal weight. Maintain a balanced diet and regular exercise routine to stay healthy.';
    } else if (bmi >= 25 && bmi < 29.9) {
        recommendation = 'You are overweight. Incorporate cardio exercises such as running, cycling, or swimming, and watch your calorie intake.';
    } else {
        recommendation = 'You are obese. It is advisable to follow a structured weight loss program including both diet and regular physical activity. Consult with a healthcare provider for personalized advice.';
    }

    document.getElementById('bmi-recommendation').textContent = recommendation;
}

function calculateFramingham() {
    const totalCholesterol = document.getElementById('total-cholesterol').value;
    const cholesterolUnit = document.getElementById('cholesterol-unit').value;
    const hdlCholesterol = document.getElementById('hdl-cholesterol').value;
    const hdlUnit = document.getElementById('hdl-unit').value;

    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const systolicBp = document.getElementById('systolic-bp').value;
    const hypertensionTreatment = document.getElementById('hypertension-treatment').value;
    const smoker = document.getElementById('smoker').value;
    const diabetes = document.getElementById('diabetes').value;

    let totalCholesterolMg;
    if (cholesterolUnit === 'mg/dL') {
        totalCholesterolMg = totalCholesterol;
    } else {
        totalCholesterolMg = totalCholesterol * 38.67; // Convert mmol/L to mg/dL
    }

    let hdlCholesterolMg;
    if (hdlUnit === 'mg/dL') {
        hdlCholesterolMg = hdlCholesterol;
    } else {
        hdlCholesterolMg = hdlCholesterol * 38.67; // Convert mmol/L to mg/dL
    }

    const score = calculateFraminghamScore(age, gender, totalCholesterolMg, hdlCholesterolMg, systolicBp, hypertensionTreatment, smoker, diabetes);
    document.getElementById('framingham-result').textContent = `Your Framingham score is ${score}%`;
    provideFraminghamRecommendation(score);
}

function calculateFraminghamScore(age, gender, totalCholesterol, hdlCholesterol, systolicBp, hypertensionTreatment, smoker, diabetes) {
    let score = 0;
    let points = 0;

    if (gender === 'male') {
        points += getMaleAgePoints(age);
        points += getMaleCholesterolPoints(totalCholesterol, age);
        points += getMaleHdlPoints(hdlCholesterol);
        points += getMaleBpPoints(systolicBp, hypertensionTreatment);
        points += smoker === 'yes' ? 4 : 0;
        points += diabetes === 'yes' ? 3 : 0;
    } else {
        points += getFemaleAgePoints(age);
        points += getFemaleCholesterolPoints(totalCholesterol, age);
        points += getFemaleHdlPoints(hdlCholesterol);
        points += getFemaleBpPoints(systolicBp, hypertensionTreatment);
        points += smoker === 'yes' ? 3 : 0;
        points += diabetes === 'yes' ? 4 : 0;
    }

    if (gender === 'male') {
        if (points < 0) score = 1;
        else if (points <= 4) score = 1;
        else if (points <= 6) score = 2;
        else if (points <= 8) score = 3;
        else if (points <= 10) score = 4;
        else if (points <= 11) score = 5;
        else if (points <= 13) score = 6;
        else if (points <= 15) score = 8;
        else if (points <= 16) score = 10;
        else if (points <= 18) score = 12;
        else if (points <= 20) score = 16;
        else if (points <= 22) score = 20;
        else if (points <= 24) score = 25;
        else score = 30;
    } else {
        if (points < 9) score = 1;
        else if (points <= 12) score = 1;
        else if (points <= 14) score = 2;
        else if (points <= 16) score = 3;
        else if (points <= 18) score = 4;
        else if (points <= 20) score = 5;
        else if (points <= 22) score = 6;
        else if (points <= 24) score = 8;
        else if (points <= 26) score = 11;
        else if (points <= 28) score = 14;
        else if (points <= 29) score = 17;
        else if (points <= 31) score = 22;
        else if (points <= 33) score = 27;
        else if (points <= 35) score = 30;
        else score = 30;
    }

    return score;
}

function getMaleAgePoints(age) {
    if (age < 35) return -9;
    if (age <= 39) return -4;
    if (age <= 44) return 0;
    if (age <= 49) return 3;
    if (age <= 54) return 6;
    if (age <= 59) return 8;
    if (age <= 64) return 10;
    if (age <= 69) return 11;
    if (age <= 74) return 12;
    return 13;
}

function getFemaleAgePoints(age) {
    if (age < 35) return -7;
    if (age <= 39) return -3;
    if (age <= 44) return 0;
    if (age <= 49) return 3;
    if (age <= 54) return 6;
    if (age <= 59) return 8;
    if (age <= 64) return 10;
    if (age <= 69) return 12;
    if (age <= 74) return 14;
    return 16;
}

function getMaleCholesterolPoints(cholesterol, age) {
    if (age < 40) {
        if (cholesterol < 160) return 0;
        if (cholesterol <= 199) return 4;
        if (cholesterol <= 239) return 7;
        if (cholesterol <= 279) return 9;
        return 11;
    }
    if (age <= 49) {
        if (cholesterol < 160) return 0;
        if (cholesterol <= 199) return 3;
        if (cholesterol <= 239) return 5;
        if (cholesterol <= 279) return 6;
        return 8;
    }
    if (age <= 59) {
        if (cholesterol < 160) return 0;
        if (cholesterol <= 199) return 2;
        if (cholesterol <= 239) return 3;
        if (cholesterol <= 279) return 4;
        return 5;
    }
    if (age <= 69) {
        if (cholesterol < 160) return 0;
        if (cholesterol <= 199) return 1;
        if (cholesterol <= 239) return 1;
        if (cholesterol <= 279) return 2;
        return 3;
    }
    if (cholesterol < 160) return 0;
    if (cholesterol <= 199) return 0;
    if (cholesterol <= 239) return 0;
    if (cholesterol <= 279) return 1;
    return 1;
}

function getFemaleCholesterolPoints(cholesterol, age) {
    if (age < 40) {
        if (cholesterol < 160) return 0;
        if (cholesterol <= 199) return 4;
        if (cholesterol <= 239) return 8;
        if (cholesterol <= 279) return 11;
        return 13;
    }
    if (age <= 49) {
        if (cholesterol < 160) return 0;
        if (cholesterol <= 199) return 3;
        if (cholesterol <= 239) return 6;
        if (cholesterol <= 279) return 8;
        return 10;
    }
    if (age <= 59) {
        if (cholesterol < 160) return 0;
        if (cholesterol <= 199) return 2;
        if (cholesterol <= 239) return 4;
        if (cholesterol <= 279) return 5;
        return 7;
    }
    if (age <= 69) {
        if (cholesterol < 160) return 0;
        if (cholesterol <= 199) return 1;
        if (cholesterol <= 239) return 2;
        if (cholesterol <= 279) return 3;
        return 4;
    }
    if (cholesterol < 160) return 0;
    if (cholesterol <= 199) return 1;
    if (cholesterol <= 239) return 1;
    if (cholesterol <= 279) return 2;
    return 2;
}

function getMaleHdlPoints(hdl) {
    if (hdl >= 60) return -1;
    if (hdl >= 50) return 0;
    if (hdl >= 40) return 1;
    return 2;
}

function getFemaleHdlPoints(hdl) {
    if (hdl >= 60) return -1;
    if (hdl >= 50) return 0;
    if (hdl >= 40) return 1;
    return 2;
}

function getMaleBpPoints(bp, treatment) {
    if (treatment === 'yes') {
        if (bp < 120) return 0;
        if (bp <= 129) return 1;
        if (bp <= 139) return 2;
        if (bp <= 159) return 2;
        return 3;
    }
    if (bp < 120) return 0;
    if (bp <= 129) return 0;
    if (bp <= 139) return 1;
    if (bp <= 159) return 1;
    return 2;
}

function getFemaleBpPoints(bp, treatment) {
    if (treatment === 'yes') {
        if (bp < 120) return 0;
        if (bp <= 129) return 3;
        if (bp <= 139) return 4;
        if (bp <= 159) return 5;
        return 6;
    }
    if (bp < 120) return 0;
    if (bp <= 129) return 1;
    if (bp <= 139) return 2;
    if (bp <= 159) return 3;
    return 4;
}

function provideFraminghamRecommendation(score) {
    let recommendation = '';

    if (score < 10) {
        recommendation = 'You have a low risk of cardiovascular disease. Maintain a healthy lifestyle with regular exercise and a balanced diet.';
    } else if (score >= 10 && score < 20) {
        recommendation = 'You have a moderate risk of cardiovascular disease. Incorporate regular cardiovascular exercises and monitor your diet to manage cholesterol and blood pressure levels.';
    } else {
        recommendation = 'You have a high risk of cardiovascular disease. It is crucial to consult with a healthcare provider for a comprehensive management plan, including medication, diet, and exercise.';
    }

    document.getElementById('framingham-recommendation').textContent = recommendation;
}
