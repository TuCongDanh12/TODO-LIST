const buttonAdd = document.getElementById("btn-add");
const tasklist = document.getElementById("tasklist");
let task = [];

// document.addEventListener("DOMContentLoaded", function () {
//   let todo = document.querySelectorAll("li");
//     console.log(todo)
//   todo.forEach((task, index) => {
//     console.log(index)
//     task.addEventListener("click", () => {
//       task.classList.toggle("checked");
//     });
//   });
// });
var todo = document.querySelector("ul");
todo.addEventListener("click", function (ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
  }
});

const handleTaskAdd = () => {
  const taskName = document.getElementById("taskName");
  if (taskName.value.trim() === "") {
    alert("Please enter a task name");
  } else {
    task.push(taskName.value);
    taskName.value = "";
    renderTask(task);
  }
};

document.getElementById("btn-add").addEventListener("click", handleTaskAdd);

document.getElementById("taskName").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleTaskAdd();
  }
});

const renderTask = (task) => {
  const taskName = [...task].pop();
  //   console.log(taskName);
  const newTask = `<li>
  <span class="task-text">${taskName}</span>
  <input type="text" class="task-input" style="display:none;" />
  <span class="delete">❌</span>
  <span class="edit">Edit</span>
    </li>
    `;
  tasklist.insertAdjacentHTML("beforeend", newTask);
  if (task) {
    document.getElementById("deleteAll").style.display = "block";
  }
  let deleteTask = document.querySelectorAll(".delete");
  let editTask = document.querySelectorAll(".edit");
  editTask.forEach((editButton) => {
    editButton.addEventListener("click", editTaskHandler);
  });

  deleteTask.forEach((deleteButton) => {
    deleteButton.addEventListener("click", deleteTaskHandler);
  });

  
  //   todo = document.querySelectorAll("li");
  //   console.log(deleteTask);
  //   console.log(todo);
};
const deleteTaskHandler = (event) => {
  const liElement = event.target.parentElement;
  const index = Array.from(liElement.parentElement.children).indexOf(liElement);
  task.splice(index, 1);
  if(task.length === 0){
    document.getElementById("deleteAll").style.display = "none";
  }
  console.log(task);
  liElement.style.display = "none";
  
};
// const deleteEle = () => {
//   if (deleteTask) {
//     deleteTask.forEach((ele, index) => {
//       ele.addEventListener("click", () => {
//         task.splice(index, 1);
//         //    console.log(task.length)
//         let div = ele.parentElement;
//         div.style.display = "none";
//       });
//     });
//   }
// };
// console.log(deleteTask.length)

const editTaskHandler = (event) => {
    const liElement = event.target.parentElement;
    const taskText = liElement.querySelector(".task-text");
    const taskInput = liElement.querySelector(".task-input");
    const editButton = liElement.querySelector(".edit");
  
    taskText.style.display = "none";
    taskInput.style.display = "inline-block";
    editButton.style.display = "none";
  
    // taskInput.value = taskText.innerText;
    taskInput.value = '';
    taskInput.focus();
  
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          taskText.style.display = "inline-block";
          taskInput.style.display = "none";
          editButton.style.display = "inline-block";
          taskText.innerText = taskInput.value;
        }
      });
};


const deleteAll = () => {
  confirm("Are you sure to delete it?");
  task = [];
  tasklist.innerHTML = "";
  document.getElementById("deleteAll").style.display = "none";
};







////////////////////////////////////////////
