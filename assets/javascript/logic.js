$(document).ready(function () {
// Some Global Variables
//===============================================================================
    // An array of emotions, new emotions will be pushed into this array;
    var emotions = ["Anxious", "Amused", "Happy", "Angry", "Embarrassed", "Excited", "Rage", "Frustrated", "Surprised", "Joy", "Bored", "Overwhelmed", "Delighted"];
   
// Functions & Methods
//===============================================================================
    // Function to display gif buttons
    function renderButtons() {
        $("#gifViewBtns").empty(); // preventing duplication of buttons
        for (var i = 0; i < emotions.length; i++) {

            var gifButton = $("<button>");

            gifButton.addClass("emotion");

            gifButton.addClass("btn btn-primary")

            gifButton.attr("data-name", emotions[i]);

            gifButton.text(emotions[i]);

            $("#gifViewBtns").append(gifButton);
        }
    }

    // Function to add a new emotion button
    function addNewButton() {

        $("#addGif").on("click", function (event) {

            // preventDefault method to prevent form from trying to submitting itself
            event.preventDefault();

            var emotion = $("#gifInput").val().trim();
            
            // Prevent blank submissions
            if (emotion == "") {
                return false; 
            }

            // Push submitted emotion into the emotions array
            emotions.push(emotion);

            // Render all the buttons to display new emotion button
            renderButtons();
            return false;
        });
    }

    // Function to display gifs
    function displayGifs() {

        var emotion = $(this).attr("data-name");

        var apiKey = "Y08vgdF8HEooiBjRD7gnRLgQgaoL87uP";

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&apiKey=" + apiKey + "&limit=10";

        // AJAX call to the API
        $.ajax({

            url: queryURL,

            method: "GET"

        }).then(function(response) {

                    // Erase div contents from previous click
                    $("#gifsHome").empty(); 

                    // Alert user if no gifs are available for chosen word
                    if (response.data == "") {
                        alert("Oops! No gifs for this button! Sorry!");
                    }

                    for (var i = 0; i < response.data.length; i++) {

                        // Create a div to hold an individual GIF
                        var gifDiv = $("<div class='gifDiv'>");

                        // Variable to store rating data and create a p element for it
                        var gifRating = $("<p>").text("Rating: " + response.data[i].rating);

                        // Append the rating p element to the gifDiv
                        gifDiv.append(gifRating);

                        // Create img element and store it in gifImage variable 
                        var gifImage = $("<img>");
                        
                        // Access the response object and add attributes to the img element
                        gifImage.attr("src", response.data[i].images.fixed_height_still.url); // set still image url as src
                         
                        gifImage.attr("data-still", response.data[i].images.fixed_height_still.url); // still image

                        gifImage.attr("data-animate", response.data[i].images.fixed_height.url); // animated image

                        gifImage.attr("data-state", "still"); // set the image state

                        // add image class to img element
                        gifImage.addClass("image");

                        // append still image to gifDiv
                        gifDiv.append(gifImage);

                        // add div of GIFs to gifsHome div
                        $("#gifsHome").prepend(gifDiv);
                    };
                });
        }
// Functions & Methods Calls
//==============================================================================

// Display buttons of emotions
renderButtons(); 

// Add new button for submitted emotion
addNewButton();

// Document Event Listeners
$(".emotion").on("click", displayGifs);
$(document).on("click", ".image", function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
    });