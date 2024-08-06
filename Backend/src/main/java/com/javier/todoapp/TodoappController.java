package com.javier.todoapp;

import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
  public ArrayList<Todo> getTodos(
    @RequestParam(required = false, defaultValue = "default") String sortBy,
    @RequestParam(required = false, defaultValue = "default") String getBy,
    @RequestParam(required = false, defaultValue = "asc") String order,
    @RequestParam(required = false, defaultValue = "1") int min,
    @RequestParam(required = false, defaultValue = "10") int max
  ){
    ArrayList<Todo> todosPage = new ArrayList<Todo>();

    if(sortBy.equals("priority")) {
      ArrayList<Todo> todosPriority = new ArrayList<Todo>();

      if(order.toString().equals("asc")) {
        String[] prioritiesArray = new String[]{"Low", "Medium", "High"};

        for(String p : prioritiesArray) {
          for(Todo e : todosPage) {
            if (e.getPriority().equals(p)) {
              todosPriority.add(e);
            }
          }
        }
      } else {
        String[] prioritiesArray = new String[]{"High", "Medium", "Low"};

        for(String p : prioritiesArray) {
          for(Todo e : todosPage) {
            if (e.getPriority().equals(p)) {
              todosPriority.add(e);
            }
          }
        }
      }

      todosPage = todosPriority;
    }

    if(sortBy.equals("done")) {
      ArrayList<Todo> doneTodos = new ArrayList<Todo>();

      for(Todo e : todosPage) {
        if(e.getStatus()) {
          doneTodos.add(e);
        }
      }

      todosPage = doneTodos;
    }

    if(sortBy.equals("undone")) {
      ArrayList<Todo> undoneTodos = new ArrayList<Todo>();

      for(Todo e : todosPage) {
        if(!e.getStatus()) {
          undoneTodos.add(e);
        }
      }

      todosPage = undoneTodos;
    }

    if(!getBy.equals("default")) {
      ArrayList<Todo> getByArray = new ArrayList<Todo>();

      switch (getBy) {
        case "Low":
          for(Todo e : todosPage) {
            if (e.getPriority().equals("Low")) {
              getByArray.add(e);
            }
          }
          break;
          
        case "Medium":
          for(Todo e : todosPage) {
            if (e.getPriority().equals("Medium")) {
              getByArray.add(e);
            }
          }
          break;
      
        default:
          for(Todo e : todosPage) {
            if (e.getPriority().equals("High")) {
              getByArray.add(e);
            }
          }
          break;
      }

      todosPage = getByArray;
    }

    if (todosArray.size() < max) {
      max = todosArray.size();
    }
    
    for(int i = min; i <= max; i++) {
      todosPage.add(todosArray.get(i - 1));
    }

    return todosPage;
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
