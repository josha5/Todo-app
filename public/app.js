$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos);
       
    $('#todoInput').keypress(function(event){
        if(event.which == 13) {
        createTodo();
        }
    });

    $(".list").on("click", "li", function() {
        updateTodo($(this));
    });

    // listening for click on list after span is loaded.
    $('.list').on('click', 'span', function(e){
        // Stops the event from bubbling up 
        e.stopPropagation();
        removeTodo($(this).parent());
    });
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
    newTodo.data("completed", todo.completed);
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

const removeTodo = function(todo){
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId; 
    $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .then(function(data){
        console.log(data);
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    })
}

const updateTodo = function(todo) {
    let updateUrl = '/api/todos/' + todo.data("id");
    let isDone = !todo.data("completed");
    let updateData = {completed: isDone}
    console.log(updateData);
    $.ajax({
        method: "PUT",
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo) {
        todo.toggleClass("done");
        todo.data("completed", isDone);
    })
}
