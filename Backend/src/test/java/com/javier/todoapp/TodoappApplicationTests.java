package com.javier.todoapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.javier.todoapp.todo.ReturnRecord;
import com.javier.todoapp.todo.SetDoneDate;
import com.javier.todoapp.todo.Todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoappApplicationTests {
	Long dueDate = Long.valueOf(1723311446);
	Long doneDate = Long.valueOf(0);
	Long creationDate = Long.valueOf(1723225046);

	Todo ToDo = new Todo(UUID.randomUUID().toString(), "T1", dueDate, false, doneDate, "asd", creationDate);
	String id = ToDo.getId();

	@Autowired
	TestRestTemplate restTemplate;

	@Test
	void getTodosGetEmptyArray() {
		// Assert that the API responds to the request.
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		assertThat(GetResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		
		// Assert that the API returns an empty array at the start.
		ReturnRecord data = GetResponse.getBody();
		assertThat(data.todos()).isEmpty();
	}

	@Test
	void postNewToDo() {
		ResponseEntity<String> PostResponse = restTemplate.postForEntity("/todos", ToDo, String.class);
		assertThat(PostResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(PostResponse.getBody()).isEqualTo("New ToDo has been added successfuly");
		
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		assertThat(GetResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(GetResponse.getBody().todos().size()).isEqualTo(1);
	}
	
	@Test
	void modifyTodoInformation() {
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		ArrayList<Todo> todos =  GetResponse.getBody().todos();
		Todo todo = todos.get(0);

		Todo data = new Todo(
				id,
				"Do my weekly essay",
				Long.valueOf(1723484246),
				todo.getStatus(),
				todo.getDoneDate(),
				"High",
				todo.getCreationDate()
			);

		restTemplate.put("/todos/" + id, data);

		ResponseEntity<ReturnRecord> GetResponseAfterEdit = restTemplate.getForEntity("/todos", ReturnRecord.class);
		Todo editedTodo =  GetResponseAfterEdit.getBody().todos().get(0);
		assertThat(editedTodo.getText().equals("Do my weekly essay"));
		assertThat(editedTodo.getDueDate().equals(1723484246));
		assertThat(editedTodo.getPriority().equals("High"));
	}

	@Test
	void setTodoAsDone() {
		Long newDoneDate = Long.valueOf(1723311446);
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		ArrayList<Todo> todos =  GetResponse.getBody().todos();
		Todo todoBeforeSetAsDone =  todos.get(0);
		assertThat(todoBeforeSetAsDone.getStatus().equals(false));

		SetDoneDate data = new SetDoneDate(id, "", newDoneDate);

		restTemplate.put("/todos/" + id + "/done", data);

		ResponseEntity<ReturnRecord> GetResponseAfterMarkAsDone = restTemplate.getForEntity("/todos", ReturnRecord.class);
		Todo doneTodo =  GetResponseAfterMarkAsDone.getBody().todos().get(0);
		assertThat(doneTodo.getStatus().equals(true));
		assertThat(doneTodo.getDoneDate().equals(newDoneDate));
	}

	@Test
	void setTodoAsUndne() {
		Long newDoneDate = Long.valueOf(0);
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		ArrayList<Todo> todos =  GetResponse.getBody().todos();
		Todo todoBeforeSetAsUndone =  todos.get(0);
		assertThat(todoBeforeSetAsUndone.getStatus().equals(true));

		SetDoneDate data = new SetDoneDate(id, "", newDoneDate);

		restTemplate.put("/todos/" + id + "/undone", data);

		ResponseEntity<ReturnRecord> GetResponseAfterMarkAsUndone = restTemplate.getForEntity("/todos", ReturnRecord.class);
		Todo undoneTodo =  GetResponseAfterMarkAsUndone.getBody().todos().get(0);
		assertThat(undoneTodo.getStatus().equals(false));
		assertThat(undoneTodo.getDoneDate().equals(Long.valueOf(0)));
	}

	@Test
	void DeleteTodo () {
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		assertThat(GetResponse.getBody().todos().size()).isEqualTo(1);
		
		ResponseEntity<String> PostDeleteResponse = restTemplate.postForEntity("/todos/delete/"+id, ToDo,String.class);
		assertThat(PostDeleteResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

		ResponseEntity<ReturnRecord> GetResponseAfterDelete = restTemplate.getForEntity("/todos", ReturnRecord.class);
		assertThat(GetResponseAfterDelete.getBody().todos().isEmpty());
	}
}
