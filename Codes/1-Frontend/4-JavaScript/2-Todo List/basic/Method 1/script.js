const todos = [];
window.setTimeout(function(){
    let input = prompt("What would you like to do?");
    while(input !== "quit"){
        if(input === "list"){
            console.log(todos);
        }
        else if(input === "new"){
            let newTodo = prompt("Add task");
            todos.push(newTodo);
        }
        input = prompt("What would you like to do?");
    }
    console.log("Ok, you quit the app!");
}, 500);