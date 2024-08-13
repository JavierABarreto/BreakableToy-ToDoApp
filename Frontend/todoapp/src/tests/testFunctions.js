export const getAvg = (todos, priority) => {
  let avg = "";
  let tempTime = 0;

  if(priority != "default") {
    let time = 0;
    let counter = 0;

    todos.forEach((e) => {
      if (e.priority ==  priority && e.status) {
        counter++;
        let seconds = e.doneDate - e.creationDate;
        time +=  seconds;
      }
    })


    if (time == 0) {
      avg += "--:--";
    } else if (time < 60) {
      tempTime = time / counter;
    } else if (time < 3600){
      tempTime = ((time / 60) / counter);
    } else if (time < 86400) {
      tempTime = (((time / (60 * 60)) / counter));
    } else {
      tempTime = (((time / (60 * 60 * 24)) / counter));
    }

    tempTime = Math.floor(tempTime);

    if (time == 0) {
      avg += " ----";
    } else if (time < 60) {
      avg += tempTime + " Seconds";
    } else if (time < 3600){
      avg += tempTime + " Minutes";
    } else if (time < 86400) {
      avg += tempTime + " Hours";
    } else {
      avg += tempTime + " Days";
    }
  } else {
    let time = 0;
    let counter = 0;
    
    for (let i = 0; i < todos.length; i++) {
      let tempTodo = todos[i];

      if (tempTodo.status == true) {
        counter++;
        let seconds = tempTodo.doneDate - tempTodo.creationDate;
        time +=  seconds;
      }
    }

    if (time == 0) {
      avg += "--:--";
    } else if (time < 60) {
      tempTime = time / counter;
    } else if (time < 3600){
      tempTime = ((time / 60) / counter);
    } else if (time < 86400) {
      tempTime = (((time / (60 * 60)) / counter));
    } else {
      tempTime = (((time / (60 * 60 * 24)) / counter));
    }

    tempTime = Math.floor(tempTime);

    if (time == 0) {
      avg += " ----";
    } else if (time < 60) {
      avg += tempTime + " Seconds";
    } else if (time < 3600){
      avg += tempTime + " Minutes";
    } else if (time < 86400) {
      avg += tempTime + " Hours";
    } else {
      avg += tempTime + " Days";
    }
  }
  
  return avg;
}