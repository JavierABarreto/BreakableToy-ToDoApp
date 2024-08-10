package com.javier.todoapp.todo;

public record NewTodoRequest(
  String id,
  String text,
  Long dueDate,
  Boolean status,
  Long doneDate,
  String priority,
  Long creationDate
) {};
