var isknowMaxHeartRate="Yes";


function onLoad(radioButton) {
    isKnowMaxHeartRateYesChecked=document.getElementById("radioKnowMaxHeartRateYes").checked;
    if (isKnowMaxHeartRateYesChecked==true) {
        isknowMaxHeartRate="Yes";
        document.getElementById("maxHeartRateId").style.display="block";
        document.getElementById("ageId").style.display="none";
    } else {
        isknowMaxHeartRate="No";
        document.getElementById("maxHeartRateId").style.display="none";
        document.getElementById("ageId").style.display="block";
    }
    defaultActivity('HeartRateZone');
}

function knowMaxHeartRate(radioButton) {
    if (radioButton.value == "Yes") {
        document.getElementById("maxHeartRateId").style.display="block";
        document.getElementById("ageId").style.display="none";
        isknowMaxHeartRate="Yes";
    } else {
        document.getElementById("maxHeartRateId").style.display="none";
        document.getElementById("ageId").style.display="block";
        isknowMaxHeartRate="No";
    }
    document.getElementById("zoneTable").style.display="none";
    document.getElementById("zonePercentageTable").style.display="none";
    document.getElementById("zoneTrainingTable").style.display="none";
    document.getElementById("pZoneTraining").style.display="none";
    document.getElementById("estimatedMaxHeartRateLabel").style.display="none";
    document.getElementById("estimatedMaxHeartRateValue").style.display="none";
}

function defaultActivity(activity) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(activity).style.display = "block";
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].id == (activity + "Menu")) {
            tablinks[i].className += " active";
        }
    }
}

function openActivity(evt, activity) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(activity).style.display = "block";
    evt.currentTarget.className += " active";
}

function isValidTrainingZoneForm() {
    var maxHeartRate = document.getElementById("maxHeartRate").value;
    var restHeartRate = document.getElementById("restHeartRate").value;
    var age = document.getElementById("age").value;

    if (isknowMaxHeartRate=="Yes") {
        if (maxHeartRate == "") {
            alert("Max Heart Rate must be filled out");
            return false;
        }

        if (isNaN(maxHeartRate)) {
            alert("Max Heart Rate must be a positive number");
            return false;
        }

        if (Number(maxHeartRate) < 0) {
            alert("Max Heart Rate must be a positive number");
            return false;
        }

        if (Number(maxHeartRate) <= Number(restHeartRate)) {
            alert("Max Heart Rate must be greater than Rest Heart Rate ");
            return false;
        }

        if (Number(maxHeartRate) < 20 || Number(maxHeartRate) > 220) {
            alert("Max Heart Rate must be in the [20-220] range.");
            return false;
        }
    } else {
        if (age == "") {
            alert("Age must be filled out");
            return false;
        }

        if (isNaN(age)) {
            alert("Age must be a positive number");
            return false;
        }

        if (Number(age) < 0) {
            alert("Age must be a positive number");
            return false;
        }

        if (Number(age) < 1 || Number(age) > 130) {
            alert("Age must be in the [1-130] range.");
            return false;
        }
    }

    if (restHeartRate == "") {
        alert("Rest Heart Rate must be filled out");
        return false;
    }

    if (isNaN(restHeartRate)) {
        alert("Rest Heart Rate must be a positive number");
        return false;
    }

    if (Number(restHeartRate) < 0) {
        alert("Rest Heart Rate must be a positive number");
        return false;
    }

    if (Number(restHeartRate) < 20 || Number(restHeartRate) > 220) {
        alert("Rest Heart Rate must be in the [20-220] range.");
        return false;
    }

    return true;
}

