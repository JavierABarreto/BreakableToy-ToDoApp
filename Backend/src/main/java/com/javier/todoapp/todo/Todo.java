package com.javier.todoapp.todo;

public record Todo(
  int id,
  String text,
  String dueDate,
  Boolean status,
  String doneDate,
  String priority,
  String creationDate
) {};
