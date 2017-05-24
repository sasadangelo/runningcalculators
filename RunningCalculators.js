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
	//document.getElementById("zone5label").style.display="none";
	//document.getElementById("zone4label").style.display="none";
	//document.getElementById("zone3label").style.display="none";
	//document.getElementById("zone2label").style.display="none";
	//document.getElementById("zone1label").style.display="none";

	//document.getElementById("zone5value").style.display="none";
	//document.getElementById("zone4value").style.display="none";
	//document.getElementById("zone3value").style.display="none";
	//document.getElementById("zone2value").style.display="none";
	//document.getElementById("zone1value").style.display="none";
	document.getElementById("zoneTable").style.display="none";
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
            alert("Max Heart Rate must be a number");
            return false;
        }
	} else {
        if (age == "") {
            alert("Age must be filled out");
            return false;
        }
        if (isNaN(age)) {
            alert("Age must be a number");
            return false;
        }
	}

    if (restHeartRate == "") {
        alert("Rest Heart Rate must be filled out");
        return false;
    }

    if (isNaN(restHeartRate)) {
        alert("Rest Heart Rate must be a number");
        return false;
    }

    return true;
}

function calculateTrainingZone() {
    if (isValidTrainingZoneForm()) {
        var maxHeartRate;
        if (isknowMaxHeartRate=="Yes") {
            maxHeartRate = document.getElementById("maxHeartRate").value;
 		} else {
		    var age = document.getElementById("age").value;
            maxHeartRate = 220-age;
		}
        var restHeartRate = document.getElementById("restHeartRate").value;
		var reserveHeartRate=maxHeartRate-restHeartRate;

		var zone5HeartRate=Math.round(Number(restHeartRate)+Number(reserveHeartRate*90/100));
		var zone4HeartRate=Math.round(Number(restHeartRate)+Number(reserveHeartRate*80/100));
		var zone3HeartRate=Math.round(Number(restHeartRate)+Number(reserveHeartRate*70/100));
		var zone2HeartRate=Math.round(Number(restHeartRate)+Number(reserveHeartRate*60/100));
		var zone1HeartRate=Math.round(Number(restHeartRate)+Number(reserveHeartRate*50/100));

		//document.getElementById("zone5label").style.display="inline";
	    //document.getElementById("zone4label").style.display="inline";
	    //document.getElementById("zone3label").style.display="inline";
	    //document.getElementById("zone2label").style.display="inline";
	    //document.getElementById("zone1label").style.display="inline";

	    document.getElementById("zone5value").innerHTML=zone5HeartRate + " - " + maxHeartRate;
	    document.getElementById("zone4value").innerHTML=zone4HeartRate + " - " + zone5HeartRate;
	    document.getElementById("zone3value").innerHTML=zone3HeartRate + " - " + zone4HeartRate;
	    document.getElementById("zone2value").innerHTML=zone2HeartRate + " - " + zone3HeartRate;
	    document.getElementById("zone1value").innerHTML=zone1HeartRate + " - " + zone2HeartRate;

		//document.getElementById("zone5value").style.display="inline";
	    //document.getElementById("zone4value").style.display="inline";
	    //document.getElementById("zone3value").style.display="inline";
	    //document.getElementById("zone2value").style.display="inline";
	    //document.getElementById("zone1value").style.display="inline";
		document.getElementById("zoneTable").style.display="block";
	}
}

function isValidPaceCalculatorForm(formType) {
    if (formType == "time") {
        var distance = document.getElementById("distance").value;
        var paceMinutes = document.getElementById("paceMinutes").value;
        var paceSeconds = document.getElementById("paceSeconds").value;

        if (distance == "") {
            alert("Distance must be filled out");
            return false;
        }

        if (isNaN(distance)) {
            alert("Distance must be a number");
            return false;
        }

        if (paceMinutes == "" && paceSeconds == "") {
            alert("Pace must be filled out");
            return false;
        }

        if (paceMinutes == "") {
            paceMinutes=0;
        }

        if (paceSeconds == "") {
            paceSeconds=0;
        }

        if (isNaN(paceMinutes) || isNaN(paceSeconds)) {
            alert("Pace must be a time");
            return false;
        }
    } else if (formType == "distance") {
        var timeHours = document.getElementById("timeHours").value;
        var timeMinutes = document.getElementById("timeMinutes").value;
        var timeSeconds = document.getElementById("timeSeconds").value;
        var paceMinutes = document.getElementById("paceMinutes").value;
        var paceSeconds = document.getElementById("paceSeconds").value;

        if (timeHours == "" && timeMinutes == "" && timeSeconds == "") {
            alert("Time must be filled out");
            return false;
        }

        if (isNaN(timeHours) || isNaN(timeMinutes) || isNaN(timeSeconds)) {
            alert("Time must be a time");
            return false;
        }

        if (paceMinutes == "" && paceSeconds == "") {
            alert("Pace must be filled out");
            return false;
        }

        if (isNaN(paceMinutes) || isNaN(paceSeconds)) {
            alert("Pace must be a time");
            return false;
        }
	} else if (formType == "pace") {
        var distance = document.getElementById("distance").value;
        var timeHours = document.getElementById("timeHours").value;
        var timeMinutes = document.getElementById("timeMinutes").value;
        var timeSeconds = document.getElementById("timeSeconds").value;

        if (distance == "") {
            alert("Distance must be filled out");
            return false;
        }

        if (isNaN(distance)) {
            alert("Distance must be a number");
            return false;
        }

        if (timeHours == "" && timeMinutes == "" && timeSeconds == "") {
            alert("Time must be filled out");
            return false;
        }

        if (isNaN(timeHours) || isNaN(timeMinutes) || isNaN(timeSeconds)) {
            alert("Time must be a time");
            return false;
        }
	}

    return true;
}