function calculateTrainingZone() {
    if (isValidTrainingZoneForm()) {
        var maxHeartRate;
        if (isknowMaxHeartRate=="Yes") {
            maxHeartRate = document.getElementById("maxHeartRate").value;

            document.getElementById("estimatedMaxHeartRateLabel").style.display="none";
            document.getElementById("estimatedMaxHeartRateValue").style.display="none";
        } else {
            var age = document.getElementById("age").value;
            maxHeartRate = 220-age;

            document.getElementById("estimatedMaxHeartRateLabel").style.display="inline";
            document.getElementById("estimatedMaxHeartRateValue").innerHTML=maxHeartRate;
            document.getElementById("estimatedMaxHeartRateValue").style.display="inline";
        }
        var restHeartRate = document.getElementById("restHeartRate").value;
        var reserveHeartRate=maxHeartRate-restHeartRate;

        var zone5HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*90/100));
        var zone4HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*80/100));
        var zone3HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*70/100));
        var zone2HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*60/100));
        var zone1HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*50/100));

        document.getElementById("zone5value").innerHTML=zone5HeartRate + " - " + maxHeartRate;
        document.getElementById("zone4value").innerHTML=zone4HeartRate + " - " + zone5HeartRate;
        document.getElementById("zone3value").innerHTML=zone3HeartRate + " - " + zone4HeartRate;
        document.getElementById("zone2value").innerHTML=zone2HeartRate + " - " + zone3HeartRate;
        document.getElementById("zone1value").innerHTML=zone1HeartRate + " - " + zone2HeartRate;
        document.getElementById("zoneTable").style.display="block";

        var value95HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*95/100));
        var value85HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*85/100));
        var value75HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*75/100));
        var value65HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*65/100));
        var value55HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*55/100));

        document.getElementById("value95").innerHTML=value95HeartRate;
        document.getElementById("value90").innerHTML=zone5HeartRate;
        document.getElementById("value85").innerHTML=value85HeartRate;
        document.getElementById("value80").innerHTML=zone4HeartRate;
        document.getElementById("value75").innerHTML=value75HeartRate;
        document.getElementById("value70").innerHTML=zone3HeartRate;
        document.getElementById("value65").innerHTML=value65HeartRate;
        document.getElementById("value60").innerHTML=zone2HeartRate;
        document.getElementById("value55").innerHTML=value55HeartRate;
        document.getElementById("value50").innerHTML=zone1HeartRate;
        document.getElementById("zonePercentageTable").style.display="block";

        var value92HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*92/100));
        var value93HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*93/100));
        var value98HeartRate=Math.floor(Number(restHeartRate)+Number(reserveHeartRate*98/100));

        document.getElementById("valueTraining100").innerHTML="-";
        document.getElementById("valueTraining98").innerHTML=value95HeartRate + " - " + value98HeartRate;
        document.getElementById("valueTraining95").innerHTML=value95HeartRate;
        document.getElementById("valueTraining93").innerHTML=value92HeartRate + " - " + value93HeartRate;
        document.getElementById("valueTraining92").innerHTML=zone5HeartRate + " - " + value92HeartRate;
        document.getElementById("valueTraining90").innerHTML=zone5HeartRate;
        document.getElementById("valueTraining85").innerHTML=value85HeartRate;
        document.getElementById("valueTraining80").innerHTML=zone4HeartRate;
        document.getElementById("valueTraining75").innerHTML=value75HeartRate;
        document.getElementById("valueTrainingLess75").innerHTML="<" + value75HeartRate;
        document.getElementById("zoneTrainingTable").style.display="block";
        document.getElementById("pZoneTraining").style.display="block";

    }
}

function isValidTime(timeHours, timeMinutes, timeSeconds) {
    if (timeHours == "" && timeMinutes == "" && timeSeconds == "") {
        alert("Time must be filled out");
        return false;
    }

    if (timeHours == "") {
        timeHours=0;
    }

    if (timeMinutes == "") {
        timeMinutes=0;
    }

    if (timeSeconds == "") {
        timeSeconds=0;
    }

    if (isNaN(timeHours) || isNaN(timeMinutes) || isNaN(timeSeconds)) {
        alert("Time must be a valid time");
        return false;
    }

    if (Number(timeHours) < 0 || Number(timeHours) > 23 ||
        Number(timeMinutes) < 0 || Number(timeMinutes) > 59 ||
        Number(timeSeconds) < 0 || Number(timeSeconds) > 59) {
        alert("Time must be a valid time in the range (0-23:59:59]");
        return false;
    }

    return true;
}

