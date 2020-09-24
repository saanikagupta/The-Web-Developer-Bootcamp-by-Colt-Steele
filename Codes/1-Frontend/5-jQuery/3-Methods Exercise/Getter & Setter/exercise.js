// $("li").text("Cadbury rocks!");

// $("ul").html("<li>I hacked your UL!</li><li>Rusty is adorable!!</li>");
// $("li").html("Updated all the lis")


// .css()
$("img").css("width", "200px");

// .attr()
// $("img").attr("src", "https://i.insider.com/58b6f4b3c32d6bfe288b4c4e?width=1100&format=jpeg&auto=webp");
$("img").last().attr("src", "https://i.insider.com/58b6f4b3c32d6bfe288b4c4e?width=1100&format=jpeg&auto=webp");
// $("input").attr("type", "color");


// .val() - works for all inputs and dropdowns
console.log($("input").val()); // getter
$("input").val("Rusty Steele"); // setter
console.log($("select").val());
