package com.javier.todoapp;

import com.javier.todoapp.Customer.CustomerDTO;
import com.javier.todoapp.Models.Todo;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.javier.todoapp.Services.TodoService;

import com.javier.todoapp.Models.ReturnRecord;
import com.javier.todoapp.Models.SetDoneDate;
import com.javier.todoapp.Models.NewTodoRequest;

@RestController
@CrossOrigin(origins = "*")
public class TodoappController {
  private final TodoService todoService = new TodoService();

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
  ) {
    return todoService.getTodos(sortByPriority, sortByDate, sortByDone, sortByUndone, getBy, min, max, text);
  }


  @PostMapping("/todos")
  public String postMethod(@RequestBody NewTodoRequest request) {
    return todoService.postMethod(request);
  }


  @PutMapping("/todos/{id}")
  public String putMethod(@PathVariable String id, @RequestBody Todo request) {
    return todoService.putMethod(id, request);
  }


  @PutMapping("/todos/{id}/done")
  public String putDoneMethod(@PathVariable String id, @RequestBody SetDoneDate request) {
    return todoService.putDoneMethod(id, request);
  }


  @PutMapping("/todos/{id}/undone")
  public String putUndoneMethod(@PathVariable String id) {
    return todoService.putUndoneMethod(id);
  }
  

  @PostMapping("/todos/delete/{id}")
  public String postDeleteMethod(@PathVariable String id) {
    return todoService.postDeleteMethod(id);
  }
}