function isValidPaceCalculatorForm(formType) {
    if (formType == "time") {
        var distance = document.getElementById("distance").value;
        var distanceUnit = document.getElementById("distanceUnit");
        var distanceUnitValue = distanceUnit.options[distanceUnit.selectedIndex].value;
        var paceHours = document.getElementById("paceHours").value;
        var paceMinutes = document.getElementById("paceMinutes").value;
        var paceSeconds = document.getElementById("paceSeconds").value;
        var paceUnit = document.getElementById("paceUnit");
        var paceUnitValue = paceUnit.options[paceUnit.selectedIndex].value;

        if (distance == "") {
            alert("Distance must be filled out");
            return false;
        }

        if (isNaN(distance)) {
            alert("Distance must be a positive number");
            return false;
        }

        if (Number(distance) <= 0) {
            alert("Distance must be a positive number");
            return false;
        }

        if (distanceUnitValue=="Miles") {
            distance=distance*1.609344;
        }
        if (Number(distance) > 150) {
            alert("Distance too long, valid range is (0-150Km] or (0-93.20Miles]");
            return false;
        }

        if (paceHours == "" && paceMinutes == "" && paceSeconds == "") {
            alert("Pace must be filled out");
            return false;
        }

        if (paceHours == "") {
            paceHours=0;
        }

        if (paceMinutes == "") {
            paceMinutes=0;
        }

        if (paceSeconds == "") {
            paceSeconds=0;
        }

        if (isNaN(paceHours) || isNaN(paceMinutes) || isNaN(paceSeconds)) {
            alert("Pace must be a valid time");
            return false;
        }

        if (Number(paceHours) < 0 || Number(paceHours) > 23 ||
            Number(paceMinutes) < 0 || Number(paceMinutes) > 59 ||
            Number(paceSeconds) < 0 || Number(paceSeconds) > 59) {
            alert("Pace must be a valid time");
            return false;
        }

        var timeInSeconds=Number(paceHours)*3600+Number(paceMinutes)*60+Number(paceSeconds);
        if (paceUnitValue=="min/Miles") {
            timeInSeconds=timeInSeconds*1.609344;
        }
        if (Number(timeInSeconds) > 1200 || Number(timeInSeconds) <= 0) {
            alert("Pace must be a valid time in the range (0-20 min/Km] or (0-32 min/Miles]");
            return false;
        }
    } else if (formType == "distance") {
        var timeHours = document.getElementById("timeHours").value;
        var timeMinutes = document.getElementById("timeMinutes").value;
        var timeSeconds = document.getElementById("timeSeconds").value;
        var paceHours = document.getElementById("paceHours").value;
        var paceMinutes = document.getElementById("paceMinutes").value;
        var paceSeconds = document.getElementById("paceSeconds").value;

        if (!isValidTime(timeHours,timeMinutes,timeSeconds)) {
            return false;
        }

        if (paceHours == "" && paceMinutes == "" && paceSeconds == "") {
            alert("Pace must be filled out");
            return false;
        }

        if (paceHours == "") {
            paceHours=0;
        }

        if (paceMinutes == "") {
            paceMinutes=0;
        }

        if (paceSeconds == "") {
            paceSeconds=0;
        }

        if (isNaN(paceHours) || isNaN(paceMinutes) || isNaN(paceSeconds)) {
            alert("Pace must be a valid time");
            return false;
        }

        if (Number(paceHours) < 0 || Number(paceHours) > 23 ||
            Number(paceMinutes) < 0 || Number(paceMinutes) > 59 ||
            Number(paceSeconds) < 0 || Number(paceSeconds) > 59) {
            alert("Pace must be a valid time");
            return false;
        }
        var timeInSeconds=Number(paceHours)*3600+Number(paceMinutes)*60+Number(paceSeconds);
        if (paceUnitValue=="min/Miles") {
            timeInSeconds=timeInSeconds*1.609344;
        }
        if (Number(timeInSeconds) > 1200 || Number(timeInSeconds) <= 0) {
            alert("Pace must be a valid time in the range (0-20 min/Km] or (0-32 min/Miles]");
            return false;
        }
    } else if (formType == "pace") {
        var distance = document.getElementById("distance").value;
        var distanceUnit = document.getElementById("distanceUnit");
        var distanceUnitValue = distanceUnit.options[distanceUnit.selectedIndex].value;
        var timeHours = document.getElementById("timeHours").value;
        var timeMinutes = document.getElementById("timeMinutes").value;
        var timeSeconds = document.getElementById("timeSeconds").value;

        if (!isValidTime(timeHours,timeMinutes,timeSeconds)) {
            return false;
        }

        if (distance == "") {
            alert("Distance must be filled out");
            return false;
        }

        if (isNaN(distance)) {
            alert("Distance must be a number");
            return false;
        }

        if (Number(distance) <= 0) {
            alert("Distance must be a positive number");
            return false;
        }

        if (distanceUnitValue=="Miles") {
            distance=distance*1.609344;
        }
        if (Number(distance) > 150) {
            alert("Distance too long, valid range is (0-150Km] or (0-93.20Miles]");
            return false;
        }
    }

    return true;
}

