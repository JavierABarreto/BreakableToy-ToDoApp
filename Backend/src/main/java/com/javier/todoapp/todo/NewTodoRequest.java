package com.javier.todoapp.todo;

public record NewTodoRequest(
  int id,
  String text,
  String dueDate,
  Boolean status,
  String doneDate,
  String priority,
  String creationDate
) {};
