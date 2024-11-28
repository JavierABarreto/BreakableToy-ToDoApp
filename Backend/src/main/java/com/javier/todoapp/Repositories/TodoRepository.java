package com.javier.todoapp.Repositories;

import java.util.ArrayList;

import com.javier.todoapp.Models.SetDoneDate;
import com.javier.todoapp.Models.Todo;

public class TodoRepository {
  private ArrayList<Todo> todos;

  public TodoRepository () {
    this.todos = new ArrayList<Todo>();
  }

  public void saveTodo (Todo todo) {
    todos.add(todo);
  }

  public void editTodo (String id, Todo todo) {
    int index = 0;

    for (int i = 0; i < this.todos.size(); i++) {
      Todo tempTodo = this.todos.get(i);

      if (tempTodo.getId().equals(id)) {
        index = i;

        tempTodo.setText(todo.getText());
        tempTodo.setPriority(todo.getPriority());
        tempTodo.setDueDate(todo.getDueDate());

        this.todos.set(index, tempTodo);
        break;
      }
    }
  }

  public String editTodoStatus(String action, String id, SetDoneDate data) {
    int index = 0;
    boolean flag = false;

    if (action.equals("Done")) {
      for (int i = 0; i < this.todos.size(); i++) {
        Todo tempTodo = this.todos.get(i);

        if (tempTodo.getId().equals(id)) {
          tempTodo.setStatus();
          tempTodo.setDoneDate(data.doneDate());
          index = i;

          this.todos.set(index, tempTodo);
          flag = true;
          break;
        }
      }
    } else {
      for (int i = 0; i < this.todos.size(); i++) {
        Todo tempTodo = this.todos.get(i);

        if (tempTodo.getId().equals(id)) {
          tempTodo.setStatus();
          tempTodo.setDoneDate(Long.valueOf(0));
          index = i;

          this.todos.set(index, tempTodo);
          flag = true;
          break;
        }
      }
    }

    if (flag) {
      return "Todo marked as "+ action + "!";
    } else {
      return "Couldn't find the Todo with the id: " + id;
    }
  }

  public String deleteToDo(String id) {
    boolean flag = false;

    for (int i = 0; i < this.todos.size(); i++) {
      Todo tempTodo = this.todos.get(i);

      if (tempTodo.getId().equals(id)) {
        this.todos.remove(tempTodo);
        flag = true;
        break;
      }
    }

    if (flag) {
      return "ToDo with id " + (id) + " has been deleted.";
    } else {
      return "Couldn't find the Todo with the id: " + id;
    }
  }

  public ArrayList<Todo> getTodos () {
    return this.todos;
  }
}
