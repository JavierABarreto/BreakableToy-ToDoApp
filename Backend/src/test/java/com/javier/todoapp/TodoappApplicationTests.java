package com.javier.todoapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.javier.todoapp.todo.Todo;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;

import net.minidev.json.JSONArray;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.test.annotation.DirtiesContext;

import java.lang.reflect.Array;
import java.net.URI;
import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoappApplicationTests {
	
	
	@Autowired
	TestRestTemplate restTemplate;

	@Test
	void getTodosGetEmptyArray() {
		// Assert that the API responds to the request.
		ResponseEntity<ArrayList> GetResponse = restTemplate.getForEntity("/todos", ArrayList.class);
		assertThat(GetResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

		// Assert that the API returns an empty array at the start.
		assertThat(GetResponse.getBody()).isEmpty();
	}

	@Test
	void postNewToDo() {
		// Assert that the API responds to the pet.
		Todo ToDo = new Todo(1, "asd", "10/10/2024", false, "10/10/2024", "asd", "10/10/2024");

		ResponseEntity<String> PostResponse = restTemplate.postForEntity("/todos", ToDo, String.class);
		assertThat(PostResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(PostResponse.getBody()).isEqualTo("New ToDo has been added successfuly");
		
		ResponseEntity<ArrayList> GetResponse = restTemplate.getForEntity("/todos", ArrayList.class);
		assertThat(GetResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(GetResponse.getBody().size()).isEqualTo(1);
	}
}
