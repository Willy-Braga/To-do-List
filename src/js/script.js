const btn = document.getElementById('btn');
const input = document.getElementById('input-task');
const list = document.getElementById('list-task');

let myTasks = [];

function addNewTask(event) {
    
    event.preventDefault();
    
    if (event.keyCode === 13 || event.type === 'click'){

        let inputValue = input.value;
    
        if (inputValue === "") {
            alert("O campo deve ser preenchido.");
            return;
        }
    
        myTasks.push({
            task: inputValue,
            checked: false,
        });
    
        input.value = "";
    
        showTasks();
    }
    
};

function showTasks() {  

    let newLi = "";

    myTasks.forEach((item, index) => {
        newLi += `   
        <li class="task ${item.checked && "checked"}">
            <img src="src/images/checked.png" id="checked" onclick="checkedItem(${index})" alt="checked icon">
            <p>${item.task}</p>
            <img src="src/images/trash.png" id="trash" onclick="deleteItem(${index})" alt="trash icon">
        </li>`
    });


    list.innerHTML = newLi;

    localStorage.setItem('list', JSON.stringify(myTasks));

};

function reloadTasks() {

    const tasksOfLocalStorage = localStorage.getItem('list');

    if (tasksOfLocalStorage) {
        myTasks = JSON.parse(tasksOfLocalStorage);
    }

    showTasks();
}
    
function checkedItem(index){
    myTasks[index].checked = !myTasks[index].checked;
    showTasks();
};
    
function deleteItem(index){
    myTasks.splice(index, 1);
    showTasks();
};

btn.addEventListener('click', addNewTask);
input.addEventListener('keyup', addNewTask);
reloadTasks();