package com.javier.todoapp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.javier.todoapp.Models.ReturnRecord;
import com.javier.todoapp.Models.SetDoneDate;
import com.javier.todoapp.Models.Todo;

import java.util.ArrayList;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoappApplicationTests {
	private static final Long dueDate = 1723311446L;
	private static final Long doneDate = 0L;
	private static final Long creationDate = 1723225046L;

	private Todo todo;
	private String todoId;

	@Autowired
	TestRestTemplate restTemplate;

	@BeforeEach
	void setUp() {
		todo = new Todo(UUID.randomUUID().toString(), "T1", dueDate, false, doneDate, "asd", creationDate);
		todoId = todo.getId();
	}

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
	void GetFilteredTodos () {
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		assertThat(GetResponse.getBody().todos().size()).isEqualTo(0);

		Todo todo1 = new Todo(UUID.randomUUID().toString(), "T1", dueDate, false, doneDate, "asd", creationDate);
		Todo todo2 = new Todo(UUID.randomUUID().toString(), "T2", dueDate, false, doneDate, "asd", creationDate);
		Todo todo3 = new Todo(UUID.randomUUID().toString(), "T3", dueDate, false, doneDate, "asd", creationDate);
		Todo todo4 = new Todo(UUID.randomUUID().toString(), "T4", dueDate, false, doneDate, "asd", creationDate);
		Todo todo5 = new Todo(UUID.randomUUID().toString(), "R1", dueDate, false, doneDate, "asd", creationDate);

		restTemplate.postForEntity("/todos", todo1, String.class);
		restTemplate.postForEntity("/todos", todo2, String.class);
		restTemplate.postForEntity("/todos", todo3, String.class);
		restTemplate.postForEntity("/todos", todo4, String.class);
		restTemplate.postForEntity("/todos", todo5, String.class);

		ResponseEntity<ReturnRecord> GetResponseAfterAdd = restTemplate.getForEntity("/todos", ReturnRecord.class);
		assertThat(GetResponseAfterAdd.getBody().todos().size()).isEqualTo(5);

		ResponseEntity<ReturnRecord> GetFilteredResponse = restTemplate.getForEntity("/todos?status=false", ReturnRecord.class);
		assertThat(GetFilteredResponse.getBody().todos().size()).isEqualTo(5);

		ResponseEntity<ReturnRecord> GetFilteredResponse2 = restTemplate.getForEntity("/todos?text=T", ReturnRecord.class);
		assertThat(GetFilteredResponse2.getBody().todos().size()).isEqualTo(4);

		ResponseEntity<ReturnRecord> GetFilteredResponse3 = restTemplate.getForEntity("/todos?text=R1", ReturnRecord.class);
		assertThat(GetFilteredResponse3.getBody().todos().size()).isEqualTo(1);
	}

	@Test
	void postNewToDo() {
		ResponseEntity<String> PostResponse = restTemplate.postForEntity("/todos", todo, String.class);
		assertThat(PostResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(PostResponse.getBody()).isEqualTo("New ToDo has been added successfuly");
		
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		assertThat(GetResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(GetResponse.getBody().todos().size()).isEqualTo(6);
	}
	
	@Test
	void modifyTodoInformation() {
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		ArrayList<Todo> todos =  GetResponse.getBody().todos();
		Todo todo = todos.get(0);

		Todo data = new Todo(
				todoId,
				"Do my weekly essay",
				1723484246L,
				todo.getStatus(),
				todo.getDoneDate(),
				"High",
				todo.getCreationDate()
			);

		restTemplate.put("/todos/" + todoId, data);

		ResponseEntity<ReturnRecord> GetResponseAfterEdit = restTemplate.getForEntity("/todos", ReturnRecord.class);
		Todo editedTodo =  GetResponseAfterEdit.getBody().todos().get(0);
		assertThat(editedTodo.getText().equals("Do my weekly essay"));
		assertThat(editedTodo.getDueDate().equals(1723484246L));
		assertThat(editedTodo.getPriority().equals("High"));
	}

	@Test
	void setTodoAsDone() {
		Long newDoneDate = Long.valueOf(1723311446);
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		ArrayList<Todo> todos =  GetResponse.getBody().todos();
		Todo todoBeforeSetAsDone =  todos.get(0);
		assertThat(todoBeforeSetAsDone.getStatus().equals(false));

		SetDoneDate data = new SetDoneDate(todoId, "", newDoneDate);

		restTemplate.put("/todos/" + todoId + "/done", data);

		ResponseEntity<ReturnRecord> GetResponseAfterMarkAsDone = restTemplate.getForEntity("/todos", ReturnRecord.class);
		Todo doneTodo =  GetResponseAfterMarkAsDone.getBody().todos().get(0);
		assertThat(doneTodo.getStatus().equals(true));
		assertThat(doneTodo.getDoneDate().equals(newDoneDate));
	}

	@Test
	void setTodoAsUndne() {
		Long newDoneDate = 0L;
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		ArrayList<Todo> todos =  GetResponse.getBody().todos();
		Todo todoBeforeSetAsUndone =  todos.get(0);
		assertThat(todoBeforeSetAsUndone.getStatus().equals(true));

		SetDoneDate data = new SetDoneDate(todoId, "", newDoneDate);

		restTemplate.put("/todos/" + todoId + "/undone", data);

		ResponseEntity<ReturnRecord> GetResponseAfterMarkAsUndone = restTemplate.getForEntity("/todos", ReturnRecord.class);
		Todo undoneTodo =  GetResponseAfterMarkAsUndone.getBody().todos().get(0);
		assertThat(undoneTodo.getStatus().equals(false));
		assertThat(undoneTodo.getDoneDate().equals(0L));
	}

	@Test
	void DeleteTodo () {
		ResponseEntity<ReturnRecord> GetResponse = restTemplate.getForEntity("/todos", ReturnRecord.class);
		assertThat(GetResponse.getBody().todos().size()).isEqualTo(6);
		
		ResponseEntity<String> PostDeleteResponse = restTemplate.postForEntity("/todos/delete/"+todoId, todo,String.class);
		assertThat(PostDeleteResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

		ResponseEntity<ReturnRecord> GetResponseAfterDelete = restTemplate.getForEntity("/todos", ReturnRecord.class);
		assertThat(GetResponseAfterDelete.getBody().todos().isEmpty());
	}
}
