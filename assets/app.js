$(function(){

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
		
		function clear(){
			$('.name').val('');
			$('.destination').val('');
			$('.time').val('');
			$('.frequency').val('');
		}
		
		$("#submitButton").on("click", function(event) {
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
				var newTrain = {name:name, destination:destination, firstTrain:firstTrain, frequency:frequency}
				database.ref().push(newTrain);
	
			console.log(newTrain);
			clear();
		});
		database.ref().on('child_added', function(snapShot) {
			var data = snapShot.val();

			var firstTrain = $('.time').val().trim();
			console.log(firstTrain)

			var tFrequency = $('.frequency').val().trim();

			var tRemainder = diffTime % tFrequency;
		console.log(tRemainder);
			
			var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
		console.log(firstTrainConverted);

			var currentTime = moment();
			console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

			var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

			var minutesAway = moment().diff(moment(currentTime), 'minutes');
			console.log('child added', snapShot.val());

			var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		var tMinutesTillTrain = tFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

			var tbody = $('#currentTrain > tbody');
			var tr = $('<tr>');
			var tdName = $('<td>').text(data.name);
			var tdDestination = $('<td>').text(data.destination);
			var tdFrequency = $('<td>').text(currentTime);
			var tdArrival = $('<td>').text(tMinutesTillTrain);
			var tdMinutesAway = $('<td>').text(tMinutesTillTrain);
	
	
			$('<tr>').append(tdName, tdDestination, tdFrequency, tdArrival, tdMinutesAway);
			$('<tbody>').append(tr);
		});
	
	});
	