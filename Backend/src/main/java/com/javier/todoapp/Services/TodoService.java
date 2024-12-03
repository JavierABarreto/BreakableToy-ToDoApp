package com.javier.todoapp.Services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import com.javier.todoapp.Customer.CustomerDTO;
import com.javier.todoapp.Models.ReturnRecord;
import com.javier.todoapp.Models.SetDoneDate;
import com.javier.todoapp.Models.Todo;
import com.javier.todoapp.Models.NewTodoRequest;
import com.javier.todoapp.Models.avgAllPriorities;
import com.javier.todoapp.Repositories.TodoRepository;


public class TodoService {
  private final TodoRepository todoRepository = new TodoRepository();
  private static final Logger LOGGER = Logger.getLogger(TodoService.class.getName());

  public ReturnRecord getTodos(String sortByPriority, String sortByDate, String sortByDone, String sortByUndone, String getBy, int min, int max, String text) {
    List<CustomerDTO> filteredTodos = todoRepository.getTodos();

    if(!sortByPriority.equals("default")) {
      ArrayList<CustomerDTO> todosPriority = new ArrayList<CustomerDTO>();
      String[] prioritiesArray = new String[]{"Low", "Medium", "High"};

      for(String p : prioritiesArray) {
        for(CustomerDTO e : filteredTodos) {
          if (e.priority().equals(p)) {
            todosPriority.add(e);
          }
        }
      }


      if(sortByPriority.equals("dsc")) {
        Collections.reverse(todosPriority);
      }

      filteredTodos = todosPriority;
    }


    if(!sortByDate.equals("default")) {
      List<CustomerDTO> temp = filteredTodos;

      for (int i = 0; i < temp.size() - 1; i++) {
        for (int j = i + 1; j < temp.size(); j++) {
          Long d1 = temp.get(i).dueDate();
          Long d2 = temp.get(j).doneDate();

          if(d2 < d1) {
            CustomerDTO temptodo = temp.get(i);
            temp.set(i, filteredTodos.get(j));
            temp.set(j, temptodo);
          }
        }
      }

      if(sortByDate.equals("dsc")) {
        Collections.reverse(temp);
      }

      filteredTodos = temp;
    }


    if(sortByDone.equals("true")) {
      ArrayList<CustomerDTO> doneTodos = new ArrayList<CustomerDTO>();

      for(CustomerDTO e : filteredTodos) {
        if(e.status()) {
          doneTodos.add(e);
        }
      }

      filteredTodos = doneTodos;
    }

    if(sortByUndone.equals("true")) {
      ArrayList<CustomerDTO> undoneTodos = new ArrayList<CustomerDTO>();

      for(CustomerDTO e : filteredTodos) {
        if(!e.status()) {
          undoneTodos.add(e);
        }
      }

      filteredTodos = undoneTodos;
    }

    if(!getBy.equals("default")) {
      List<CustomerDTO> getByArray = new ArrayList<CustomerDTO>();

      switch (getBy) {
        case "Low":
          for(CustomerDTO e : filteredTodos) {
            if (e.priority().equals("Low")) {
              getByArray.add(e);
            }
          }
          break;

        case "Medium":
          for(CustomerDTO e : filteredTodos) {
            if (e.priority().equals("Medium")) {
              getByArray.add(e);
            }
          }
          break;

        default:
          for(CustomerDTO e : filteredTodos) {
            if (e.priority().equals("High")) {
              getByArray.add(e);
            }
          }
          break;
      }

      filteredTodos = getByArray;
    }

    if (!text.equals("")){
      ArrayList<CustomerDTO> getByName = new ArrayList<CustomerDTO>();

      for (CustomerDTO e : filteredTodos) {
        if (e.text().toLowerCase().contains(text.toLowerCase())){
          getByName.add(e);
        }
      }

      filteredTodos = getByName;
    }

    int tempMax = max;

    if (filteredTodos.size() < max) {
      max = filteredTodos.size();
    }

    List<CustomerDTO> todos = new ArrayList<CustomerDTO>();

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
    if (request.text() != "" && !request.priority().equals("") && !request.text().equals(null)) {
      UUID id = UUID.randomUUID();
      Todo todo = new Todo(id.toString(), request.text(), request.dueDate(), request.status(), request.doneDate(), request.priority(), request.creationDate());

      todoRepository.saveTodo(todo);

      LOGGER.info("New ToDo has been added successfuly with id: " + id);
      return "New ToDo has been added successfuly";
    } else {
      LOGGER.severe("Please, make sure that all required fields are filled. Data: " + request);
      return "Please, make sure that all required fields are filled.";
    }
  }

  public String putMethod(String id, Todo request) {
    if(!id.equals("") && !request.getText().equals("") && !request.getPriority().equals("default")) {

      todoRepository.editTodo(id, request);

      LOGGER.info("ToDo with id: " + id + "has been modified successfully");
      return "ToDo with id " + id + " has been modified.";
    } else {
      LOGGER.severe("Please, make sure that all required fields are filled.");
      LOGGER.severe("ToDo id: " + id);
      LOGGER.severe("Data: " + request);
      return "Make sure to provide the correct id and make sure that the fields of the new information arent empty";
    }
  }

  public String putDoneMethod(String id, SetDoneDate request) {
    if (!id.equals("")) {
      LOGGER.info("ToDo with id: " + id + "has been modified successfully");
      return todoRepository.editTodoStatus("Done", id, request);
    } else {
      LOGGER.severe("Please, make sure that all required fields are filled.");
      LOGGER.severe("ToDo id: " + id);
      LOGGER.severe("Data: " + request);
      return "Please, provide an id";
    }
  }

  public String putUndoneMethod(String id) {
    if (!id.equals("")){
      SetDoneDate temp = new SetDoneDate(null, null, null);

      LOGGER.info("ToDo with id: " + id + "has been modified successfully");
      return todoRepository.editTodoStatus("Undone", id, temp);
    } else {
      LOGGER.severe("ToDo with id \"" + id +  " doesn't exists\".");
      return "Please, provide an id";
    }
  }

  public String postDeleteMethod (String id) {
    if (!id.equals("")) {
      LOGGER.info("ToDo with id: " + id + "has been deleted successfully");
      return todoRepository.deleteToDo(id);
    } else {
      LOGGER.severe("Please, make sure that all required fields are filled.");
      LOGGER.severe("ToDo id: " + id);
      return "Please, provide an id";
    }
  }

  // ---------
  // Functions
  // ---------
  public double getAvgOfPriority (String priority) {
    double Timee = 0;
    int counter = 0;
    List<CustomerDTO> todos = todoRepository.getTodos();

    if(priority != "default") {
      for(CustomerDTO e : todos) {
        if (e.priority().equals(priority) && e.status().equals(true)) {
          counter++;
          double seconds = e.doneDate() - e.creationDate();
          Timee +=  seconds;
        }
      }
    } else {
      for (int i = 0; i < todos.size(); i++) {
        CustomerDTO tempTodo = todos.get(i);

        if (tempTodo.status().equals(true)) {
          counter++;
          double seconds = tempTodo.doneDate() - tempTodo.creationDate();
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
