const todos = [];
window.setTimeout(function(){
    let input = prompt("What would you like to do?");
    while(input !== "quit"){
        if(input === "list"){
            listTodos();
        }
        else if(input === "new"){
            addTodo();
        }
        else if(input === "delete"){
            deleteTodo();
        }
        input = prompt("What would you like to do?");
    }
    console.log("Ok, you quit the app!");
}, 500);

function listTodos(){
    console.log("*****");
    todos.forEach(function(todo, i){
        console.log(i + ": " + todo);
    });
    console.log("*****")
}

function addTodo(){
    const newTodo = prompt("Add task");
    todos.push(newTodo);
    console.log("Added Todo");
}

function deleteTodo(){
    const index = prompt("Enter index of todo you want to delete?");
    todos.splice(index, 1);
    console.log("Deleted Todo");
}