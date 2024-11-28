package com.javier.todoapp.Services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.UUID;

import com.javier.todoapp.Models.ReturnRecord;
import com.javier.todoapp.Models.SetDoneDate;
import com.javier.todoapp.Models.Todo;
import com.javier.todoapp.Models.NewTodoRequest;
import com.javier.todoapp.Models.avgAllPriorities;
import com.javier.todoapp.Repositories.TodoRepository;


public class TodoService {
  private final TodoRepository todoRepository = new TodoRepository();

  public ReturnRecord getTodos(String sortByPriority, String sortByDate, String sortByDone, String sortByUndone, String getBy, int min, int max, String text) {
    ArrayList<Todo> filteredTodos = new ArrayList<Todo>();
    filteredTodos = todoRepository.getTodos();

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
        if (e.getText().toLowerCase().contains(text.toString().toLowerCase())){
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

    double nPages = 0;
    double currentPage = 0;

    if (filteredTodos.size() <= 10) {
      currentPage = 1;
    } else {
      currentPage = tempMax / 10;
    }

    if (filteredTodos.size() <= 10) {
      nPages = 1;
    } else {
      nPages = filteredTodos.size()/10;

      if (filteredTodos.size() % 10 != 0) {
        nPages += 1.0;
      }

      nPages = Math.ceil(nPages);
    }

    for(int i = min; i <= max; i++) {
      todos.add(filteredTodos.get(i - 1));
    }

    double avgPriority = getAvgOfPriority("default");
    avgAllPriorities avgPriorities = new avgAllPriorities(getAvgOfPriority("Low"), getAvgOfPriority("Medium"), getAvgOfPriority("High"));

    ReturnRecord data = new ReturnRecord(todos, nPages, currentPage, avgPriority, avgPriorities);
    return data;
  }


  public String postMethod(NewTodoRequest request) {
    if (request.text() != "" && request.priority() != "" && !request.text().equals(null)) {
      UUID id = UUID.randomUUID();
      Todo todo = new Todo(id.toString(), request.text(), request.dueDate(), request.status(), request.doneDate(), request.priority(), request.creationDate());

      todoRepository.saveTodo(todo);

      return "New ToDo has been added successfuly";
    } else {
      return "Please, make sure that all required fields are filled.";
    }
  }

  public String putMethod(String id, Todo request) {
    if(!id.toString().toString().equals("") && !request.getText().equals("") && !request.getPriority().toString().equals("default")) {

      todoRepository.editTodo(id, request);
  
      return "ToDo with id " + id + " has been modified.";
    } else {
      return "Make sure to provide the correct id and make sure that the fields of the new information arent empty";
    }
  }

  public String putDoneMethod(String id, SetDoneDate request) {
    if (!id.toString().equals("")) {
      return todoRepository.editTodoStatus("Done", id, request);
    } else {
      return "Please, provide an id";
    }
  }

  public String putUndoneMethod(String id) {
    if (!id.equals("")){
      SetDoneDate temp = new SetDoneDate(null, null, null);

      return todoRepository.editTodoStatus("Undone", id, temp);
    } else {
      return "Please, provide an id";
    }
  }

  public String postDeleteMethod (String id) {
    if (!id.equals("")) {
      return todoRepository.deleteToDo(id);
    } else {
      return "Please, provide an id";
    }
  }

  // ---------
  // Functions
  // ---------
  public double getAvgOfPriority (String priority) {
    double Timee = 0;
    int counter = 0;
    ArrayList<Todo> todos = todoRepository.getTodos();

    if(priority != "default") {
      for(Todo e : todos) {
        if (e.getPriority().equals(priority) && e.getStatus().equals(true)) {
          counter++;
          double seconds = e.getDoneDate() - e.getCreationDate();
          Timee +=  seconds;
        }
      }
    } else {
      for (int i = 0; i < todos.size(); i++) {
        Todo tempTodo = todos.get(i);

        if (tempTodo.getStatus().equals(true)) {
          counter++;
          double seconds = tempTodo.getDoneDate() - tempTodo.getCreationDate();
          Timee +=  seconds;
        }
      }
    }

    double seconds = Timee / counter;
    if (Double.isNaN(seconds)) {
      return 0;
    }

    return seconds;
  }
}
