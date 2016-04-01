
// description: these are some starter codes for a To-Do list web app using JavaScript
// User Interaction with the web app.


var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder= document.getElementById("completed-tasks"); //completed-tasks

// new task list item
var createNewTaskElement = function(taskString) {
  //Create List Item
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input"); // checkbox
  var label = document.createElement("label");
  var editInput = document.createElement("input"); // text
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Add new task
var addTask = function() {
var listItem = createNewTaskElement(taskInput.value);
 incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value = "";
} // end of [addTask]


// Edit an existing task
var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  
  //if the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
} // end of [editTask]


// Delete a task
var deleteTask = function(){
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
}// end of [deleteTask]


// Mark task as complete
var taskCompleted = function(){
 var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}// end of [taskCompleted]

// Mark task as incomplete
var taskIncomplete = function(){
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
}// end of [taskIncomplete]

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
} // end of [bindTaskEvents]

var ajaxRequest = function() {
  console.log("AJAX request");
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// loop through incompleteTasksHolder (all li items)
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// loop through completedTasksHolder (all li items)
for(var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


  
  