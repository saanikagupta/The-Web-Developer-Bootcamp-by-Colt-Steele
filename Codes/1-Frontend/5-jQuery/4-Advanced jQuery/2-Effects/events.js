// $("button").on("click", function(){
//     $("div").fadeOut(1000, function(){
//         // fade-out is only hiding them, not deleting or removing them from the page
//         console.log("Fade Completed!");
//         $(this).remove();
//         console.log("Divs removed!");
//     });
// });

$("button").on("click", function(){
    $("div").slideToggle(1000);
});