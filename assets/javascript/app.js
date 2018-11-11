var topics = ["EXO", "TWICE", "BTS", "Hyuna", "Sistar", "Monsta X", "iKON", "SNSD", "Big Bang", "Blackpink", "Mamamoo"];

function renderButtons() {
	$("#buttonsArea").empty(); // empties the buttonsArea div, avoids duplicates

	// make button with attributes for every item in the topics array
	for (var i = 0; i < topics.length; i++) {
		var button = $("<button>");
		button.html(topics[i]);
		button.addClass("btn btn-outline-secondary");
		button.attr("id", "topic-btn");
		button.attr("topic-title", topics[i]);
		$("#buttonsArea").append(button);
	}
}

function displayGifs() {
	var thisIdol = $(this).attr("topic-title");
	console.log(thisIdol);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisIdol + "&api_key=dc6zaTOxFJmzC&limit=10";

	// ajax call, return response object
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		var response = response.data;

		// div containing a still image gif and rating info 
		for (var i = 0; i < response.length; i++) {
			var gifDiv = $("<div>");
			gifDiv.addClass("gifDiv");

			var rating = response[i].rating;
			var p = $("<p>").html("Rating: " + rating);
			p.addClass("text-center");

			var gifImage = $("<img>");
			gifImage.addClass("gif");
			gifImage.attr("src", response[i].images.fixed_height_still.url);
			gifImage.attr("data-still", response[i].images.fixed_height_still.url);
			gifImage.attr("data-animate", response[i].images.fixed_height.url);
			gifImage.attr("data-state", "still");

			// image and the rating text go in the gifDiv
			gifDiv.append(p);
			gifDiv.prepend(gifImage);

			// gifDiv from before gets pushed for next button clicked
			$("#mainArea").prepend(gifDiv);
		}
	});
}

// when the submit button is clicked, the input value is pushed to the topics array and rendered into a new button
$("#submit-btn").on("click", function(event) {
	event.preventDefault();

	var newIdol = $("#userInput").val().trim();
	topics.push(newIdol);
	renderButtons();
});

// click of any button with an id of topic-btn, then performs function, displayGifs
$(document).on("click", "#topic-btn", displayGifs);

// starts and stops the animated gif on click
$(document).on("click", ".gif", function() {
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

renderButtons();