package com.javier.todoapp.Customer;

import com.javier.todoapp.Models.Todo;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CustomerDTOMapper implements Function<Todo, CustomerDTO> {
    @Override
    public CustomerDTO apply(Todo todo) {
        return new CustomerDTO(
            todo.getId(),
            todo.getText(),
            todo.getDueDate(),
            todo.getStatus(),
            todo.getDoneDate(),
            todo.getPriority(),
            todo.getCreationDate()
        );
    }
}
