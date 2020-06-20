// day.js current date display
$("#current-date").text(dayjs(date).format("dddd MMMM D"));

var today = new Date();

var date =
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1) +
  "-" +
  today.getDate() +
  "-" +
  today.getHours();

console.log(dayjs(date).format("dddd MMMM D"));

var dayHour = dayjs(date).format("H");
console.log(dayHour);

$(document).ready(function () {
  var today = new Date();

  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    "-" +
    today.getHours();
  var dayHour = dayjs(date).format("H");

  if (dayHour > 4 && dayHour < 19) {
    $("#input-area").addClass("daytime-input");
    $("#output-container").addClass("daytime-output");
    $("#header").addClass("is-info");
  } else {
    $("#input-area").addClass("nighttime-input");
    $("#output-container").addClass("nighttime-output");
    $("#header").addClass("is-dark");
  }
});

// spoonacular
var recipeArray = [];

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

// test function
// async function getFiveRecipes(q) {
//   var queryURL =
//   "https://api.spoonacular.com/recipes/search?apiKey=87e8037ccabf458e93f0ac7bebbe6b75&number=1&query=" +
//   q,

//   var response = await $.ajax({
//     url: queryURL,
//     method: "GET",
//   });
//   var recipeDiv = $("<div  id='fiveDayForecast'>");
//   var forecastHeader = $("<h5 class='card-header border-secondary'>").text(
//     "Recipes: "
//   );
//   recipeDiv.append(forecastHeader);
//   var cardDeck = $("<div  class='card-deck'>");
//   recipeDiv.append(cardDeck);

//   for (i = 0; i < 5; i++) {
//     var forecastCard = $("<div class='card mb-3 mt-3'>");
//     var cardBody = $("<div class='card-body'>");
//     var date = new Date();
//     var val =
//     res.results[0].title;
//     var forecastDate = $("<h5 class='card-title'>").text(val);

//     cardBody.append(forecastDate);
//     var getRecipeImage = res.results[0].image;
//     console.log(getRecipeImage);
//     var displayWeatherIcon = $(
//       "<img src = http://openweathermap.org/img/wn/" +
//         getRecipeImage +
//         ".png />"
//     );
//     cardBody.append(displayWeatherIcon);
//     var getTemp = response.list[i].main.temp;
//     var tempEl = $("<p class='card-text'>").text("Temp: " + getTemp + "° F");
//     cardBody.append(tempEl);
//     var getHumidity = response.list[i].main.humidity;
//     var humidityEl = $("<p class='card-text'>").text(
//       "Humidity: " + getHumidity + "%"
//     );
//     cardBody.append(humidityEl);
//     forecastCard.append(cardBody);
//     cardDeck.append(forecastCard);
//   }
//   $("#forecastContainer").html(recipeDiv);
// }

// function getRecipe(q) {
//   $.ajax({
//     url:
//       "https://api.spoonacular.com/recipes/search?apiKey=87e8037ccabf458e93f0ac7bebbe6b75&number=1&query=" +
//       q,
//     success: function (res) {
//       for (i = 0; i < 5; i++) {
//       document.getElementById("output-area").append(
//         "<h1>" +
//         res.results[i].title +
//         "</h1><br><img src='" +
//         res.baseUri +
//         res.results[i].image +
//         "'width='400' /><br> ready in " +
//         res.results[i].readyInMinutes +
//         " minutes");
//       getsource(res.results[i].id);
//       }
//     },
//   });
// }
