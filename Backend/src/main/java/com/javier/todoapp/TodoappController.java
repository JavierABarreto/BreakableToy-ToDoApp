package com.javier.todoapp;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

import com.javier.todoapp.todo.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class TodoappController {
  ArrayList<Todo> todosArray = new ArrayList<Todo>();

  @GetMapping("/")
  public String index() {
    return "Welcome to Javier's todo API";
  }

  @GetMapping("/todos")
  public ArrayList<Todo> getTodos(){
    return todosArray;
  }

  @PostMapping("/todos")
  public String postMethod(@RequestBody NewTodoRequest request) {
    if (request.text() != "" && request.priority() != "") {
      Todo todo = new Todo(request.id(), request.text(), request.dueDate(), request.status(), request.doneDate(), request.priority(), request.creationDate());
      todosArray.add(todo);

      return "New ToDo has been added successfuly";
    } else {
      return "Please, make sure that all required fields are filled.";
    }
  }

  @PutMapping("/todos/{id}")
  public String putMethod(@PathVariable int id, @RequestBody NewTodoRequest request) {
    Todo todo = new Todo(0, null, null, null, null, null, null);
    int index = 0;

    for (int i = 0; i < todosArray.size(); i++) {
      Todo tempTodo = todosArray.get(i);

      if (tempTodo.getId() == request.id()) {
        todo = tempTodo;
        index = i;
        break;
      }
    }

    todo.setText(request.text());
    todo.setPriority(request.priority());
    todo.setDueDate(request.dueDate());

    todosArray.set(index, todo);

    return "ToDo with id " + id + " has been modified.";
  }

  @PutMapping("/todos/{id}/done")
  public String putDoneMethod(@PathVariable int id) {
    Todo todo = new Todo(0, null, null, null, null, null, null);
    int index = 0;

    for (int i = 0; i < todosArray.size(); i++) {
      Todo tempTodo = todosArray.get(i);

      if (tempTodo.getId() == id) {
        todo = tempTodo;
        index = i;
        break;
      }
    }

    todo.setStatus();
    todosArray.set(index, todo);
      
    return "Todo marked as done!";
  }

  @PutMapping("/todos/{id}/undone")
  public String putUnoneMethod(@PathVariable int id) {
    Todo todo = new Todo(0, null, null, null, null, null, null);
    int index = 0;

    for (int i = 0; i < todosArray.size(); i++) {
      Todo tempTodo = todosArray.get(i);

      if (tempTodo.getId() == id) {
        todo = tempTodo;
        index = i;
        break;
      }
    }

    todo.setStatus();
    todosArray.set(index, todo);
      
    return "Todo marked as Undone!";
  }

  @PostMapping("/todos/delete/{id}")
  public String postDeleteMethod(@RequestBody PutRequest request) {
    int id = request.id();
    Todo tempTodo = todosArray.get(id - 1);
    todosArray.remove(tempTodo);

    return "ToDo with id " + (id) + " has been deleted.";
  }
}
