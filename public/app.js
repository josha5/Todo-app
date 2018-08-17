$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos);
       
    $('#todoInput').keypress(function(event){
        if(event.which == 13) {
        createTodo();
        }
    });

    // listening for click on list after span is loaded.
    $(".list").on("click", "span", function() {
        console.log($(this).parent().data("id"));
        // $(this).parent().remove();
        // $.ajax({
        //     method: "DELETE",
        //     url: "/api/todos/"
        // })
    })
});


const addTodos = function(todos) {
    //add todos to page here
    todos.forEach(todo => {
      addTodo(todo);
    });
}

const addTodo = function(todo) {
    let newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
    newTodo.data("id", todo._id);
    if(todo.completed) {
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

const createTodo = function() {
    let userInput = $("#todoInput").val();
    $.post("/api/todos", {name: userInput})
    .then(function(newTodo) {
        $("#todoInput").val("");
        addTodo(newTodo);
    })
    .catch(function(err) {
        console.log(err);
    })
}
