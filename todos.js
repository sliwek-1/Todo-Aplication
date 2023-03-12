class Todo{
    constructor(date,text){
        this.date = date;
        this.text = text;
    }

    setTodos(todo){
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos));
    }

    getTodos(){
        let list = document.querySelector('.list');
        let todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todos);
        todos.forEach((todo,index) =>{
            let item = `<div class="info" data-id="${index}">
                            <div class="post-data">${todo.date}</div>
                                <div class="buttons">
                                <button class="delete"><ion-icon name="close-outline"></ion-icon></button>
                                <button class="check"><ion-icon name="checkmark-outline"></ion-icon></button>
                            </div>
                        </div>
                        <p class="list-text">${todo.text}</p>`;
            let element = document.createElement('div');
            element.classList.add('list-item');
            element.classList.add('active');
            element.innerHTML = item;
            list.appendChild(element);
        })
    }

    deleteTodos(currentTodo){
        let todos = JSON.parse(localStorage.getItem('todos'));
        let newTods = [...todos.slice(0, currentTodo), ...todos.slice(currentTodo + 1)];
        console.log(newTods, currentTodo);
        localStorage.setItem('todos', JSON.stringify(newTods))
    }

}

class DoneTodo extends Todo{
    constructor(date,text){
        super();
        this.date = date;
        this.text = text;
    }

    setTodos(doneTodo){
        let doneTodos = JSON.parse(localStorage.getItem('doneTodos')) || [];
        doneTodos.push(doneTodo)
        localStorage.setItem('doneTodos',JSON.stringify(doneTodos));
    }

    getTodos(){
        let doneTodos = JSON.parse(localStorage.getItem('doneTodos'));
        let listDoneTodos = document.querySelector('.list-done-todos');

        doneTodos.forEach((doneTodo,index) =>{
            let item = `<div class="info" data-id="${index}">
                            <div class="post-data">${doneTodo.date}</div>
                        
                        </div>
                        <p class="list-text">${doneTodo.text}</p>`;
            let element = document.createElement('div');
            element.classList.add('list-done-item');
            element.innerHTML = item;
            listDoneTodos.appendChild(element);
        })
    }
}

new Todo().getTodos();
new DoneTodo().getTodos();

let submit = document.querySelector('.submit');
let deleteBtn = document.querySelectorAll('.delete');
let doneBtns = document.querySelectorAll('.check');
let navItems = document.querySelectorAll('.list-nav-item');
let todos = document.querySelector('.list');
let doneTodos = document.querySelector('.list-done-todos');
let doneListItem = document.querySelectorAll('.list-done-item');
let listItem = document.querySelectorAll('.list-item'); 


submit.addEventListener('click', () =>{
    let text = document.querySelector('.to-do-text').value;
    if(text !== ""){
        let data = new Date();
        let obj = new Todo(data,text);
        obj.setTodos(obj);
        location.reload();
    }
})

deleteBtn.forEach(del =>{
    del.addEventListener('click', (e) =>{
        let obj = new Todo();
        let currentTodoIndex = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
        location.reload();
        obj.deleteTodos(currentTodoIndex);
    })
})

doneBtns.forEach(btn => {
    btn.addEventListener('click', (e) =>{
        let currentTodoIndex = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
        let currentTodo = e.target.parentElement.parentElement.parentElement.parentElement;
        let text = currentTodo.querySelector('.list-text').innerText;
        let date = currentTodo.querySelector('.post-data').innerText;
        let obj = new DoneTodo(date,text);
        obj.setTodos(obj);
        obj.deleteTodos(currentTodoIndex);
        location.reload();
    })
})

navItems.forEach(navItem => {
    navItem.addEventListener('click', (e) =>{
        let currentNavItem = e.target;
        if(!currentNavItem.classList.contains('active')){
            navItems.forEach(item =>{
                if(item.classList.contains('active')){
                    item.classList.remove('active');
                    currentNavItem.classList.add('active');
                    let currentID = currentNavItem.dataset.id;
                    
                    switch(currentID){
                        case "todos":
                            todos.classList.add('active');
                            doneTodos.classList.remove('active');
                            doneListItem.forEach(item => {
                                item.classList.remove('active');
                            })
                            listItem.forEach(item => {
                                item.classList.add('active');
                            })
                            break;
                        case "doneTodos":
                            todos.classList.remove('active');
                            doneTodos.classList.add('active');
                            doneListItem.forEach(item => {
                                item.classList.add('active');
                            })
                            listItem.forEach(item => {
                                item.classList.remove('active');
                            })
                            break;
                    }
                    
                }
            })
        }
    })
})