const input = document.getElementById('texto-tarefa')
const btn = document.getElementById('criar-tarefa')
const ol = document.getElementById('lista-tarefas')
const eraseBtn = document.getElementById('apaga-tudo')
const clearDoneTask = document.getElementById('remover-finalizados')
const saveTaskBtn = document.getElementById('salvar-tarefas')
const upBtn = document.getElementById('mover-cima')
const downBtn = document.getElementById('mover-baixo')
const removeSelectedBtn = document.getElementById('remover-selecionado')



const recoverSavedTasks = () => {
   const savedTasks = JSON.parse(localStorage.getItem('tarefa'))
   if(savedTasks){
   for(i = 0; i < savedTasks.length; i += 1) {
      let tasks = savedTasks[i]
      const recoveredTask = document.createElement('li');
      recoveredTask.classList.add('tarefas')
      recoveredTask.innerText = tasks.text
      if (tasks.completed) {
         recoveredTask.classList.add('completed');
     }
      if (tasks.selected) {
         recoveredTask.classList.add('selected');
     }
     ol.appendChild(recoveredTask) 

      recoveredTask.addEventListener('click', changeBackground);
      recoveredTask.addEventListener('dblclick', doneTask);
      input.focus()

   }
}
   
}
const changeBackground = (event) => {
   const taskArr = document.getElementsByClassName('tarefas')
   for(i = 0; i < taskArr.length; i += 1) {
      if(taskArr[i].classList.contains('selected')){
      taskArr[i].classList.remove('selected')
   }
}
      event.target.classList.add('selected')
      input.focus()
   }

   const doneTask = (event) => {
      if(event.target.classList.contains('completed')) {
         event.target.classList.remove('completed')
      }
      else event.target.classList.add('completed')
      input.focus()
   }

const addTask = () => {
   const inputValue = input.value
   const newTask = document.createElement('li');
   newTask.classList = 'tarefas'
   newTask.innerText = inputValue
   ol.appendChild(newTask)   

   input.value = ''
   newTask.addEventListener('dblclick', doneTask)
   newTask.addEventListener('click', changeBackground)

   input.focus()
}

const keyUp = (event) => {
   if(event.key === 'Enter') {
      addTask();
   }
}

const eraseList = () => {
   ol.innerHTML = ''
   localStorage.clear()
   input.focus()
}

const removeTask = () => {
   const taskArr = document.getElementsByClassName('tarefas');
   for (let i = taskArr.length - 1; i >= 0; i--) {
      if (taskArr[i].classList.contains('completed')) {
         const taskText = taskArr[i].innerText.trim();
         ol.removeChild(taskArr[i]);

         let getItems = localStorage.getItem('tarefa');
         if (getItems) {
            getItems = JSON.parse(getItems); 
            for (let i2 = 0; i2 < getItems.length; i2++) {
               if (getItems[i2] === taskText) {
                  getItems.splice(i2, 1);
                  getItems
                  localStorage.setItem('tarefa', JSON.stringify(getItems));
               }
            }
         }
      }
   }
   input.focus()
};

const saveTasks = () => {
   const existingTasks = localStorage.getItem('tarefa')
   let existingTasksArr = []
   if(existingTasks) {
      existingTasksArr = JSON.parse(existingTasks)
   }
   const taskArr = document.getElementsByClassName('tarefas')
   for(i = 0; i < taskArr.length; i += 1) {
      const taskText = taskArr[i].innerText
      existingTasksArr.push({
         text: taskArr[i].innerText,
         completed: taskArr[i].classList.contains('completed'),
         selected: taskArr[i].classList.contains('selected')
      })
}
   localStorage.setItem('tarefa',JSON.stringify(existingTasksArr))
   input.focus()
}

const moveUp = () => {
   const selectedTask = document.querySelector('.selected')
   if(selectedTask && selectedTask.previousElementSibling) {
      ol.insertBefore(selectedTask,selectedTask.previousElementSibling)
   }
   input.focus()
}

const moveDown = () => {
   const selectedTask = document.querySelector('.selected')
   if(selectedTask && selectedTask.nextElementSibling) {
      ol.insertBefore(selectedTask.nextElementSibling, selectedTask)
   }
   input.focus()
}

const removeSelected = () => {
   const selectedTask = document.querySelector('.selected')
   const taskArr = document.getElementsByClassName('tarefas');
   for (let i = taskArr.length - 1; i >= 0; i--) {
      if (taskArr[i].classList.contains('selected')) {
         const taskText = taskArr[i].innerText.trim();
         ol.removeChild(taskArr[i]);

         let getItems = localStorage.getItem('tarefa');
         if (getItems) {
            getItems = JSON.parse(getItems); 
            for (let i2 = 0; i2 < getItems.length; i2++) {
               if (getItems[i2] === taskText) {
                  getItems.splice(i2, 1);
                  getItems
                  localStorage.setItem('tarefa', JSON.stringify(getItems));
               }
            }
         }
      }
   }
   if(selectedTask) {
      selectedTask.innerHTML = ''
      ol.removeChild(selectedTask)
      input.focus()
   }
}



btn.addEventListener('click', addTask)
input.addEventListener('keyup', keyUp)
eraseBtn.addEventListener('click', eraseList)
clearDoneTask.addEventListener('click', removeTask)
saveTaskBtn.addEventListener('click', saveTasks)
upBtn.addEventListener('click', moveUp)
downBtn.addEventListener('click', moveDown)
removeSelectedBtn.addEventListener('click', removeSelected)


recoverSavedTasks()