function isValidWeight(weight) {
    if (weight == "") {
        alert("Weight must be filled out");
        return false;
    }

    if (isNaN(weight)) {
        alert("Weight must be a positive number in the range (0 - 250 Kg]");
        return false;
    }

    if (Number(weight)<=0 || Number(weight)>250) {
        alert("Weight must be a positive number in the range (0 - 250 Kg]");
        return false;
    }

    return true;
}

function isValidHeight(height) {
    if (height == "") {
        alert("Height must be filled out");
        return false;
    }

    if (isNaN(height)) {
        alert("Height must be a positive number in the range (0 - 250 cm]");
        return false;
    }

    if (Number(height)<=0 || Number(height)>250) {
        alert("Height must be a positive number in the range (0 - 250 cm]");
        return false;
    }

    return true;
}

function isValidBodyMassIndexForm() {
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("heightBMI").value;

    if (!isValidWeight(weight)) {
        return false;
    }

    if (!isValidHeight(height)) {
        return false;
    }

    return true;
}

function calculateTime() {
    if (isValidPaceCalculatorForm("time")) {
        var distance = document.getElementById("distance").value;
        var distanceUnit = document.getElementById("distanceUnit");
        var distanceUnitValue = distanceUnit.options[distanceUnit.selectedIndex].value;
        var paceMinutes = document.getElementById("paceMinutes").value;
        var paceHours = document.getElementById("paceHours").value;
        var paceSeconds = document.getElementById("paceSeconds").value;
        var paceUnit = document.getElementById("paceUnit");
        var paceUnitValue = paceUnit.options[paceUnit.selectedIndex].value;

        paceSeconds=Number(paceSeconds)+Number(paceMinutes*60)+Number(paceHours*3600);
        if (distanceUnitValue=="Miles" && paceUnitValue=="min/Km") {
            distance=distance*1.609344;
        } else if (distanceUnitValue=="Km" && paceUnitValue=="min/Miles") {
            distance=distance/1.609344;
        }

        var timeSeconds=Math.floor(paceSeconds*distance);
        var timeHours=Math.floor(timeSeconds/3600);
        timeSeconds=timeSeconds%3600;
        var timeMinutes=Math.floor(timeSeconds/60);
        timeSeconds=timeSeconds%60;

        document.getElementById("timeHours").value=('0' + timeHours).slice(-2);
        document.getElementById("timeMinutes").value=('0' + timeMinutes).slice(-2);
        document.getElementById("timeSeconds").value=('0' + timeSeconds).slice(-2);
    }
}

function calculateDistance() {
    if (isValidPaceCalculatorForm("distance")) {
        var distanceUnit = document.getElementById("distanceUnit");
        var distanceUnitValue = distanceUnit.options[distanceUnit.selectedIndex].value;
        var timeHours = document.getElementById("timeHours").value;
        var timeMinutes = document.getElementById("timeMinutes").value;
        var timeSeconds = document.getElementById("timeSeconds").value;
        var paceHours = document.getElementById("paceHours").value;
        var paceMinutes = document.getElementById("paceMinutes").value;
        var paceSeconds = document.getElementById("paceSeconds").value;
        var paceUnit = document.getElementById("paceUnit");
        var paceUnitValue = paceUnit.options[paceUnit.selectedIndex].value;

        timeSeconds=Number(timeSeconds)+Number(timeMinutes*60)+Number(timeHours*3600);
        paceSeconds=Number(paceSeconds)+Number(paceMinutes*60)+Number(paceHours*3600);
        if (distanceUnitValue=="Miles" && paceUnitValue=="min/Km") {
            paceSeconds=paceSeconds*1.609344;
        } else if (distanceUnitValue=="Km" && paceUnitValue=="min/Miles") {
            paceSeconds=paceSeconds/1.609344;
        }
        distance=timeSeconds/paceSeconds;
        document.getElementById("distance").value=distance.toFixed(2);
    }
}

