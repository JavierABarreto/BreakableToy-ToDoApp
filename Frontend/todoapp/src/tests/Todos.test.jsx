import userEvent from '@testing-library/user-event'
import { cleanup, fireEvent, render, screen} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import '@testing-library/jest-dom'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { App } from '../pages/App'
import { ToDoTable } from '../components/TodosTable/ToDoTable'
import { ToDoModal } from '../components/ToDoModal'
import { useEffect } from 'react'

describe("ToDo tests", () => {
  afterEach(() => {
    cleanup()
  })

  it("Gets the title of the navbar", async () => {
    render(
      <Provider store={store} >
        <App />
      </Provider>
    )

    const btnSearch = screen.queryByText(/ToDo App/i);
    expect(btnSearch).toBeVisible();
  })


  it("Create a new To Do", async () => {
    const todos = []
    todos.push({
      id: "id1",
      text: "TAREA",
      dueDate: 17849000,
      status: false,
      doneDate: 0,
      priority: "High",
      creationDate: 17849000
    })

    render(
      <Provider store={store} >
        <App />
      </Provider>
    )

    const btn = screen.getByText(/New To Do/i);
    fireEvent.click(btn)
    
    const createModalTitle = screen.getByText(/Create new ToDo/i);
    expect(createModalTitle).toBeVisible()

    const textLabel = screen.getByLabelText(/Text:/i)
    fireEvent.change(textLabel, {
      target: {value: 'TAREA'},
    })
    expect(textLabel.value).toBe("TAREA");

    const priorityLabel = screen.getByLabelText(/Priority:/i);
    fireEvent.change(priorityLabel, {
      target: {value: 'High'},
    })
    expect(priorityLabel.value).toBe("High");
    
    expect(screen.getByText(/Create ToDo/i)).toBeVisible()

    cleanup()

    render(
      <Provider store={store} >
        <ToDoTable setType={() => {}} todos={todos} />
      </Provider>
    )

    expect(await screen.getByText(/TAREA/i)).toBeDefined()
  })


  it("Edit To Do", async () => {
    const todos = []
    todos.push({
      id: "id1",
      text: "TAREA",
      dueDate: 17849000,
      status: false,
      doneDate: 0,
      priority: "High",
      creationDate: 17849000
    })

    render(
      <Provider store={store} >
        <ToDoModal type={"Edit"} />
        <ToDoTable setType={() => {}} todos={todos} />
      </Provider>
    )

    const btnEdit = screen.getAllByText(/Edit/i)

    const modalTitle = screen.getAllByText(/Edit ToDo/i);
    expect(modalTitle[0]).toBeVisible()

    const textLabel = screen.getAllByLabelText(/Text:/i)
    fireEvent.change(textLabel[0], {
      target: {value: 'NEW EDITED TODO'},
    })

    expect(textLabel[0].value).toBe("NEW EDITED TODO");

    const priorityLabel = screen.getAllByLabelText(/Priority:/i);
    fireEvent.change(priorityLabel[0], {
      target: {value: 'Low'},
    })
    expect(priorityLabel[0].value).toBe("Low");
    
    const btnCancel = screen.getByText(/Cancel/i);

    let todo = todos[0]
    todo.text = "NEW EDITED TODO"
    todo.priority = "Low"

    cleanup()

    render(
      <Provider store={store} >
        <ToDoModal type={"Edit"} />
        <ToDoTable setType={() => {}} todos={todos} />
      </Provider>
    )

    expect(await screen.getByText(/NEW EDITED TODO/i)).toBeDefined()
  })

  it(('Should edit the status of a task to Done'), () => {
    const todos = []
    todos.push({
      id: "id1",
      text: "TAREA",
      dueDate: 17849000,
      status: false,
      doneDate: 0,
      priority: "High",
      creationDate: 17849000
    })

    render(
      <Provider store={store} >
        <ToDoTable setType={() => {}} todos={todos} />
      </Provider>
    )

    expect(screen.getByText(/TAREA/i)).toBeVisible();
    const checkbox = screen.getAllByRole('checkbox')
    fireEvent.click(checkbox[0])
    todos.status = true
    
    cleanup()

    render(
      <Provider store={store} >
        <ToDoTable setType={() => {}} todos={todos} />
      </Provider>
    )

    expect(screen.getByText(/TAREA/i)).toBeVisible();
    const checkboxChecked = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxChecked[0])
    expect(checkbox[0].checked).toBe(true)
  })


  it("Delete To Do", async () => {
    const todos = []
    todos.push({
      id: "id1",
      text: "TODO TASK 1",
      dueDate: 17849000,
      status: false,
      doneDate: 0,
      priority: "High",
      creationDate: 17849000
    },
    {
      id: "id2",
      text: "TODO TASK 2",
      dueDate: 17849000,
      status: false,
      doneDate: 0,
      priority: "High",
      creationDate: 17849000
    })

    render(
      <Provider store={store} >
        <ToDoTable setType={() => {}} todos={todos} />
      </Provider>
    )
    const deleteLast = screen.getAllByText(/Delete/i)
    expect(deleteLast[1]).toBeVisible()

    expect(screen.getAllByText(/TODO TASK/i).length).toBe(2)

    todos.pop()

    cleanup()

    render(
      <Provider store={store} >
        <ToDoTable setType={() => {}} todos={todos} />
      </Provider>
    )

    expect(screen.getAllByText(/TODO TASK/i).length).toBe(1)
  })
})