function isValidBodyMassIndexForm() {
	var weight = document.getElementById("weight").value;
	var height = document.getElementById("height").value;

	if (weight == "") {
		alert("Weight must be filled out");
		return false;
	}

	if (isNaN(weight)) {
		alert("Weight must be a number");
		return false;
	}

	if (height == "") {
		alert("Height must be filled out");
		return false;
	}

	if (isNaN(height)) {
		alert("Height must be a number");
		return false;
	}

    if (weight == "") {
        weight=0;
    }

    if (height == "") {
        height=0;
    }

    return true;
}

function calculateTime() {
    if (isValidPaceCalculatorForm("time")) {
        var distance = document.getElementById("distance").value;
        var distanceUnit = document.getElementById("distanceUnit");
		var distanceUnitValue = distanceUnit.options[distanceUnit.selectedIndex].value;
        var paceMinutes = document.getElementById("paceMinutes").value;
        var paceSeconds = document.getElementById("paceSeconds").value;
        var paceUnit = document.getElementById("paceUnit");
		var paceUnitValue = paceUnit.options[paceUnit.selectedIndex].value;

		paceSeconds=Number(paceSeconds)+Number(paceMinutes*60);
		if (distanceUnitValue=="Miles" && paceUnitValue=="min/Km") {
		    distance=distance*1.609344;
	    } else if (distanceUnitValue=="Km" && paceUnitValue=="min/Miles") {
		    distance=distance/1.609344;
	    }

		var timeSeconds=paceSeconds*distance;
		var timeHours=Math.floor(timeSeconds/3600);
		timeSeconds=timeSeconds%3600;
		var timeMinutes=Math.floor(timeSeconds/60);
		timeSeconds=timeSeconds%60;

		document.getElementById("timeHours").value=timeHours;
	    document.getElementById("timeMinutes").value=timeMinutes;
	    document.getElementById("timeSeconds").value=timeSeconds;
	}
}

function calculateDistance() {
    if (isValidPaceCalculatorForm("distance")) {
        var distanceUnit = document.getElementById("distanceUnit");
		var distanceUnitValue = distanceUnit.options[distanceUnit.selectedIndex].value;
        var timeHours = document.getElementById("timeHours").value;
        var timeMinutes = document.getElementById("timeMinutes").value;
        var timeSeconds = document.getElementById("timeSeconds").value;
        var paceMinutes = document.getElementById("paceMinutes").value;
        var paceSeconds = document.getElementById("paceSeconds").value;
        var paceUnit = document.getElementById("paceUnit");
		var paceUnitValue = paceUnit.options[paceUnit.selectedIndex].value;

		timeSeconds=Number(timeSeconds)+Number(timeMinutes*60)+Number(timeHours*3600);
		paceSeconds=Number(paceSeconds)+Number(paceMinutes*60);
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
		paceSeconds=paceSeconds%3600;
		var paceMinutes=Math.floor(paceSeconds/60);
		paceSeconds=paceSeconds%60;

	    document.getElementById("paceMinutes").value=paceMinutes;
	    document.getElementById("paceSeconds").value=paceSeconds;
	}
}

function calculateBodyMassIndex() {
    if (isValidBodyMassIndexForm()) {
        var weight = document.getElementById("weight").value;
        var height = document.getElementById("height").value;
        var bodyMassIndex=weight/Math.pow(height/100,2);

		document.getElementById("bodyMassIndex").value=bodyMassIndex.toFixed(2);
	}
}

function isValidBodyFatForm() {
	var height = document.getElementById("height").value;
	var neck = document.getElementById("neck").value;
	var waist = document.getElementById("waist").value;
	var hip = document.getElementById("hip").value;

	if (height == "") {
		alert("Height must be filled out");
		return false;
	}

	if (isNaN(height)) {
		alert("Height must be a number");
		return false;
	}

    if (height == "") {
        height=0;
    }

	if (neck == "") {
		alert("Neck must be filled out");
		return false;
	}

	if (isNaN(neck)) {
		alert("Neck must be a number");
		return false;
	}


    if (neck == "") {
        neck=0;
    }

	if (waist == "") {
		alert("Waist must be filled out");
		return false;
	}

	if (isNaN(waist)) {
		alert("Waist must be a number");
		return false;
	}


    if (waist == "") {
        waist=0;
    }

	if (hip == "") {
		alert("Hip must be filled out");
		return false;
	}

	if (isNaN(hip)) {
		alert("Hip must be a number");
		return false;
	}

    if (hip == "") {
        hip=0;
    }

    return true;
}