function calculatePace() {
    if (isValidPaceCalculatorForm("pace")) {
        var distance = document.getElementById("distance").value;
        var distanceUnit = document.getElementById("distanceUnit");
        var distanceUnitValue = distanceUnit.options[distanceUnit.selectedIndex].value;
        var timeHours = document.getElementById("timeHours").value;
        var timeMinutes = document.getElementById("timeMinutes").value;
        var timeSeconds = document.getElementById("timeSeconds").value;
        var paceUnit = document.getElementById("paceUnit");
        var paceUnitValue = paceUnit.options[paceUnit.selectedIndex].value;

        timeSeconds=Number(timeSeconds)+Number(timeMinutes*60)+Number(timeHours*3600);
        if (distanceUnitValue=="Miles" && paceUnitValue=="min/Km") {
            distance=distance*1.609344;
        } else if (distanceUnitValue=="Km" && paceUnitValue=="min/Miles") {
            distance=distance/1.609344;
        }

        var paceSeconds=Math.floor(timeSeconds/distance);
        var paceHours=Math.floor(paceSeconds/3600);
        paceSeconds=paceSeconds%3600
        var paceMinutes=Math.floor(paceSeconds/60);
        paceSeconds=paceSeconds%60;

        document.getElementById("paceHours").value=('0' + paceHours).slice(-2);
        document.getElementById("paceMinutes").value=('0' + paceMinutes).slice(-2);
        document.getElementById("paceSeconds").value=('0' + paceSeconds).slice(-2);
    }
}

function calculateBodyMassIndex() {
    if (isValidBodyMassIndexForm()) {
        var weight = document.getElementById("weight").value;
        var height = document.getElementById("heightBMI").value;
        var bodyMassIndex=weight/Math.pow(height/100,2);

        document.getElementById("bodyMassIndexLabel").style.display="inline";
        document.getElementById("bodyMassIndexValue").innerHTML=bodyMassIndex.toFixed(2);
        document.getElementById("bodyMassIndexValue").style.display="inline";
    }
}

function isValidNeck(neck) {
    if (neck == "") {
        alert("Neck must be filled out");
        return false;
    }

    if (isNaN(neck)) {
        alert("Neck must be a positive number in the range (0 - 100 cm]");
        return false;
    }

    if (Number(neck)<=0 || Number(neck)>100) {
        alert("Neck must be a positive number in the range (0 - 100 cm]");
        return false;
    }

    return true;
}

function isValidWaist(waist) {
    if (waist == "") {
        alert("Waist must be filled out");
        return false;
    }

    if (isNaN(waist)) {
        alert("Waist must be a positive number in the range (0 - 200 cm]");
        return false;
    }

    if (Number(waist)<=0 || Number(waist)>200) {
        alert("Neck must be a positive number in the range (0 - 200 cm]");
        return false;
    }

    return true;
}

function isValidHip(hip) {
    if (hip == "") {
        alert("Hip must be filled out");
        return false;
    }

    if (isNaN(hip)) {
        alert("Hip must be a positive number in the range (0 - 200 cm]");
        return false;
    }

    if (Number(hip)<=0 || Number(hip)>200) {
        alert("Hip must be a positive number in the range (0 - 200 cm]");
        return false;
    }

    return true;
}

function isValidBodyFatForm() {
    var height = document.getElementById("heightBF").value;
    var neck = document.getElementById("neck").value;
    var waist = document.getElementById("waist").value;
    var hip = document.getElementById("hip").value;

    if (!isValidHeight(height)) {
        return false;
    }

    if (!isValidNeck(neck)) {
        return false;
    }

    if (!isValidWaist(waist)) {
        return false;
    }

    if (!isValidHip(hip)) {
        return false;
    }

    return true;
}

function calculateBodyFat() {
    if (isValidBodyFatForm()) {
        var height = document.getElementById("heightBF").value;
        var gender = document.getElementById("gender");
        var genderValue = gender.options[gender.selectedIndex].value;
        var neck = document.getElementById("neck").value;
        var waist = document.getElementById("waist").value;
        var bodyFat;

        if (genderValue=="Male") {
            bodyFat=Number(495)/(Number(1.0324)-Number(0.19077)*(Math.log10(Number(waist)-Number(neck)))+Number(0.15456)*(Math.log10(height)))-Number(450);
        } else {
            var hip = document.getElementById("hip").value;
            bodyFat=Number(495)/(Number(1.29579)-Number(0.35004)*(Math.log10(Number(waist)+Number(hip)-Number(neck)))+Number(0.22100)*(Math.log10(height)))-Number(450)
        }

        document.getElementById("bodyFatLabel").style.display="inline";
        document.getElementById("bodyFatValue").innerHTML=bodyFat.toFixed(2);
        document.getElementById("bodyFatValue").style.display="inline";
    }
}

