$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos);
});


const addTodos = function(todos) {
    //add todos to page here
    todos.forEach(todo => {
        let newTodo = $("<li class='task'>" + todo.name + todo.completed + "</li>");
        if(newTodo.completed) {
            newTodo.addClass("done");
        }
        $(".list").append(newTodo);
    });
}