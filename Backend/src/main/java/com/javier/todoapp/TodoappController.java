package com.javier.todoapp;

import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

import com.javier.todoapp.todo.*;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class TodoappController {
  ArrayList<Todo> todosArray = new ArrayList<Todo>();

  @GetMapping("/")
  public String index() {
    return "Welcome to Javier's todo API";
  }

  @GetMapping("/todos")
  public ReturnRecord getTodos(
    @RequestParam(required = false, defaultValue = "default") String sortByPriority,
    @RequestParam(required = false, defaultValue = "default") String sortByDate,
    @RequestParam(required = false, defaultValue = "false") String sortByDone,
    @RequestParam(required = false, defaultValue = "false") String sortByUndone,
    @RequestParam(required = false, defaultValue = "default") String getBy,
    @RequestParam(required = false, defaultValue = "1") int min,
    @RequestParam(required = false, defaultValue = "10") int max,
    @RequestParam(required = false, defaultValue = "") String text
  ){
    ArrayList<Todo> filteredTodos = new ArrayList<Todo>();
    filteredTodos = todosArray;

    if(!sortByPriority.equals("default")) {
      ArrayList<Todo> todosPriority = new ArrayList<Todo>();
      String[] prioritiesArray = new String[]{"Low", "Medium", "High"};

      for(String p : prioritiesArray) {
        for(Todo e : filteredTodos) {
          if (e.getPriority().equals(p)) {
            todosPriority.add(e);
          }
        }
      }


      if(sortByPriority.toString().equals("dsc")) {
        Collections.reverse(todosPriority);
      }

      filteredTodos = todosPriority;
    }


    if(!sortByDate.equals("default")) {
      ArrayList<Todo> temp = new ArrayList<Todo>();
      temp = filteredTodos;

      for (int i = 0; i < temp.size() - 1; i++) {
        for (int j = i + 1; j < temp.size(); j++) {
          Long d1 = temp.get(i).getDueDate();
          Long d2 = temp.get(j).getDueDate();
          
          if(d2 < d1) {
            Todo temptodo = temp.get(i);
            temp.set(i, filteredTodos.get(j));
            temp.set(j, temptodo);
          }
        }
      }

      if(sortByDate.toString().equals("dsc")) {
        Collections.reverse(temp);
      }

      filteredTodos = temp;
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

    int tempMax = max;

    if (filteredTodos.size() < max) {
      max = filteredTodos.size();
    }
    
    ArrayList<Todo> todos = new ArrayList<Todo>();
    
    for(int i = min; i <= max; i++) {
      todos.add(filteredTodos.get(i - 1));
    }

    double nPages = 0;
    double currentPage = 0;

    if (todosArray.size() <= 10) {
      currentPage = 1;
    } else {
      currentPage = tempMax / 10;
    }

    if (todosArray.size() <= 10) {
      nPages = 1;
    } else {
      nPages = todosArray.size()/10;

      if (todosArray.size() % 10 != 0) {
        nPages += 1.0;
      }

      nPages = Math.ceil(nPages);
    }

    ReturnRecord data = new ReturnRecord(todos, nPages, currentPage);
    return data;
  }


  @PostMapping("/todos")
  public String postMethod(@RequestBody NewTodoRequest request) {
    if (request.text() != "" && request.priority() != "" && !request.text().equals(null)) {
      UUID id = UUID.randomUUID();
      Todo todo = new Todo(id.toString(), request.text(), request.dueDate(), request.status(), request.doneDate(), request.priority(), request.creationDate());
      todosArray.add(todo);

      return "New ToDo has been added successfuly";
    } else {
      return "Please, make sure that all required fields are filled.";
    }
  }


  @PutMapping("/todos/{id}")
  public String putMethod(@PathVariable String id, @RequestBody NewTodoRequest request) {
    Todo todo = new Todo(id, null, null, null, null, null, null);
    int index = 0;

    for (int i = 0; i < todosArray.size(); i++) {
      Todo tempTodo = todosArray.get(i);
      
      if (tempTodo.getId().toString().equals(id.toString())) {
        index = i;

        tempTodo.setText(request.text());
        tempTodo.setPriority(request.priority());
        tempTodo.setDueDate(request.dueDate());
    
        todosArray.set(index, tempTodo);
        break;
      }
    }

    return "ToDo with id " + id + " has been modified.";
  }


  @PutMapping("/todos/{id}/done")
  public String putDoneMethod(@PathVariable String id, @RequestBody SetDoneDate request) {
    Todo todo = new Todo(id, null, null, null, null, null, null);
    int index = 0;

    for (int i = 0; i < todosArray.size(); i++) {
      Todo tempTodo = todosArray.get(i);
      
      if (tempTodo.getId().toString().equals(id.toString())) {
        tempTodo.setStatus();
        tempTodo.setDoneDate(request.doneDate());
        index = i;

        todosArray.set(index, tempTodo);
        break;
      }
    }
      
    return "Todo marked as done!";
  }


  @PutMapping("/todos/{id}/undone")
  public String putUnoneMethod(@PathVariable String id) {
    Todo todo = new Todo(id, null, null, null, null, null, null);
    int index = 0;

    for (int i = 0; i < todosArray.size(); i++) {
      Todo tempTodo = todosArray.get(i);
      
      if (tempTodo.getId().toString().equals(id.toString())) {
        tempTodo.setStatus();
        tempTodo.setDoneDate(Long.valueOf(0));
        index = i;

        todosArray.set(index, tempTodo);
        break;
      }
    }

    todo.setStatus();
    todosArray.set(index, todo);
      
    return "Todo marked as Undone!";
  }
  

  @PostMapping("/todos/delete/{id}")
  public String postDeleteMethod(@PathVariable String id) {
    for (int i = 0; i < todosArray.size(); i++) {
      Todo tempTodo = todosArray.get(i);

      if (tempTodo.getId().equals(id)) {
        todosArray.remove(tempTodo);
        break;
      }
    }

    return "ToDo with id " + (id) + " has been deleted.";
  }
}
