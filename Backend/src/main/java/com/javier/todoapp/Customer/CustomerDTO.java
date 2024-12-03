package com.javier.todoapp.Customer;

public record CustomerDTO (
    String id,
    String text,
    Long dueDate,
    Boolean status,
    Long doneDate,
    String priority,
    Long creationDate
) {
}
