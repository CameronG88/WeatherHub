
$(".btn").on("click", function (event) {
    event.preventDefault();

    var city = $("#searchInput").val();


    console.log(searchInput);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ca038625d5f7b3e933a9e341521a44d3";

    var today = new Date();

    var date = (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
    console.log(date);
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(queryURL);

            console.log(response);


            var newLi = $("<li>");

            newLi.text(city);
            newLi.addClass("list-group-item searchItem");
            $("#searchHistory").prepend(newLi);

            $("#cityView").text(response.name);
            $("#dateView").text(date);

            $("#temp").text("Temperature(F): " + Math.ceil(((response.main.temp * 9) / 5 - 459.67)));
            $("#humid").text("Humidity: " + response.main.humidity + "%");
            $("#windSpeed").text("Wind Speed: " + response.wind.speed + "mph");
            var lon = response.coord['lon'];
            var lat = response.coord['lat'];

            getUV(lat, lon)
            getForecast(city);
        });



});
function getUV(lat, lon) {
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=ca038625d5f7b3e933a9e341521a44d3&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: uvURL,
        method: "Get"
    })
        .then(function (response) {



            $("#uvIndex").text("Uv Index: " + response.value);
        })
}

function getForecast(city) {
    var foreURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ca038625d5f7b3e933a9e341521a44d3";
    $.ajax({
        url: foreURL,
        method: "Get"
    })

        .then(function (response) {
            for (let index = 4; index < response.list.length; index += 8)  {
                var newCol = $("<div>");
                newCol.addClass("col");
                newCol.text(response.list[index]);
                $("#forecastDiv").append(newCol);

            }
            console.log(response);
        })
}



