package com.javier.todoapp.todo;

public class Todo {
  private int id;
  private String text;
  private String dueDate;
  private Boolean status;
  private String doneDate;
  private String priority;
  private String creationDate;

  public Todo(int id, String text, String dueDate, Boolean status, String doneDate, String priority, String creationDate) {
    this.id = id;
    this.text = text;
    this.dueDate = dueDate;
    this.status = status;
    this.doneDate = doneDate;
    this.priority = priority;
    this.creationDate = creationDate;
  }

  public String toString() {
    return "{ "
    + "\'id\'= " + id
    + "\', \'text\'= \'" + text
    + "\', \'dueDate\'= \'" + dueDate
    + "\'', \'status\'= " + status
    + ", \'doneDate\'= \'" + doneDate
    + "\', \'priority\'= \'" + priority
    + "\', \'creationDate\'= " + creationDate
    + " }";
  }

  public void setText(String text) {
    this.text = text;
  }

  public void setDueDate(String dueDate) {
    this.dueDate = dueDate;
  }

  public void setStatus(){
    this.status = !status;
  }

  public void setPriority(String priority) {
    this.priority = priority;
  }

  public int getId() {
    return id;
  }

  public String getText() {
    return text;
  }

  public String getDueDate() {
    return dueDate;
  }
  public Boolean getStatus() {
    return status;
  }
  public String getDoneDate() {
    return doneDate;
  }
  public String getPriority() {
    return priority;
  }
  public String getCreationDate() {
    return creationDate;
  }
}
