$(function () {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDj8Fn1Nf3f9syxAimGVdLl1WHVRldcKiU",
		authDomain: "project-670e0.firebaseapp.com",
		databaseURL: "https://project-670e0.firebaseio.com",
		projectId: "project-670e0",
		storageBucket: "project-670e0.appspot.com",
		messagingSenderId: "338548428176"
	};
	firebase.initializeApp(config);
	var database = firebase.database();
	var name;
	var destination;
	var frequency;
	var nextArrival;
	var arrivalTime;

	function clear() {
		$('.name').val('');
		$('.destination').val('');
		$('.time').val('');
		$('.frequency').val('');
		return false;
	}

	$("#submitButton").on("click", function (event) {
		event.preventDefault();
		name = $(".name")
			.val()
			.trim();
		destination = $(".destination")
			.val()
			.trim();
		firstTrain = $(".time")
			.val()
			.trim();
		frequency = $(".frequency")
			.val()
			.trim();
		var newTrain = { name: name, destination: destination, firstTrain: firstTrain, frequency: frequency }
		database.ref().push(newTrain);

		console.log(newTrain);
		clear();
	});


	database.ref().on("child_added", function (childSnapshot, prevChildKey) {

		console.log(childSnapshot.val());


		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;

		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("HH:mm");


		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("HH:mm"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));


		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + timeRemainder + "</td></tr>");

	});

});
