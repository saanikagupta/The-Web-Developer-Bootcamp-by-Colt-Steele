// Check off specific todos by clicking
// Using .on() as lis may or may not be on the page at the time of page load, but ul will be
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});

// Click on X to delete todo
// Using .on() as spans may or may not be on the page at the time of page load, but ul will be
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        // Grabbing new todo text from input
        const todoText = $(this).val();
        $(this).val("");
        // Creating new li and append it to ul
        // Make sure that the quotes don't interfere
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
    }
});

$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
});