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

// Daytime and Night-time themes.  Checks current hour and displays daytime theme if it is after four in the morning and before seven at night.
// This function also hides the link-output-title div
$(document).ready(function () {
  var dayHour = dayjs(date).format("H");
  $("#link-output-title").hide();
  if (dayHour > 4 && dayHour < 19) {
    $("#input-area").addClass("daytime-input");
    $("#output-container").addClass("daytime-output");
    $("#header").addClass("is-light");
    $("#theme-div").html("Day-time Theme <i class='far fa-sun'></i>");
    $("i").addClass("sun");
  } else {
    $("#input-area").addClass("nighttime-input");
    $("#output-container").addClass("nighttime-output");
    $("#header").addClass("is-light");
    $(".label").addClass("nighttime-input");
    $("#theme-div").html("Night-time Theme <i class='far fa-moon'></i>");
    $("i").addClass("moon");
  }
});

// Holiday api.  Prints current holiday to the to the header.
$.ajax({
  // noticed the day of our presentation had zero results but code commented out starting on line 49 is fully functioning.  If line 48 is commented out and lines forty-nine through 51 are uncommented code works properly.
  url:
    "https://holidayapi.com/v1/holidays?pretty&key=8e5ba886-1035-4c5a-82aa-5d5d05dfef45&country=US&year=" +
    2019 +
    "&month=" +
    "6&day=27",
  // dayjs(date).format("MM") +
  // "&day=" +
  // dayjs(date).format("D"),
  method: "GET",
}).then(function (response) {
  console.log(response.holidays[0].name);
  $("#current-holiday").text("Happy " + response.holidays[0].name + "!");
});

// Spoonacular api functionality
// Gets the links and appends the to the link-output div
function getsource(id) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=87e8037ccabf458e93f0ac7bebbe6b75",
    success: function (res) {
      $("#link-output-title").show(500);
      $("#link-output").slideDown(800);
      $("#link-output").append(
        "<a href='" +
          res.sourceUrl +
          "' target='_blank'>" +
          res.title +
          "</a><br>"
      );
    },
  });
}

// Gets the recipes from Spoonacular api and appends five results to the output-are div using a for loop
// Conditionals listen the checkboxes and filter results accordingly
function getRecipe(q) {
  // Only vegan is checked
  if ($("#vegan").is(":checked") && $("#gluten-free").not(":checked")) {
    $.ajax({
      url:
        "https://api.spoonacular.com/recipes/search?apiKey=87e8037ccabf458e93f0ac7bebbe6b75&number=50&diet=vegan&query=" +
        q,

      success: function (res) {
        //delete previous content
        $("#link-output").empty();
        $("#output-area").empty();
        for (i = 0; i < 5; i++) {
          $("#output-area").append(
            "<div class='card'><h1>" +
              res.results[i].title +
              "</h1><br><img src='" +
              res.baseUri +
              res.results[i].image +
              "'width='200'height='200' /><br>Cook time: " +
              res.results[i].readyInMinutes +
              " minutes<br>" +
              "Vegan" +
              "</div>"
          );
          getsource(res.results[i].id);
          console.log(res.results);
        }
      },
    });
  }
  // Only gluten-free is checked
  else if ($("#gluten-free").is(":checked") && $("#vegan").not(":checked")) {
    $.ajax({
      url:
        "https://api.spoonacular.com/recipes/search?apiKey=87e8037ccabf458e93f0ac7bebbe6b75&number=50&intolerances=gluten&query=" +
        q,

      success: function (res) {
        //delete previous content
        $("#link-output").empty();
        $("#output-area").empty();
        for (i = 0; i < 5; i++) {
          $("#output-area").append(
            "<div class='card'><h1>" +
              res.results[i].title +
              "</h1><br><img src='" +
              res.baseUri +
              res.results[i].image +
              "'width='200'height='200' /><br>Cook time: " +
              res.results[i].readyInMinutes +
              " minutes<br>" +
              "Gluten Free" +
              "</div>"
          );
          getsource(res.results[i].id);
          console.log(res.results);
        }
      },
    });
  }
  //Vegan and gluten-free are checked (not working properly)
  else if ($("#vegan").is(":checked") && $("#gluten-free").is(":checked")) {
    $.ajax({
      url:
        "https://api.spoonacular.com/recipes/search?apiKey=87e8037ccabf458e93f0ac7bebbe6b75&number=50&intolerances=gluten&diet=vegan&query=" +
        q,

      success: function (res) {
        //delete previous content
        $("#link-output").empty();
        $("#output-area").empty();
        for (i = 0; i < 5; i++) {
          $("#output-area").append(
            "<div class='card'><h1>" +
              res.results[i].title +
              "</h1><br><img src='" +
              res.baseUri +
              res.results[i].image +
              "'width='200'height='200' /><br>Cook time: " +
              res.results[i].readyInMinutes +
              " minutes<br>" +
              "Vegan and Gluten Free" +
              "</div>"
          );
          getsource(res.results[i].id);
          console.log(res.results);
        }
      },
    });
  }
  // Neither vegan or gluten-free are checked
  else
    $.ajax({
      url:
        "https://api.spoonacular.com/recipes/search?apiKey=87e8037ccabf458e93f0ac7bebbe6b75&number=50&query=" +
        q,

      success: function (res) {
        //delete previous content
        $("#link-output").empty();
        $("#output-area").empty();
        for (i = 0; i < 5; i++) {
          $("#output-area").append(
            "<div class='card'><h1>" +
              res.results[i].title +
              "</h1><br><img src='" +
              res.baseUri +
              res.results[i].image +
              "'width='200'height='200' /><br>Cook time: " +
              res.results[i].readyInMinutes +
              " minutes<br></div>"
          );
          getsource(res.results[i].id);
          console.log(res.results);
        }
      },
    });
  $("#link-output").slideDown(1000);
}
