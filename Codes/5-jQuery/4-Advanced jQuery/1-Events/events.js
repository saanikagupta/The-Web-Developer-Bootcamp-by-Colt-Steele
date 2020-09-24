// .click()
$("h1").first().click(function(){
    alert("h1 clicked!");
});

$("button").click(function(){
    const text = $(this).text();
    console.log("You clicked " + text);
    $(this).css("background", "pink"); // this has to be wrapped inside $() because .css works on jQuery objects
});

// .keypress()
$('input[type="text"]').keypress(function(event){
    if(event.which === 13){
        alert("Why did you hit enter?!");
    }
});

//' .on()
$("h1").on("click", function(){
    $(this).css("color", "purple");
})

$("input").on("keypress", function(){
    console.log("Keypressed!");
})

$("button").on("mouseenter", function(){
    console.log("Mouse Enter!");
    $(this).css("fontWeight", "bold");
});

$("button").on("mouseleave", function(){
    console.log("Mouse Enter!");
    $(this).css("fontWeight", "normal");
});