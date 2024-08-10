package com.javier.todoapp.todo;

public class Todo {
  private String id;
  private String text;
  private Long dueDate;
  private Boolean status;
  private Long doneDate;
  private String priority;
  private Long creationDate;

  public Todo(String id, String text, Long dueDate, Boolean status, Long doneDate, String priority, Long creationDate) {
    this.id = id;
    this.text = text;
    this.dueDate = dueDate;
    this.status = status;
    this.doneDate = doneDate;
    this.priority = priority;
    this.creationDate = creationDate;
  }

  public void setText(String text) {
    this.text = text;
  }

  public void setDueDate(Long dueDate) {
    this.dueDate = dueDate;
  }

  public void setStatus(){
    this.status = !status;
  }

  public void setDoneDate(Long doneDate){
    this.doneDate = doneDate;
  }

  public void setPriority(String priority) {
    this.priority = priority;
  }

  public String getId() {
    return id;
  }

  public String getText() {
    return text;
  }

  public Long getDueDate() {
    return dueDate;
  }
  public Boolean getStatus() {
    return status;
  }
  public Long getDoneDate() {
    return doneDate;
  }
  public String getPriority() {
    return priority;
  }
  public Long getCreationDate() {
    return creationDate;
  }
}