function calculateBodyFat() {
    if (isValidBodyFatForm()) {
        var height = document.getElementById("height").value;
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

		document.getElementById("bodyFat").value=bodyFat.toFixed(2);
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

	if (timeRaceHours == "" && timeRaceMinutes == "" && timeRaceSeconds == "") {
		alert("Time must be filled out");
		return false;
	}

	if (timeRaceHours == "") {
		timeRaceHours=0;
	}

	if (timeRaceMinutes == "") {
		timeRaceMinutes=0;
	}

	if (timeRaceSeconds == "") {
		timeRaceSeconds=0;
	}

	if (isNaN(timeRaceHours) || isNaN(timeRaceMinutes) || isNaN(timeRaceSeconds)) {
		alert("Time must be a valid time");
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
		var paceSeconds=Math.floor(timeRaceSeconds/distanceRaceValue);

		var pace10KSecondsValue;
		if (distanceRaceValue == "42.125")
		    pace10KSecondsValue=predictRaceTime(paceSeconds,42.125,10);
	    else if (distanceRaceValue == "21.0324")
		    pace10KSecondsValue=predictRaceTime(paceSeconds,21.0324,10);
	    else if (distanceRaceValue == "10")
		    pace10KSecondsValue=paceSeconds;
	    else
		    pace10KSecondsValue=predictRaceTime(paceSeconds,5,10);;

		var longRunValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue+60);
		var longRunValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue+50);
		var slowRunValueLow=convertPaceFromSecondsToTime(pace10KSecondsValue+50);
		var slowRunValueHigh=convertPaceFromSecondsToTime(pace10KSecondsValue+45);
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

		//document.getElementById("longRunLabel").style.display="block";
		//document.getElementById("slowRunLabel").style.display="block";
		//document.getElementById("steadyRunLabel").style.display="block";
		//document.getElementById("tempoRunLabel").style.display="block";
		//document.getElementById("pace10KLabel").style.display="block";
		//document.getElementById("intervalTrainingLabel").style.display="block";
		//document.getElementById("longRepeatLabel").style.display="block";
		//document.getElementById("mediumRepeatLabel").style.display="block";
		//document.getElementById("shortRepeatLabel").style.display="block";
		document.getElementById("trainingPaceTable").style.display="block";

		document.getElementById("longRunValue").innerHTML=longRunValueHigh + " - " + longRunValueLow;
		document.getElementById("slowRunValue").innerHTML=slowRunValueHigh + " - " + slowRunValueLow;
		document.getElementById("steadyRunValue").innerHTML=steadyRunValueHigh + " - " + steadyRunValueLow;
		document.getElementById("tempoRunValue").innerHTML=tempoRunValueHigh + " - " + tempoRunValueLow;
		document.getElementById("pace10KValue").innerHTML=convertPaceFromSecondsToTime(pace10KSecondsValue);
		document.getElementById("intervalTrainingValue").innerHTML=intervalTrainingValueHigh + " - " + intervalTrainingValueLow;
		document.getElementById("longRepeatValue").innerHTML=longRepeatValueHigh + " - " + longRepeatValueLow;
		document.getElementById("mediumRepeatValue").innerHTML=mediumRepeatValueHigh + " - " + mediumRepeatValueLow;
		document.getElementById("shortRepeatValue").innerHTML=shortRepeatValueHigh + " - " + shortRepeatValueLow;

		//document.getElementById("longRunValue").style.display="block";
		//document.getElementById("slowRunValue").style.display="block";
		//document.getElementById("tempoRunValue").style.display="block";
		//document.getElementById("pace10KValue").style.display="block";
		//document.getElementById("intervalTrainingValue").style.display="block";
		//document.getElementById("repeatValue").style.display="block";
    }
}

function isValidRacePredictorForm() {
    var distanceOldRace = document.getElementById("distanceOldRace").value;
    var distanceNewRace = document.getElementById("distanceNewRace").value;
	var timeHoursOldRace = document.getElementById("timeHoursOldRace").value;
	var timeMinutesOldRace = document.getElementById("timeMinutesOldRace").value;
	var timeSecondsOldRace = document.getElementById("timeSecondsOldRace").value;

	if (distanceOldRace == "") {
	    alert("Distance old race must be filled out");
	    return false;
	}

	if (isNaN(distanceOldRace)) {
	    alert("Distance old race must be a number");
	    return false;
	}

	if (distanceNewRace == "") {
		alert("Distance new race must be filled out");
		return false;
	}

	if (isNaN(distanceNewRace)) {
		alert("Distance new race must be a number");
		return false;
	}

	if (distanceOldRace == distanceNewRace) {
		alert("Old and New distance must be different");
		return false;
	}

	if (timeHoursOldRace == "" && timeMinutesOldRace == "" && timeSecondsOldRace == "") {
		alert("Time old race must be filled out");
		return false;
	}

	if (isNaN(timeHoursOldRace) || isNaN(timeMinutesOldRace) || isNaN(timeSecondsOldRace)) {
		alert("Time old race must be a time");
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
