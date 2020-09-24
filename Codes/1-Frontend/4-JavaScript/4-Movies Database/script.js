const movies = [
    {
        title: "Piku",
        hasWatched: true,
        rating: 4
    },
    {
        title: "A Beautiful Mind",
        hasWatched: true,
        rating: 5
    },
    {
        title: "In Bruges",
        hasWatched: false,
        rating: 5
    }
]

function buildString(movie){
    let result = "You have ";
    if(movie.hasWatched){
        result += "watched ";
    }
    else{
        result += "not seen ";
    }
    result += "\"" + movie.title + "\"" + " - " + movie.rating + " stars";
    return result;
}

movies.forEach(function(movie){
    result = buildString(movie);
    console.log(result);
});