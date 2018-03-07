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
    frequency = $(".time")
      .val()
      .trim();
    nextArrival = $(".frequency")
      .val()
			.trim();
			var newTrain = {name:name, destination:destination, frequency:frequency, nextArrival:nextArrival}
			database.ref().push(newTrain);

		console.log(newTrain);
		clearFields();
	});
	database.ref().on('child_added', function(snapShot) {
		var data = snapShot.val();
		var formattedTime = moment(data.time).format('HH:mm');
		var minutesAway = moment().diff(moment(formattedTime), 'minutes');
		console.log('child added', snapShot.val());
		var tbody = $('#currentTrain > tbody');
		var tr = $('<tr>');
		var tdName = $('<td>').text(data.name);
		var tdDestination = $('<td>').text(data.destination);
		var tdFrequency = $('<td>').text(formattedtime);
		var tdArrival = $('<td>').text(nextArrival);
		var tdMinutesAway = $('<td>').text(frequency - data.nextArrival);


		tr.append(tdName, tdDestination, tdFrequency, tdArrival, tdMinutesAway);
		tbody.append(tr);
	});

});

