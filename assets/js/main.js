const buttonAdd = document.getElementById("btn-add");
const tasklist = document.getElementById("tasklist");
let task = [];

const getElementAddEdit =() =>{
  let deleteTask = document.querySelectorAll(".delete");
  let editTask = document.querySelectorAll(".edit");
  editTask.forEach((editButton) => {
    editButton.addEventListener("click", editTaskHandler);
  });

  deleteTask.forEach((deleteButton) => {
    deleteButton.addEventListener("click", deleteTaskHandler);
  });
}



let todo = document.querySelector("ul");
todo.addEventListener("click", function (ev) {
  if (ev.target.tagName === "LI") {
    const index = Array.from(todo.children).indexOf(ev.target);
    task[index].completed = !task[index].completed; // Toggle trạng thái completed
    // Lưu trạng thái vào Local Storage
    localStorage.setItem('tasks', JSON.stringify(task));
    console.log(ev.target)
    ev.target.classList.toggle("checked");
  }
});

const handleTaskAdd = () => {
  const taskName = document.getElementById("taskName");
  if (taskName.value.trim() === "") {
    alert("Please enter a task name");
  } else {
    const newTask = { name: taskName.value, completed: false }; // Tạo một công việc mới
    task.push(newTask);
    taskName.value = "";
    renderTask(task);
    localStorage.setItem('tasks', JSON.stringify(task));
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
  <span class="task-text">${taskName.name}</span>
  <input type="text" class="task-input" style="display:none;" />
  <span class="delete">❌</span>
  <span class="edit">Edit</span>
    </li>
    `;
  tasklist.insertAdjacentHTML("beforeend", newTask);
  if (task) {
    document.getElementById("deleteAll").style.display = "block";
  }
  getElementAddEdit();
 
  //   todo = document.querySelectorAll("li");
  //   console.log(deleteTask);
  //   console.log(todo);
};
const deleteTaskHandler = (event) => {
  const liElement = event.target.parentElement;
  const index = Array.from(liElement.parentElement.children).indexOf(liElement);
  task.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(task));
  if(task.length === 0){
    document.getElementById("deleteAll").style.display = "none";
    localStorage.clear()
  }
  // console.log(task);
  liElement.style.display = "none";
  
};

const editTaskHandler = (event) => {
    const liElement = event.target.parentElement;
    console.log(liElement)
    const taskText = liElement.querySelector(".task-text");
    console.log(taskText.innerText)
    const taskInput = liElement.querySelector(".task-input");
    const editButton = liElement.querySelector(".edit");
  
    taskText.style.display = "none";
    taskInput.style.display = "inline-block";
    editButton.style.display = "none";
  
    taskInput.value = taskText.innerText;
    taskInput.focus();
  
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          taskText.style.display = "inline-block";
          taskInput.style.display = "none";
          editButton.style.display = "inline-block";
          taskText.innerText = taskInput.value;

          // Cập nhật giá trị trong localStorage
          const index = Array.from(liElement.parentElement.children).indexOf(liElement);
          task[index].name = taskInput.value;
          task[index].completed = false
          localStorage.setItem('tasks', JSON.stringify(task));
        }
      });
};


const deleteAll = () => {
  confirm("Are you sure to delete it?");
  task = [];
  tasklist.innerHTML = "";
  document.getElementById("deleteAll").style.display = "none";
  localStorage.clear();
};


////////////////////////////////////////////
//LOCAL STORAGE

document.addEventListener("DOMContentLoaded", function(){
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    task = JSON.parse(storedTasks);
    task.forEach((taskItem,index)=>{
      const newTask = `<li>
      <span class="task-text">${taskItem.name}</span>
      <input type="text" class="task-input" style="display:none;" />
      <span class="delete">❌</span>
      <span class="edit">Edit</span>
        </li>
        `;
      tasklist.insertAdjacentHTML("beforeend", newTask);
      if (taskItem.completed) {
        const liElement = document.querySelectorAll('.list li')[index];
        liElement.classList.add('checked');
      }
    })
    document.getElementById("deleteAll").style.display = "block";
    getElementAddEdit();
  }
});

