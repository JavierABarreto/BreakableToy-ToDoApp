export const getAvg = (todos, priority) => {
  let Timee = 0;
  let counter = 0;

  if(priority != "default") {
    todos.forEach((e)=>{
      if (e.priority == priority && e.status == true) {
        counter++;
        let seconds = e.doneDate - e.creationDate;
        Timee +=  seconds;
      }
    })
  } else {
    for (let i = 0; i < todos.length; i++) {
      let tempTodo = todos[i];

      if (tempTodo.status) {
        counter++;
        let seconds = tempTodo.doneDate - tempTodo.creationDate;
        Timee +=  seconds;
      }
    }
  }

  let seconds = Timee / counter;
  if (isNaN(seconds)) {
    return 0;
  }

  return seconds;
}