function pickUpEvent() {
    var eventType = document.getElementById("eventType").value;
    var distance = document.getElementById("distance");
    var distanceUnit = document.getElementById("distanceUnit");
    var distanceUnitValue = distanceUnit.options[distanceUnit.selectedIndex].value;

    if (eventType=="Marathon") {
        if (distanceUnitValue=="Km") {
            distance=42.125;
            document.getElementById("distance").value=distance.toFixed(3);
        } else {
            distance=42.125/1.609344;
            document.getElementById("distance").value=distance.toFixed(4);
        }
    } else if (eventType=="Halfmarathon") {
        if (distanceUnitValue=="Km") {
            distance=21.0975;
            document.getElementById("distance").value=distance.toFixed(4);
        } else {
            distance=21.0975/1.609344;
            document.getElementById("distance").value=distance.toFixed(4);
        }
    } else if (eventType=="10K") {
        if (distanceUnitValue=="Km") {
            distance=10;
            document.getElementById("distance").value=distance;
        } else {
            distance=10/1.609344;
            document.getElementById("distance").value=distance.toFixed(4);
        }
    } else if (eventType=="5K") {
        if (distanceUnitValue=="Km") {
            distance=5;
            document.getElementById("distance").value=distance;
        } else {
            distance=5/1.609344;
            document.getElementById("distance").value=distance.toFixed(4);
        }
    }
}

function isValidTrainingPaceForm() {
    var distanceRace = document.getElementById("distanceRace").value;
    var timeRaceHours = document.getElementById("timeRaceHours").value;
    var timeRaceMinutes = document.getElementById("timeRaceMinutes").value;
    var timeRaceSeconds = document.getElementById("timeRaceSeconds").value;

    if (!isValidTime(timeRaceHours,timeRaceMinutes,timeRaceSeconds)) {
        return false;
    }

    return true;
}

function convertPaceFromSecondsToTime(paceSeconds) {
    var paceMinutes=Math.floor(paceSeconds/60);
    paceSeconds=paceSeconds%60;
    return ('0' + paceMinutes).slice(-2) + ":" + ('0' + paceSeconds).slice(-2);
}

function convertTimeFromSecondsToTime(timeSeconds) {
    var timeHours=Math.floor(timeSeconds/3600);
    timeSeconds=timeSeconds%3600;
    var timeMinutes=Math.floor(timeSeconds/60);
    timeSeconds=timeSeconds%60;
    return ('0' + timeHours).slice(-2) + ":" + ('0' + timeMinutes).slice(-2) + ":" + ('0' + timeSeconds).slice(-2);
}

