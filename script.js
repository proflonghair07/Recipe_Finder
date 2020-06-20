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
    $("i").addClass("sun");
  } else {
    $("#input-area").addClass("nighttime-input");
    $("#output-container").addClass("nighttime-output");
    $("#header").addClass("is-dark");
    $(".label").addClass("nighttime-input");
    $("#theme-div").html("Night-time Theme <i class='far fa-moon'></i>");
    $("i").addClass("moon");
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
      "https://api.spoonacular.com/recipes/search?apiKey=87e8037ccabf458e93f0ac7bebbe6b75&number=5&query=" +
      q,
    success: function (res) {
      //delete previous content
      $("#output-area").empty();
      for (i = 0; i < 5; i++) {
        $("#output-area").append(
          "<h1>" +
            res.results[i].title +
            "</h1><br><img src='" +
            res.baseUri +
            res.results[i].image +
            "'width='400' /><br> ready in " +
            res.results[i].readyInMinutes +
            " minutes"
        );
        // getsource(res.results[i].id);
      }
    },
  });
}
