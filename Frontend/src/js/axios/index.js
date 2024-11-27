import axios from 'axios';

const baseURL = "http://localhost:9090/todos"
const PRIORITY_DEFAULT = "default";
const DATE_DEFAULT = "asc";
const STATUS_DONE = 1;

const getPriorityValue = (priority) => {
  switch (priority) {
    case "Low":
      return "Low";
    case "Medium":
      return "Medium";
    default:
      return "High";
  }
};

export const buildFilters = ({ text = "", getByPriority = PRIORITY_DEFAULT, getByStatus = 0, sortByPriority = PRIORITY_DEFAULT, sortByDate = DATE_DEFAULT, max, min}) => {
  const filters = [];

  if (text) {
    filters.push(`text=${text.toLowerCase()}`);
  }

  if (getByPriority !== PRIORITY_DEFAULT) {
    filters.push(`getBy=${getPriorityValue(getByPriority)}`);
  }

  if (getByStatus !== 0) {
    filters.push(getByStatus === STATUS_DONE ? "sortByDone=true" : "sortByUndone=true");
  }

  if (sortByPriority !== PRIORITY_DEFAULT) {
    filters.push(`sortByPriority=${sortByPriority}`);
  }

  if (sortByDate !== DATE_DEFAULT) { 
    filters.push(`sortByDate=${sortByDate}`);
  }

  filters.push(`min=${min}`);
  filters.push(`max=${max}`);

  return filters;
};

export const getTodos = async (filtObj) => {
  try {
    const filters = buildFilters(filtObj);
    const getRequest = `${baseURL}?${filters.join("&")}`;
    const response = await axios.get(getRequest);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};
  
export const createNewTodo = async (data) => {
  try {
    const response = await axios.post(baseURL, data)

    return response.status
  } catch (error) {
    throw new Error(error)
  }
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