function calculateTrainingPace() {
    if (isValidTrainingPaceForm()) {
        var distanceRace = document.getElementById("distanceRace");
        var distanceRaceValue = distanceRace.options[distanceRace.selectedIndex].value;

        var timeRaceHours = document.getElementById("timeRaceHours").value;
        var timeRaceMinutes = document.getElementById("timeRaceMinutes").value;
        var timeRaceSeconds = document.getElementById("timeRaceSeconds").value;

        timeRaceSeconds=Number(timeRaceSeconds)+Number(60*timeRaceMinutes)+Number(3600*timeRaceHours);
        //var paceSeconds=Math.floor(timeRaceSeconds/distanceRaceValue);

        var time10KSecondsValue;
        if (distanceRaceValue == "42.125")
            time10KSecondsValue=predictRaceTime(timeRaceSeconds,42.125,10);
        else if (distanceRaceValue == "21.0324")
            time10KSecondsValue=predictRaceTime(timeRaceSeconds,21.0324,10);
        else if (distanceRaceValue == "10")
            time10KSecondsValue=timeRaceSeconds;
        else
            time10KSecondsValue=predictRaceTime(timeRaceSeconds,5,10);
        var pace10KSecondsValue=Math.floor(time10KSecondsValue/10);


        var longRunValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue+60);
        var longRunValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue+50);
        var slowRunValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue+50);
        var slowRunValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue+45);
        var longFastRunValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue+40);
        var longFastRunValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue+30);
        // Tempo Run Start
        var steadyRunValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue+25);
        var steadyRunValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue+20);
        var tempoRunValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue+12);
        var tempoRunValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue+8);
        // Tempo Run End
        var intervalTrainingValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue-10);
        var intervalTrainingValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue-15);
        var longRepeatValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue+5);
        var longRepeatValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue);
        var mediumRepeatValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue-5);
        var mediumRepeatValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue-7);
        var shortRepeatValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue-15);
        var shortRepeatValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue-20);
        document.getElementById("trainingPaceTable").style.display="block";

        document.getElementById("longRunValue").innerHTML=longRunValueHigh + " - " + longRunValueLow;
        document.getElementById("slowRunValue").innerHTML=slowRunValueHigh + " - " + slowRunValueLow;
        document.getElementById("longFastRunValue").innerHTML=longFastRunValueHigh + " - " + longFastRunValueLow;
        document.getElementById("steadyRunValue").innerHTML=steadyRunValueHigh + " - " + steadyRunValueLow;
        document.getElementById("tempoRunValue").innerHTML=tempoRunValueHigh + " - " + tempoRunValueLow;
        document.getElementById("pace10KValue").innerHTML=convertPaceFromSecondsToTime(pace10KSecondsValue);
        document.getElementById("intervalTrainingValue").innerHTML=intervalTrainingValueHigh + " - " + intervalTrainingValueLow;
        document.getElementById("longRepeatValue").innerHTML=longRepeatValueHigh + " - " + longRepeatValueLow;
        document.getElementById("mediumRepeatValue").innerHTML=mediumRepeatValueHigh + " - " + mediumRepeatValueLow;
        document.getElementById("shortRepeatValue").innerHTML=shortRepeatValueHigh + " - " + shortRepeatValueLow;
        document.getElementById("estimatedThresholdPaceLabel").style.display="inline";
        document.getElementById("estimatedThresholdPaceValue").style.display="inline";
        document.getElementById("estimatedThresholdPaceValue").innerHTML=convertPaceFromSecondsToTime(pace10KSecondsValue);

    }
}

function isValidRacePredictorForm() {
    var distanceOldRace = document.getElementById("distanceOldRace").value;
    var distanceNewRace = document.getElementById("distanceNewRace").value;
    var timeHoursOldRace = document.getElementById("timeHoursOldRace").value;
    var timeMinutesOldRace = document.getElementById("timeMinutesOldRace").value;
    var timeSecondsOldRace = document.getElementById("timeSecondsOldRace").value;

    if (distanceOldRace == distanceNewRace) {
        alert("Old and New distance must be different");
        return false;
    }

    if (!isValidTime(timeHoursOldRace,timeMinutesOldRace,timeSecondsOldRace)) {
        return false;
    }

    return true;
}

function predictRaceTime(timeSeconds, distanceOldRace, distanceNewRace) {
    return Math.round(timeSeconds*Math.pow((distanceNewRace/distanceOldRace),1.06));
}

function calculateNewRaceTime() {
    if (isValidRacePredictorForm()) {
        var distanceOldRace = document.getElementById("distanceOldRace").value;
        var distanceNewRace = document.getElementById("distanceNewRace").value;
        var timeHoursOldRace = document.getElementById("timeHoursOldRace").value;
        var timeMinutesOldRace = document.getElementById("timeMinutesOldRace").value;
        var timeSecondsOldRace = document.getElementById("timeSecondsOldRace").value;

        timeSecondsOldRace=Number(timeSecondsOldRace)+Number(timeMinutesOldRace*60);
        timeSecondsOldRace=Number(timeSecondsOldRace)+Number(timeHoursOldRace*3600);

        var estimatedTimeNewRaceValue=predictRaceTime(timeSecondsOldRace, distanceOldRace, distanceNewRace);

        document.getElementById("estimatedTimeNewRaceLabel").style.display="inline";
        document.getElementById("estimatedTimeNewRaceValue").innerHTML=convertTimeFromSecondsToTime(estimatedTimeNewRaceValue);
        document.getElementById("estimatedTimeNewRaceValue").style.display="inline";
    }
}
