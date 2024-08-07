package com.javier.todoapp;

import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;

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
    @RequestParam(required = false, defaultValue = "false") String sortByPriority,
    @RequestParam(required = false, defaultValue = "false") String sortByDone,
    @RequestParam(required = false, defaultValue = "false") String sortByUndone,
    @RequestParam(required = false, defaultValue = "default") String getBy,
    @RequestParam(required = false, defaultValue = "asc") String order,
    @RequestParam(required = false, defaultValue = "1") int min,
    @RequestParam(required = false, defaultValue = "10") int max,
    @RequestParam(required = false, defaultValue = "") String text
  ){
    ArrayList<Todo> filteredTodos = new ArrayList<Todo>();
    filteredTodos = todosArray;

    if(sortByPriority.equals("true")) {
      ArrayList<Todo> todosPriority = new ArrayList<Todo>();

      if(order.toString().equals("asc")) {
        String[] prioritiesArray = new String[]{"Low", "Medium", "High"};

        for(String p : prioritiesArray) {
          for(Todo e : filteredTodos) {
            if (e.getPriority().equals(p)) {
              todosPriority.add(e);
            }
          }
        }
      } else {
        String[] prioritiesArray = new String[]{"High", "Medium", "Low"};

        for(String p : prioritiesArray) {
          for(Todo e : filteredTodos) {
            if (e.getPriority().equals(p)) {
              todosPriority.add(e);
            }
          }
        }
      }

      filteredTodos = todosPriority;
    }

    if(sortByDone.equals("true")) {
      ArrayList<Todo> doneTodos = new ArrayList<Todo>();

      for(Todo e : filteredTodos) {
        if(e.getStatus()) {
          doneTodos.add(e);
        }
      }

      filteredTodos = doneTodos;
    }

    if(sortByUndone.equals("true")) {
      ArrayList<Todo> undoneTodos = new ArrayList<Todo>();

      for(Todo e : filteredTodos) {
        if(!e.getStatus()) {
          undoneTodos.add(e);
        }
      }

      filteredTodos = undoneTodos;
    }

    if(!getBy.equals("default")) {
      ArrayList<Todo> getByArray = new ArrayList<Todo>();

      switch (getBy) {
        case "Low":
          for(Todo e : filteredTodos) {
            if (e.getPriority().equals("Low")) {
              getByArray.add(e);
            }
          }
          break;
          
        case "Medium":
          for(Todo e : filteredTodos) {
            if (e.getPriority().equals("Medium")) {
              getByArray.add(e);
            }
          }
          break;
      
        default:
          for(Todo e : filteredTodos) {
            if (e.getPriority().equals("High")) {
              getByArray.add(e);
            }
          }
          break;
      }

      filteredTodos = getByArray;
    }

    if (!text.equals("")){
      ArrayList<Todo> getByName = new ArrayList<Todo>();

      for (Todo e : filteredTodos) {
        if (e.getText().contains(text.toString())){
          getByName.add(e);
        }
      }

      filteredTodos = getByName;
    }

    if (filteredTodos.size() < max) {
      max = filteredTodos.size();
    }
    
    ArrayList<Todo> todos = new ArrayList<Todo>();
    
    for(int i = min; i <= max; i++) {
      todos.add(filteredTodos.get(i - 1));
    }

    return todos;
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
