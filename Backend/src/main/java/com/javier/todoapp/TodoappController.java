package com.javier.todoapp;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

import com.javier.todoapp.todo.Todo;



@RestController
public class TodoappController {
  List<Todo> todosArray;

  @GetMapping("/")
  public String index() {
    return "Welcome to Javier's todo API";
  }

  @GetMapping("/todos")
  public InitialArray getTodos(){
    InitialArray response = new InitialArray(
      todosArray
    );

    return response;
  }

  @PostMapping("/todos")
  public String postMethodName(@RequestBody String entity) {
      return entity;
  }
  
  record InitialArray(
    List<Todo> todosArray
  ){}
}
