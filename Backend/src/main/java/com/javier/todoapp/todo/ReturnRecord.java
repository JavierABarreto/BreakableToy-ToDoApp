package com.javier.todoapp.todo;

import java.util.ArrayList;

public record ReturnRecord(
  ArrayList<Todo> todos,
  double nPages,
  double currentPage,
  double avgPriorityAll,
  avgAllPriorities priorities
) {
}
