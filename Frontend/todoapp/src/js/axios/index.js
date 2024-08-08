import axios from 'axios';

const baseURL = "http://localhost:9090/todos"

export const getTodos = async () => {
  const response = await axios.get(baseURL)
  return JSON.parse(JSON.stringify(response.data))
}

export const getTodosByLimits = async (max, min) => {
  const response = await axios.get(baseURL + `?min=${min}&max=${max}`)
  return JSON.parse(JSON.stringify(response.data))
}

export const getTodosByFilters = async (name, priority, status) => {
  let getRequest = baseURL
  let filters = []

  if (name != "") {
    filters.push("text="+name.toLowerCase())
  }
  
  if (Number(priority) != 0) {
    let p = ""

    switch (Number(priority)) {
      case 2:
        p = "Medium"
        break;

      case 3:
        p = "High"
        break;
    
      default:
        p = "Low"
        break;
    }

    filters.push("getBy="+p)
  }

  if (status != 0) {
    filters.push( status == 1 ? "sortByDone=true" : "sortByUndone=true")
  }

  if (filters.length > 0) {
    getRequest += "?"
    
    filters.forEach(element => {
      getRequest += element
      getRequest += "&"
    });
  }

  const response = await axios.get(getRequest)

  return JSON.parse(JSON.stringify(response.data))
}

export const createNewTodo = async (data) => {
  const response = await axios.post(baseURL, data)

  return response.status
}

export const editTodoRequest = async (data) => {
  const response = await axios.put(`${baseURL}/${data.id}`, data)

  return response.status
}

export const deleteTodo = async (data) => {
  const response = await axios.post(`${baseURL}/delete/${data.id}`)

  return response.status
}

export const getTodosSortedByPriority = async (order) => {
  const response = await axios.get(`${baseURL}?sortByPriority=true&order=${order}`)
  
  return JSON.parse(JSON.stringify(response.data))
}

export const changeTodoStatus = async (data) => {
  const { id, as } = data
  const response = await axios.put(`${baseURL}/${id}/${as}`, data)

  return JSON.parse(JSON.stringify(response.data))
}