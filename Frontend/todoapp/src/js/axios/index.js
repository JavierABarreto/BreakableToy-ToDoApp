import axios from 'axios';

const baseURL = "http://localhost:9090/todos"

export const getTodos = async (filtObj) => {
  const { max, min, text, getByPriority, getByStatus, sortByPriority, sortByDate } = filtObj

  let getRequest = baseURL
  let filters = []

  if (text != "") {
    filters.push("text="+text?.toLowerCase())
  }
  
  if (getByPriority != "default") {
    let v = ""
  
    switch (getByPriority) {
      case "Low":
        v = "Low"
        break;
  
      case "Medium":
        v = "Medium"
        break;
    
      default:
        v = "High"
        break;
    }
  
    filters.push("getBy="+v)
  }
  
  if (getByStatus != 0) {
    filters.push( getByStatus == 1 ? "sortByDone=true" : "sortByUndone=true")
  }

  if(sortByPriority != "default") {
    filters.push(`sortByPriority=${sortByPriority}`)
  }

  if(sortByDate != "default") {
    filters.push(`sortByDate=${sortByDate}`)
  }
    
  if (filters.length > 0) {
    getRequest += "?"
    
    filters.forEach(element => {
      getRequest += element
      getRequest += "&"
    });
  }


  getRequest += `?min=${min}&max=${max}`
  
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

export const changeTodoStatus = async (data) => {
  const { id, as } = data
  const response = await axios.put(`${baseURL}/${id}/${as}`, data)

  return JSON.parse(JSON.stringify(response.data))
}