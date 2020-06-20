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
    $("#theme-div").html("Day-time Theme <i class='far fa-sun'></i>");
  } else {
    $("#input-area").addClass("nighttime-input");
    $("#output-container").addClass("nighttime-output");
    $("#header").addClass("is-dark");
    $(".label").addClass("nighttime-input");
    $("#theme-div").html("Night-time Theme <i class='far fa-moon'></i>");
  }
});

// holiday api
$.ajax({
  url:
    "https://holidayapi.com/v1/holidays?pretty&key=8e5ba886-1035-4c5a-82aa-5d5d05dfef45&country=US&year=" +
    2019 +
    "&month=" +
    dayjs(date).format("MM") +
    "&day=" +
    dayjs(date).format("D"),
  method: "GET",
}).then(function (response) {
  console.log(response.holidays[0].name);
  $("#current-holiday").text("Happy " + response.holidays[0].name + "!");
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
