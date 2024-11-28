package com.javier.todoapp.Models;

import java.util.ArrayList;

public record ReturnRecord(
  ArrayList<Todo> todos,
  double nPages,
  double currentPage,
  double avgPriorityAll,
  avgAllPriorities priorities
) {
}
