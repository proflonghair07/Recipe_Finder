// $(".button").on("click", function () {
//   // Storing our giphy API URL for a random cat image
//   var queryURL =
//     "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";

//   // Perfoming an AJAX GET request to our queryURL
//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   })

//     // After the data from the AJAX request comes back
//     .then(function (response) {
//       // Saving the image_original_url property
//       var imageUrl = response.data.image_original_url;

//       // Creating and storing an image tag
//       var catImage = $("<img>");

//       // Setting the catImage src attribute to imageUrl
//       catImage.attr("src", imageUrl);
//       catImage.attr("alt", "cat image");

//       // Prepending the catImage to the images div
//       $(".output-area").prepend(catImage);
//     });
// });

$("#current-date").text(dayjs(date).format("dddd MMMM D"));

var today = new Date();

var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

console.log(dayjs(date).format("dddd MMMM D"));

// spoonacular
function getsource(id) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=87e8037ccabf458e93f0ac7bebbe6b75",
    success: function (res) {
      document.getElementById("source-link").innerHTML = res.sourceUrl;
      document.getElementById("source-link").href = res.sourceUrl;
    },
  });
}

function getRecipe(q) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/search?apiKey=87e8037ccabf458e93f0ac7bebbe6b75&number=1&query=" +
      q,
    success: function (res) {
      document.getElementById("output-area").innerHTML =
        "<h1>" +
        res.results[0].title +
        "</h1><br><img src='" +
        res.baseUri +
        res.results[0].image +
        "'width='400' /><br> ready in " +
        res.results[0].readyInMinutes +
        " minutes";
      getsource(res.results[0].id);
    },
  });
}
