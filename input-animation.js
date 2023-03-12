let toDoText = document.querySelector('.to-do-text');
let line = document.querySelector('.line');

toDoText.addEventListener('focus', () =>{
    line.classList.add('active');
    toDoText.classList.add('active');
})

toDoText.addEventListener('blur', () =>{
    line.classList.remove('active');
    toDoText.classList.remove('active');
})