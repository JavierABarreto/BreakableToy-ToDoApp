package com.javier.todoapp.Models;

import com.javier.todoapp.Customer.CustomerDTO;

import java.util.List;

public record ReturnRecord(
  List<CustomerDTO> todos,
  double nPages,
  double currentPage,
  double avgPriorityAll,
  avgAllPriorities priorities
) {
}
